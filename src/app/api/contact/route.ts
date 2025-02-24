import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

// This is a simple in-memory storage. In a real application, you'd use a database
let messages: any[] = [];

export async function POST(request: Request) {
  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('MongoDB connected successfully');
    
    const data = await request.json();
    console.log('Received data:', data);
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'subject', 'message'];
    for (const field of requiredFields) {
      if (!data[field]) {
        console.log(`Missing required field: ${field}`);
        return NextResponse.json({ 
          success: false, 
          error: `${field} is required` 
        }, { status: 400 });
      }
    }

    console.log('Creating contact document...');
    const contact = await Contact.create(data);
    console.log('Contact created successfully:', contact);
    
    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    console.error('Contact submission error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to submit message' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const messages = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch messages' }, { status: 500 });
  }
} 