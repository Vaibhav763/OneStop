import api from './api';

const setAuthToken = token => {
  if (token) {
    //console.log(token);
    api.defaults.headers.common['x-auth-token'] = token; //*
    localStorage.setItem('token',token);
  } else {
    delete api.defaults.headers.common['x-auth-token'];
    localStorage.removeItem('token');
  }
};

export default setAuthToken;


// this file handles both the setting of the token in local storage and in axios headers.

//*=
// this line is similar to setting headers in POSTMAN
// so that database know which data has to be accessed 
// linked to that particular passed token 