import { LOGIN_FAILED, LOGIN_START, LOGIN_SUCCESS } from './actionTypes';
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
          dispatch(loginSuccess(data.user));
          return;
        }
        dispatch(loginFailed(data.message));
      });
  };
}
