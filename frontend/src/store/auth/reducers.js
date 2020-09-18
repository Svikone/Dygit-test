import { SIGNIN, SIGNIN_ERROR, SIGNIN_SUCCESS } from "./actions";

const defaultState = {
    token: "", 
    
}

export const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        case SIGNIN:
        return {
            ...state,
            // data: action.payload
            }
        case SIGNIN_SUCCESS:
        return {
            ...state,
            // token: action.payload
            }
        case SIGNIN_ERROR:
        return {
            ...state,
            // errorMessage: action.payload,
        }
    }
  return state;
};  