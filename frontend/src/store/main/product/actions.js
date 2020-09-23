export const GET_PRODUCTS = 'GET_PRODUCTS';
export const GET_PRODUCTS_SUCCESS = 'GET_PRODUCTS_SUCCESS';
export const GET_PRODUCT_BY_ID = 'GET_PRODUCT_BY_ID';
export const GET_PRODUCT_BY_ID_SUCCESS = 'GET_PRODUCT_BY_ID_SUCCESS';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const ADD_PRODUCT = 'ADD_PRODUCT';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';

export const getProducts = (page) => ({
  type: GET_PRODUCTS,
  payload: page,
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

export const addProduct = (data) => ({
  type: ADD_PRODUCT,
  payload: data,
});

export const deleteProduct = (id) => ({
  type: DELETE_PRODUCT,
  payload: id,
});
