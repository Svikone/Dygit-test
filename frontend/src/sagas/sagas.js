import { takeEvery, put, call } from 'redux-saga/effects';
import * as authActions from '../store/auth/actions';
import * as productsActions from '../store/main/product/actions';
import httpServices from '../services/http.service';
import history from '../shared/history';

function* signinWorker(user) {
  try {
    const token = yield call(httpServices.post, 'user/signin', user.payload);
    localStorage.setItem('token', token.data.token);
    history.push('/main/products');
  } catch (error) {
    yield put(authActions.signinError(error.response.data.message));
  }
}

function* getProductsWorker() {
  try {
    const products = yield call(httpServices.get, 'product');
    yield put(productsActions.getProductsSuccess(products.data));
  } catch (error) {
  }
}

function* getProductByIdWorker(id) {
  try {
    const selectProduct = yield call(httpServices.get, `product/by/${id.payload}`);
    console.log(selectProduct);
    yield put(productsActions.getProductByIdSuccess(selectProduct.data));
  } catch (error) {
  }
}

function* updateProductWorker(product) {
  try {
    yield call(httpServices.put, 'product', product.payload);
    history.push('/main/products');
  } catch (error) {
  }
}

function* addProductWorker(product) {
  try {
    yield call(httpServices.post, 'product', product.payload);
  } catch (error) {
  }
}

function* deleteProductWorker(id) {
  try {
    yield call(httpServices.delete, `product/${id.payload}`);
    yield put(productsActions.getProducts());
  } catch (error) {
  }
}

export default function* watchLoadData() {
  yield takeEvery(authActions.SIGNIN, signinWorker);
  yield takeEvery(productsActions.GET_PRODUCTS, getProductsWorker);
  yield takeEvery(productsActions.GET_PRODUCT_BY_ID, getProductByIdWorker);
  yield takeEvery(productsActions.UPDATE_PRODUCT, updateProductWorker);
  yield takeEvery(productsActions.ADD_PRODUCT, addProductWorker);
  yield takeEvery(productsActions.DELETE_PRODUCT, deleteProductWorker);
}
