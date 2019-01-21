import mockLocalStorage from './mockLocalStorage';

const USERTOKEN = 'userToken';
const token = 'faketoken';

window.localStorage = mockLocalStorage;

const mockFailedAuth = jest.fn(() => {
  mockLocalStorage.clear();
  return false;
});

export const mockFailedAuthToken = jest.fn(() => {
  mockLocalStorage.setItem(USERTOKEN, 'yuwywuwywyshhsggshgsgshshhsghs');
  return false;
});

export default mockFailedAuth;
