"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  content2?: string;
  content3?: string;
  date: string;
  category: string;
  imageUrl: string;
  slug: string;
  youtubeUrl?: string;
}

export default function BlogPost() {
  const params = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  const getYoutubeEmbedUrl = (url: string) => {
    if (!url) return '';
    try {
      const videoId = url.includes('youtu.be') 
        ? url.split('youtu.be/')[1]?.split('?')[0] 
        : url.split('v=')[1]?.split('&')[0];
      return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
    } catch (error) {
      console.error('Error parsing YouTube URL:', error);
      return '';
    }
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await fetch(`/api/blogs/${params.slug}`);
        const data = await response.json();
        if (data.success) {
          console.log('Full blog data:', data.data);
          setPost(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch blog:', error);
      }
      setLoading(false);
    };

    fetchBlog();
  }, [params.slug]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Blog post not found</div>;

  return (
    <>
      <Navbar />
      <article className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="space-y-8">
            {/* Media Section - Responsive Grid */}
            <div className={`grid ${post.youtubeUrl ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1'} gap-6`}>
              {/* Image Column - Full width if no YouTube video */}
              {post.imageUrl && (
                <div className={`relative ${post.youtubeUrl ? 'h-[300px]' : 'h-[400px]'} rounded-2xl overflow-hidden shadow-xl`}>
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* YouTube Video Column - Only shown if URL exists */}
              {post.youtubeUrl && (
                <div className="relative h-[300px] rounded-2xl overflow-hidden shadow-xl">
                  <iframe
                    src={getYoutubeEmbedUrl(post.youtubeUrl)}
                    title="YouTube video player"
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>

            {/* Content Section */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
              <div className="text-sm text-blue-600 font-semibold mb-4">
                {post.category} • {new Date(post.date).toLocaleDateString()}
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>
              
              {/* Main Content */}
              <div 
                className="prose max-w-none prose-lg prose-blue mb-8"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
              
              {/* Content 2 */}
              {post.content2 && post.content2.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div 
                    className="prose max-w-none prose-lg prose-blue mb-8"
                    dangerouslySetInnerHTML={{ __html: post.content2 }}
                  />
                </div>
              )}
              
              {/* Content 3 */}
              {post.content3 && post.content3.length > 0 && (
                <div className="mt-8 pt-8 border-t border-gray-200">
                  <div 
                    className="prose max-w-none prose-lg prose-blue"
                    dangerouslySetInnerHTML={{ __html: post.content3 }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </article>
      <Footer />
    </>
  );
} 