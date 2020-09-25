import * as actions from './actions';

const defaultState = {
  token: '',
};

const authReducer = (state = defaultState, action) => {
  switch (action.type) {
    case actions.SIGNIN:
      return {
        ...state,
      };
    case actions.SIGNIN_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default authReducer;
