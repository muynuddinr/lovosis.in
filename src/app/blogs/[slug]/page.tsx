"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

interface BlogPost {
  id: number;
  title: string;
  content: string;
  date: string;
  category: string;
  imageUrl: string;
  slug: string;
}

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${params.slug}`);
        const data = await response.json();
        if (data.success) {
          setPost(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [params.slug]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Blog post not found</div>;
  }

  return (
    <>
      <Navbar />
      <article className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-2xl shadow-xl mb-8"
          />
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="text-sm text-blue-600 font-semibold mb-4">
              {post.category} • {post.date}
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
            <div 
              className="prose max-w-none prose-lg prose-blue"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
} 