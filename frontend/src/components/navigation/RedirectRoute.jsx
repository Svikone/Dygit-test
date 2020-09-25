import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const RedirectRoute = ({ path, to }) => (
  <Route path={path} render={() => (<Redirect to={to} />)} />
);

RedirectRoute.defaultProps = {
  to: '',
  path: [],
};

RedirectRoute.propTypes = {
  path: PropTypes.arrayOf(PropTypes.string),
  to: PropTypes.string,
};

export default RedirectRoute;
