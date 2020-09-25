import * as actions from './actions';

const defaultState = {
  selectedProduct: {
    url_img: '',
    name: '',
    description: '',
  },
  data: {
    collections: null,
    page: null,
    pages: '',
    products: [],
  },
};

export const productsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        data: action.payload,
      };
    case actions.GET_PRODUCT_BY_ID_SUCCESS:
      return {
        ...state,
        selectedProduct: action.payload,
      };
    case actions.GET_PRODUCT_BY_ID_CLEAR:
      return {
        ...state,
        selectedProduct: {
          url_img: '',
          name: '',
          description: '',
        },
      };
    default:
      return state;
  }
};

export default productsReducer;
