import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    const { status } = await request.json();
    
    const updatedContact = await Contact.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedContact) {
      return NextResponse.json(
        { success: false, error: 'Message not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedContact });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update message' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const { id } = params;
    
    const deletedMessage = await Contact.findByIdAndDelete(id);
    
    if (!deletedMessage) {
      return NextResponse.json({ 
        success: false, 
        error: 'Message not found' 
      }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: deletedMessage });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete message' 
    }, { status: 500 });
  }
} 