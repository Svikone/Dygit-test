import { takeEvery, put, call } from 'redux-saga/effects';
import *as authActions from '../store/auth/actions';
import *as productsActions from '../store/main/products/actions';
import httpServices from '../services/http.service';
import history from "../shared/history";

function* signinWorker(user) {
  try {
    const token = yield call(httpServices.post, "user/signin", user.payload)
    console.log(token)
    localStorage.setItem('token', token.data.token);
    history.push("/main/products")
  } 
  catch (error) {
    yield put(authActions.signinError(error.response.data.message))
  }
}

function* getProductsWorker() {
  try {
    const products = yield call(httpServices.get, "product")
    yield put(productsActions.getProductsSuccess(products.data))

    console.log(products)
  } 
  catch (error) {
  }
}

export function* watchLoadData() { 
  yield takeEvery(authActions.SIGNIN, signinWorker)
  yield takeEvery(productsActions.GET_PRODUCTS, getProductsWorker)
}