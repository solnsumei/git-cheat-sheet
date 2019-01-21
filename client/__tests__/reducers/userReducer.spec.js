import expect from 'expect';
import initialState from '../../src/reducers/initialState';
import reducer from '../../src/reducers/userReducer';
import types from '../../src/actions/actionTypes';
import mockItems from '../__mocks__/mockItems';

describe('User reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(null);
  });

  it('should handle USER_AUTH_FAILED', () => {
    const userAuthFaileAction = {
      type: types.USER_AUTH_FAILED
    };
    expect(reducer({}, userAuthFaileAction)).toEqual({});
  });

  it('should handle USER_AUTH_SUCCESS', () => {
    const userAuthSuccessAction = {
      type: types.USER_AUTH_SUCCESS,
      user: mockItems.user
    };
    expect(reducer({}, userAuthSuccessAction)).toEqual(mockItems.user);
  });

  it('should handle SIGN_OUT_USER', () => {
    initialState.user = { ...mockItems.user };
    const userSignOut = {
      type: types.USER_LOGOUT,
    };
    expect(reducer({}, userSignOut)).toEqual(null);
  });
});
