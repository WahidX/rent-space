import { UPDATE_PROPERTY } from './actionTypes';

export function fetchProperty() {
  return (dispatch) => {
    const url = 'http://localhost:8000';
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log('DATA: ', data.data.properties);
        dispatch(updateProperty(data.data.properties));
      });
  };
}

export function updateProperty(property) {
  console.log('UPD::::::, ', UPDATE_PROPERTY);
  return {
    type: UPDATE_PROPERTY,
    property,
  };
}
