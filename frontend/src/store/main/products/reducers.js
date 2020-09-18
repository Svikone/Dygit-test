import *as actions from "./actions";

const defaultState = {
    product: {
        url_img: "",
        name: "",
        description: ""
    }
}

export const productsReducer = (state = defaultState, action) => {
    switch(action.type) {
        case actions.GET_PRODUCTS_SUCCESS:
        return {
            ...state,
            product: action.payload
        }
    }
  return state;
};  