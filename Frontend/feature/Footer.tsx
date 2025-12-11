import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <img 
              src="https://static.readdy.ai/image/be1df08887e59a3a96adb18e38c606ca/67ee9427ce57838da1d1bae88f3e68cf.jpeg"
              alt="PrimeEstate Logo"
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 leading-relaxed">
              PrimeEstate connects buyers and sellers directly, eliminating agents and providing a transparent, secure platform for real estate transactions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/properties" className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer">
                  Properties
                </Link>
              </li>
              <li>
                <Link to="/buyer-dashboard" className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer">
                  Buyer Dashboard
                </Link>
              </li>
              <li>
                <Link to="/seller-dashboard" className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer">
                  Seller Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-bold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-teal-400 transition-all duration-300 hover:translate-x-1 inline-block cursor-pointer">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <i className="ri-mail-line mr-3 mt-1"></i>
                <span>support@primeestate.com</span>
              </li>
              <li className="flex items-start">
                <i className="ri-phone-line mr-3 mt-1"></i>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start">
                <i className="ri-map-pin-line mr-3 mt-1"></i>
                <span>123 Real Estate Ave, Suite 100, New York, NY 10001</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Team Section */}
        <div className="border-t border-gray-800 pt-12 pb-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Our Team</h3>
            <p className="text-gray-400">Meet the people behind PrimeEstate</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-user-star-line text-2xl"></i>
              </div>
              <h4 className="text-lg font-bold mb-1">Mohammad Tauhid Hossain</h4>
              <p className="text-teal-400 text-sm">Project Lead &amp; Backend</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-palette-line text-2xl"></i>
              </div>
              <h4 className="text-lg font-bold mb-1">Raisul Islam Al Sami</h4>
              <p className="text-teal-400 text-sm">Frontend &amp; UI</p>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 text-center hover:bg-gray-750 transition-colors">
              <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="ri-bug-line text-2xl"></i>
              </div>
              <h4 className="text-lg font-bold mb-1">Shafkat Ahmed Upol</h4>
              <p className="text-teal-400 text-sm">System Analyst &amp; Tester</p>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 PrimeEstate. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 hover:rotate-12 cursor-pointer">
              <i className="ri-facebook-fill text-lg"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 hover:rotate-12 cursor-pointer">
              <i className="ri-twitter-fill text-lg"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 hover:rotate-12 cursor-pointer">
              <i className="ri-instagram-fill text-lg"></i>
            </a>
            <a href="#" className="w-10 h-10 bg-gray-800 hover:bg-teal-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-125 hover:rotate-12 cursor-pointer">
              <i className="ri-linkedin-fill text-lg"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
