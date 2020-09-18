import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="">
      <AppBar position="static">
        <Toolbar>
          <Link to="/main/products">
            <Button color="inherit">All products</Button>
          </Link>
          <Link to="/main/create/product">
            <Button color="inherit">Add product</Button>
          </Link>
          <Link to="/auth/signin">
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
