import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import path from 'path';
import { mkdir, writeFile } from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const blog = await Blog.findOne({ slug: params.slug });
    
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const blog = await Blog.findByIdAndDelete(params.slug);
    
    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    await connectDB();
    const formData = await request.formData();
    
    // Get all form fields
    const updateData: any = {
      title: formData.get('title'),
      content: formData.get('content'),
      content2: formData.get('content2') || '',
      content3: formData.get('content3') || '',
      excerpt: formData.get('excerpt'),
      category: formData.get('category'),
      status: formData.get('status'),
      youtubeUrl: formData.get('youtubeUrl') || ''
    };

    // Handle image update if new image is uploaded
    const image = formData.get('image') as File;
    if (image && image.size > 0) {
      const uploadDir = path.join(process.cwd(), 'public/uploads');
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (err) {
        // Directory might already exist
      }

      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${uuidv4()}-${image.name}`;
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);
      updateData.imageUrl = `/uploads/${filename}`;
    }
    
    const blog = await Blog.findByIdAndUpdate(
      params.slug,
      updateData,
      { new: true }
    );
    
    if (!blog) {
      return NextResponse.json({ success: false, error: 'Blog not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error updating blog:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to update blog' 
    }, { status: 500 });
  }
} 