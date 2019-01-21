import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import types from '../../src/actions/actionTypes';
import mockCheckToken from '../__mocks__/mockCheckToken';
import mockFailedAuth from '../__mocks__/mockFailedAuth';
import mockItems from '../__mocks__/mockItems';
import {
  saveOrUpdateCategory,
  saveOrUpdateCommand,
  loadCategories,
  fetchCategory,
  searchCommands,
  deleteCategory,
  deleteCommand
} from '../../src/actions/categoryActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- categoryActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    return mockCheckToken();
  });
  afterEach(() => moxios.uninstall());

  // load categories action
  describe('loadCategories', () => {
    it('should create a LOAD_CATEGORIES_SUCCESS action', (done) => {
      moxios.stubRequest('/categories', {
        status: 200,
        response: {
          success: true,
          message: 'Categories loaded successfully',
          categories: mockItems.categories
        }
      });

      const expectedActions = [
        {
          type: types.LOAD_CATEGORIES_SUCCESS,
          categories: mockItems.categories
        }
      ];

      store.dispatch(loadCategories())
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed load categories request
    it('should create a FAILED_ACTION action', (done) => {
      moxios.stubRequest('/categories', {
        status: 400,
        response: {
          success: false,
          error: { message: 'There was an error' }
        }
      });

      const expectedActions = [
        {
          type: types.FAILED_ACTION
        }
      ];

      store.dispatch(loadCategories())
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('addCategory', () => {
    it('should create an ADD_CATEGORY_SUCCESS action', (done) => {
      moxios.stubRequest('/categories', {
        status: 201,
        response: {
          success: true,
          category: mockItems.category
        }
      });

      const expectedActions = [
        {
          type: types.ADD_CATEGORY_SUCCESS,
          category: mockItems.category
        }
      ];

      store.dispatch(saveOrUpdateCategory(mockItems.categoryWithoutId))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('updateCategory', () => {
    it('should create an UPDATE_CATEGORY_SUCCESS action', (done) => {
      moxios.stubRequest('/categories/cgshsshs', {
        status: 200,
        response: {
          success: true,
          category: mockItems.category
        }
      });

      const expectedActions = [
        {
          type: types.UPDATE_CATEGORY_SUCCESS,
          category: mockItems.category
        }
      ];

      store.dispatch(saveOrUpdateCategory(mockItems.category))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  describe('deleteCategoryAction', () => {
    it('should create a LOAD_CATEGORIES_SUCCESS action', (done) => {
      moxios.stubRequest('/categories/cgshsshs', {
        status: 200,
        response: {
          success: true,
          message: 'category was deleted successfully',
          category: mockItems.category
        }
      });

      const expectedActions = [
        {
          type: types.DELETE_CATEGORY_SUCCESS,
          category: mockItems.category
        }
      ];

      store.dispatch(deleteCategory(mockItems.category))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });

    // failed delete request
    it('should create a Delete FAILED_ACTION action', (done) => {
      mockFailedAuth();
      const expectedActions = [
        {
          type: types.USER_LOGOUT
        }
      ];

      store.dispatch(deleteCategory(mockItems.category));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
  });

  describe('Failed Authentication', () => {
    it('should create a FAILED_ACTION action', (done) => {
      mockFailedAuth();
      const expectedActions = [
        {
          type: types.USER_LOGOUT
        }
      ];

      store.dispatch(saveOrUpdateCategory('AEE'));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
  });

  describe('addCommand', () => {
    it('should fail when user is not logged in', (done) => {
      mockFailedAuth();
      const expectedActions = [
        {
          type: types.USER_LOGOUT
        }
      ];

      store.dispatch(saveOrUpdateCommand(mockItems.commandWithoutId));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
  });

  describe('Update Command', () => {
    it('should fail when user is not logged in', (done) => {
      mockFailedAuth();
      const expectedActions = [
        {
          type: types.USER_LOGOUT
        }
      ];

      store.dispatch(saveOrUpdateCommand(mockItems.command));
      const actions = store.getActions();
      expect(actions).toEqual(expectedActions);
      done();
    });
  });

  describe('Fetch Single Category', () => {
    it('should create a UPDATE_CATEGORY_SUCCESS action', (done) => {
      moxios.stubRequest('/categories/cgshsshs', {
        status: 200,
        response: {
          success: true,
          message: 'category fetched successfully',
          category: mockItems.category
        }
      });

      const expectedActions = [
        {
          type: types.UPDATE_CATEGORY_SUCCESS,
          category: mockItems.category
        }
      ];

      store.dispatch(fetchCategory(mockItems.category._id))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });
});
