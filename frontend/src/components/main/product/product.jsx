import React from "react";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";

function Product() {
  const onSubmit = (values, { resetForm }) => {
    console.log(values);
    resetForm({});
  };

  return (
    <div className="">
      <Formik
        initialValues={{
          name: "",
          description: "",
          file: "",
        }}
        validate={(value) => {
          let errors = {};
          if (!value.name) {
            errors.name = "Enter product name";
          } else if (/[^-А-ЯA-Z\x27а-яa-z]/.test(value.name)) {
            errors.name = "The name contains incorrect characters";
          }
          if (!value.description) {
            errors.description = "Enter a description";
          }
          if (!value.file) {
            errors.file = "Select image";
          }
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({ errors, handleSubmit, handleChange, touched, values }) => (
          <Form onSubmit={handleSubmit}>
            <h1>Add product</h1>
            <Button variant="contained" component="label">
              Upload File
              <Field
                type="file"
                name="file"
                onChange={handleChange}
                style={{ display: "none" }}
              />
            </Button>
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
              type="description"
              label="Description"
              name="description"
              onChange={handleChange}
            />

            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Product;
