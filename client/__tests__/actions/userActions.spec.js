import expect from 'expect';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import types from '../../src/actions/actionTypes';
import mockCheckToken from '../__mocks__/mockCheckToken';
import mockFailedAuth from '../__mocks__/mockFailedAuth';
import mockItems from '../__mocks__/mockItems';
import {
  loginRequest, userSignUpRequest,
  checkAuthentication, logoutRequest
} from '../../src/actions/userActions';

let store = null;
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('>>>A C T I O N --- userActions', () => {
  beforeEach(() => {
    moxios.install();
    store = mockStore({});
    // return mockAuthCheck();
  });
  afterEach(() => moxios.uninstall());

  // Sign up User Action
  describe('User sign up action', () => {
    it('should create a USER_AUTH_SUCCESS action', (done) => {
      moxios.stubRequest('/signup', {
        status: 201,
        response: {
          success: true,
          message: 'User sign up successful',
          user: mockItems.user
        }
      });

      const expectedActions = [
        {
          type: types.USER_AUTH_SUCCESS,
          user: mockItems.user
        }
      ];

      store.dispatch(userSignUpRequest(mockItems.user))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Sign in User Action
  describe('User sign in action', () => {
    it('should create a USER_AUTH_SUCCESS action', (done) => {
      moxios.stubRequest('/login', {
        status: 200,
        response: {
          success: true,
          message: 'Welcome back',
          user: mockItems.user
        }
      });

      const expectedActions = [
        {
          type: types.USER_AUTH_SUCCESS,
          user: mockItems.user
        }
      ];

      store.dispatch(loginRequest(mockItems.user))
        .then(() => {
          const actions = store.getActions();
          expect(actions).toEqual(expectedActions);
          done();
        });
    });
  });

  // Authenticated User Actions
  describe('User normal actions with token', () => {
    beforeEach(() => {
      mockCheckToken();
    });

    // User log out
    describe('User log out', () => {
      it('should create a USER_LOGOUT action', (done) => {
        const expectedActions = [
          {
            type: types.USER_LOGOUT,
          }
        ];

        store.dispatch(logoutRequest());
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });

    // check authentications failure
    describe('Check authentication failure', () => {
      it('should create a USER_AUTH_FAILED action on failure', (done) => {
        mockFailedAuth();
        const expectedActions = [
          {
            type: types.USER_AUTH_FAILED,
          }
        ];

        store.dispatch(checkAuthentication());
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });

    // check authentications success
    describe('Check authentication success', () => {
      it('should create a USER_AUTH_SUCCESS action on success', (done) => {
        const expectedActions = [
          {
            type: types.USER_AUTH_SUCCESS,
            user: mockItems.auth
          }
        ];

        store.dispatch(checkAuthentication());
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });
  });
});
