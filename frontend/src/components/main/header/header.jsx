import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

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
          <Link className="right" to="/auth/signin">
            <Button color="inherit">Login</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
