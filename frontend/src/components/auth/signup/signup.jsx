import React from 'react';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import httpServices from '../../../services/http.service';
import history from '../../../shared/history';
import { showNatification } from '../../../store/app/actions';

const Signup = (props) => {
  const onSubmit = async (values, { resetForm }) => {
    try {
      await httpServices.post('user/signup', values);
      resetForm({});
      history.push('/auth/signin');
    } catch (error) {
      const options = {
        message: error.response.data.message,
        style: 'error',
      };
      props.showNatification(options);
    }
  };

  return (
    <div className="">
      <Formik
        initialValues={{
          name: '',
          email: '',
          password: '',
        }}
        validate={(value) => {
          const errors = {};
          if (!value.name) {
            errors.name = 'Fill in the name';
          } else if (/[^-А-ЯA-Z\x27а-яa-z]/.test(value.name)) {
            errors.name = 'The name contains incorrect characters';
          }
          if (!value.password) {
            errors.password = 'Fill in your password';
          }
          if (!value.email) {
            errors.email = 'Fill in your email';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)
          ) {
            errors.email = 'Invalid email address';
          }
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit, handleChange,
        }) => (
          <Form onSubmit={handleSubmit}>
            <h1>SIGN UP</h1>

            <Field
              component={TextField}
              name="name"
              type="name"
              label="Name"
              onChange={handleChange}
            />
            <br />
            <Field
              component={TextField}
              name="email"
              type="email"
              label="Email"
              onChange={handleChange}
            />
            <br />
            <Field
              component={TextField}
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
            />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
      <Link to="/auth/signin">
        <Button variant="contained" color="primary" className="m-top">
          Login
        </Button>
      </Link>
    </div>
  );
};

Signup.propTypes = {
  showNatification: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  showNatification: (options) => dispatch(showNatification(options)),
});

export default connect(null, mapDispatchToProps)(Signup);
