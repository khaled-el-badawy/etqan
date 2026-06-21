import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  // 💡 لو أنت شغال على جهازك (localhost) عدي فوراً، أو لو اليوزر أدمن فعلاً
  if (window.location.hostname === "localhost" || user?.role === 'admin') {
    return children;
  }

  // لو مش كدة، حوله لصفحة اللوجن
  return <Navigate to="/login/admin" />;
};

export default ProtectedRoute;