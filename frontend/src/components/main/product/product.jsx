import React, { useEffect } from "react";
import Button from "@material-ui/core/Button";
import { Formik, Form, Field } from "formik";
import { TextField } from "formik-material-ui";
import { connect } from "react-redux";
import {
  getProductById,
  updateProduct,
  addProduct,
} from "../../../store/main/product/actions";

function Product(props) {
  useEffect(() => {
    if (props.match.params.id) {
      props.getProductById(props.match.params.id);
    }
  }, []);

  const onSubmit = (values, { resetForm }) => {
    const data = new FormData();
    data.append("url_img", values.file);
    data.append("name", values.name);
    data.append("description", values.description);
    data.append("_id", props.match.params.id);
    if (props.match.params.id) {
      props.updateProduct(data);
    } else {
      props.addProduct(data);
    }
    resetForm({});
  };

  return (
    <div className="">
      <Formik
        enableReinitialize
        initialValues={{
          name: props.selectedProduct.name,
          description: props.selectedProduct.description,
          file: "",
        }}
        validate={(value) => {
          const errors = {};
          if (!value.name) {
            errors.name = "Enter product name";
          } else if (/[^-А-ЯA-Z\x27а-яa-z]/.test(value.name)) {
            errors.name = "The name contains incorrect characters";
          }
          if (!value.description) {
            errors.description = "Enter a description";
          }
          return errors;
        }}
        onSubmit={onSubmit}
      >
        {({
          errors,
          handleSubmit,
          handleChange,
          touched,
          values,
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            {props.match.params.id ? (
              <h1>Update product</h1>
            ) : (
              <h1>Add product</h1>
            )}

            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                name="file"
                onChange={(ev) =>
                  setFieldValue("file", ev.currentTarget.files[0])
                }
                style={{ display: "none" }}
              />
            </Button>
            {errors.file && touched.file ? (
              <div className="error">{errors.file}</div>
            ) : null}

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

const mapStateToProps = (state) => ({
  selectedProduct: state.products.selectedProduct,
});

const mapDispatchToProps = (dispatch) => ({
  getProductById: (id) => dispatch(getProductById(id)),
  updateProduct: (product) => dispatch(updateProduct(product)),
  addProduct: (product) => dispatch(addProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
