import * as actions from './actions';

const defaultState = {
  selectedProduct: {
    url_img: '',
    name: '',
    description: '',
  },
  products: [],
};

export const productsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };
    case actions.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        selectedProduct: action.payload,
      };
  }
  return state;
};
