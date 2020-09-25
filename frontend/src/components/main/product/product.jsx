import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getProductById,
  updateProduct,
  addProduct,
} from '../../../store/main/product/actions';

function Product(props) {
  const { selectedProduct, match } = props;

  useEffect(() => {
    if (match.params.id) {
      props.getProductById(match.params.id);
    }
  }, []);
  const onSubmit = (values, { resetForm }) => {
    const data = new FormData();
    data.append('url_img', values.file);
    data.append('name', values.name);
    data.append('description', values.description);
    if (match.params.id) {
      data.append('_id', match.params.id);
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
          name: selectedProduct.name,
          description: selectedProduct.description,
          file: null,
        }}
        validate={(value) => {
          const errors = {};
          if (!value.name) {
            errors.name = 'Enter product name';
          } else if (/[^-А-ЯA-Z\x27а-яa-z]/.test(value.name)) {
            errors.name = 'The name contains incorrect characters';
          }
          if (!value.description) {
            errors.description = 'Enter a description';
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
          setFieldValue,
        }) => (
          <Form onSubmit={handleSubmit}>
            {match.params.id ? (
              <h1>Update product</h1>
            ) : (
              <h1>Add product</h1>
            )}

            <Button variant="contained" component="label">
              Upload File
              <input
                type="file"
                name="file"
                onChange={(ev) => setFieldValue('file', ev.currentTarget.files[0])}
                style={{ display: 'none' }}
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

Product.propTypes = {
  getProductById: PropTypes.func.isRequired,
  match: PropTypes.objectOf(PropTypes.any).isRequired,
  updateProduct: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired,
  selectedProduct: PropTypes.shape({
    description: PropTypes.string,
    name: PropTypes.string,
    url_img: PropTypes.string,
    userId: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  selectedProduct: state.products.selectedProduct,
});

const mapDispatchToProps = (dispatch) => ({
  getProductById: (id) => dispatch(getProductById(id)),
  updateProduct: (product) => dispatch(updateProduct(product)),
  addProduct: (product) => dispatch(addProduct(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
