import { takeEvery, put, call } from 'redux-saga/effects';
import *as authActions from '../store/auth/actions';
import httpServices from '../services/http.service';
import history from "../shared/history";

function* signinWorker(user) {
    console.log(user)
  try {
    const token = yield call(httpServices.post, "user/signin", user.payload)
    console.log(token)
    localStorage.setItem('token', token.data.token);
    yield put(authActions.signinSucces(token.data.token))
    history.push("/main/products")
  } 
  catch (error) {
    yield put(authActions.signinError(error.response.data.message))
  }
}

export function* watchLoadData() { 
  yield takeEvery(authActions.SIGNIN, signinWorker)

}