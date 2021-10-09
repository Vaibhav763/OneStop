import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Alert from './component/layout/Alert';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import {Provider} from 'react-redux';
import store from './store'
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import React , {useEffect} from 'react';

import './App.css';

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // // log user out from all tabs if they log out in one tab
    // window.addEventListener('storage', () => {
    //   if (!localStorage.token) store.dispatch({ type: LOGOUT });
    // });
  }, []);
  return (
    <Provider store={store}>
    <Router>
    <div >
      <Navbar/>
      <Route exact path='/'><Landing/></Route>
      <Alert/>
      <Switch>
        <Route exact path='/login'> <Login/></Route>
        <Route exact path='/register'> <Register/></Route>
      </Switch>
    </div>
    </Router>
    </Provider>
    
  );
}


export default App;

//Proivder work as glue between react and redux