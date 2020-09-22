import { combineReducers } from "redux";
import { authReducer } from "./auth/reducers";
import { productsReducer } from "./main/product/reducers";

export default combineReducers({
    auth: authReducer,
    products: productsReducer,
});