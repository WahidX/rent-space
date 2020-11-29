import {
  UPDATE_MODE,
  UPDATE_PROPERTY,
  TOGGLE_FAVOURITE,
  TOGGLE_APPLY,
} from './actionTypes';
import { APIurls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';

export function fetchProperty(filters) {
  let query = '';
  if (filters) {
    query = getFormBody(filters);
    // console.log('FormBody: ', query);
  }

  return (dispatch) => {
    const url = APIurls.fetchProperty(query);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.data) {
          // console.log('DATA from API : ', data.data.properties);
          dispatch(updateProperty(data.data.properties));
        }
      });
  };
}

export function updateProperty(property) {
  return {
    type: UPDATE_PROPERTY,
    property,
  };
}

export function changeMode(mode) {
  return {
    type: UPDATE_MODE,
    mode,
  };
}

// localhost:8000/api/v1/user/toggle-fav/5fb81d1c1d809a11091dc0af
export function fetchToggleFavourite(id) {
  return (dispatch) => {
    const url = APIurls.toggleFavourite(id);
    const token = localStorage.getItem('token');
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.data) {
          // console.log('DATA from fav toggle API : ', data.data.favourites);
          dispatch(toggleFavourite(data.data.favourites));
        }
      });
  };
}

export function toggleFavourite(favourites) {
  return {
    type: TOGGLE_FAVOURITE,
    favourites,
  };
}

export function fetchToggleApply(id) {
  return (dispatch) => {
    const url = APIurls.toggleApply(id);
    const token = localStorage.getItem('token');
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: token,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.data) {
          // console.log('DATA from apply toggle API : ', data.data.applied);
          dispatch(toggleApply(data.data.applied));
        }
      });
  };
}

export function toggleApply(applied) {
  return {
    type: TOGGLE_APPLY,
    applied,
  };
}
