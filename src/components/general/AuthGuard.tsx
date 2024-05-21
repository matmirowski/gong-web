// src/components/AuthGuard.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

interface AuthGuardProps {
  allowedRoles: string[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ allowedRoles }) => {
  const { isLoggedIn, userRole, userId, loading } = useAuth();

  console.log('AuthGuard - isLoggedIn:', isLoggedIn);
  console.log('AuthGuard - userRole:', userRole);
  console.log('AuthGuard - userId:', userId);
  console.log('AuthGuard - loading:', loading);

  if (loading) {
    return <div>Loading...</div>; // Or any loading indicator
  }

  if (!isLoggedIn) {
    console.log('not logged in');
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(userRole)) {
    console.log('wrong role');
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AuthGuard;
