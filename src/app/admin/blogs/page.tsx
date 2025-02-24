"use client";

import { useState, useEffect } from 'react';
import { IoAddOutline, IoTrashOutline, IoCreateOutline, IoChevronDownOutline, IoSearchOutline } from 'react-icons/io5';
import { FaNewspaper, FaEdit, FaEye } from 'react-icons/fa';
import BlogForm from './BlogForm';
import { BlogPost } from '../../types/blog';

export default function AdminBlogs() {
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState<any>(null);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch('/api/blogs');
      const data = await response.json();
      if (data.success) {
        setBlogs(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (formData: FormData) => {
    try {
      const url = editingBlog 
        ? `/api/blogs/${editingBlog._id}` 
        : '/api/blogs';
        
      const response = await fetch(url, {
        method: editingBlog ? 'PUT' : 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (data.success) {
        setShowForm(false);
        setEditingBlog(null);
        fetchBlogs();
      } else {
        alert(data.error || 'Failed to save blog post');
      }
    } catch (error) {
      console.error('Failed to save blog post:', error);
      alert('Failed to save blog post');
    }
  };

  const handleEdit = (blog: BlogPost) => {
    setEditingBlog(blog);
    setShowForm(true);
  };

  const handleDelete = async (blogId: string) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        const response = await fetch(`/api/blogs/${blogId}`, {
          method: 'DELETE',
        });
        const data = await response.json();
        
        if (data.success) {
          fetchBlogs();
        } else {
          alert(data.error || 'Failed to delete blog post');
        }
      } catch (error) {
        console.error('Failed to delete blog post:', error);
        alert('Failed to delete blog post');
      }
    }
  };

  const handleStatusToggle = async (blog: BlogPost, newStatus: string) => {
    try {
      const formData = new FormData();
      formData.append('status', newStatus);

      const response = await fetch(`/api/blogs/${blog._id}`, {
        method: 'PUT',
        body: formData,
      });
      
      const data = await response.json();
      if (data.success) {
        fetchBlogs();
      } else {
        alert(data.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    }
  };

  const stats = {
    total: blogs.length,
    published: blogs.filter(blog => blog.status === 'Published').length,
    draft: blogs.filter(blog => blog.status === 'Draft').length
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Blogs Management</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <IoAddOutline className="text-xl" />
          Add Blog
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-lg">
              <FaNewspaper className="text-2xl text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Blogs</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 rounded-lg">
              <FaEye className="text-2xl text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-gray-900">{stats.published}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-lg">
              <FaEdit className="text-2xl text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">{stats.draft}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search blogs by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <IoSearchOutline className="text-gray-400 text-lg" />
          </div>
        </div>
      </div>

      {/* Blog Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingBlog ? 'Edit Blog Post' : 'Create New Blog Post'}
            </h2>
            <BlogForm
              onSubmit={handleSubmit}
              initialData={editingBlog}
            />
            <button
              onClick={() => {
                setShowForm(false);
                setEditingBlog(null);
              }}
              className="mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Table Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBlogs.map((blog) => (
              <tr key={blog._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{blog.title}</td>
                <td className="px-6 py-4 whitespace-nowrap">{blog.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{new Date(blog.date).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      blog.status === 'Published' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.status}
                    </span>
                    <div className="relative">
                      <select
                        value={blog.status}
                        onChange={(e) => handleStatusToggle(blog, e.target.value)}
                        className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Published">Published</option>
                        <option value="Draft">Draft</option>
                      </select>
                      <IoChevronDownOutline className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleEdit(blog)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                    >
                      <IoCreateOutline className="text-xl" />
                    </button>
                    <button 
                      onClick={() => handleDelete(blog._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <IoTrashOutline className="text-xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 