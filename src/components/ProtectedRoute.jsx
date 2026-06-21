import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

<<<<<<< HEAD
  // 💡 لو أنت شغال على جهازك (localhost) عدي فوراً، أو لو اليوزر أدمن فعلاً
  if (window.location.hostname === "localhost" || user?.role === 'admin') {
    return children;
  }

  // لو مش كدة، حوله لصفحة اللوجن
  return <Navigate to="/login/admin" />;
=======
  if (!user || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }

  return children;
>>>>>>> 1b00c8c897c61f99d56360806679863f648487fb
};

export default ProtectedRoute;