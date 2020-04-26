import { SET_ALERT, REMOVE_ALERT } from '../actions/actionTypes';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERT:
      return setAlert(state, action.payload);
    case REMOVE_ALERT:
      return removeAlert(state, action.alertId);
    default:
      return state;
  }
};

const setAlert = (state, alert) => {
  return [...state, alert];
};

const removeAlert = (state, alertId) => {
  return state.filter((alert) => alert.id !== alertId);
};
