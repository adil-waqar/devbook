import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  LOAD_USER,
  LOGOUT
} from '../actions/actionTypes';

const initialState = {
  token: null,
  isAuthenticated: false,
  loading: false,
  user: null,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return authStart(state);
    case AUTH_SUCCESS:
      return authSuccess(state, action.token);
    case AUTH_FAIL:
      return authFail(initialState, action.errors);
    case LOAD_USER:
      return loadUser(state, action.user);
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

const authStart = (state) => {
  return {
    ...state,
    loading: true,
    errors: null
  };
};

const authSuccess = (state, token) => {
  return {
    ...state,
    token,
    loading: false
  };
};

const authFail = (initialState, errors) => {
  return {
    ...initialState,
    errors
  };
};

const loadUser = (state, user) => {
  return {
    ...state,
    user,
    isAuthenticated: true
  };
};
