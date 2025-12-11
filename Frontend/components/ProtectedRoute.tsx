import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ('buyer' | 'seller' | 'admin')[];
}

export default function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in, redirect to login
        window.REACT_APP_NAVIGATE('/login');
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        // User doesn't have permission, redirect to their dashboard
        if (user.role === 'buyer') {
          window.REACT_APP_NAVIGATE('/buyer-dashboard');
        } else if (user.role === 'seller') {
          window.REACT_APP_NAVIGATE('/seller-dashboard');
        } else if (user.role === 'admin') {
          window.REACT_APP_NAVIGATE('/admin-dashboard');
        }
      }
    }
  }, [user, loading, allowedRoles]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-teal-600 mb-4"></div>
          <p className="text-xl font-semibold text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || (allowedRoles && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}
