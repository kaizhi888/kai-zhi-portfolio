import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Award from '@/models/Award';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    const award = await Award.findById(params.id);
    if (!award) {
      return NextResponse.json({ error: 'Award not found' }, { status: 404 });
    }

    // Upload new icon if provided
    if (data.icon && data.icon.startsWith('data:')) {
      if (award.iconPublicId) {
        await deleteImage(award.iconPublicId);
      }
      const uploadResult = await uploadImage(data.icon, 'portfolio/awards');
      data.icon = uploadResult.url;
      data.iconPublicId = uploadResult.publicId;
    }

    Object.assign(award, data);
    await award.save();

    return NextResponse.json(award);
  } catch (error: any) {
    console.error('Award PUT error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update award' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const award = await Award.findById(params.id);

    if (!award) {
      return NextResponse.json({ error: 'Award not found' }, { status: 404 });
    }

    // Delete icon if exists
    if (award.iconPublicId) {
      await deleteImage(award.iconPublicId);
    }

    await Award.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Award deleted successfully' });
  } catch (error: any) {
    console.error('Award DELETE error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete award' }, { status: 500 });
  }
}

