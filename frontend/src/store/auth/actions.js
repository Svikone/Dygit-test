export const SIGNIN_SUCCESS = "SIGNIN_SUCCESS";
export const SIGNIN = "SIGNIN";
export const SIGNIN_ERROR = "SIGNIN_ERROR";

export const signinSucces = (token) => {
    return {
        type: SIGNIN_SUCCESS,
        // payload: token
    }
}

export const setSigninData = (data) => {
    return {
        type: SIGNIN,
        payload: data
    }
}

export const signinError = (error) => {
    return {
        type: SIGNIN_ERROR,
        // payload: error,
    }
}
