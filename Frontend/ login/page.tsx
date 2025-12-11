import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/feature/Navbar';
import Footer from '../../components/feature/Footer';
import { useAuth } from '../../contexts/AuthContext';

export default function Login() {
  const { signIn, signInWithGoogle, signInWithFacebook, user } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  if (user) {
    if (user.role === 'buyer') {
      window.REACT_APP_NAVIGATE('/buyer-dashboard');
    } else if (user.role === 'seller') {
      window.REACT_APP_NAVIGATE('/seller-dashboard');
    } else if (user.role === 'admin') {
      window.REACT_APP_NAVIGATE('/admin-dashboard');
    }
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await signIn(formData.email, formData.password);
      setSuccess('Login successful! Redirecting to your dashboard...');
      // Redirect will happen automatically via AuthContext
    } catch (err: any) {
      setError(err.message || 'Failed to sign in');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setSuccess('');
    try {
      await signInWithGoogle();
      setSuccess('Login successful! Redirecting...');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Google');
    }
  };

  const handleFacebookLogin = async () => {
    setError('');
    setSuccess('');
    try {
      await signInWithFacebook();
      setSuccess('Login successful! Redirecting...');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in with Facebook');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16 px-6">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-error-warning-fill text-2xl text-red-600 mr-3"></i>
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center">
                  <i className="ri-checkbox-circle-fill text-2xl text-green-600 mr-3"></i>
                  <p className="text-sm text-green-700">{success}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="your@email.com"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center cursor-pointer">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <Link to="/login" className="text-sm text-teal-600 hover:text-teal-700 cursor-pointer">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <i className="ri-login-box-line mr-2"></i>
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="mt-8 text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <Link to="/register" className="font-semibold text-teal-600 hover:text-teal-700 transition-colors">
                  Sign up
                </Link>
              </p>

              <p className="mt-4 text-center text-sm text-gray-600">
                Are you an administrator?{' '}
                <Link to="/admin-register" className="font-semibold text-red-500 hover:text-red-600 transition-colors">
                  Admin Registration
                </Link>
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-500 mb-4">Or continue with</p>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={handleGoogleLogin}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-google-fill text-xl mr-2 text-red-500"></i>
                  <span className="text-sm font-semibold text-gray-700">Google</span>
                </button>
                <button 
                  type="button"
                  onClick={handleFacebookLogin}
                  className="flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 cursor-pointer whitespace-nowrap"
                >
                  <i className="ri-facebook-fill text-xl mr-2 text-blue-600"></i>
                  <span className="text-sm font-semibold text-gray-700">Facebook</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
