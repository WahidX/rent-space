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
  TOGGLE_FAVOURITE,
  TOGGLE_APPLY,
} from '../actions/actionTypes';

const initialAuthState = {
  user: {},
  error: null,
  isLoggedin: false,
  inProgress: false,
};

export default function auth(state = initialAuthState, action) {
  switch (action.type) {
    case SIGNUP_START:
    case LOGIN_START:
      return {
        ...state,
        inProgress: true,
      };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        inProgress: false,
        isLoggedin: true,
        error: null,
      };
    case SIGNUP_FAILED:
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
        inProgress: false,
      };
    case AUTHENTICATE_USER:
      return {
        ...state,
        user: action.user,
        isLoggedin: true,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        isLoggedin: false,
      };
    case CLEAR_AUTH_STATE:
      return {
        ...state,
        inProgress: false,
        error: null,
      };
    case TOGGLE_FAVOURITE:
      return {
        ...state,
        user: {
          ...state.user,
          favourites: action.favourites,
        },
      };
    case TOGGLE_APPLY:
      return {
        ...state,
        user: {
          ...state.user,
          applied: action.applied,
        },
      };

    default:
      return state;
  }
}
