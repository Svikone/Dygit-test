import *as actions from "./actions";

const defaultState = {
    token: "", 
    
}

export const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        case actions.SIGNIN:
        return {
            ...state,
            // data: action.payload
            }
        case actions.SIGNIN_SUCCESS:
        return {
            ...state,
            // token: action.payload
            }
        case actions.SIGNIN_ERROR:
        return {
            ...state,
            // errorMessage: action.payload,
        }
    }
  return state;
};  