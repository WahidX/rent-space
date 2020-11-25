import { UPDATE_MODE, UPDATE_PROPERTY } from './actionTypes';
import { APIurls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';

export function fetchProperty(filters) {
  let query = '';
  if (filters) {
    query = getFormBody(filters);
    console.log('FormBody: ', query);
  }

  return (dispatch) => {
    const url = APIurls.fetchProperty(query);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.data) {
          console.log('DATA from API : ', data.data.properties);
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
