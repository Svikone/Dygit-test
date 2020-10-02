import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearToken } from '../../../store/auth/actions';
import history from '../../../shared/history';

function Header() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  function exit() {
    dispatch(clearToken());
    localStorage.removeItem('token');
    history.push('/auth/signin');
  }

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
          {token ? (
            <Button className="right" color="inherit" onClick={exit}>
              Exit
            </Button>
          ) : (
            <Link className="right" to="/auth/signin">
              <Button color="inherit">Login</Button>
            </Link>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;
