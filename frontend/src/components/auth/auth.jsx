import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import signin from './signin/signin';
import signup from './signup/signup';

function auth() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={['/', '/auth/signin']} component={signin} />
        <Route exact path={['/auth/signup']} component={signup} />
      </Switch>
    </BrowserRouter>
  );
}

export default auth;
