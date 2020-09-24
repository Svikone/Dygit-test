export const SIGNIN_SUCCESS = 'SIGNIN_SUCCESS';
export const SIGNIN = 'SIGNIN';

export const signinSucces = () => ({
  type: SIGNIN_SUCCESS,
});

export const setSigninData = (data) => ({
  type: SIGNIN,
  payload: data,
});
