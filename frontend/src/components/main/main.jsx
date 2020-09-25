import React from 'react';
import {
  Route, Switch, Redirect,
} from 'react-router-dom';
import { Router } from 'react-router';
import history from '../../shared/history';
import Header from './header/header';
import Products from './products/products';
import Product from './product/product';
import RedirectRoute from '../navigation/RedirectRoute';

function main() {
  return (
    <div className="">
      <Header />
      <Router history={history}>
        <Switch>
          <RedirectRoute path={['/auth/signin', '/auth/signup']} to="/main/products" />
          <Route exact path="/main/products" component={Products} />
          <Route exact path="/main/create/product" component={Product} />
          <Route exact path="/main/edit/product/:id" component={Product} />
          <Redirect from="/" to="/main/products" />
        </Switch>
      </Router>
    </div>
  );
}

export default main;
