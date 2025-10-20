import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Experience from '@/models/Experience';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    const experience = await Experience.findById(params.id);
    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    // Upload new logo if provided
    if (data.companyLogo && data.companyLogo.startsWith('data:')) {
      if (experience.companyLogoPublicId) {
        await deleteImage(experience.companyLogoPublicId);
      }
      const uploadResult = await uploadImage(data.companyLogo, 'portfolio/experience');
      data.companyLogo = uploadResult.url;
      data.companyLogoPublicId = uploadResult.publicId;
    }

    Object.assign(experience, data);
    await experience.save();

    return NextResponse.json(experience);
  } catch (error: any) {
    console.error('Experience PUT error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update experience' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const experience = await Experience.findById(params.id);

    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    // Delete logo if exists
    if (experience.companyLogoPublicId) {
      await deleteImage(experience.companyLogoPublicId);
    }

    await Experience.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Experience deleted successfully' });
  } catch (error: any) {
    console.error('Experience DELETE error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete experience' }, { status: 500 });
  }
}

