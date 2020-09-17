import React from "react";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

const Signup = (props) => {
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm({});
  };

  return (
    <div className="">
      <Formik
        initialValues={{
          name: "",
          email: "",
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
          if (!value.email) {
            errors.email = "Fill in your email";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ errors, handleSubmit, handleChange, touched, values }) => (
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
    </div>
  );
};

export default Signup;
