import types from '../actions/actionTypes';
import initialState from './initialState';

/**
 * /**
 * Category reducer
 * handles category functions in state
 * @param {object} state
 * @param {object} action
 *
 * @returns {object} state
 */
export default function (state = initialState.categories, action) {
  switch (action.type) {
    case types.LOAD_CATEGORIES_SUCCESS:
      return action.categories;

    case types.ADD_CATEGORY_SUCCESS:
      return [...state, action.category];

    case types.UPDATE_CATEGORY_SUCCESS:
      return [...state.filter(category => category._id !== action.category._id),
        action.category
      ];

    case types.DELETE_CATEGORY_SUCCESS:
      return [...state.filter(category => category._id !== action.category._id)];

    default:
      return state;
  }
}
