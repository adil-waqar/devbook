import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Components
import Register from '../auth/Register';
import Login from '../auth/Login';
import Alerts from '../layout/Alert';
import Dashboard from '../dashboard/Dashboard';
import PrivateRoute from '../routing/PrivateRoute';
import ProfileForm from '../profile-forms/ProfileForm';
import AddExperience from '../profile-forms/AddExperience';
import AddEducation from '../profile-forms/AddEducation';
import Profiles from '../profiles/Profiles';
import Profile from '../profile/Profile';
import Posts from '../posts/Posts';
import Post from '../post/Post';
import NotFound from '../layout/NotFound';

const Routes = () => {
  return (
    <section className='container'>
      <Alerts />
      <Switch>
        <Route path='/login' exact component={Login} />
        <Route path='/register' exact component={Register} />
        <Route path='/profiles' exact component={Profiles} />
        <Route path='/profile/:id' exact component={Profile} />
        <PrivateRoute path='/dashboard' exact component={Dashboard} />
        <PrivateRoute path='/create-profile' exact component={ProfileForm} />
        <PrivateRoute path='/edit-profile' exact component={ProfileForm} />
        <PrivateRoute path='/add-experience' exact component={AddExperience} />
        <PrivateRoute path='/add-education' exact component={AddEducation} />
        <PrivateRoute path='/posts' exact component={Posts} />
        <PrivateRoute path='/posts/:id' exact component={Post} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

export default Routes;
