import { combineReducers } from 'redux';
import property from './property';
import auth from './auth';

export default combineReducers({
  property,
  auth,
});
