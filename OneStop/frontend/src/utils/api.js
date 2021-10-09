import axios from 'axios';

// creating a new instance(here api) of axios with a custom config.
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;


/** Axios is used to communicate with the backend and it also supports the Promise API 
 It is a library which is used to make requests to an API, return data from the API,
and then do things with that data in our React application. **/