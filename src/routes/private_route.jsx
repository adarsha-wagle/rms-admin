import React from 'react';
// import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ allowedRoles }) {
  const location = useLocation();

  const role = JSON.parse(localStorage.getItem('role')) || '';

  return allowedRoles.includes(role) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.any,
};
