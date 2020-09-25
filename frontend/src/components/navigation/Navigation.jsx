import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NotAuthorizedRouter from '../auth/auth';
import AuthorizedRouter from '../main/main';

const Navigation = ({ token }) => (
  token
    ? <AuthorizedRouter />
    : <NotAuthorizedRouter />
);

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

Navigation.propTypes = {
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, null)(Navigation);
