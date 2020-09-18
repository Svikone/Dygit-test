import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "../../shared/history";
import Header from "./header/header";
import Products from "./products/products";
import Product from "./product/product";

function main() {
  return (
    <div className="">
      <Header />
      <Router history={history}>
        <Switch>
          <Route path="/main/products" component={Products} />
          <Route path="/main/create/product" component={Product} />
          <Route path="/main/edit/product/:id" component={Product} />
        </Switch>
      </Router>
    </div>
  );
}

export default main;
