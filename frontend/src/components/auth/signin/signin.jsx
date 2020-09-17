import React from "react";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

const Signin = (props) => {
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
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
          } else if (!/^[a-zA-Z]*$/i.test(value.name)) {
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
    </div>
  );
};

export default Signin;
