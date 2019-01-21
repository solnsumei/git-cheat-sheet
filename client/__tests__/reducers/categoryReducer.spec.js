import expect from 'expect';
import reducer from '../../src/reducers/categoryReducer';
import mockItems from '../__mocks__/mockItems';
import {
  loadCategoriesSuccess,
  addCategorySuccess,
  updateCategorySuccess,
  deleteCategorySuccess
} from '../../src/actions/categoryActions';

let initialState = [];
let newState;

describe('Category reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, initialState)).toEqual(initialState);
  });

  it('should handle LOAD_CATEGORIES_SUCCESS', () => {
    newState = reducer(initialState, loadCategoriesSuccess(mockItems.categories));
    expect(newState).toEqual(mockItems.categories);
  });

  it('should handle ADD_CATEGORY_SUCCESS', () => {
    newState = reducer(initialState, addCategorySuccess(mockItems.category));
    expect(newState).toEqual([mockItems.category]);
  });

  it('should handle UPDATE_CATEGORY_SUCCESS', () => {
    initialState = [{ _id: 'cgshsshs', name: 'Fake Category' }];
    newState = reducer(initialState, updateCategorySuccess(mockItems.category));
    expect(newState).toEqual([mockItems.category]);
  });

  it('should handle DELETE_BOOK_SUCCESS', () => {
    initialState = [mockItems.category];
    newState = reducer(initialState, deleteCategorySuccess(mockItems.category));
    expect(newState).toEqual([]);
  });
});
