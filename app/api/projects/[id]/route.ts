import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import { uploadImage, deleteImage } from '@/lib/cloudinary';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const data = await req.json();

    const project = await Project.findById(params.id);
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Handle image updates
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

      // Delete old images that are not in the new list
      if (project.images) {
        for (const oldImage of project.images) {
          if (oldImage.publicId && !uploadedImages.find(img => img.publicId === oldImage.publicId)) {
            await deleteImage(oldImage.publicId);
          }
        }
      }

      data.images = uploadedImages;
    }

    Object.assign(project, data);
    await project.save();

    return NextResponse.json(project);
  } catch (error: any) {
    console.error('Project PUT error:', error);
    return NextResponse.json({ error: error.message || 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const project = await Project.findById(params.id);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Delete all project images
    if (project.images) {
      for (const image of project.images) {
        if (image.publicId) {
          await deleteImage(image.publicId);
        }
      }
    }

    await Project.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    console.error('Project DELETE error:', error);
    return NextResponse.json({ error: error.message || 'Failed to delete project' }, { status: 500 });
  }
}

