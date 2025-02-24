import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function POST(request: Request) {
  try {
    await connectDB();
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email is required' 
      }, { status: 400 });
    }

    const existingSubscriber = await Newsletter.findOne({ email });
    if (existingSubscriber) {
      return NextResponse.json({ 
        success: false, 
        error: 'Email already subscribed' 
      }, { status: 400 });
    }

    const subscriber = await Newsletter.create({ email });
    return NextResponse.json({ success: true, data: subscriber });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to subscribe' 
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectDB();
    const subscribers = await Newsletter.find().sort({ dateJoined: -1 });
    return NextResponse.json({ success: true, data: subscribers });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to fetch subscribers' 
    }, { status: 500 });
  }
} 