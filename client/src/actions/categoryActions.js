import axios from 'axios';
import types from './actionTypes';
import { checkToken, logoutUser } from '../utils/helpers';
/**
 * Triggers the category reducer to add category to state
 * @param {Object} category
 *
 * @returns {Object} with a type as string and a category object
 */
export const addCategorySuccess = category => ({
  type: types.ADD_CATEGORY_SUCCESS, category
});

/**
 * Triggers the category reducer to update category array in state
 * @param {Object} categories
 *
 * @returns {Object} with a type as string and a categories array
 */
export const loadCategoriesSuccess = categories => ({
  type: types.LOAD_CATEGORIES_SUCCESS, categories
});

/**
 * Triggers the category reducer to update category in state
 * @param {Object} category
 *
 * @returns {Object} with a type as string and a category object
 */
export const updateCategorySuccess = category => ({
  type: types.UPDATE_CATEGORY_SUCCESS, category
});

/**
 * Triggers the category reducer to delete category in state
 * @param {Object} category
 *
 * @returns {Object} with a type as string and a category object
 */
export const deleteCategorySuccess = category => ({
  type: types.DELETE_CATEGORY_SUCCESS, category
});

/**
 * Error action type to call when action fails
 * @param {void} null
 *
 * @returns {string} type
 */
const actionError = () => ({
  type: types.FAILED_ACTION
});

/**
 * Fetches all categories from the api endpoint
 *
 * @returns {function} dispatch
 */
export const loadCategories = () => dispatch => axios.get('/categories')
  .then(({ data }) => dispatch(loadCategoriesSuccess(data.categories)))
  .catch(() => dispatch(actionError()));

/**
 * Fetch single category
 *
 * @param {string} categoryId
 * @returns {Function} dispatch
 */
export const fetchCategory = categoryId => dispatch => axios.get(`/categories/${categoryId}`)
  .then(({ data }) => dispatch(updateCategorySuccess(data.category)))
  .catch(() => dispatch(actionError()));

/**
 * Creates or updates a category
 * @param {Object} category
 *
 * @returns {function} dispatch
 */
export const saveOrUpdateCategory = category => (dispatch) => {
  if (!checkToken(dispatch)) return dispatch(logoutUser());

  if (category._id) {
    // updates category
    return axios.put(`/categories/${category._id}`,
      category)
      .then(({ data }) => dispatch(updateCategorySuccess(data.category)));
  }

  // create a category call
  return axios.post('/categories', category)
    .then(({ data }) => dispatch(addCategorySuccess(data.category)));
};

/**
 * Delete a category
 * @param {Object} category - book to add quantity to
 *
 * @returns {function} dispatch
 */
export const deleteCategory = category => (dispatch) => {
  if (!checkToken(dispatch)) return dispatch(logoutUser());

  return axios.delete(`/categories/${category._id}`)
    .then(() => dispatch(deleteCategorySuccess(category)));
};

/**
 * Creates or updates a command
 * @param {string} searchQuery
 *
 * @returns {function} dispatch
 */
export const searchCommands = (searchQuery = null) => (dispatch) => {
  axios.post('/commands/search', { searchQuery })
    .then(({ data }) => dispatch(loadCategoriesSuccess(data.categories)))
    .catch(() => dispatch(actionError()));
};

/**
 * Creates or updates a command
 * @param {Object} command
 *
 * @returns {function} dispatch
 */
export const saveOrUpdateCommand = command => (dispatch) => {
  if (!checkToken(dispatch)) return dispatch(logoutUser());

  if (command._id) {
    // updates command
    return axios.put(`/commands/${command._id}`,
      command)
      .then(({ data }) => dispatch(fetchCategory(data.command.category)));
  }

  // create a command call
  return axios.post('/commands', command)
    .then(({ data }) => dispatch(fetchCategory(data.command.category)));
};

/**
 * Deletes a command
 * @param {Object} command
 *
 * @returns {function} dispatch
 */
export const deleteCommand = command => (dispatch) => {
  if (!checkToken(dispatch)) return dispatch(logoutUser());

  return axios.delete(`/commands/${command._id}`)
    .then(({ data }) => {
      dispatch(fetchCategory(command.category));
    })
    .catch(({ response }) => {
      dispatch(actionError());
    });
};
