import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import About from '@/models/About';
import { uploadImage, deleteImage, uploadFile, deleteFile } from '@/lib/cloudinary';

export async function GET() {
  try {
    await dbConnect();
    const about = await About.findOne().sort({ createdAt: -1 });
    return NextResponse.json(about || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch about data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    // Upload profile image if provided
    if (data.profileImage && data.profileImage.startsWith('data:')) {
      const uploadResult = await uploadImage(data.profileImage, 'portfolio/about');
      data.profileImage = uploadResult.url;
      data.profileImagePublicId = uploadResult.publicId;
    }

    // Upload resume if provided (base64 file), or use direct URL if provided
    if (data.resumeFile) {
      if (data.resumeFile.startsWith('data:')) {
        // It's a file upload
        const uploadResult = await uploadFile(data.resumeFile, 'portfolio/resume');
        data.resumeUrl = uploadResult.url;
        data.resumePublicId = uploadResult.publicId;
      } else if (data.resumeFile.startsWith('http')) {
        // It's a direct URL (Google Drive, etc.)
        data.resumeUrl = data.resumeFile;
        // Don't set resumePublicId for external URLs
      }
    }

    // Check if about already exists
    const existingAbout = await About.findOne();
    
    if (existingAbout) {
      // Delete old images if new ones are uploaded
      if (data.profileImagePublicId && existingAbout.profileImagePublicId) {
        await deleteImage(existingAbout.profileImagePublicId);
      }
      if (data.resumePublicId && existingAbout.resumePublicId) {
        await deleteFile(existingAbout.resumePublicId);
      }

      Object.assign(existingAbout, data);
      await existingAbout.save();
      return NextResponse.json(existingAbout);
    }

    const about = await About.create(data);
    return NextResponse.json(about, { status: 201 });
  } catch (error: any) {
    console.error('About POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to save about data' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    const existingAbout = await About.findOne();
    if (!existingAbout) {
      return NextResponse.json({ error: 'About not found' }, { status: 404 });
    }

    // Upload profile image if new one provided
    if (data.profileImage && data.profileImage.startsWith('data:')) {
      if (existingAbout.profileImagePublicId) {
        await deleteImage(existingAbout.profileImagePublicId);
      }
      const uploadResult = await uploadImage(data.profileImage, 'portfolio/about');
      data.profileImage = uploadResult.url;
      data.profileImagePublicId = uploadResult.publicId;
    }

    // Upload resume if new one provided (base64 file), or use direct URL if provided
    if (data.resumeFile) {
      if (data.resumeFile.startsWith('data:')) {
        // It's a file upload
        if (existingAbout.resumePublicId) {
          await deleteFile(existingAbout.resumePublicId);
        }
        const uploadResult = await uploadFile(data.resumeFile, 'portfolio/resume');
        data.resumeUrl = uploadResult.url;
        data.resumePublicId = uploadResult.publicId;
      } else if (data.resumeFile.startsWith('http')) {
        // It's a direct URL (Google Drive, etc.)
        // Delete old Cloudinary file if it exists
        if (existingAbout.resumePublicId) {
          await deleteFile(existingAbout.resumePublicId);
        }
        data.resumeUrl = data.resumeFile;
        data.resumePublicId = null; // Clear publicId for external URLs
      }
    }

    Object.assign(existingAbout, data);
    await existingAbout.save();

    return NextResponse.json(existingAbout);
  } catch (error: any) {
    console.error('About PUT error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update about data' }, { status: 500 });
  }
}

