import mongoose from 'mongoose';

const NewsletterSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  dateJoined: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  }
});

export default mongoose.models.Newsletter || mongoose.model('Newsletter', NewsletterSchema); 