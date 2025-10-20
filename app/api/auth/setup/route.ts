import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

async function setupAdmin() {
  await dbConnect();

  // Check if admin already exists
  const existingUser = await User.findOne({ email: process.env.ADMIN_EMAIL });

  if (existingUser) {
    return NextResponse.json(
      { error: 'Admin user already exists' },
      { status: 400 }
    );
  }

  // Create admin user
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || 'admin123', 10);

  const user = await User.create({
    email: process.env.ADMIN_EMAIL || 'admin@example.com',
    password: hashedPassword,
    name: 'Admin',
  });

  return NextResponse.json(
    { message: 'Admin user created successfully', email: user.email },
    { status: 201 }
  );
}

export async function GET(req: Request) {
  try {
    return await setupAdmin();
  } catch (error: any) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    return await setupAdmin();
  } catch (error: any) {
    console.error('Setup error:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user', details: error.message },
      { status: 500 }
    );
  }
}

