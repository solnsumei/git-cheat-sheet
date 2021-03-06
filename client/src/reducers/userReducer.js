import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * User reducer
 * handles creating, authentication, fetching, updating users in state
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} state
 */
export default function (state = initialState.user, action) {
  switch (action.type) {
    case types.USER_AUTH_SUCCESS:
      return action.user;

    case types.USER_AUTH_FAILED:
      return state;

    case types.USER_LOGOUT:
      return null;

    default:
      return state;
  }
}
