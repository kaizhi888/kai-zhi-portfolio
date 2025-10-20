import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Certification from '@/models/Certification';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function GET() {
  try {
    await dbConnect();
    const certifications = await Certification.find().sort({ order: 1, issueDate: -1 });
    return NextResponse.json(certifications);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch certifications' }, { status: 500 });
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

    // Upload badge image if provided
    if (data.badgeImage && data.badgeImage.startsWith('data:')) {
      const uploadResult = await uploadImage(data.badgeImage, 'portfolio/certifications');
      data.badgeImage = uploadResult.url;
      data.badgeImagePublicId = uploadResult.publicId;
    }

    const certification = await Certification.create(data);
    return NextResponse.json(certification, { status: 201 });
  } catch (error: any) {
    console.error('Certification POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create certification' }, { status: 500 });
  }
}

