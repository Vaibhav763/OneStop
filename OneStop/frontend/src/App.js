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
import Topics from './component/topics/Topics';
import Questions from './component/questions/Questions';
import TopicPosts from './component/questions/TopicPosts';
import ProfileFollowers from './component/profile/ProfileFollowers';
import ProfileFollowed from './component/profile/ProfileFollowed';
import ChangePassword from './component/profile_forms/ChangePassword';

// for routing of our components
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

// to link redux store to our React components
import {Provider} from 'react-redux';
import store from './store'

// to manage authentication of user (login/logout)
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import { LOGOUT } from './actions/types';

// css file
import './App.css';

const App = () => {
  useEffect(() => {
    // check for token in local storage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  //Proivder work as glue between react and redux
  
  return (
    <Provider store={store}>
    <Router>
    <div >
      <Navbar/>
      <Alert/>
      <Switch>
        <Route exact path='/'><Landing/></Route>
        <Route exact path='/login'> <Login/></Route>
        <Route exact path='/register'> <Register/></Route>
        <PrivateRoute exact path='/dashboard' component={Dashboard}></PrivateRoute>
        <PrivateRoute exact path='/create_profile' component={ProfileForm}></PrivateRoute>
        <PrivateRoute exact path='/add_experience' component={AddExperience}></PrivateRoute>
        <PrivateRoute exact path='/add_education' component={AddEducation}></PrivateRoute>
        <PrivateRoute exact path='/profiles' component={Profiles}></PrivateRoute>
        <PrivateRoute exact path='/profile/:id' component={Profile}></PrivateRoute>
        <PrivateRoute exact path='/profile/:id/followers' component={ProfileFollowers}></PrivateRoute>
        <PrivateRoute exact path='/profile/:id/following' component={ProfileFollowed}></PrivateRoute>
        <PrivateRoute exact path="/me/posts" component={Posts} />
        <PrivateRoute exact path="/posts" component={Questions} />
        <PrivateRoute exact path="/posts/:id" component={Post} />
        <PrivateRoute exact path="/topics" component={Topics} />
        <PrivateRoute exact path="/posts/explore/:topic" component={TopicPosts} />
        <Route exact path="/reset_password/:token" component={ChangePassword} />
        <Route component={NotFound}></Route>
      </Switch>
    </div>
    </Router>
    </Provider>
    
  );
}


export default App;

