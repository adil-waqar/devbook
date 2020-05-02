import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOAD_USER,
  LOGOUT,
  CLEAR_PROFILE
} from './actionTypes';
import Axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../../utils//setAuthToken';

const authStart = () => {
  return {
    type: AUTH_START
  };
};

const authSuccess = (token) => {
  localStorage.setItem('token', token);
  return {
    type: AUTH_SUCCESS,
    token
  };
};

const authFail = (errors) => {
  localStorage.removeItem('token');
  return {
    type: AUTH_FAIL,
    errors
  };
};

const setUser = (user) => {
  return {
    type: LOAD_USER,
    user
  };
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  dispatch({
    type: CLEAR_PROFILE
  });
  dispatch({
    type: LOGOUT
  });
};

export const register = (name, email, password) => async (dispatch) => {
  dispatch(authStart());
  try {
    const response = await Axios.post('/api/users', {
      name,
      email,
      password
    });
    const token = response.data.token;
    dispatch(authSuccess(token));
    dispatch(loadUser(token));
  } catch (error) {
    const errors = error.response.data.errors;
    dispatch(authFail(errors));
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch(authStart());
  try {
    const response = await Axios.post('/api/auth', {
      email,
      password
    });
    const token = response.data.token;
    dispatch(authSuccess(token));
    dispatch(loadUser(token));
  } catch (error) {
    const errors = error.response.data.errors;
    dispatch(authFail(errors));
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

export const loadUser = (token) => async (dispatch) => {
  dispatch(authStart());
  setAuthToken(token);
  try {
    const response = await Axios.get('/api/auth');
    dispatch(authSuccess(token));
    dispatch(setUser(response.data.user));
  } catch (error) {
    dispatch(authFail(error.response.data.msg));
  }
};
