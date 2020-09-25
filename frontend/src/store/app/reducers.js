import * as actions from './actions';

const defaultState = {
  messageNatification: '',
  styleNatification: '',
  showNatification: false,
};

const appReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.SHOW_NATIFICATION:
      return {
        ...state,
        messageNatification: action.payload.message,
        styleNatification: action.payload.style,
        showNatification: true,
      };
    case actions.HIDE_NATIFICATION:
      return {
        ...state,
        showNatification: false,
      };
    default:
      return state;
  }
};

export default appReducer;
