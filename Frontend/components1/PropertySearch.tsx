import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase, Property } from '../../../lib/supabase';

export default function PropertySearch() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    search: '',
    minPrice: '',
    maxPrice: '',
    propertyType: '',
    city: ''
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('properties')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      const { data, error } = await query;

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('properties')
        .select('*')
        .eq('status', 'active');

      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,location.ilike.%${filters.search}%`);
      }

      if (filters.minPrice) {
        query = query.gte('price', parseFloat(filters.minPrice));
      }

      if (filters.maxPrice) {
        query = query.lte('price', parseFloat(filters.maxPrice));
      }

      if (filters.propertyType) {
        query = query.eq('property_type', filters.propertyType);
      }

      if (filters.city) {
        query = query.ilike('city', `%${filters.city}%`);
      }

      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error) {
      console.error('Error searching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFilters({
      search: '',
      minPrice: '',
      maxPrice: '',
      propertyType: '',
      city: ''
    });
    fetchProperties();
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-teal-600"></div>
        <p className="mt-4 text-gray-600">Loading properties...</p>
      </div>
    );
  }

  return (
    <div>
      {/* Search Filters */}
      <div className="bg-gray-50 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Search Properties</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Search by title or location..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
          <input
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
          <input
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
          <select
            value={filters.propertyType}
            onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          >
            <option value="">All Property Types</option>
            <option value="House">House</option>
            <option value="Apartment">Apartment</option>
            <option value="Villa">Villa</option>
            <option value="Loft">Loft</option>
            <option value="Cabin">Cabin</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Cottage">Cottage</option>
            <option value="Condo">Condo</option>
          </select>
          <input
            type="text"
            placeholder="City"
            value={filters.city}
            onChange={(e) => setFilters({ ...filters, city: e.target.value })}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSearch}
              className="flex-1 bg-teal-600 hover:bg-teal-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              <i className="ri-search-line mr-2"></i>
              Search
            </button>
            <button
              onClick={handleReset}
              className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-3 rounded-lg transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="mb-4">
        <p className="text-gray-600">
          Found <strong>{properties.length}</strong> properties
        </p>
      </div>

      {properties.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <i className="ri-home-4-line text-6xl text-gray-400 mb-4"></i>
          <p className="text-xl text-gray-600">No properties found</p>
          <p className="text-gray-500 mt-2">Try adjusting your search filters</p>
        </div>
      ) : (
        <div className="space-y-6">
          {properties.map((property) => (
            <div key={property.id} className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow border border-gray-200">
              <div className="relative w-full md:w-80 h-56">
                <img
                  src={property.images[0] || 'https://readdy.ai/api/search-image?query=modern%20real%20estate%20property%20professional%20photography%20clean%20simple%20background&width=600&height=400&seq=default&orientation=landscape'}
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
                </div>
                
                <div className="flex items-center gap-6 mb-4 text-sm text-gray-600">
                  {property.bedrooms && (
                    <span className="flex items-center">
                      <i className="ri-hotel-bed-line mr-1"></i>
                      {property.bedrooms} Beds
                    </span>
                  )}
                  {property.bathrooms && (
                    <span className="flex items-center">
                      <i className="ri-drop-line mr-1"></i>
                      {property.bathrooms} Baths
                    </span>
                  )}
                  {property.area && (
                    <span className="flex items-center">
                      <i className="ri-ruler-line mr-1"></i>
                      {property.area} sqft
                    </span>
                  )}
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
    </div>
  );
}
