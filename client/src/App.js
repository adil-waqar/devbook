import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alerts from './components/layout/Alert';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import ProfileForm from './components/profile-forms/ProfileForm';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store/store';
// action
import { loadUser } from './store/actions/auth';

const App = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) store.dispatch(loadUser(token));
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route path='/' exact component={Landing} />
        <section className='container'>
          <Alerts />
          <Switch>
            <Route path='/login' exact component={Login} />
            <Route path='/register' exact component={Register} />
            <PrivateRoute path='/dashboard' exact component={Dashboard} />
            <PrivateRoute
              path='/create-profile'
              exact
              component={ProfileForm}
            />
            <PrivateRoute path='/edit-profile' exact component={ProfileForm} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
};

export default App;
