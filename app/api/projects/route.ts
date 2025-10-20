import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find().sort({ featured: -1, order: 1 });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
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

    // Upload project images if provided
    if (data.images && Array.isArray(data.images)) {
      const uploadedImages = [];
      for (const image of data.images) {
        if (typeof image === 'string' && image.startsWith('data:')) {
          const uploadResult = await uploadImage(image, 'portfolio/projects');
          uploadedImages.push({
            url: uploadResult.url,
            publicId: uploadResult.publicId,
          });
        } else if (image.url) {
          uploadedImages.push(image);
        }
      }
      data.images = uploadedImages;
    }

    const project = await Project.create(data);
    return NextResponse.json(project, { status: 201 });
  } catch (error: any) {
    console.error('Project POST error:', error);
    return NextResponse.json({ error: error.message || 'Failed to create project' }, { status: 500 });
  }
}

