import jwt from 'jsonwebtoken';
import User from '../models/User';
import { errorResponse, formatUser } from '../helpers/utils';

/**
 * @description Authentication middleware to validate user
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 *
 * @returns {object|Function} next or response
 */
export default function authenticate(req, res, next) {
  const error = { message: 'Access denied, please login', statusCode: 401 };
  // check request for token
  const token = req.body.token || req.headers['auth-token'];

  // if token is not found
  if (!token) {
    return errorResponse(res, error);
  }

  // verify token
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      const errorMsg = { ...error, message: 'Access denied, token could not be authenticated' };
      return errorResponse(res, errorMsg);
    }

    return User.findById(decoded.user._id, (err, user) => {
      if (err) {
        return errorResponse(res, error);
      }

      req.auth = formatUser(user);
      next();
    });
  });
}
