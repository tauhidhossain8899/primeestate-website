import { lazy } from 'react';
import type { RouteObject } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

const Home = lazy(() => import('../pages/home/page'));
const Login = lazy(() => import('../pages/login/page'));
const Register = lazy(() => import('../pages/register/page'));
const AdminRegister = lazy(() => import('../pages/admin-register/page'));
const Properties = lazy(() => import('../pages/properties/page'));
const PropertyDetail = lazy(() => import('../pages/property-detail/page'));
const BuyerDashboard = lazy(() => import('../pages/buyer-dashboard/page'));
const SellerDashboard = lazy(() => import('../pages/seller-dashboard/page'));
const AdminDashboard = lazy(() => import('../pages/admin-dashboard/page'));
const AuthCallback = lazy(() => import('../pages/auth-callback/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/admin-register',
    element: <AdminRegister />,
  },
  {
    path: '/properties',
    element: <Properties />,
  },
  {
    path: '/property/:id',
    element: <PropertyDetail />,
  },
  {
    path: '/buyer-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['buyer', 'admin']}>
        <BuyerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/seller-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['seller', 'admin']}>
        <SellerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/admin-dashboard',
    element: (
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: '/auth/callback',
    element: <AuthCallback />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
