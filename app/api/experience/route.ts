import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Experience from '@/models/Experience';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function GET() {
  try {
    await dbConnect();
    const experiences = await Experience.find().sort({ order: 1, startDate: -1 });
    return NextResponse.json(experiences);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
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

    // Upload company logo if provided
    if (data.companyLogo && data.companyLogo.startsWith('data:')) {
      const uploadResult = await uploadImage(data.companyLogo, 'portfolio/experience');
      data.companyLogo = uploadResult.url;
      data.companyLogoPublicId = uploadResult.publicId;
    }

    const experience = await Experience.create(data);
    return NextResponse.json(experience, { status: 201 });
  } catch (error: any) {
    console.error('Experience POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create experience' }, { status: 500 });
  }
}

