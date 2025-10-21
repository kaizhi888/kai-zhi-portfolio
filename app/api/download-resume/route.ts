import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import About from '@/models/About';

export async function GET() {
  try {
    await dbConnect();
    const about = await About.findOne().sort({ createdAt: -1 });
    
    if (!about?.resumeUrl) {
      return NextResponse.json({ error: 'Resume not found' }, { status: 404 });
    }

    // Fetch the PDF from Cloudinary
    const response = await fetch(about.resumeUrl);
    
    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch resume' }, { status: 500 });
    }

    const pdfBuffer = await response.arrayBuffer();
    
    // Return the PDF with proper headers
    return new NextResponse(pdfBuffer, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Hiu_Kai_Zhi_Resume.pdf"',
      },
    });
  } catch (error) {
    console.error('Resume download error:', error);
    return NextResponse.json({ error: 'Failed to download resume' }, { status: 500 });
  }
}

