import { combineReducers } from 'redux';
import user from './userReducer';
import categories from './categoryReducer';

/**
 * rootReducer function
 * Combines all the reducers available for state
 * @param {Object} state
 * @param {Object} action
 *
 * @returns {function} combineReducer
 */
const rootReducer = combineReducers({
  user,
  categories
});

export default rootReducer;
