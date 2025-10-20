import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET() {
  try {
    await dbConnect();
    const contact = await Contact.findOne().sort({ createdAt: -1 });
    return NextResponse.json(contact || {});
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contact data' }, { status: 500 });
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

    // Check if contact already exists
    const existingContact = await Contact.findOne();
    
    if (existingContact) {
      Object.assign(existingContact, data);
      await existingContact.save();
      return NextResponse.json(existingContact);
    }

    const contact = await Contact.create(data);
    return NextResponse.json(contact, { status: 201 });
  } catch (error: any) {
    console.error('Contact POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to save contact data' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    const existingContact = await Contact.findOne();
    if (!existingContact) {
      return NextResponse.json({ error: 'Contact not found' }, { status: 404 });
    }

    Object.assign(existingContact, data);
    await existingContact.save();

    return NextResponse.json(existingContact);
  } catch (error: any) {
    console.error('Contact PUT error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update contact data' }, { status: 500 });
  }
}

