import jwt from 'jsonwebtoken';
import User from '../models/User';
import { errorResponse } from '../helpers/utils';

/**
 * @description Admin middleware to validate admins
 *
 * @param {object} req
 * @param {object} res
 * @param {object} next
 *
 * @returns {object|Function} next or response
 */
export default function admin(req, res, next) {
  if (!req.auth.isAdmin) {
    return errorResponse(res, { message: 'Access denied, admins only', statusCode: 403 });
  }

  next();
}
