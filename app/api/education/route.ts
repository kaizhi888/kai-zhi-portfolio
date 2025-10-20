import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Education from '@/models/Education';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function GET() {
  try {
    await dbConnect();
    const education = await Education.find().sort({ order: 1, startDate: -1 });
    return NextResponse.json(education);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 });
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

    // Upload school logo if provided
    if (data.schoolLogo && data.schoolLogo.startsWith('data:')) {
      const uploadResult = await uploadImage(data.schoolLogo, 'portfolio/education');
      data.schoolLogo = uploadResult.url;
      data.schoolLogoPublicId = uploadResult.publicId;
    }

    const education = await Education.create(data);
    return NextResponse.json(education, { status: 201 });
  } catch (error: any) {
    console.error('Education POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create education' }, { status: 500 });
  }
}

