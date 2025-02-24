import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  imageUrl: { type: String, required: true },
  status: { type: String, enum: ['Draft', 'Published'], default: 'Draft' },
  date: { type: Date, default: Date.now },
}, {
  timestamps: true
});

const Blog = mongoose.models.Blog || mongoose.model('Blog', blogSchema);
export default Blog; 