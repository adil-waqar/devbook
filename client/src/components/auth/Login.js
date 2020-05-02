import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from '../../store/actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../UI/Spinner/Spinner';

const Login = ({ login, isAuthenticated, loading }) => {
  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const { email, password } = state;

  const inputHandler = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) return <Redirect to='/dashboard' />;

  return !loading ? (
    <Fragment>
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign Into Your Account
      </p>
      <form
        onSubmit={submitHandler}
        className='form'
        action='create-profile.html'
      >
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={inputHandler}
            name='email'
          />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={inputHandler}
            minLength='6'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Login' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
  ) : (
    <Spinner />
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, { login })(Login);
