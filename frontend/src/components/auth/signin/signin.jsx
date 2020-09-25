import React from 'react';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import { connect } from 'react-redux';
import { TextField } from 'formik-material-ui';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { setSigninData } from '../../../store/auth/actions';

const Signin = (props) => {
  const onSubmit = (values, { resetForm }) => {
    props.setSigninData(values);
    resetForm({});
  };

  return (
    <div className="">
      <Formik
        initialValues={{
          name: '',
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
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ handleSubmit, handleChange }) => (
          <Form onSubmit={handleSubmit}>
            <h1>SIGN IN</h1>

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
              type="password"
              label="Password"
              name="password"
              onChange={handleChange}
            />

            <Button type="submit" color="primary">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Link to="/auth/signup">
        <Button variant="contained" className="m-top">
          Register
        </Button>
      </Link>
    </div>
  );
};

Signin.propTypes = {
  setSigninData: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setSigninData: (values) => dispatch(setSigninData(values)),
});

export default connect(null, mapDispatchToProps)(Signin);
