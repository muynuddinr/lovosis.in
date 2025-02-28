import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Blog from '@/models/Blog';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

export async function GET(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    
    const query = status ? { status } : {};
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    
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
    const youtubeUrl = formData.get('youtubeUrl') as string;

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

    console.log('Received YouTube URL:', youtubeUrl);

    const blog = await Blog.create({
      title,
      content,
      content2: formData.get('content2') || '',
      content3: formData.get('content3') || '',
      excerpt,
      category,
      status,
      slug,
      imageUrl,
      youtubeUrl: youtubeUrl || '',
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