import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';

export default combineReducers({
  alert,
  auth
});

// tihs file basically combines all the reducers we have  