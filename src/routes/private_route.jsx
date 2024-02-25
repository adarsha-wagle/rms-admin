import React from 'react';
// import { useSelector } from 'react-redux';
import { Outlet, Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ allowedRoles }) {
  const location = useLocation();
  let parsedRole = '';
  const role = localStorage.getItem('role') || '';

  // todo fix this (juggad method)
  try {
    if (role && typeof role === 'string') {
      parsedRole = JSON.parse(role);
    }
  } catch (err) {
    console.log('json parse error', err);
    if (role) {
      parsedRole = role;
    }
  }

  return allowedRoles.includes(parsedRole) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  allowedRoles: PropTypes.any,
};
