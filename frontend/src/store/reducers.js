import { combineReducers } from 'redux';
import { authReducer } from './auth/reducers';
import { productsReducer } from './main/product/reducers';
import { appReducer } from './app/reducers';

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  products: productsReducer,
});
