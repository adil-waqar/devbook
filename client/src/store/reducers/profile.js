import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  CLEAR_PROFILE,
  CREATE_PROFILE_START,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_ERROR
} from '../actions/actionTypes';

const initialState = {
  profile: null,
  profiles: [],
  repos: [],
  loading: false,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_START:
    case CREATE_PROFILE_START:
      return getProfileStart(state);
    case GET_PROFILE_SUCCESS:
      return getProfileSuccess(state, action.profile);
    case GET_PROFILE_ERROR:
    case CREATE_PROFILE_ERROR:
      return getProfileError(state, action.errors);
    case CLEAR_PROFILE:
      return initialState;
    case CREATE_PROFILE_SUCCESS:
      return createProfileSuccess(state);
    default:
      return state;
  }
};

const getProfileStart = (state) => {
  return {
    ...state,
    loading: true,
    errors: null
  };
};

const getProfileSuccess = (state, profile) => {
  return {
    ...state,
    profile,
    loading: false
  };
};

const getProfileError = (state, errors) => {
  return {
    ...state,
    errors,
    loading: false
  };
};

const createProfileSuccess = (state) => {
  return {
    ...state,
    loading: false
  };
};
