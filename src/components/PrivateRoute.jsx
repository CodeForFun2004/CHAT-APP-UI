// src/components/PrivateRoute.jsx
import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const { accessToken } = useSelector(state => state.auth);

  return accessToken ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
