import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Award from '@/models/Award';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function GET() {
  try {
    await dbConnect();
    const awards = await Award.find().sort({ order: 1, date: -1 });
    return NextResponse.json(awards);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch awards' }, { status: 500 });
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

    // Upload icon if provided
    if (data.icon && data.icon.startsWith('data:')) {
      const uploadResult = await uploadImage(data.icon, 'portfolio/awards');
      data.icon = uploadResult.url;
      data.iconPublicId = uploadResult.publicId;
    }

    const award = await Award.create(data);
    return NextResponse.json(award, { status: 201 });
  } catch (error: any) {
    console.error('Award POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create award' }, { status: 500 });
  }
}

