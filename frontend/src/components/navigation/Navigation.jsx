import React from 'react';
import { useSelector } from 'react-redux';
import NotAuthorizedRouter from '../auth/auth';
import AuthorizedRouter from '../main/main';

const Navigation = () => {
  const token = useSelector((state) => state.auth.token);
  return (
    token
      ? <AuthorizedRouter />
      : <NotAuthorizedRouter />
  );
};

export default Navigation;
