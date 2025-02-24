"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { motion } from 'framer-motion';
import { IoCalendarOutline, IoPersonOutline, IoTimeOutline, IoShareSocialOutline, IoBookmarkOutline, IoHeartOutline, IoChatbubbleOutline, IoLinkOutline } from 'react-icons/io5';

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
  excerpt: string;
  readTime?: string;
  author?: string;
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
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full"
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-[#fafafa] flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-3xl p-8 shadow-2xl text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h2 className="text-2xl font-bold mb-2">Post Not Found</h2>
          <p className="text-gray-600">The article you're looking for seems to have vanished into thin air.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fafafa] min-h-screen">
      <Navbar />
      
      <article>
        {/* Floating Share Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white rounded-full shadow-xl px-6 py-3 z-50 flex items-center gap-4"
        >
          {[
            { icon: IoHeartOutline, label: 'Like' },
            { icon: IoBookmarkOutline, label: 'Save' },
            { icon: IoShareSocialOutline, label: 'Share' },
            { icon: IoChatbubbleOutline, label: 'Comment' },
            { icon: IoLinkOutline, label: 'Copy Link' }
          ].map((item, index) => (
            <button
              key={index}
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:block">{item.label}</span>
            </button>
          ))}
        </motion.div>

        {/* Header Section */}
        <header className="max-w-screen-xl mx-auto px-4 pt-16 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <IoPersonOutline className="w-5 h-5" />
                <span>{post.author || 'Anonymous'}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoCalendarOutline className="w-5 h-5" />
                <span>{new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2">
                <IoTimeOutline className="w-5 h-5" />
                <span>{post.readTime || '5 min read'}</span>
              </div>
            </div>
          </motion.div>
        </header>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-screen-xl mx-auto px-4 mb-16"
        >
          <div className="aspect-[21/9] rounded-3xl overflow-hidden shadow-2xl">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>

        {/* Content Grid */}
        <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8 lg:col-start-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="prose prose-lg max-w-none"
            >
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </motion.div>

            {/* Additional Content */}
            <div className="mt-16 space-y-16">
              {post.content2 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-3xl p-8 shadow-xl"
                >
                  <div dangerouslySetInnerHTML={{ __html: post.content2 }} />
                </motion.div>
              )}
              
              {post.content3 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-blue-50 rounded-3xl p-8 shadow-xl"
                >
                  <div dangerouslySetInnerHTML={{ __html: post.content3 }} />
                </motion.div>
              )}

              {/* Author Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-xl"
              >
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-3xl font-bold transform rotate-3">
                    {(post.author || 'A')[0]}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{post.author || 'Anonymous'}</h3>
                    <p className="text-gray-600">Content Creator & Industry Expert</p>
                  </div>
                </div>
              </motion.div>

              {/* YouTube Video */}
              {post.youtubeUrl && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="rounded-3xl overflow-hidden shadow-xl"
                >
                  <div className="aspect-video">
                    <iframe
                      src={getYoutubeEmbedUrl(post.youtubeUrl)}
                      title="YouTube video player"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </article>

      <div className="h-32" /> {/* Space for floating share bar */}
      <Footer />
    </div>
  );
}