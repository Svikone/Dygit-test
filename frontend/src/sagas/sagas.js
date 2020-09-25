import { takeEvery, put, call } from 'redux-saga/effects';
import * as authActions from '../store/auth/actions';
import * as productsActions from '../store/main/product/actions';
import * as appActions from '../store/app/actions';
import httpServices from '../services/http.service';
import history from '../shared/history';

function* signinWorker(user) {
  try {
    const token = yield call(httpServices.post, 'user/signin', user.payload);
    localStorage.setItem('token', token.data.token);
    yield put(authActions.signinSucces(token.data.token));
    history.push('/main/products');
  } catch (error) {
    const options = {
      message: error.response.data.message,
      style: 'error',
    };
    yield put(appActions.showNatification(options));
  }
}

function* getProductsWorker(page) {
  try {
    const products = yield call(httpServices.get, `product?page=${page.payload}`);
    yield put(productsActions.getProductsSuccess(products.data));
  } catch (error) {
    const options = {
      message: error.message.response,
      style: 'error',
    };
    yield put(appActions.showNatification(options));
  }
}

function* getProductByIdWorker(id) {
  try {
    const selectProduct = yield call(httpServices.get, `product/by/${id.payload}`);
    yield put(productsActions.getProductByIdSuccess(selectProduct.data));
  } catch (error) {
    const options = {
      message: error.response.data.message,
      style: 'error',
    };
    yield put(appActions.showNatification(options));
  }
}

function* updateProductWorker(product) {
  try {
    yield call(httpServices.put, 'product', product.payload);
    history.push('/main/products');
    yield put(productsActions.getProductByIdClear());
  } catch (error) {
    const options = {
      message: error.response.data.message,
      style: 'error',
    };
    yield put(appActions.showNatification(options));
  }
}

function* addProductWorker(product) {
  try {
    yield call(httpServices.post, 'product', product.payload);
  } catch (error) {
    const options = {
      message: error.message.response,
      style: 'error',
    };
    yield put(appActions.showNatification(options));
  }
}

function* deleteProductWorker(id) {
  try {
    yield call(httpServices.delete, `product/${id.payload}`);
    yield put(productsActions.getProducts());
  } catch (error) {
    const options = {
      message: error.message.response,
      style: 'error',
    };
    yield put(appActions.showNatification(options));
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
