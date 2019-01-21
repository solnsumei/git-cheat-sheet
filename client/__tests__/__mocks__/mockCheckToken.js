import jwt from 'jsonwebtoken';
import mockLocalStorage from './mockLocalStorage';

const USERTOKEN = 'userToken';

const token = jwt.sign({
  user: {
    _id: '1234',
    isAdmin: false
  }
}, 'shhhhh');

const mockCheckToken = jest.fn(() => {
  mockLocalStorage.setItem(USERTOKEN, token);
  return {
    _id: '1234',
    admin: false,
  };
});

export default mockCheckToken;
