import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Education from '@/models/Education';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    const education = await Education.findById(params.id);
    if (!education) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    }

    // Upload new logo if provided
    if (data.schoolLogo && data.schoolLogo.startsWith('data:')) {
      if (education.schoolLogoPublicId) {
        await deleteImage(education.schoolLogoPublicId);
      }
      const uploadResult = await uploadImage(data.schoolLogo, 'portfolio/education');
      data.schoolLogo = uploadResult.url;
      data.schoolLogoPublicId = uploadResult.publicId;
    }

    Object.assign(education, data);
    await education.save();

    return NextResponse.json(education);
  } catch (error: any) {
    console.error('Education PUT error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update education' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const education = await Education.findById(params.id);

    if (!education) {
      return NextResponse.json({ error: 'Education not found' }, { status: 404 });
    }

    // Delete logo if exists
    if (education.schoolLogoPublicId) {
      await deleteImage(education.schoolLogoPublicId);
    }

    await Education.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Education deleted successfully' });
  } catch (error: any) {
    console.error('Education DELETE error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete education' }, { status: 500 });
  }
}

