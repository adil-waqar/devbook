import {
  GET_PROFILE_SUCCESS,
  GET_PROFILE_START,
  GET_PROFILE_ERROR,
  CREATE_PROFILE_START,
  CREATE_PROFILE_SUCCESS,
  CREATE_PROFILE_ERROR
} from './actionTypes';
import { setAlert } from './alert';
import Axios from 'axios';

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

export const getUserProfile = () => async (dispatch) => {
  dispatch(getProfileStart());
  try {
    const response = await Axios.get('/api/profile/me');
    dispatch(getProfileSuccess(response.data.profile));
  } catch (error) {
    const msg = error.response.data.msg;
    dispatch(getProfileError(msg));
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
