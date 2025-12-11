import { useState, useEffect } from 'react';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { supabase } from '../../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  image_url: string;
  seller_id: string;
}

interface User {
  id: string;
  email: string;
  full_name: string;
  phone: string;
  role: string;
  created_at: string;
  last_sign_in_at?: string;
}

interface Inquiry {
  id: number;
  property_id: number;
  buyer_id: string;
  message: string;
  status: string;
  created_at: string;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'properties' | 'users' | 'analytics' | 'buyer-view' | 'seller-view'>('overview');
  const [properties, setProperties] = useState<Property[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  // Demo analytics data - Full year (January to December)
  const monthlyGrowthData = [
    { month: 'January', users: 145, properties: 89, revenue: 1.2, percentage: 78 },
    { month: 'February', users: 198, properties: 124, revenue: 1.6, percentage: 85 },
    { month: 'March', users: 234, properties: 156, revenue: 1.9, percentage: 92 },
    { month: 'April', users: 287, properties: 198, revenue: 2.3, percentage: 88 },
    { month: 'May', users: 312, properties: 223, revenue: 2.6, percentage: 95 },
    { month: 'June', users: 356, properties: 267, revenue: 3.1, percentage: 91 },
    { month: 'July', users: 389, properties: 298, revenue: 3.4, percentage: 94 },
    { month: 'August', users: 423, properties: 334, revenue: 3.8, percentage: 96 },
    { month: 'September', users: 467, properties: 378, revenue: 4.2, percentage: 93 },
    { month: 'October', users: 512, properties: 421, revenue: 4.7, percentage: 97 },
    { month: 'November', users: 548, properties: 456, revenue: 5.1, percentage: 95 },
    { month: 'December', users: 592, properties: 498, revenue: 5.6, percentage: 98 }
  ];

  // Top property types data
  const topPropertyTypesData = [
    { type: 'Apartment', count: 342, icon: 'ri-building-line', color: 'teal' },
    { type: 'House', count: 289, icon: 'ri-home-4-line', color: 'orange' },
    { type: 'Villa', count: 156, icon: 'ri-home-smile-line', color: 'green' },
    { type: 'Condo', count: 123, icon: 'ri-community-line', color: 'red' },
    { type: 'Townhouse', count: 98, icon: 'ri-home-3-line', color: 'yellow' }
  ];

  // Platform statistics
  const platformStats = {
    totalInquiries: 1847,
    activeListings: 892,
    approvalRate: 90 // Fixed at 90%
  };

  useEffect(() => {
    fetchData();
    checkOnlineUsers();
    
    // Check online users every 30 seconds
    const interval = setInterval(checkOnlineUsers, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const checkOnlineUsers = async () => {
    try {
      // Get current session to check if user is currently logged in
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        console.log('No active session');
        return;
      }

      // Create a set of currently online user IDs based on recent activity
      const online = new Set<string>();
      const now = new Date().getTime();
      const fiveMinutesAgo = now - (5 * 60 * 1000); // 5 minutes threshold

      // Check each user's last activity
      // For demo purposes, we'll consider users who registered recently as "active"
      // In production, you would track this with a separate "last_activity" field
      users.forEach(user => {
        const userCreatedTime = new Date(user.created_at).getTime();
        // Consider users created in the last hour as potentially active
        if (now - userCreatedTime < (60 * 60 * 1000)) {
          online.add(user.id);
        }
      });

      // Always mark the current logged-in user as online
      if (session.user) {
        online.add(session.user.id);
      }

      setOnlineUsers(online);
    } catch (error) {
      console.error('Error checking online users:', error);
    }
  };

  const isUserOnline = (userId: string): boolean => {
    return onlineUsers.has(userId);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      const [propertiesData, usersData, inquiriesData] = await Promise.all([
        supabase.from('properties').select('*').order('created_at', { ascending: false }),
        supabase.from('users').select('*').order('created_at', { ascending: false }),
        supabase.from('inquiries').select('*').order('created_at', { ascending: false })
      ]);

      if (propertiesData.error) throw propertiesData.error;
      if (usersData.error) throw usersData.error;

      setProperties(propertiesData.data || []);
      setUsers(usersData.data || []);
      setInquiries(inquiriesData.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = {
    totalUsers: users.length,
    totalBuyers: users.filter(u => u.role === 'buyer').length,
    totalSellers: users.filter(u => u.role === 'seller').length,
    totalAdmins: users.filter(u => u.role === 'admin').length,
    activeBuyers: users.filter(u => u.role === 'buyer' && isUserOnline(u.id)).length,
    activeSellers: users.filter(u => u.role === 'seller' && isUserOnline(u.id)).length,
    totalProperties: properties.length,
    verifiedProperties: properties.filter(p => p.status === 'approved').length,
    pendingProperties: properties.filter(p => p.status === 'pending').length,
    rejectedProperties: properties.filter(p => p.status === 'rejected').length,
    totalInquiries: inquiries.length,
    activeListings: properties.filter(p => p.status === 'approved').length
  };

  const pendingProperties = properties.filter(p => p.status === 'pending');
  const buyers = users.filter(u => u.role === 'buyer');
  const sellers = users.filter(u => u.role === 'seller');
  const admins = users.filter(u => u.role === 'admin');

  const handleApprove = async (propertyId: number) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status: 'approved' })
        .eq('id', propertyId);

      if (error) throw error;

      alert(`Property ${propertyId} has been approved!`);
      fetchData();
    } catch (error: any) {
      alert('Error approving property: ' + error.message);
    }
  };

  const handleReject = async (propertyId: number) => {
    try {
      const { error } = await supabase
        .from('properties')
        .update({ status: 'rejected' })
        .eq('id', propertyId);

      if (error) throw error;

      alert(`Property ${propertyId} has been rejected.`);
      fetchData();
    } catch (error: any) {
      alert('Error rejecting property: ' + error.message);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user? This action cannot be undone.')) return;

    try {
      const { error } = await supabase
        .from('users')
        .delete()
        .eq('id', userId);

      if (error) throw error;

      alert('User deleted successfully!');
      fetchData();
    } catch (error: any) {
      alert('Error deleting user: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
            <p className="text-lg text-gray-600">Manage users, properties, and system analytics</p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-6 py-4 font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === 'overview'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-dashboard-line mr-2"></i>
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('properties')}
                  className={`px-6 py-4 font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === 'properties'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-home-4-line mr-2"></i>
                  Properties
                  {pendingProperties.length > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {pendingProperties.length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('users')}
                  className={`px-6 py-4 font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === 'users'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-user-line mr-2"></i>
                  Users
                </button>
                <button
                  onClick={() => setActiveTab('buyer-view')}
                  className={`px-6 py-4 font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === 'buyer-view'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-shopping-bag-line mr-2"></i>
                  Buyer View
                </button>
                <button
                  onClick={() => setActiveTab('seller-view')}
                  className={`px-6 py-4 font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === 'seller-view'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-store-line mr-2"></i>
                  Seller View
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`px-6 py-4 font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === 'analytics'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-bar-chart-line mr-2"></i>
                  Analytics
                </button>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <i className="ri-loader-4-line text-4xl text-teal-600 animate-spin"></i>
              <p className="text-gray-600 mt-4">Loading dashboard data...</p>
            </div>
          ) : (
            <>
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div>
                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                          <i className="ri-user-line text-2xl text-teal-600"></i>
                        </div>
                        <span className="text-green-600 text-sm font-semibold">+12%</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">Total Users</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                          <i className="ri-home-4-line text-2xl text-teal-600"></i>
                        </div>
                        <span className="text-green-600 text-sm font-semibold">+8%</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">Total Properties</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.totalProperties}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center">
                          <i className="ri-time-line text-2xl text-yellow-600"></i>
                        </div>
                        <span className="text-yellow-600 text-sm font-semibold">Pending</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">Pending Approval</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.pendingProperties}</p>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                          <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
                        </div>
                        <span className="text-green-600 text-sm font-semibold">Active</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-1">Verified Properties</p>
                      <p className="text-3xl font-bold text-gray-900">{stats.verifiedProperties}</p>
                    </div>
                  </div>

                  {/* User Status Overview */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Active Buyers</h3>
                        <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                          <i className="ri-shopping-bag-line text-2xl text-teal-600"></i>
                        </div>
                      </div>
                      <p className="text-4xl font-bold text-teal-600 mb-2">{stats.activeBuyers}</p>
                      <p className="text-sm text-gray-600">Total registered buyers</p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Active Today</span>
                          <span className="font-semibold text-gray-900">{Math.floor(stats.activeBuyers * 0.3)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Active Sellers</h3>
                        <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                          <i className="ri-store-line text-2xl text-orange-600"></i>
                        </div>
                      </div>
                      <p className="text-4xl font-bold text-orange-600 mb-2">{stats.activeSellers}</p>
                      <p className="text-sm text-gray-600">Total registered sellers</p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Active Today</span>
                          <span className="font-semibold text-gray-900">{Math.floor(stats.activeSellers * 0.4)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Admin Users</h3>
                        <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                          <i className="ri-shield-user-line text-2xl text-red-600"></i>
                        </div>
                      </div>
                      <p className="text-4xl font-bold text-red-600 mb-2">{stats.totalAdmins}</p>
                      <p className="text-sm text-gray-600">Total admin accounts</p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Active Today</span>
                          <span className="font-semibold text-gray-900">{stats.totalAdmins}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">User Distribution</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-700 font-medium">Buyers</span>
                            <span className="text-gray-900 font-bold">{stats.totalBuyers}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-teal-600 h-3 rounded-full" 
                              style={{ width: `${stats.totalUsers > 0 ? (stats.totalBuyers / stats.totalUsers) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-700 font-medium">Sellers</span>
                            <span className="text-gray-900 font-bold">{stats.totalSellers}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-teal-600 h-3 rounded-full" 
                              style={{ width: `${stats.totalUsers > 0 ? (stats.totalSellers / stats.totalUsers) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-lg p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Property Status</h3>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-700 font-medium">Verified</span>
                            <span className="text-green-600 font-bold">{stats.verifiedProperties}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-green-600 h-3 rounded-full" 
                              style={{ width: `${stats.totalProperties > 0 ? (stats.verifiedProperties / stats.totalProperties) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-700 font-medium">Pending</span>
                            <span className="text-yellow-600 font-bold">{stats.pendingProperties}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-yellow-600 h-3 rounded-full" 
                              style={{ width: `${stats.totalProperties > 0 ? (stats.pendingProperties / stats.totalProperties) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="flex justify-between mb-2">
                            <span className="text-gray-700 font-medium">Rejected</span>
                            <span className="text-red-600 font-bold">{stats.rejectedProperties}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-red-600 h-3 rounded-full" 
                              style={{ width: `${stats.totalProperties > 0 ? (stats.rejectedProperties / stats.totalProperties) * 100 : 0}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                      {users.slice(0, 3).map((user, index) => (
                        <div key={user.id} className="flex items-center justify-between py-3 border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                              <i className="ri-user-add-line text-green-600"></i>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">New user registered</p>
                              <p className="text-sm text-gray-600">{user.full_name} joined as {user.role}</p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60))} hours ago
                          </span>
                        </div>
                      ))}
                      {pendingProperties.slice(0, 2).map((property) => (
                        <div key={property.id} className="flex items-center justify-between py-3 border-b border-gray-200">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                              <i className="ri-home-4-line text-yellow-600"></i>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Property submitted for review</p>
                              <p className="text-sm text-gray-600">{property.title}</p>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {Math.floor((Date.now() - new Date(property.created_at).getTime()) / (1000 * 60 * 60))} hours ago
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Properties Tab */}
              {activeTab === 'properties' && (
                <div>
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Pending Approval</h3>
                    {pendingProperties.length === 0 ? (
                      <div className="text-center py-12">
                        <i className="ri-checkbox-circle-line text-6xl text-green-300 mb-4"></i>
                        <p className="text-gray-600 text-lg">No pending properties. All caught up!</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {pendingProperties.map((property) => (
                          <div key={property.id} className="flex flex-col md:flex-row bg-gray-50 rounded-lg overflow-hidden">
                            <div className="relative w-full md:w-80 h-56">
                              <img
                                src={property.image_url}
                                alt={property.title}
                                className="w-full h-full object-cover object-top"
                              />
                            </div>
                            <div className="flex-1 p-6">
                              <div className="flex justify-between items-start mb-3">
                                <div>
                                  <h4 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h4>
                                  <p className="text-gray-600 flex items-center text-sm mb-2">
                                    <i className="ri-map-pin-line mr-2"></i>
                                    {property.location}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <div className="text-2xl font-bold text-teal-600 mb-2">
                                    ${property.price.toLocaleString()}
                                  </div>
                                  <span className="text-sm text-gray-500">
                                    Submitted: {new Date(property.created_at).toLocaleDateString()}
                                  </span>
                                </div>
                              </div>
                              
                              <div className="flex gap-3 mt-4">
                                <button
                                  onClick={() => handleApprove(property.id)}
                                  className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap"
                                >
                                  <i className="ri-checkbox-circle-line mr-2"></i>
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(property.id)}
                                  className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap"
                                >
                                  <i className="ri-close-circle-line mr-2"></i>
                                  Reject
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Users Tab */}
              {activeTab === 'users' && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">User Management</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Role</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Join Date</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => {
                            const isOnline = isUserOnline(user.id);
                            return (
                              <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-4 px-4">
                                  <div className="flex items-center">
                                    <div className="relative">
                                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                                        <i className="ri-user-line text-teal-600"></i>
                                      </div>
                                      {isOnline && (
                                        <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                      )}
                                    </div>
                                    <div>
                                      <p className="font-semibold text-gray-900">{user.full_name}</p>
                                    </div>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-gray-700">{user.email}</td>
                                <td className="py-4 px-4">
                                  <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                                    user.role === 'buyer' ? 'bg-teal-100 text-teal-700' : 
                                    user.role === 'seller' ? 'bg-orange-100 text-orange-700' :
                                    'bg-red-100 text-red-700'
                                  }`}>
                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                  </span>
                                </td>
                                <td className="py-4 px-4">
                                  <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2 w-fit ${
                                    isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                                    {isOnline ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-gray-700">{new Date(user.created_at).toLocaleDateString()}</td>
                                <td className="py-4 px-4">
                                  <div className="flex gap-2">
                                    <button className="w-8 h-8 flex items-center justify-center text-teal-600 hover:bg-teal-50 rounded cursor-pointer transition-all duration-300 hover:scale-125">
                                      <i className="ri-eye-line"></i>
                                    </button>
                                    <button 
                                      onClick={() => handleDeleteUser(user.id)}
                                      className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded cursor-pointer transition-all duration-300 hover:scale-125"
                                    >
                                      <i className="ri-delete-bin-line"></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Buyer View Tab */}
              {activeTab === 'buyer-view' && (
                <div>
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">Buyer Dashboard View</h3>
                      <button
                        onClick={() => navigate('/buyer-dashboard')}
                        className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-external-link-line mr-2"></i>
                        Open Full Dashboard
                      </button>
                    </div>
                    
                    {/* Buyer Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-teal-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                            <i className="ri-shopping-bag-line text-2xl text-teal-600"></i>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">Total Buyers</p>
                        <p className="text-3xl font-bold text-gray-900">{buyers.length}</p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i className="ri-message-3-line text-2xl text-green-600"></i>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">Total Inquiries</p>
                        <p className="text-3xl font-bold text-gray-900">{inquiries.length}</p>
                      </div>
                      
                      <div className="bg-orange-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <i className="ri-heart-line text-2xl text-orange-600"></i>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">Active Buyers Now</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.activeBuyers}</p>
                      </div>
                    </div>

                    {/* Buyer List */}
                    <h4 className="text-xl font-bold text-gray-900 mb-4">All Registered Buyers</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Buyer Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Inquiries</th>
                          </tr>
                        </thead>
                        <tbody>
                          {buyers.map((buyer) => {
                            const buyerInquiries = inquiries.filter(i => i.buyer_id === buyer.id).length;
                            const isOnline = isUserOnline(buyer.id);
                            return (
                              <tr key={buyer.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-4 px-4">
                                  <div className="flex items-center">
                                    <div className="relative">
                                      <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center mr-3">
                                        <i className="ri-user-line text-teal-600"></i>
                                      </div>
                                      {isOnline && (
                                        <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                      )}
                                    </div>
                                    <p className="font-semibold text-gray-900">{buyer.full_name}</p>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-gray-700">{buyer.email}</td>
                                <td className="py-4 px-4 text-gray-700">{buyer.phone}</td>
                                <td className="py-4 px-4">
                                  <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2 w-fit ${
                                    isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                                    {isOnline ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-gray-700">{new Date(buyer.created_at).toLocaleDateString()}</td>
                                <td className="py-4 px-4">
                                  <span className="px-3 py-1 rounded-full text-sm font-semibold bg-teal-100 text-teal-700">
                                    {buyerInquiries}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Seller View Tab */}
              {activeTab === 'seller-view' && (
                <div>
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-gray-900">Seller Dashboard View</h3>
                      <button
                        onClick={() => navigate('/seller-dashboard')}
                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 cursor-pointer whitespace-nowrap"
                      >
                        <i className="ri-external-link-line mr-2"></i>
                        Open Full Dashboard
                      </button>
                    </div>
                    
                    {/* Seller Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      <div className="bg-orange-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                            <i className="ri-store-line text-2xl text-orange-600"></i>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">Total Sellers</p>
                        <p className="text-3xl font-bold text-gray-900">{sellers.length}</p>
                      </div>
                      
                      <div className="bg-green-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <i className="ri-home-4-line text-2xl text-green-600"></i>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">Total Listings</p>
                        <p className="text-3xl font-bold text-gray-900">{properties.length}</p>
                      </div>
                      
                      <div className="bg-teal-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                            <i className="ri-line-chart-line text-2xl text-teal-600"></i>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-1">Active Sellers Now</p>
                        <p className="text-3xl font-bold text-gray-900">{stats.activeSellers}</p>
                      </div>
                    </div>

                    {/* Seller List */}
                    <h4 className="text-xl font-bold text-gray-900 mb-4">All Registered Sellers</h4>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Seller Name</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Email</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Phone</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Joined</th>
                            <th className="text-left py-3 px-4 font-semibold text-gray-700">Properties</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sellers.map((seller) => {
                            const sellerProperties = properties.filter(p => p.seller_id === seller.id);
                            const isOnline = isUserOnline(seller.id);
                            return (
                              <tr key={seller.id} className="border-b border-gray-100 hover:bg-gray-50">
                                <td className="py-4 px-4">
                                  <div className="flex items-center">
                                    <div className="relative">
                                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                                        <i className="ri-user-line text-orange-600"></i>
                                      </div>
                                      {isOnline && (
                                        <div className="absolute bottom-0 right-2 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                      )}
                                    </div>
                                    <p className="font-semibold text-gray-900">{seller.full_name}</p>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-gray-700">{seller.email}</td>
                                <td className="py-4 px-4 text-gray-700">{seller.phone}</td>
                                <td className="py-4 px-4">
                                  <span className={`px-3 py-1 rounded-full text-sm font-semibold whitespace-nowrap flex items-center gap-2 w-fit ${
                                    isOnline ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                  }`}>
                                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`}></div>
                                    {isOnline ? 'Active' : 'Inactive'}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-gray-700">{new Date(seller.created_at).toLocaleDateString()}</td>
                                <td className="py-4 px-4">
                                  <div className="flex gap-2">
                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                                      {sellerProperties.filter(p => p.status === 'approved').length} Active
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-yellow-100 text-yellow-700">
                                      {sellerProperties.filter(p => p.status === 'pending').length} Pending
                                    </span>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div>
                  {/* Monthly Growth Section */}
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Monthly Growth Trends (Full Year)</h3>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {monthlyGrowthData.map((data, index) => (
                        <div key={data.month} className="bg-gray-50 rounded-lg p-6">
                          <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center">
                              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mr-4">
                                <span className="font-bold text-teal-600">{index + 1}</span>
                              </div>
                              <div>
                                <p className="font-bold text-gray-900 text-lg">{data.month}</p>
                                <p className="text-sm text-gray-600">
                                  {data.users} Users • {data.properties} Properties
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-green-600 font-bold text-xl">+{data.percentage}%</span>
                              <p className="text-sm text-gray-600">${data.revenue}M Revenue</p>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div 
                              className="bg-gradient-to-r from-teal-500 to-teal-600 h-4 rounded-full transition-all duration-500"
                              style={{ width: `${data.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top Property Types Section */}
                  <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Top Property Types</h3>
                    <div className="space-y-4">
                      {topPropertyTypesData.map((property, index) => (
                        <div key={property.type} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
                          <div className="flex items-center">
                            <div className={`w-12 h-12 bg-${property.color}-100 rounded-full flex items-center justify-center mr-4`}>
                              <i className={`${property.icon} text-2xl text-${property.color}-600`}></i>
                            </div>
                            <div>
                              <p className="font-bold text-gray-900 text-lg">{property.type}</p>
                              <p className="text-sm text-gray-600">Rank #{index + 1}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-teal-600">{property.count}</p>
                            <p className="text-sm text-gray-600">listings</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Platform Statistics Section */}
                  <div className="bg-white rounded-xl shadow-lg p-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Platform Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-8 bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl">
                        <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="ri-message-3-line text-3xl text-white"></i>
                        </div>
                        <div className="text-5xl font-bold text-teal-600 mb-2">{platformStats.totalInquiries.toLocaleString()}</div>
                        <p className="text-gray-700 font-semibold">Total Inquiries</p>
                        <p className="text-sm text-gray-600 mt-2">All-time inquiries received</p>
                      </div>
                      
                      <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl">
                        <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="ri-home-4-line text-3xl text-white"></i>
                        </div>
                        <div className="text-5xl font-bold text-orange-600 mb-2">{platformStats.activeListings.toLocaleString()}</div>
                        <p className="text-gray-700 font-semibold">Active Listings</p>
                        <p className="text-sm text-gray-600 mt-2">Currently available properties</p>
                      </div>
                      
                      <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                        <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          <i className="ri-checkbox-circle-line text-3xl text-white"></i>
                        </div>
                        <div className="text-5xl font-bold text-green-600 mb-2">{platformStats.approvalRate}%</div>
                        <p className="text-gray-700 font-semibold">Approval Rate</p>
                        <p className="text-sm text-gray-600 mt-2">Property approval success rate</p>
                      </div>
                    </div>

                    {/* Additional Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Performance Metrics</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Average Response Time</span>
                            <span className="font-bold text-teal-600">2.4 hours</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Customer Satisfaction</span>
                            <span className="font-bold text-teal-600">4.8/5.0</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Conversion Rate</span>
                            <span className="font-bold text-teal-600">23.5%</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 rounded-xl p-6">
                        <h4 className="text-lg font-bold text-gray-900 mb-4">Revenue Insights</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Total Revenue</span>
                            <span className="font-bold text-green-600">$2.4M</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Monthly Growth</span>
                            <span className="font-bold text-green-600">+18.5%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-gray-700">Average Deal Size</span>
                            <span className="font-bold text-green-600">$285K</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
