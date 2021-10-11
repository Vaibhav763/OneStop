import React , {useEffect} from 'react';
import Navbar from './component/layout/Navbar';
import Landing from './component/layout/Landing';
import Login from './component/auth/Login';
import Register from './component/auth/Register';
import Alert from './component/layout/Alert';
import Dashboard from './component/dashboard/Dashboard';
import ProfileForm from './component/profile_forms/ProfileForm';
import PrivateRoute from './component/routing/PrivateRoute';
import AddExperience from './component/profile_forms/AddExperience';
import AddEducation from './component/profile_forms/AddEducation';
import Profiles from './component/profiles/Profiles';
import Profile from './component/profile/Profile';
import Posts from './component/posts/Posts';
import Post from './component/post/Post';
import NotFound from './component/layout/NotFound';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store'
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';

import './App.css';

const App = () => {
  useEffect(() => {
    // check for token in LS
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
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
        <Route exact path='/profiles'> <Profiles/></Route>
        <Route exact path='/profile/:id'> <Profile/></Route>
        <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute>
        <PrivateRoute exact path='/create_profile' component={ProfileForm}></PrivateRoute>
        <PrivateRoute exact path='/add_experience' component={AddExperience}></PrivateRoute>
        <PrivateRoute exact path='/add_education' component={AddEducation}></PrivateRoute>
        <PrivateRoute exact path="/posts" component={Posts} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <Route component={NotFound}></Route>
      </Switch>
    </div>
    </Router>
    </Provider>
    
  );
}


export default App;

//Proivder work as glue between react and redux