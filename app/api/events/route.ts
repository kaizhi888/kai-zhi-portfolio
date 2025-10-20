import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function GET() {
  try {
    await dbConnect();
    const events = await Event.find().sort({ order: 1, date: -1 });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
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

    // Upload logo if provided
    if (data.logo && data.logo.startsWith('data:')) {
      const uploadResult = await uploadImage(data.logo, 'portfolio/events');
      data.logo = uploadResult.url;
      data.logoPublicId = uploadResult.publicId;
    }

    const event = await Event.create(data);
    return NextResponse.json(event, { status: 201 });
  } catch (error: any) {
    console.error('Event POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create event' }, { status: 500 });
  }
}

