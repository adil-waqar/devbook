import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';
import './App.css';
// Redux
import { Provider } from 'react-redux';
import store from './store/store';
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
        <Switch>
          <Route path='/' exact component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
