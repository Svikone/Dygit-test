import { LOGIN_SUCCESS, LOGIN, LOGIN_ERROR } from "./actions";

const defaultState = {
    token: "", 
    
}

export const authReducer = (state = defaultState, action) => {
    switch(action.type) {
        case LOGIN:
        return {
            ...state,
            // data: action.payload
            }
        case LOGIN_SUCCESS:
        return {
            ...state,
            // token: action.payload
            }
        case LOGIN_ERROR:
        return {
            ...state,
            // errorMessage: action.payload,
        }
    }
  return state;
};  