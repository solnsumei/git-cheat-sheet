import bcrypt from 'bcrypt';

import User from '../models/User';
import { createToken, formatUser, errorResponse } from '../helpers/utils';

const userController = {
  signup(req, res) {
    const { name, email, password } = req.sanitizedBody;

    return User.findOne({ email }, (err, foundUser) => {
      if (err) {
        return errorResponse(res);
      }

      if (foundUser) {
        return errorResponse(res,
          { statusCode: 422, message: 'Sign up failed. User with this email aready exists.' });
      }

      const user = User({ name, email, password: bcrypt.hashSync(password, 10) });

      user.save((err, savedUser) => {
        if (err) {
          return errorResponse(res,
            { statusCode: 422, message: 'Signup failed. There was an error saving your details.' });
        }

        const token = createToken(savedUser);

        return res.status(201).send({
          success: true,
          message: 'Sign up successful',
          user: formatUser(savedUser),
          token,
        });
      });
    });
  },

  login(req, res) {
    const { email, password } = req.sanitizedBody;
    return User.findOne({ email }, (err, user) => {
      if (err) {
        return errorResponse(res);
      }

      if (!user || !bcrypt.compareSync(password, user.password)) {
        return errorResponse(res,
          { statusCode: 401, message: 'Username and/or password is incorrect' });
      }

      const token = createToken(user);

      return res.status(200).send({
        success: true,
        message: `Welcome back ${user.name}`,
        user: formatUser(user),
        token
      });
    });
  }
};

export default userController;
