export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN = 'SIGNIN';

export const signinSucces = (token) => ({
  type: SIGNIN_SUCCESS,
  payload: token,
});

export const setSigninData = (data) => ({
  type: SIGNIN,
  payload: data,
});
