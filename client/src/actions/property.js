import { UPDATE_PROPERTY } from './actionTypes';
import { APIurls } from '../helpers/urls';

export function fetchProperty() {
  return (dispatch) => {
    const url = APIurls.fetchProperty(1, 5);
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('DATA from API : ', data.data.properties);
        dispatch(updateProperty(data.data.properties));
      });
  };
}

export function updateProperty(property) {
  return {
    type: UPDATE_PROPERTY,
    property,
  };
}
