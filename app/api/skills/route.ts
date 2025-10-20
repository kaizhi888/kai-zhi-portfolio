import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Skill from '@/models/Skill';

export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find().sort({ category: 1, order: 1 });
    return NextResponse.json(skills);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
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

    const skill = await Skill.create(data);
    return NextResponse.json(skill, { status: 201 });
  } catch (error: any) {
    console.error('Skill POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create skill' }, { status: 500 });
  }
}

