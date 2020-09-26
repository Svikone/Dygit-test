import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { clearToken } from '../../../store/auth/actions';
import history from '../../../shared/history';

function Header(props) {
  const { token } = props;
  function exit() {
    props.clearToken();
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

const mapStateToProps = (state) => ({
  token: state.auth.token,
});

const mapDispatchToProps = (dispatch) => ({
  clearToken: () => dispatch(clearToken()),
});

Header.propTypes = {
  token: PropTypes.string.isRequired,
  clearToken: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
