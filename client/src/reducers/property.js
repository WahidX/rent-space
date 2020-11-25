import { UPDATE_PROPERTY, UPDATE_MODE } from '../actions/actionTypes';

const initialProperty = {
  mode: 'home',
  properties: [],
};

export default function property(state = initialProperty, action) {
  switch (action.type) {
    case UPDATE_PROPERTY:
      return {
        ...state,
        properties: action.property,
      };
    case UPDATE_MODE:
      return {
        ...state,
        mode: action.mode,
      };
    default:
      return state;
  }
}
