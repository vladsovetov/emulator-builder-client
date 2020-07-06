import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { cleanToken } from '../services';
import { logout } from '../actions';

const Logout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    cleanToken();
    dispatch(logout());
  }, [dispatch]);
  return <Redirect to="/" />;
};

export default Logout;
