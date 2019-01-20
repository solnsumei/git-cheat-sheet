import axios from 'axios';
import jwt from 'jsonwebtoken';
import types from './actionTypes';
import { checkToken, clearToken, logoutUser } from '../utils/helpers';
import { searchCommands, loadCategories } from './categoryActions';

/**
 * Validates authenticated user
 * @param {Object} user
 *
 * @returns {Object} with string type and user object
 */
const userAuthSuccess = (user) => {
  axios.defaults.headers.common['auth-token'] = localStorage.getItem(types.USER_TOKEN);
  return { type: types.USER_AUTH_SUCCESS, user };
};

/**
 * Dispatched when authentication fails
 *
 * @returns {Object} with string type
 */
const userAuthFailed = () => ({
  type: types.USER_AUTH_FAILED
});

/**
 * Sets user data in localStorage and dispatches authSuccess action
 * @param {Object} data
 *
 * @returns {function} dispatch
 */
const setUser = data => (dispatch) => {
  localStorage.setItem(types.USER_TOKEN, data.token);
  return dispatch(userAuthSuccess(data.user));
};

/**
 * Logs user out of the application
 * removes all localStorage items set by app
 *
 * @returns {function} dispatch
 */
export const logoutRequest = () => (dispatch) => {
  clearToken();
  return dispatch(logoutUser());
};

/**
 * Checks user is still authenticated
 * @param {Object} user
 *
 * @returns {function} dispatch
 */
export const checkAuthentication = () => (dispatch) => {
  const user = checkToken();
  if (!user) {
    dispatch(userAuthFailed());
    return dispatch(searchCommands());
  }
  dispatch(userAuthSuccess(user));
  return dispatch(loadCategories());
};

/**
 * Logs user into the app
 * @param {string} loginData
 *
 * @returns {function} dispatch
 */
export const loginRequest = loginData => dispatch => axios.post('/login', loginData)
  .then(({ data }) => dispatch(setUser(data)));

/**
 * Creates user account
 * @param {string} userData
 *
 * @returns {function} dispatch
 */
export const userSignUpRequest = userData => dispatch => axios.post('/signup', userData)
  .then(({ data }) => dispatch(setUser(data)));
