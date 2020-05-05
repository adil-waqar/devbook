import {
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_ERROR,
  CLEAR_PROFILE,
  CREATE_PROFILE_START,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_ERROR,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  DELETE_ACCOUNT_START,
  DELETE_ACCOUNT_ERROR,
  GET_PROFILES_START,
  GET_PROFILES_ERROR,
  GET_PROFILES_SUCCESS,
  GET_USER_PROFILE_START,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_ERROR,
  GET_REPOS_START,
  GET_REPOS_SUCCESS,
  GET_REPOS_ERROR,
  CLEAR_VISITING_PROFILE
} from '../actions/actionTypes';

const initialState = {
  profile: null,
  profiles: [],
  repos: null,
  visitingProfile: null,
  loading: false,
  loadingRepos: false,
  errors: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_START:
    case CREATE_PROFILE_START:
    case UPDATE_PROFILE_START:
    case DELETE_ACCOUNT_START:
    case GET_PROFILES_START:
    case GET_USER_PROFILE_START:
      return getProfileStart(state);
    case GET_REPOS_START:
      return getReposStart(state);
    case GET_PROFILE_SUCCESS:
      return getProfileSuccess(state, action.profile);
    case GET_PROFILE_ERROR:
    case CREATE_PROFILE_ERROR:
    case UPDATE_PROFILE_ERROR:
    case DELETE_ACCOUNT_ERROR:
    case GET_PROFILES_ERROR:
    case GET_USER_PROFILE_ERROR:
      return getProfileError(state, action.errors);
    case GET_REPOS_ERROR:
      return getReposError(state, action.errors);
    case CREATE_PROFILE_SUCCESS:
    case UPDATE_PROFILE_SUCCESS:
      return createProfileSuccess(state);
    case GET_PROFILES_SUCCESS:
      return getProfilesSuccess(state, action.profiles);
    case GET_USER_PROFILE_SUCCESS:
      return getUserProfileSuccess(state, action.profile);
    case GET_REPOS_SUCCESS:
      return getReposSuccess(state, action.repos);
    case CLEAR_VISITING_PROFILE:
      return clearVisitingProfile(state);
    case CLEAR_PROFILE:
      return initialState;
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

const getProfilesSuccess = (state, profiles) => {
  return {
    ...state,
    loading: false,
    profiles
  };
};

const getUserProfileSuccess = (state, profile) => {
  return {
    ...state,
    visitingProfile: profile,
    loading: false
  };
};

const getReposSuccess = (state, repos) => {
  return {
    ...state,
    loadingRepos: false,
    repos
  };
};

const clearVisitingProfile = (state) => {
  return {
    ...state,
    visitingProfile: null
  };
};

const getReposStart = (state) => {
  return {
    ...state,
    errors: null,
    loadingRepos: true
  };
};

const getReposError = (state, errors) => {
  return {
    ...state,
    errors,
    loadingRepos: false
  };
};
