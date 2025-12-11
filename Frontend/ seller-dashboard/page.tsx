import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  type: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  features: string[];
  status: 'pending' | 'approved' | 'rejected';
  views: number;
  inquiries: number;
  created_at: string;
  image_url: string;
  seller_id: string;
}

export default function SellerDashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'listings' | 'messages' | 'add'>('listings');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [listings, setListings] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [newProperty, setNewProperty] = useState({
    title: '',
    location: '',
    price: '',
    type: '',
    bedrooms: '',
    bathrooms: '',
    area: '',
    description: '',
    features: ''
  });

  const messages = [
    {
      id: 1,
      propertyTitle: 'Modern Luxury Villa',
      buyer: 'Emily Johnson',
      message: 'I am interested in scheduling a viewing. Are you available this weekend?',
      date: '2025-01-22',
      unread: true
    },
    {
      id: 2,
      propertyTitle: 'Modern Luxury Villa',
      buyer: 'Robert Williams',
      message: 'What is the HOA fee for this property?',
      date: '2025-01-21',
      unread: false
    },
    {
      id: 3,
      propertyTitle: 'Garden Estate',
      buyer: 'Lisa Martinez',
      message: 'Is the property pet-friendly?',
      date: '2025-01-23',
      unread: true
    },
    {
      id: 4,
      propertyTitle: 'Modern Luxury Villa',
      buyer: 'David Chen',
      message: 'Can you provide more photos of the backyard?',
      date: '2025-01-20',
      unread: false
    }
  ];

  useEffect(() => {
    if (user) {
      fetchListings();
    }
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut();
      window.REACT_APP_NAVIGATE('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const fetchListings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .eq('seller_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setListings(data || []);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProperty = async () => {
    if (!newProperty.title || !newProperty.location || !newProperty.price) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      setSubmitting(true);
      const featuresArray = newProperty.features
        .split(',')
        .map(f => f.trim())
        .filter(f => f);

      const { error } = await supabase
        .from('properties')
        .insert({
          title: newProperty.title,
          location: newProperty.location,
          price: parseInt(newProperty.price),
          type: newProperty.type,
          bedrooms: parseInt(newProperty.bedrooms),
          bathrooms: parseInt(newProperty.bathrooms),
          area: parseInt(newProperty.area),
          description: newProperty.description,
          features: featuresArray,
          status: 'pending',
          seller_id: user?.id,
          image_url: `https://readdy.ai/api/search-image?query=modern%20$%7BnewProperty.type%7D%20real%20estate%20property%20professional%20photography%20clean%20simple%20background&width=600&height=400&seq=prop${Date.now()}&orientation=landscape`
        });

      if (error) throw error;

      alert('Property submitted for admin approval!');
      setNewProperty({
        title: '',
        location: '',
        price: '',
        type: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        description: '',
        features: ''
      });
      setActiveTab('listings');
      fetchListings();
    } catch (error: any) {
      alert('Error adding property: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProperty = async (id: number) => {
    if (!confirm('Are you sure you want to delete this property?')) return;

    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;

      alert('Property deleted successfully!');
      fetchListings();
    } catch (error: any) {
      alert('Error deleting property: ' + error.message);
    }
  };

  const handleEditProperty = (property: Property) => {
    setNewProperty({
      title: property.title,
      location: property.location,
      price: property.price.toString(),
      type: property.type,
      bedrooms: property.bedrooms.toString(),
      bathrooms: property.bathrooms.toString(),
      area: property.area.toString(),
      description: property.description || '',
      features: property.features?.join(', ') || ''
    });
    setEditingId(property.id);
    setActiveTab('add');
  };

  const handleUpdateProperty = async () => {
    if (!newProperty.title || !newProperty.location || !newProperty.price) {
      alert('Please fill in all required fields!');
      return;
    }

    try {
      setSubmitting(true);
      const featuresArray = newProperty.features
        .split(',')
        .map(f => f.trim())
        .filter(f => f);

      const { error } = await supabase
        .from('properties')
        .update({
          title: newProperty.title,
          location: newProperty.location,
          price: parseInt(newProperty.price),
          type: newProperty.type,
          bedrooms: parseInt(newProperty.bedrooms),
          bathrooms: parseInt(newProperty.bathrooms),
          area: parseInt(newProperty.area),
          description: newProperty.description,
          features: featuresArray,
          status: 'pending'
        })
        .eq('id', editingId);

      if (error) throw error;

      alert('Property updated successfully! Waiting for admin approval.');
      setNewProperty({
        title: '',
        location: '',
        price: '',
        type: '',
        bedrooms: '',
        bathrooms: '',
        area: '',
        description: '',
        features: ''
      });
      setEditingId(null);
      setActiveTab('listings');
      fetchListings();
    } catch (error: any) {
      alert('Error updating property: ' + error.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Seller Dashboard</h1>
              <p className="text-lg text-gray-600">Manage your property listings and buyer inquiries</p>
            </div>
            <button
              onClick={handleSignOut}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-logout-box-line mr-2"></i>
              Sign Out
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Listings</p>
                  <p className="text-3xl font-bold text-gray-900">{listings.length}</p>
                </div>
                <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                  <i className="ri-home-4-line text-2xl text-teal-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Approved</p>
                  <p className="text-3xl font-bold text-green-600">
                    {listings.filter(l => l.status === 'approved').length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                  <i className="ri-checkbox-circle-line text-2xl text-green-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Views</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {listings.reduce((sum, l) => sum + (l.views || 0), 0)}
                  </p>
                </div>
                <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                  <i className="ri-eye-line text-2xl text-teal-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Inquiries</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {messages.filter(m => m.unread).length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                  <i className="ri-message-3-line text-2xl text-teal-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex">
                <button
                  onClick={() => {
                    setActiveTab('listings');
                    setEditingId(null);
                    setNewProperty({
                      title: '',
                      location: '',
                      price: '',
                      type: '',
                      bedrooms: '',
                      bathrooms: '',
                      area: '',
                      description: '',
                      features: ''
                    });
                  }}
                  className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === 'listings'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-home-4-line mr-2"></i>
                  My Listings
                </button>
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === 'messages'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-message-3-line mr-2"></i>
                  Messages
                  {messages.filter(m => m.unread).length > 0 && (
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {messages.filter(m => m.unread).length}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => {
                    setActiveTab('add');
                    setEditingId(null);
                    setNewProperty({
                      title: '',
                      location: '',
                      price: '',
                      type: '',
                      bedrooms: '',
                      bathrooms: '',
                      area: '',
                      description: '',
                      features: ''
                    });
                  }}
                  className={`flex-1 px-6 py-4 font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === 'add'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-add-circle-line mr-2"></i>
                  Add Property
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Listings Tab */}
              {activeTab === 'listings' && (
                <div className="space-y-6">
                  {loading ? (
                    <div className="text-center py-12">
                      <i className="ri-loader-4-line text-4xl text-teal-600 animate-spin"></i>
                      <p className="text-gray-600 mt-4">Loading your listings...</p>
                    </div>
                  ) : listings.length === 0 ? (
                    <div className="text-center py-12">
                      <i className="ri-home-4-line text-6xl text-gray-300 mb-4"></i>
                      <p className="text-gray-600 text-lg">No listings yet. Add your first property!</p>
                    </div>
                  ) : (
                    listings.map((listing) => (
                      <div key={listing.id} className="flex flex-col md:flex-row bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative w-full md:w-80 h-56">
                          <img
                            src={listing.image_url}
                            alt={listing.title}
                            className="w-full h-full object-cover object-top"
                          />
                          <span className={`absolute top-4 right-4 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                            listing.status === 'approved' ? 'bg-green-500 text-white' :
                            listing.status === 'pending' ? 'bg-yellow-500 text-white' :
                            'bg-red-500 text-white'
                          }`}>
                            {listing.status.charAt(0).toUpperCase() + listing.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex justify-between items-start mb-3">
                            <div>
                              <h3 className="text-2xl font-bold text-gray-900 mb-2">{listing.title}</h3>
                              <p className="text-gray-600 flex items-center text-sm">
                                <i className="ri-map-pin-line mr-2"></i>
                                {listing.location}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-teal-600">
                                ${listing.price.toLocaleString()}
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                            <span className="flex items-center">
                              <i className="ri-hotel-bed-line mr-1"></i>
                              {listing.bedrooms} Beds
                            </span>
                            <span className="flex items-center">
                              <i className="ri-drop-line mr-1"></i>
                              {listing.bathrooms} Baths
                            </span>
                            <span className="flex items-center">
                              <i className="ri-ruler-line mr-1"></i>
                              {listing.area} sqft
                            </span>
                          </div>
                          
                          <div className="flex items-center gap-6 mb-4 text-sm">
                            <span className="flex items-center text-gray-600">
                              <i className="ri-eye-line mr-2"></i>
                              {listing.views || 0} views
                            </span>
                            <span className="flex items-center text-gray-600">
                              <i className="ri-message-3-line mr-2"></i>
                              {listing.inquiries || 0} inquiries
                            </span>
                            <span className="flex items-center text-gray-600">
                              <i className="ri-calendar-line mr-2"></i>
                              Listed: {new Date(listing.created_at).toLocaleDateString()}
                            </span>
                          </div>
                          
                          <div className="flex gap-3">
                            <button 
                              onClick={() => handleEditProperty(listing)}
                              className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-edit-line mr-2"></i>
                              Edit
                            </button>
                            <button 
                              onClick={() => handleDeleteProperty(listing.id)}
                              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap"
                            >
                              <i className="ri-delete-bin-line mr-2"></i>
                              Delete
                            </button>
                            <Link
                              to={`/property/${listing.id}`}
                              className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer whitespace-nowrap flex items-center"
                            >
                              <i className="ri-eye-line mr-2"></i>
                              View
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* Messages Tab */}
              {activeTab === 'messages' && (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`bg-gray-50 rounded-lg p-6 ${msg.unread ? 'border-l-4 border-teal-600' : ''}`}>
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{msg.buyer}</h3>
                          <p className="text-sm text-gray-600">Re: {msg.propertyTitle}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">{msg.date}</p>
                          {msg.unread && (
                            <span className="inline-block mt-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
                              New
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{msg.message}</p>
                      <button className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap">
                        <i className="ri-reply-line mr-2"></i>
                        Reply
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add/Edit Property Tab */}
              {activeTab === 'add' && (
                <div className="max-w-3xl mx-auto">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {editingId ? 'Edit Property' : 'Add New Property'}
                  </h2>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Property Title *</label>
                        <input
                          type="text"
                          value={newProperty.title}
                          onChange={(e) => setNewProperty({...newProperty, title: e.target.value})}
                          placeholder="Modern Luxury Villa"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                          disabled={submitting}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                        <input
                          type="text"
                          value={newProperty.location}
                          onChange={(e) => setNewProperty({...newProperty, location: e.target.value})}
                          placeholder="Beverly Hills, CA"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                          disabled={submitting}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price *</label>
                        <input
                          type="number"
                          value={newProperty.price}
                          onChange={(e) => setNewProperty({...newProperty, price: e.target.value})}
                          placeholder="2850000"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                          disabled={submitting}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Property Type *</label>
                        <select
                          value={newProperty.type}
                          onChange={(e) => setNewProperty({...newProperty, type: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                          disabled={submitting}
                        >
                          <option value="">Select Type</option>
                          <option value="House">House</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Villa">Villa</option>
                          <option value="Loft">Loft</option>
                          <option value="Cabin">Cabin</option>
                          <option value="Townhouse">Townhouse</option>
                          <option value="Cottage">Cottage</option>
                          <option value="Condo">Condo</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms *</label>
                        <input
                          type="number"
                          value={newProperty.bedrooms}
                          onChange={(e) => setNewProperty({...newProperty, bedrooms: e.target.value})}
                          placeholder="5"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                          disabled={submitting}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Bathrooms *</label>
                        <input
                          type="number"
                          value={newProperty.bathrooms}
                          onChange={(e) => setNewProperty({...newProperty, bathrooms: e.target.value})}
                          placeholder="4"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                          disabled={submitting}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Area (sqft) *</label>
                        <input
                          type="number"
                          value={newProperty.area}
                          onChange={(e) => setNewProperty({...newProperty, area: e.target.value})}
                          placeholder="4500"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                          disabled={submitting}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                      <textarea
                        value={newProperty.description}
                        onChange={(e) => setNewProperty({...newProperty, description: e.target.value})}
                        placeholder="Describe your property..."
                        rows={5}
                        maxLength={500}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                        disabled={submitting}
                      />
                      <p className="text-xs text-gray-500 mt-1">{newProperty.description.length}/500 characters</p>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Features (comma separated)</label>
                      <input
                        type="text"
                        value={newProperty.features}
                        onChange={(e) => setNewProperty({...newProperty, features: e.target.value})}
                        placeholder="Smart Home, Pool, Garage, Garden"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                        disabled={submitting}
                      />
                    </div>
                    
                    <button
                      onClick={editingId ? handleUpdateProperty : handleAddProperty}
                      disabled={submitting}
                      className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {submitting ? (
                        <>
                          <i className="ri-loader-4-line mr-2 animate-spin"></i>
                          {editingId ? 'Updating...' : 'Submitting...'}
                        </>
                      ) : (
                        <>
                          <i className={`${editingId ? 'ri-save-line' : 'ri-add-circle-line'} mr-2`}></i>
                          {editingId ? 'Update Property' : 'Submit for Approval'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
