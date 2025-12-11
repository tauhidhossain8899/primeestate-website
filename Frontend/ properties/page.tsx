import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';

export default function Properties() {
  const [filters, setFilters] = useState({
    search: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    location: ''
  });

  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const properties = [
    {
      id: 1,
      title: 'Modern Luxury Villa',
      location: 'Beverly Hills, CA',
      price: 2850000,
      type: 'Villa',
      bedrooms: 5,
      bathrooms: 4,
      area: 4500,
      status: 'Verified',
      seller: 'John Anderson',
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
      status: 'Verified',
      seller: 'Sarah Mitchell',
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
      status: 'Verified',
      seller: 'Michael Chen',
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
      status: 'Verified',
      seller: 'Emily Rodriguez',
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
      status: 'Verified',
      seller: 'David Thompson',
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
      status: 'Verified',
      seller: 'Lisa Parker',
      image: 'https://readdy.ai/api/search-image?query=beautiful%20estate%20house%20with%20lush%20garden%2C%20modern%20architecture%2C%20outdoor%20patio%2C%20swimming%20pool%2C%20professional%20real%20estate%20photography%2C%20bright%20daylight%2C%20simple%20clean%20background&width=800&height=600&seq=prop6&orientation=landscape'
    },
    {
      id: 7,
      title: 'Contemporary Townhouse',
      location: 'San Francisco, CA',
      price: 2100000,
      type: 'Townhouse',
      bedrooms: 3,
      bathrooms: 2,
      area: 2200,
      status: 'Verified',
      seller: 'Robert Kim',
      image: 'https://readdy.ai/api/search-image?query=modern%20contemporary%20townhouse%20with%20sleek%20facade%2C%20urban%20design%2C%20rooftop%20terrace%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=800&height=600&seq=prop7&orientation=landscape'
    },
    {
      id: 8,
      title: 'Lakeside Cottage',
      location: 'Seattle, WA',
      price: 950000,
      type: 'Cottage',
      bedrooms: 2,
      bathrooms: 2,
      area: 1500,
      status: 'Verified',
      seller: 'Jennifer Lee',
      image: 'https://readdy.ai/api/search-image?query=charming%20lakeside%20cottage%20with%20wooden%20deck%2C%20peaceful%20water%20view%2C%20cozy%20interior%2C%20professional%20real%20estate%20photography%2C%20simple%20clean%20background&width=800&height=600&seq=prop8&orientation=landscape'
    },
    {
      id: 9,
      title: 'Luxury Condo',
      location: 'Miami, FL',
      price: 1650000,
      type: 'Condo',
      bedrooms: 3,
      bathrooms: 2,
      area: 2000,
      status: 'Verified',
      seller: 'Carlos Martinez',
      image: 'https://readdy.ai/api/search-image?query=luxury%20condominium%20with%20modern%20interior%2C%20ocean%20view%20balcony%2C%20elegant%20finishes%2C%20professional%20real%20estate%20photography%2C%20clean%20simple%20background&width=800&height=600&seq=prop9&orientation=landscape'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Property Listings</h1>
            <p className="text-lg text-gray-600">Browse through our verified property listings</p>
          </div>

          {/* Filters */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <input
                type="text"
                placeholder="Search properties..."
                value={filters.search}
                onChange={(e) => setFilters({...filters, search: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
              <input
                type="text"
                placeholder="Location"
                value={filters.location}
                onChange={(e) => setFilters({...filters, location: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
              <select
                value={filters.propertyType}
                onChange={(e) => setFilters({...filters, propertyType: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              >
                <option value="">All Types</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="loft">Loft</option>
                <option value="cabin">Cabin</option>
                <option value="townhouse">Townhouse</option>
                <option value="cottage">Cottage</option>
                <option value="condo">Condo</option>
              </select>
              <select
                value={filters.bedrooms}
                onChange={(e) => setFilters({...filters, bedrooms: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              >
                <option value="">Bedrooms</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
              <input
                type="number"
                placeholder="Min Price"
                value={filters.minPrice}
                onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
              <input
                type="number"
                placeholder="Max Price"
                value={filters.maxPrice}
                onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
              />
            </div>
          </div>

          {/* View Toggle & Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              <strong>{properties.length}</strong> properties found
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 ${
                  viewMode === 'grid' ? 'bg-teal-600 text-white' : 'bg-white text-gray-600'
                }`}
              >
                <i className="ri-grid-line text-xl"></i>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg cursor-pointer transition-all duration-300 hover:scale-110 ${
                  viewMode === 'list' ? 'bg-teal-600 text-white' : 'bg-white text-gray-600'
                }`}
              >
                <i className="ri-list-check text-xl"></i>
              </button>
            </div>
          </div>

          {/* Properties Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8' : 'space-y-6'}>
            {properties.map((property) => (
              <Link
                key={property.id}
                to={`/property/${property.id}`}
                className={`group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer ${
                  viewMode === 'list' ? 'flex flex-row' : ''
                }`}
              >
                <div className={`relative overflow-hidden ${
                  viewMode === 'list' ? 'w-80 h-64' : 'w-full h-64'
                }`}>
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-teal-600 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    {property.status}
                  </div>
                  <div className="absolute top-4 left-4 bg-gray-900/80 text-white px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap">
                    {property.type}
                  </div>
                </div>
                
                <div className="p-6 flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                  <p className="text-gray-600 mb-3 flex items-center text-sm">
                    <i className="ri-map-pin-line mr-2"></i>
                    {property.location}
                  </p>
                  
                  <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
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
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                    <div className="text-2xl font-bold text-teal-600">
                      ${property.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-500">
                      by {property.seller}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
