import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({ status: 'Published' }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const excerpt = formData.get('excerpt') as string;
    const category = formData.get('category') as string;
    const status = formData.get('status') as string;
    const image = formData.get('image') as File;

    const slug = title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');

    let imageUrl = '';
    if (image) {
      // Ensure uploads directory exists
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
      imageUrl = `/uploads/${filename}`;
    }

    const blog = await Blog.create({
      title,
      content,
      excerpt,
      category,
      status,
      slug,
      imageUrl,
      date: new Date().toISOString()
    });

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    console.error('Error creating blog:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create blog post' 
    }, { status: 500 });
  }
} 