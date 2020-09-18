import React from "react";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import { setSigninData } from "../../../store/auth/actions";
import { connect } from "react-redux";
import { TextField } from "formik-material-ui";
import { Link } from "react-router-dom";

const Signin = (props) => {
  const onSubmit = (values, { resetForm }) => {
    props.setSigninData(values);
    resetForm({});
  };

  return (
    <div className="">
      <Formik
        initialValues={{
          name: "",
          password: "",
        }}
        validate={(value) => {
          let errors = {};
          if (!value.name) {
            errors.name = "Fill in the name";
          } else if (/[^-А-ЯA-Z\x27а-яa-z]/.test(value.name)) {
            errors.name = "The name contains incorrect characters";
          }
          if (!value.password) {
            errors.password = "Fill in your password";
          }
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ errors, handleSubmit, handleChange, touched, values }) => (
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

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
      <Link to="/auth/signup">
        <Button variant="contained" color="primary" className="m-top">
          Register
        </Button>
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setSigninData: (values) => dispatch(setSigninData(values)),
  };
};

export default connect(null, mapDispatchToProps)(Signin);
