import { UPDATE_PROPERTY } from '../actions/actionTypes';

export default function property(state = [], action) {
  switch (action.type) {
    case UPDATE_PROPERTY:
      return action.property;
    default:
      return state;
  }
}
