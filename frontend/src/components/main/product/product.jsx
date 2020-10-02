import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Formik, Form, Field } from 'formik';
import { TextField } from 'formik-material-ui';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import {
  getProductById,
  updateProduct,
  addProduct,
} from '../../../store/main/product/actions';

function Product(props) {
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.products.selectedProduct);
  const { match } = props;

  useEffect(() => {
    if (match.params.id) {
      dispatch(getProductById(match.params.id));
    }
  }, []);
  const onSubmit = (values, { resetForm }) => {
    const data = new FormData();
    data.append('url_img', values.file);
    data.append('name', values.name);
    data.append('description', values.description);
    if (match.params.id) {
      data.append('_id', match.params.id);
      resetForm({});
      dispatch(updateProduct(data));
    } else {
      resetForm({});
      dispatch(addProduct(data));
    }
  };

  return (
    <div className="">
      <Formik
        enableReinitialize
        initialValues={{
          name: selectedProduct.name,
          description: selectedProduct.description,
          file: '',
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
            {match.params.id ? <h1>Update product</h1> : <h1>Add product</h1>}

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
  match: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Product;
