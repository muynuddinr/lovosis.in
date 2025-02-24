import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Newsletter from '@/models/Newsletter';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    const { status } = await request.json();

    const updatedSubscriber = await Newsletter.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedSubscriber) {
      return NextResponse.json({ 
        success: false, 
        error: 'Subscriber not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedSubscriber });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update subscriber status' 
    }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    
    const deletedSubscriber = await Newsletter.findByIdAndDelete(id);
    
    if (!deletedSubscriber) {
      return NextResponse.json({ 
        success: false, 
        error: 'Subscriber not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: deletedSubscriber });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete subscriber' 
    }, { status: 500 });
  }
} 