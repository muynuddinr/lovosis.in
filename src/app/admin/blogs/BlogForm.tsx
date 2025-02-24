"use client";

import { useState, useRef } from 'react';
import { IoImageOutline } from 'react-icons/io5';

interface BlogFormProps {
  onSubmit: (formData: FormData) => void;
  initialData?: any;
}

export default function BlogForm({ onSubmit, initialData }: BlogFormProps) {
  const [imagePreview, setImagePreview] = useState(initialData?.imageUrl || '');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const categories = ["Development", "Design", "Technology", "Business"];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateYoutubeUrl = (url: string) => {
    if (!url) return true;
    const pattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;
    return pattern.test(url);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const youtubeUrl = formData.get('youtubeUrl') as string;
    
    if (youtubeUrl && !validateYoutubeUrl(youtubeUrl)) {
      alert('Please enter a valid YouTube URL');
      return;
    }
    
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            defaultValue={initialData?.title}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            name="category"
            defaultValue={initialData?.category}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            required
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Excerpt</label>
          <textarea
            name="excerpt"
            defaultValue={initialData?.excerpt}
            rows={3}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Content</label>
          <textarea
            name="content"
            required
            defaultValue={initialData?.content}
            rows={6}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Write your main content here..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Additional Content (Optional)
          </label>
          <textarea
            name="content2"
            defaultValue={initialData?.content2}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Add more content here (optional)..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Extra Content (Optional)
          </label>
          <textarea
            name="content3"
            defaultValue={initialData?.content3}
            rows={4}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Add extra content here (optional)..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            name="status"
            defaultValue={initialData?.status || 'Draft'}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="Draft">Draft</option>
            <option value="Published">Published</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Featured Image</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-blue-500"
          >
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="max-h-48 object-contain" />
            ) : (
              <div className="space-y-1 text-center">
                <IoImageOutline className="mx-auto h-12 w-12 text-gray-400" />
                <div className="text-sm text-gray-600">
                  <span className="text-blue-600 hover:text-blue-500">Upload a file</span> or drag and drop
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </div>
            )}
            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">YouTube URL (Optional)</label>
          <input
            type="url"
            name="youtubeUrl"
            defaultValue={initialData?.youtubeUrl}
            placeholder="https://www.youtube.com/watch?v=..."
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <p className="mt-1 text-sm text-gray-500">Add a YouTube video URL if you want to embed it in your blog post</p>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {initialData ? 'Update Blog Post' : 'Create Blog Post'}
        </button>
      </div>
    </form>
  );
} 