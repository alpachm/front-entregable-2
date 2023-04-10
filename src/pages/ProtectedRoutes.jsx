import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { setUser } from '../store/slices/user.slice';

const ProtectedRoutes = () => {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();

  if (localStorage.getItem('user')) {
    return <Outlet />;
  } else {
    return <Navigate to="/" />;
  }
};

export default ProtectedRoutes;
