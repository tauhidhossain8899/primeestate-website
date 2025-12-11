import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

export default function AuthCallback() {
  const { user } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const handleCallback = async () => {
      // Wait for auth state to update
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        // Redirect based on role
        if (user.role === 'buyer') {
          window.REACT_APP_NAVIGATE('/buyer-dashboard');
        } else if (user.role === 'seller') {
          window.REACT_APP_NAVIGATE('/seller-dashboard');
        } else if (user.role === 'admin') {
          window.REACT_APP_NAVIGATE('/admin-dashboard');
        }
      } else {
        // If no user profile exists, redirect to complete registration
        window.REACT_APP_NAVIGATE('/register');
      }
      
      setChecking(false);
    };

    handleCallback();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600 mb-4"></div>
        <p className="text-xl font-semibold text-gray-700">Completing sign in...</p>
      </div>
    </div>
  );
}
