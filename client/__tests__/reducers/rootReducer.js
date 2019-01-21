import expect from 'expect';
import initialState from '../../src/reducers/initialState';
import rootReducer from '../../src/reducers/index';

describe('Root reducer', () => {
  it('should return the initial state', () => {
    expect(rootReducer(undefined, initialState)).toEqual(initialState);
  });
});
