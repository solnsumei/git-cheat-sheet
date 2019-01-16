import jwt from 'jsonwebtoken';

const createToken = (user) => {
  const token = jwt.sign({ user: { id: user._id, name: user.name } },
    process.env.SECRET, { expiresIn: 60 * 60 * 2 });

  return token;
};

const isEmpty = object => Object.keys(object).length === 0;

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
  errorResponse
};
