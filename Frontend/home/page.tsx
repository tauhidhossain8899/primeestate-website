import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState({
    location: '',
    propertyType: '',
    minPrice: '',
    maxPrice: ''
  });

  const featuredProperties = [
    {
      id: 1,
      title: 'Modern Luxury Villa',
      location: 'Beverly Hills, CA',
      price: 2850000,
      type: 'Villa',
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      image: 'https://readdy.ai/api/search-image?query=modern%20luxury%20villa%20with%20clean%20white%20architecture%2C%20minimalist%20design%2C%20large%20windows%2C%20beautiful%20landscaped%20garden%2C%20bright%20daylight%2C%20professional%20real%20estate%20photography%2C%20simple%20elegant%20background&width=800&height=600&seq=prop1&orientation=landscape'
    },
    {
      id: 2,
      title: 'Downtown Penthouse',
      location: 'Manhattan, NY',
      price: 3200000,
      type: 'Apartment',
      bedrooms: 3,
      bathrooms: 3,
      area: 2800,
      image: 'https://readdy.ai/api/search-image?query=luxurious%20penthouse%20apartment%20interior%20with%20floor%20to%20ceiling%20windows%2C%20modern%20furniture%2C%20city%20skyline%20view%2C%20elegant%20design%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=800&height=600&seq=prop2&orientation=landscape'
    },
    {
      id: 3,
      title: 'Beachfront Paradise',
      location: 'Malibu, CA',
      price: 4500000,
      type: 'House',
      bedrooms: 4,
      bathrooms: 4,
      area: 3800,
      image: 'https://readdy.ai/api/search-image?query=stunning%20beachfront%20house%20with%20ocean%20view%2C%20modern%20coastal%20architecture%2C%20large%20deck%2C%20palm%20trees%2C%20sunset%20lighting%2C%20professional%20real%20estate%20photography%2C%20simple%20clean%20background&width=800&height=600&seq=prop3&orientation=landscape'
    },
    {
      id: 4,
      title: 'Urban Loft Space',
      location: 'Chicago, IL',
      price: 1250000,
      type: 'Loft',
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      image: 'https://readdy.ai/api/search-image?query=industrial%20urban%20loft%20interior%20with%20exposed%20brick%20walls%2C%20high%20ceilings%2C%20modern%20minimalist%20furniture%2C%20large%20windows%2C%20natural%20light%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=800&height=600&seq=prop4&orientation=landscape'
    },
    {
      id: 5,
      title: 'Mountain Retreat',
      location: 'Aspen, CO',
      price: 3800000,
      type: 'Cabin',
      bedrooms: 4,
      bathrooms: 3,
      area: 3200,
      image: 'https://readdy.ai/api/search-image?query=luxury%20mountain%20cabin%20with%20wooden%20architecture%2C%20stone%20fireplace%2C%20panoramic%20mountain%20views%2C%20cozy%20elegant%20interior%2C%20professional%20real%20estate%20photography%2C%20simple%20clean%20background&width=800&height=600&seq=prop5&orientation=landscape'
    },
    {
      id: 6,
      title: 'Garden Estate',
      location: 'Austin, TX',
      price: 1850000,
      type: 'House',
      bedrooms: 4,
      bathrooms: 3,
      area: 3500,
      image: 'https://readdy.ai/api/search-image?query=beautiful%20estate%20house%20with%20lush%20garden%2C%20modern%20architecture%2C%20outdoor%20patio%2C%20swimming%20pool%2C%20professional%20real%20estate%20photography%2C%20bright%20daylight%2C%20simple%20clean%20background&width=800&height=600&seq=prop6&orientation=landscape'
    }
  ];

  const handleSearch = () => {
    window.REACT_APP_NAVIGATE('/properties');
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://readdy.ai/api/search-image?query=modern%20real%20estate%20cityscape%20with%20luxury%20buildings%20and%20skyscrapers%2C%20professional%20architecture%20photography%2C%20clean%20minimalist%20style%2C%20bright%20natural%20lighting%2C%20elegant%20urban%20landscape%2C%20simple%20clean%20background&width=1920&height=1080&seq=hero1&orientation=landscape"
            alt="Hero Background"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/40"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Find Your Dream Property
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
            Direct connection between buyers and sellers. No agents, no hassle. Transparent, secure, and efficient real estate transactions.
          </p>
          
          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <input
                type="text"
                placeholder="Location"
                value={searchQuery.location}
                onChange={(e) => setSearchQuery({...searchQuery, location: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
              <select
                value={searchQuery.propertyType}
                onChange={(e) => setSearchQuery({...searchQuery, propertyType: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              >
                <option value="">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="loft">Loft</option>
                <option value="cabin">Cabin</option>
              </select>
              <input
                type="number"
                placeholder="Min Price"
                value={searchQuery.minPrice}
                onChange={(e) => setSearchQuery({...searchQuery, minPrice: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={searchQuery.maxPrice}
                onChange={(e) => setSearchQuery({...searchQuery, maxPrice: e.target.value})}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>
            <button
              onClick={handleSearch}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              <i className="ri-search-line mr-2"></i>
              Search Properties
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Why Choose PrimeEstate?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Experience the future of real estate with our agent-free platform</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">100% Verified</h3>
              <p className="text-gray-600 leading-relaxed">All properties and users are thoroughly verified by our admin team to ensure authenticity and security in every transaction.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-user-unfollow-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Agents</h3>
              <p className="text-gray-600 leading-relaxed">Connect directly with buyers and sellers. Save on commission fees and enjoy transparent communication throughout the process.</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6">
                <i className="ri-lock-2-line text-3xl text-teal-600"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Secure Platform</h3>
              <p className="text-gray-600 leading-relaxed">Advanced encryption and secure authentication protect your data and ensure safe transactions on our platform.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Discover our handpicked selection of premium properties</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Link
                key={property.id}
                to={`/property/${property.id}`}
                className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
              >
                <div className="relative w-full h-64 overflow-hidden">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
                    {property.type}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-4 flex items-center">
                    <i className="ri-map-pin-line mr-2"></i>
                    {property.location}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
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
                  
                  <div className="text-3xl font-bold text-teal-600">
                    ${property.price.toLocaleString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/properties"
              className="inline-block bg-teal-600 hover:bg-teal-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              View All Properties
              <i className="ri-arrow-right-line ml-2"></i>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Simple steps to find or sell your property</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Register</h3>
              <p className="text-gray-600">Create your account as a buyer or seller</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">List or Search</h3>
              <p className="text-gray-600">Post your property or browse verified listings</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Connect</h3>
              <p className="text-gray-600">Communicate directly through our secure platform</p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-teal-600 text-white rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6">
                4
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Close Deal</h3>
              <p className="text-gray-600">Complete your transaction safely and efficiently</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-teal-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/90 mb-8">Join thousands of buyers and sellers on PrimeEstate today</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="inline-block bg-white text-teal-600 hover:bg-gray-100 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              Register Now
            </Link>
            <Link
              to="/properties"
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white hover:text-teal-600 font-semibold px-8 py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl whitespace-nowrap cursor-pointer"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
