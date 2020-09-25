import { combineReducers } from 'redux';
import authReducer from './auth/reducers';
import appReducer from './app/reducers';
import productsReducer from './main/product/reducers';

export default combineReducers({
  app: appReducer,
  auth: authReducer,
  products: productsReducer,
});
