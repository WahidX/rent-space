import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
} from './actionTypes';
import { APIurls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';

export function startLogin() {
  return {
    type: LOGIN_START,
  };
}

export function loginFailed(errorMessage) {
  return {
    type: LOGIN_FAILED,
    error: errorMessage,
  };
}

export function loginSuccess(user) {
  return {
    type: LOGIN_SUCCESS,
    user,
  };
}

export function signin(email, password) {
  return (dispatch) => {
    dispatch(startLogin());

    const url = APIurls.signin();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          // action to save user
          dispatch(loginSuccess(data.data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}

export function startSignup() {
  return {
    type: SIGNUP_START,
  };
}

export function signupSuccess(user) {
  return {
    type: SIGNUP_SUCCESS,
    user,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILED,
    error,
  };
}

export function signup(name, email, password, confirm_password, contact) {
  return (dispatch) => {
    dispatch(startSignup());

    const url = APIurls.signup();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: getFormBody({ email, password, confirm_password, name, contact }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        if (data.success) {
          localStorage.setItem('token', data.data.token);
          dispatch(signupSuccess(data.data.user));
          return;
        }
        dispatch(signupFailed(data.message));
      });
  };
}
