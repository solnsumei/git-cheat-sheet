import jwt from 'jsonwebtoken';
import axios from 'axios';
import types from '../actions/actionTypes';

export const clearToken = () => {
  localStorage.removeItem(types.USER_TOKEN);
  delete axios.defaults.headers.common['auth-token'];
};

/**
 * Checks for valid jwt token in local Storage
 *
 * @param {Callback} dispatch
 * @returns {Object|boolean} user or false
*/
export const checkToken = () => {
  const userToken = localStorage.getItem(types.USER_TOKEN);

  if (!userToken) return false;
  const decoded = jwt.decode(userToken);
  if (!decoded || decoded.exp * 1000 < (new Date().getTime())) {
    clearToken();
    return false;
  }

  // set user to the decoded token
  return decoded.user;
};

/**
 * Triggers user reducer log out user
 *
 * @returns {Object} with string type
 */
export const logoutUser = () => ({ type: types.USER_LOGOUT });
