export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const getProducts = () => ({
  type: GET_PRODUCTS,
});

export const getProductsSuccess = (data) => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: data,
});

export const getProductById = (id) => ({
  type: GET_PRODUCT_BY_ID,
  payload: id,
});

export const getProductByIdSuccess = (data) => ({
  type: GET_PRODUCT_BY_ID_SUCCESS,
  payload: data,
});

export const updateProduct = (data) => ({
  type: UPDATE_PRODUCT,
  payload: data,
});
