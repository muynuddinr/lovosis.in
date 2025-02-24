"use client";

import { useState, useEffect } from 'react';
import { IoTrashOutline, IoMailOutline, IoCheckmarkCircleOutline, IoFilterOutline, IoSearchOutline, IoRefreshOutline, IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import React from 'react';

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

const stats = [
  { title: 'Total Messages', value: '0', color: 'bg-blue-500' },
  { title: 'Unread', value: '0', color: 'bg-red-500' },
  { title: 'Read', value: '0', color: 'bg-green-500' },
  { title: 'Pending', value: '0', color: 'bg-yellow-500' },
];

export default function AdminContact() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [currentStats, setCurrentStats] = useState(stats);

  const statusOptions = ['Unread', 'Read', 'Pending', 'Resolved'];

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/contact');
      const data = await response.json();
      if (data.success) {
        setMessages(data.data);
        const currentStats = calculateStats(data.data);
        setCurrentStats(currentStats);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (messages: Message[]) => {
    const total = messages.length;
    const unread = messages.filter(m => m.status === 'Unread').length;
    const read = messages.filter(m => m.status === 'Read').length;
    const pending = messages.filter(m => m.status === 'Pending').length;

    return [
      { ...stats[0], value: total.toString() },
      { ...stats[1], value: unread.toString() },
      { ...stats[2], value: read.toString() },
      { ...stats[3], value: pending.toString() },
    ];
  };

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'Read' }),
      });
      if (response.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Failed to update message:', error);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        fetchMessages();
      }
    } catch (error) {
      console.error('Failed to update message:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        const response = await fetch(`/api/contact/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          fetchMessages();
        }
      } catch (error) {
        console.error('Failed to delete message:', error);
      }
    }
  };

  const toggleRowExpansion = (id: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(id)) {
      newExpandedRows.delete(id);
    } else {
      newExpandedRows.add(id);
    }
    setExpandedRows(newExpandedRows);
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = 
      message.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.message.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contact Messages</h1>
        <button 
          onClick={fetchMessages}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          <IoRefreshOutline className="text-xl" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {currentStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-200"
          >
            <div className="flex items-center">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <IoMailOutline className="w-6 h-6 text-white" />
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="Unread">Unread</option>
              <option value="Read">Read</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="w-12 px-6 py-3"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredMessages.map((message) => (
                <React.Fragment key={message._id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleRowExpansion(message._id)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        {expandedRows.has(message._id) ? 
                          <IoChevronUpOutline className="w-5 h-5" /> : 
                          <IoChevronDownOutline className="w-5 h-5" />
                        }
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900">Name: {message.name}</span>
                        <span className="text-gray-600">Email: {message.email}</span>
                        <span className="text-gray-600">Phone: {message.phone}</span>
                        <span className="font-medium text-gray-800">Subject: {message.subject}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Date(message.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-4">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          message.status === 'Unread' 
                            ? 'bg-red-100 text-red-800'
                            : message.status === 'Read'
                            ? 'bg-green-100 text-green-800'
                            : message.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {message.status}
                        </span>
                        <div className="relative">
                          <select
                            value={message.status}
                            onChange={(e) => updateStatus(message._id, e.target.value)}
                            className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-1 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {statusOptions.map((status) => (
                              <option key={status} value={status}>
                                {status}
                              </option>
                            ))}
                          </select>
                          <IoChevronDownOutline className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button 
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          onClick={() => setSelectedMessage(message)}
                        >
                          <IoMailOutline className="text-xl" />
                        </button>
                        <button 
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={() => deleteMessage(message._id)}
                        >
                          <IoTrashOutline className="text-xl" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedRows.has(message._id) && (
                    <tr className="bg-gray-50">
                      <td className="px-6 py-4"></td>
                      <td colSpan={4} className="px-6 py-4">
                        <div className="bg-white p-4 rounded-lg shadow-inner">
                          <h4 className="font-medium text-gray-900 mb-2">Message:</h4>
                          <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && selectedMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6">
            <h2 className="text-xl font-bold mb-4">{selectedMessage.subject}</h2>
            <div className="mb-4">
              <p className="text-sm text-gray-500">From: {selectedMessage.name} ({selectedMessage.email})</p>
              <p className="text-sm text-gray-500">Date: {new Date(selectedMessage.createdAt).toLocaleString()}</p>
            </div>
            <p className="text-gray-700 whitespace-pre-wrap mb-6">{selectedMessage.message}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 