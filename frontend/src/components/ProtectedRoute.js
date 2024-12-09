import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />; // Redirect to home if not an admin
  }

  return children;
};

export default ProtectedRoute;
