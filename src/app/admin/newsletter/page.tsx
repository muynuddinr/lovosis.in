"use client";

import { useState, useEffect } from 'react';
import { IoAddOutline, IoTrashOutline, IoMailOutline, IoRefreshOutline, IoSearchOutline, IoChevronDownOutline } from 'react-icons/io5';
import toast from 'react-hot-toast';

interface Subscriber {
  _id: string;
  email: string;
  dateJoined: string;
  status: string;
}

const initialStats = [
  { title: 'Total Subscribers', value: '0', color: 'bg-blue-500' },
  { title: 'Active', value: '0', color: 'bg-green-500' },
  { title: 'Inactive', value: '0', color: 'bg-red-500' },
  { title: 'New This Month', value: '0', color: 'bg-purple-500' },
];

const statusOptions = ['Active', 'Inactive'];

export default function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentStats, setCurrentStats] = useState(initialStats);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [subscriberToDelete, setSubscriberToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const calculateStats = (subscribers: Subscriber[]) => {
    const total = subscribers.length;
    const active = subscribers.filter(s => s.status === 'Active').length;
    const inactive = subscribers.filter(s => s.status === 'Inactive').length;
    
    // Calculate new subscribers this month
    const thisMonth = new Date().getMonth();
    const thisYear = new Date().getFullYear();
    const newThisMonth = subscribers.filter(s => {
      const date = new Date(s.dateJoined);
      return date.getMonth() === thisMonth && date.getFullYear() === thisYear;
    }).length;

    return [
      { ...initialStats[0], value: total.toString() },
      { ...initialStats[1], value: active.toString() },
      { ...initialStats[2], value: inactive.toString() },
      { ...initialStats[3], value: newThisMonth.toString() },
    ];
  };

  const fetchSubscribers = async () => {
    try {
      const response = await fetch('/api/newsletter');
      const data = await response.json();
      if (data.success) {
        setSubscribers(data.data);
        const stats = calculateStats(data.data);
        setCurrentStats(stats);
      }
    } catch (error) {
      console.error('Failed to fetch subscribers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setSubscriberToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!subscriberToDelete) return;

    try {
      const response = await fetch(`/api/newsletter/${subscriberToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        toast.success('Subscriber deleted successfully');
        fetchSubscribers();
      } else {
        toast.error('Failed to delete subscriber');
      }
    } catch (error) {
      console.error('Failed to delete subscriber:', error);
      toast.error('Failed to delete subscriber');
    } finally {
      setShowDeleteModal(false);
      setSubscriberToDelete(null);
    }
  };

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/newsletter/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchSubscribers();
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const filteredSubscribers = subscribers.filter(subscriber => {
    const matchesSearch = subscriber.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || subscriber.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Newsletter Management</h1>
        <div className="flex gap-2">
          <button 
            onClick={fetchSubscribers}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <IoRefreshOutline className="text-xl" />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Search and Filter Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Search subscribers..."
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
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Subscribers Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Joined</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{subscriber.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(subscriber.dateJoined).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-4">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        subscriber.status === 'Active' 
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {subscriber.status}
                      </span>
                      <div className="relative">
                        <select
                          value={subscriber.status}
                          onChange={(e) => updateStatus(subscriber._id, e.target.value)}
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
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDeleteClick(subscriber._id)}
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

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Delete Confirmation</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this subscriber? This action cannot be undone.</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 