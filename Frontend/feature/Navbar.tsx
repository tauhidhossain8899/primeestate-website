import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Properties', path: '/properties' },
    { name: 'Buyer Dashboard', path: '/buyer-dashboard' },
    { name: 'Seller Dashboard', path: '/seller-dashboard' },
    { name: 'Admin', path: '/admin-dashboard' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled || !isHomePage ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="w-full px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center cursor-pointer">
            <img 
              src="https://static.readdy.ai/image/be1df08887e59a3a96adb18e38c606ca/67ee9427ce57838da1d1bae88f3e68cf.jpeg"
              alt="PrimeEstate Logo"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition-colors whitespace-nowrap cursor-pointer ${
                  isScrolled || !isHomePage
                    ? 'text-gray-700 hover:text-teal-600'
                    : 'text-white hover:text-teal-300'
                } ${location.pathname === link.path ? 'text-teal-600' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className={`font-medium px-6 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                isScrolled || !isHomePage
                  ? 'text-gray-700 hover:text-teal-600'
                  : 'text-white hover:text-teal-300'
              }`}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 cursor-pointer ${
              isScrolled || !isHomePage ? 'text-gray-700' : 'text-white'
            }`}
          >
            <i className={`text-2xl ${isMobileMenuOpen ? 'ri-close-line' : 'ri-menu-line'}`}></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 bg-white rounded-lg shadow-lg">
            <div className="flex flex-col space-y-2 p-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-gray-700 hover:text-teal-600 font-medium py-2 cursor-pointer ${
                    location.pathname === link.path ? 'text-teal-600' : ''
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t pt-2 mt-2">
                <Link
                  to="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-gray-700 hover:text-teal-600 font-medium py-2 cursor-pointer"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block bg-teal-600 hover:bg-teal-700 text-white font-medium px-6 py-2 rounded-lg transition-colors text-center mt-2 cursor-pointer whitespace-nowrap"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
