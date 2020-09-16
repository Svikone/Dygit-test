import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import signin from "./signin/signin";
import signup from "./signup/signup";

function auth() {
  return (
    <BrowserRouter>
      <div className="">
        <Route path="/auth/signin" component={signin} />
        <Route path="/auth/signup" component={signup} />
      </div>
    </BrowserRouter>
  );
}

export default auth;
