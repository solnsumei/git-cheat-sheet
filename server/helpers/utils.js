import jwt from 'jsonwebtoken';

const notFoundError = { statusCode: 404, message: 'Resource not found' };

const createToken = (user) => {
  const token = jwt.sign({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    }
  },
  process.env.SECRET, { expiresIn: 60 * 60 * 2 });

  return token;
};

const isEmpty = object => Object.keys(object).length === 0;

const isUnauthorised = (command, user) => {
  if (!command.user.equals(user._id)) {
    return { statusCode: 403, message: 'You do not have permission to perform this operation' };
  }
  return false;
};

const formatUser = user => ({
  _id: user._id,
  name: user.name,
  email: user.email,
  isAdmin: user.isAdmin
});

const errorResponse = (res, error = null) => {
  if (error === null || error === undefined) {
    return res.status(500).send({
      success: false,
      error: {
        message: 'There was an error processing your request, please try again later'
      }
    });
  }

  return res.status(error.statusCode).send({
    success: false,
    error,
  });
};

export {
  isEmpty,
  createToken,
  formatUser,
  errorResponse,
  notFoundError,
  isUnauthorised
};
