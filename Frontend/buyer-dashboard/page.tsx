import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { useAuth } from '../../contexts/AuthContext';
import PropertySearch from './components/PropertySearch';

export default function BuyerDashboard() {
  const { user, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<'search' | 'saved' | 'inquiries' | 'profile'>('search');

  const savedProperties = [
    {
      id: 1,
      title: 'Modern Luxury Villa',
      location: 'Beverly Hills, CA',
      price: 2850000,
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      image: 'https://readdy.ai/api/search-image?query=modern%20luxury%20villa%20with%20clean%20white%20architecture%2C%20minimalist%20design%2C%20large%20windows%2C%20beautiful%20landscaped%20garden%2C%20bright%20daylight%2C%20professional%20real%20estate%20photography%2C%20simple%20elegant%20background&width=600&height=400&seq=buyer1&orientation=landscape',
      savedDate: '2025-01-15'
    },
    {
      id: 2,
      title: 'Downtown Penthouse',
      location: 'Manhattan, NY',
      price: 3200000,
      bedrooms: 3,
      bathrooms: 3,
      area: 2800,
      image: 'https://readdy.ai/api/search-image?query=luxurious%20penthouse%20apartment%20interior%20with%20floor%20to%20ceiling%20windows%2C%20modern%20furniture%2C%20city%20skyline%20view%2C%20elegant%20design%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=600&height=400&seq=buyer2&orientation=landscape',
      savedDate: '2025-01-18'
    },
    {
      id: 3,
      title: 'Beachfront Paradise',
      location: 'Malibu, CA',
      price: 4500000,
      bedrooms: 4,
      bathrooms: 4,
      area: 3800,
      image: 'https://readdy.ai/api/search-image?query=stunning%20beachfront%20house%20with%20ocean%20view%2C%20modern%20coastal%20architecture%2C%20large%20deck%2C%20palm%20trees%2C%20sunset%20lighting%2C%20professional%20real%20estate%20photography%2C%20simple%20clean%20background&width=600&height=400&seq=buyer3&orientation=landscape',
      savedDate: '2025-01-20'
    }
  ];

  const inquiries = [
    {
      id: 1,
      propertyTitle: 'Modern Luxury Villa',
      seller: 'John Anderson',
      message: 'I am interested in scheduling a viewing. Are you available this weekend?',
      response: 'Yes, I can arrange a viewing on Saturday at 2 PM. Looking forward to meeting you!',
      date: '2025-01-22',
      status: 'Responded'
    },
    {
      id: 2,
      propertyTitle: 'Downtown Penthouse',
      seller: 'Sarah Mitchell',
      message: 'Could you provide more details about the building amenities?',
      response: null,
      date: '2025-01-23',
      status: 'Pending'
    },
    {
      id: 3,
      propertyTitle: 'Beachfront Paradise',
      seller: 'Michael Chen',
      message: 'Is the property negotiable on price?',
      response: 'There is some flexibility. Let\'s discuss your offer.',
      date: '2025-01-21',
      status: 'Responded'
    }
  ];

  const [profile, setProfile] = useState({
    name: user?.full_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: '',
    budget: '2000000-4000000',
    propertyType: 'Villa, House'
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      window.REACT_APP_NAVIGATE('/login');
    } catch (error) {
      console.error('Error signing out:', error);
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
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">Buyer Dashboard</h1>
              <p className="text-lg text-gray-600">Welcome back, {user?.full_name || 'Buyer'}!</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Saved Properties</p>
                  <p className="text-3xl font-bold text-gray-900">{savedProperties.length}</p>
                </div>
                <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                  <i className="ri-heart-line text-2xl text-teal-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Active Inquiries</p>
                  <p className="text-3xl font-bold text-gray-900">{inquiries.length}</p>
                </div>
                <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                  <i className="ri-message-3-line text-2xl text-teal-600"></i>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Responses</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {inquiries.filter(i => i.status === 'Responded').length}
                  </p>
                </div>
                <div className="w-14 h-14 bg-teal-100 rounded-full flex items-center justify-center">
                  <i className="ri-chat-check-line text-2xl text-teal-600"></i>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="border-b border-gray-200">
              <div className="flex overflow-x-auto">
                <button
                  onClick={() => setActiveTab('search')}
                  className={`px-6 py-4 font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === 'search'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-search-line mr-2"></i>
                  Search Properties
                </button>
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`px-6 py-4 font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === 'saved'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-heart-line mr-2"></i>
                  Saved Properties
                </button>
                <button
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-6 py-4 font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === 'inquiries'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-message-3-line mr-2"></i>
                  Inquiries
                </button>
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`px-6 py-4 font-semibold transition-all duration-300 cursor-pointer whitespace-nowrap ${
                    activeTab === 'profile'
                      ? 'text-teal-600 border-b-2 border-teal-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <i className="ri-user-line mr-2"></i>
                  Profile
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Search Properties Tab */}
              {activeTab === 'search' && <PropertySearch />}

              {/* Saved Properties Tab */}
              {activeTab === 'saved' && (
                <div className="space-y-6">
                  {savedProperties.map((property) => (
                    <div key={property.id} className="flex flex-col md:flex-row bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative w-full md:w-80 h-56">
                        <img
                          src={property.image}
                          alt={property.title}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h3>
                            <p className="text-gray-600 flex items-center text-sm">
                              <i className="ri-map-pin-line mr-2"></i>
                              {property.location}
                            </p>
                          </div>
                          <button className="text-red-500 hover:text-red-600 transition-all duration-300 hover:scale-125 cursor-pointer">
                            <i className="ri-heart-fill text-2xl"></i>
                          </button>
                        </div>
                        
                        <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                          <span className="flex items-center">
                            <i className="ri-hotel-bed-line mr-1"></i>
                            {property.bedrooms} Beds
                          </span>
                          <span className="flex items-center">
                            <i className="ri-drop-line mr-1"></i>
                            {property.bathrooms} Baths
                          </span>
                          <span className="flex items-center">
                            <i className="ri-ruler-line mr-1"></i>
                            {property.area} sqft
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="text-3xl font-bold text-teal-600">
                            ${property.price.toLocaleString()}
                          </div>
                          <Link
                            to={`/property/${property.id}`}
                            className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Inquiries Tab */}
              {activeTab === 'inquiries' && (
                <div className="space-y-6">
                  {inquiries.map((inquiry) => (
                    <div key={inquiry.id} className="bg-gray-50 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-1">{inquiry.propertyTitle}</h3>
                          <p className="text-sm text-gray-600">To: {inquiry.seller}</p>
                        </div>
                        <span className={`px-4 py-1 rounded-full text-sm font-semibold whitespace-nowrap ${
                          inquiry.status === 'Responded'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {inquiry.status}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="bg-white rounded-lg p-4 border-l-4 border-teal-600">
                          <p className="text-sm text-gray-600 mb-1">Your Message:</p>
                          <p className="text-gray-900">{inquiry.message}</p>
                          <p className="text-xs text-gray-500 mt-2">{inquiry.date}</p>
                        </div>
                        
                        {inquiry.response && (
                          <div className="bg-white rounded-lg p-4 border-l-4 border-gray-300">
                            <p className="text-sm text-gray-600 mb-1">Seller Response:</p>
                            <p className="text-gray-900">{inquiry.response}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="max-w-2xl">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        value={profile.name}
                        onChange={(e) => setProfile({...profile, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({...profile, email: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({...profile, phone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({...profile, location: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Range</label>
                      <input
                        type="text"
                        value={profile.budget}
                        onChange={(e) => setProfile({...profile, budget: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Preferred Property Types</label>
                      <input
                        type="text"
                        value={profile.propertyType}
                        onChange={(e) => setProfile({...profile, propertyType: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>
                    
                    <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap">
                      Save Changes
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
