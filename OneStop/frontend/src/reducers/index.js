import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import post from './post';
import topic from './topic';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  topic
});

// tihs file basically combines all the reducers we have  