import {
  LOGIN_FAILED,
  LOGIN_START,
  LOGIN_SUCCESS,
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILED,
  AUTHENTICATE_USER,
  LOGOUT,
  CLEAR_AUTH_STATE,
} from './actionTypes';

import { APIurls, SERVER_ROOT } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';
import axios from 'axios';

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
        console.log('LOGIN data: ', data);

        if (data.success) {
          // action to save user
          localStorage.setItem('token', data.data.token);
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

export function fetchUser() {
  return (dispatch) => {
    const token = localStorage.getItem('token');
    const url = APIurls.fetchUser();

    var config = {
      method: 'GET',
      url,
      headers: {
        Authorization: token,
      },
    };

    axios(config)
      .then(function (response) {
        console.log('reponse: ', response.data);
        dispatch(authenticateUser(response.data.data.user));
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export function authenticateUser(user) {
  return {
    type: AUTHENTICATE_USER,
    user,
  };
}

export function logoutUser() {
  return {
    type: LOGOUT,
  };
}

export function clearAuthState() {
  return {
    type: CLEAR_AUTH_STATE,
  };
}

export function updateProfileAPI(id, formData) {
  return (dispatch) => {
    //disabling the submit button
    dispatch(startSignup());

    const _url = APIurls.updateProfile(id);
    const token = localStorage.getItem('token');
    var data = formData;
    var config = {
      method: 'post',
      url: _url,
      headers: {
        Authorization: token,
      },
      data,
    };

    axios(config)
      .then(function (response) {
        console.log('Response: ', response.data.data);
        response.data.data.user.avatar =
          SERVER_ROOT + response.data.data.user.avatar;

        if (response.data.success) {
          dispatch(loginSuccess(response.data.data.user));
        }
        dispatch(clearAuthState());
      })
      .catch(function (error) {
        console.log('Err: ', error);
      });
  };
}
