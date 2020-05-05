import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_START,
  GET_PROFILE_ERROR,
  CREATE_PROFILE_START,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_ERROR,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_ERROR,
  DELETE_ACCOUNT_ERROR,
  DELETE_ACCOUNT_START,
  DELETE_ACCOUNT_SUCCESS,
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
} from './actionTypes';
import { setAlert } from './alert';
import Axios from 'axios';
import { logout } from './auth';

const getProfileSuccess = (profile) => {
  return {
    type: GET_PROFILE_SUCCESS,
    profile
  };
};

const getProfileError = (errors) => {
  return {
    type: GET_PROFILE_ERROR,
    errors
  };
};

const getProfileStart = () => {
  return {
    type: GET_PROFILE_START
  };
};

const createProfileStart = () => {
  return {
    type: CREATE_PROFILE_START
  };
};

const createProfileSuccess = () => {
  return {
    type: CREATE_PROFILE_SUCCESS
  };
};

const createProfileError = (errors) => {
  return {
    type: CREATE_PROFILE_ERROR,
    errors
  };
};

const updateProfileStart = () => {
  return {
    type: UPDATE_PROFILE_START
  };
};

const updateProfileSuccess = () => {
  return {
    type: UPDATE_PROFILE_SUCCESS
  };
};

const updateProfileError = (errors) => {
  return {
    type: UPDATE_PROFILE_ERROR,
    errors
  };
};

const deleteAccountStart = () => {
  return {
    type: DELETE_ACCOUNT_START
  };
};

const deleteAccountSuccess = () => {
  return {
    type: DELETE_ACCOUNT_SUCCESS
  };
};

const deleteAccountError = (errors) => {
  return {
    type: DELETE_ACCOUNT_ERROR,
    errors
  };
};

const getProfilesStart = () => {
  return {
    type: GET_PROFILES_START
  };
};

const getProfilesSuccess = (profiles) => {
  return {
    type: GET_PROFILES_SUCCESS,
    profiles
  };
};

const getProfilesError = (errors) => {
  return {
    type: GET_PROFILES_ERROR,
    errors
  };
};

const getUserProfileStart = () => {
  return {
    type: GET_USER_PROFILE_START
  };
};

const getUserProfileSuccess = (profile) => {
  return {
    type: GET_USER_PROFILE_SUCCESS,
    profile
  };
};

const getUserProfileError = (errors) => {
  return {
    type: GET_USER_PROFILE_ERROR,
    errors
  };
};

const getReposStart = () => {
  return {
    type: GET_REPOS_START
  };
};

const getReposSuccess = (repos) => {
  return {
    type: GET_REPOS_SUCCESS,
    repos
  };
};

const getReposError = (errors) => {
  return {
    type: GET_REPOS_ERROR,
    errors
  };
};

export const clearVisitingProfile = () => {
  return {
    type: CLEAR_VISITING_PROFILE
  };
};

// Get user profile
export const getUserProfile = () => async (dispatch) => {
  dispatch(getProfileStart());
  try {
    const response = await Axios.get('/api/profile/me');
    dispatch(getProfileSuccess(response.data.profile));
  } catch (error) {
    const response = error.response.data;
    dispatch(getProfileError(response));
  }
};

// Get all profles
export const getAllProfiles = () => async (dispatch) => {
  dispatch(getProfilesStart());
  try {
    const response = await Axios.get('/api/profile');
    dispatch(getProfilesSuccess(response.data.profiles));
  } catch (error) {
    const response = error.response.data;
    dispatch(getProfilesError(response));
  }
};

// Get profile by userId
export const getProfileById = (userId) => async (dispatch) => {
  dispatch(getUserProfileStart());
  try {
    const response = await Axios.get(`/api/profile/user/${userId}`);
    dispatch(getUserProfileSuccess(response.data.profile));
  } catch (error) {
    const response = error.response.data;
    dispatch(getUserProfileError(response));
  }
};

// Get github repos
export const getRepos = (username) => async (dispatch) => {
  try {
    dispatch(getReposStart());
    const response = await Axios.get(`/api/profile/github/${username}`);
    dispatch(getReposSuccess(response.data.githubRepos));
  } catch (error) {
    const response = error.response.data;
    dispatch(getReposError(response));
  }
};

// Create or update User profile
export const createUserProfile = (data, history, edit = false) => async (
  dispatch
) => {
  dispatch(createProfileStart());
  try {
    await Axios.post('/api/profile', data);
    dispatch(createProfileSuccess());
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));
    if (!edit) history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      dispatch(createProfileError(errors));
    } else {
      const { msg, statusCode } = error.response.data;
      dispatch(
        createProfileError({
          msg,
          statusCode
        })
      );
    }
  }
};

// Add an experience
export const addExperience = (experience, history) => async (dispatch) => {
  dispatch(updateProfileStart());
  try {
    await Axios.put('/api/profile/experience', experience);
    dispatch(updateProfileSuccess());
    dispatch(setAlert('Experience added', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;
    console.log(error);
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      dispatch(createProfileError(errors));
    } else {
      const { msg, statusCode } = error.response.data;
      dispatch(
        updateProfileError({
          msg,
          statusCode
        })
      );
    }
  }
};

// Add Education
export const addEducation = (education, history) => async (dispatch) => {
  dispatch(updateProfileStart());
  try {
    await Axios.put('/api/profile/education', education);
    dispatch(updateProfileSuccess());
    dispatch(setAlert('Education added', 'success'));
    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      dispatch(createProfileError(errors));
    } else {
      const { msg, statusCode } = error.response.data;
      dispatch(
        updateProfileError({
          msg,
          statusCode
        })
      );
    }
  }
};

// Remove Experience
export const removeExperience = (id) => async (dispatch) => {
  dispatch(updateProfileStart());
  try {
    await Axios.delete(`/api/profile/experience/${id}`);
    dispatch(updateProfileSuccess());
    dispatch(setAlert('Experience removed', 'success'));
    dispatch(getUserProfile());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      dispatch(createProfileError(errors));
    } else {
      const { msg, statusCode } = error.response.data;
      dispatch(
        updateProfileError({
          msg,
          statusCode
        })
      );
    }
  }
};

// Remove Education
export const removeEducation = (id) => async (dispatch) => {
  dispatch(updateProfileStart());
  try {
    await Axios.delete(`/api/profile/education/${id}`);
    dispatch(updateProfileSuccess());
    dispatch(setAlert('Education removed', 'success'));
    dispatch(getUserProfile());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      dispatch(createProfileError(errors));
    } else {
      const { msg, statusCode } = error.response.data;
      dispatch(
        updateProfileError({
          msg,
          statusCode
        })
      );
    }
  }
};

// Delete account
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm('Are you sure?')) {
    dispatch(deleteAccountStart());
    try {
      await Axios.delete(`/api/users/me`);
      dispatch(setAlert('Account removed', 'success'));
      dispatch(deleteAccountSuccess());
      dispatch(logout());
    } catch (error) {
      const errors = error.response.data.errors;
      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
        dispatch(createProfileError(errors));
      } else {
        const { msg, statusCode } = error.response.data;
        dispatch(
          deleteAccountError({
            msg,
            statusCode
          })
        );
      }
    }
  } else {
    dispatch(setAlert('Good move! ;)', 'success'));
    window.scrollTo(0, 0);
  }
};
