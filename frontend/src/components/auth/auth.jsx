import React from 'react';
import { Route } from 'react-router-dom';
import { Router } from 'react-router';
import history from '../../shared/history';
import signin from './signin/signin';
import signup from './signup/signup';

function auth() {
  return (
    <Router history={history}>
      <div className="">
        <Route path="/auth/signin" component={signin} />
        <Route path="/auth/signup" component={signup} />
      </div>
    </Router>
  );
}

export default auth;
