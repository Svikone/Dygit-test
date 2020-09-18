import { combineReducers } from "redux";
import { authReducer } from "./auth/reducers";
import { productsReducer } from "./main/products/reducers";

export default combineReducers({
    auth: authReducer,
    products: productsReducer,
});