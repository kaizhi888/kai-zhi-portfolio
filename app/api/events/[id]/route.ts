import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Event from '@/models/Event';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    const event = await Event.findById(params.id);
    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Upload new logo if provided
    if (data.logo && data.logo.startsWith('data:')) {
      if (event.logoPublicId) {
        await deleteImage(event.logoPublicId);
      }
      const uploadResult = await uploadImage(data.logo, 'portfolio/events');
      data.logo = uploadResult.url;
      data.logoPublicId = uploadResult.publicId;
    }

    Object.assign(event, data);
    await event.save();

    return NextResponse.json(event);
  } catch (error: any) {
    console.error('Event PUT error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update event' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const event = await Event.findById(params.id);

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Delete logo if exists
    if (event.logoPublicId) {
      await deleteImage(event.logoPublicId);
    }

    await Event.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Event deleted successfully' });
  } catch (error: any) {
    console.error('Event DELETE error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete event' }, { status: 500 });
  }
}

