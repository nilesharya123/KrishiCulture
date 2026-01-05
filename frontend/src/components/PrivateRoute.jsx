import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useStore from '../store/useStore';

const PrivateRoute = () => {
    const { token } = useStore();

    return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
