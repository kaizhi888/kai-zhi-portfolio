import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Certification from '@/models/Certification';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    const certification = await Certification.findById(params.id);
    if (!certification) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 });
    }

    // Upload new badge if provided
    if (data.badgeImage && data.badgeImage.startsWith('data:')) {
      if (certification.badgeImagePublicId) {
        await deleteImage(certification.badgeImagePublicId);
      }
      const uploadResult = await uploadImage(data.badgeImage, 'portfolio/certifications');
      data.badgeImage = uploadResult.url;
      data.badgeImagePublicId = uploadResult.publicId;
    }

    Object.assign(certification, data);
    await certification.save();

    return NextResponse.json(certification);
  } catch (error: any) {
    console.error('Certification PUT error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update certification' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const certification = await Certification.findById(params.id);

    if (!certification) {
      return NextResponse.json({ error: 'Certification not found' }, { status: 404 });
    }

    // Delete badge if exists
    if (certification.badgeImagePublicId) {
      await deleteImage(certification.badgeImagePublicId);
    }

    await Certification.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Certification deleted successfully' });
  } catch (error: any) {
    console.error('Certification DELETE error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete certification' }, { status: 500 });
  }
}

