import validator from 'validator';
import { isEmpty, errorResponse } from '../helpers/utils';

const isNullOrEmpty = (attribute) => {
  if (attribute === undefined || attribute === null) {
    return true;
  }
  if (validator.isEmpty(attribute, { ignore_whitespace: true })) {
    return true;
  }

  return false;
};

const checkEmailField = (emailField) => {
  if (isNullOrEmpty(emailField)) {
    return 'Field is required';
  }

  if (!validator.isEmail(emailField.trim())) {
    return 'Email is invalid';
  }

  return false;
};

const checkFormField = (field, min = 0, max = 0) => {
  if (isNullOrEmpty(field)) {
    return 'Field is required';
  }

  if (min > 0 && field.trim().length < min) {
    return `Field cannot be less than ${min} chars`;
  }

  if (max > 0 && field.trim().length > max) {
    return `Field cannot be more than ${max} chars`;
  }

  return false;
};

const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;
  const error = {};

  if (isEmpty(req.body)) {
    return errorResponse(res, {
      name: 'Field is required',
      email: 'Field is required',
      password: 'Field is required',
      statusCode: 400,
    });
  }

  const nameError = checkFormField(name, 2, 20);
  if (nameError) {
    error.name = nameError;
  }

  const emailError = checkEmailField(email);
  if (emailError) {
    error.email = emailError;
  }

  const passwordError = checkFormField(password, 6);
  if (passwordError) {
    error.password = passwordError;
  }

  if (!isEmpty(error)) {
    error.statusCode = 400;
    return errorResponse(res, error);
  }

  req.sanitizedBody = { name: name.trim(), email: email.trim(), password: password.trim() };
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const error = {};

  if (isEmpty(req.body)) {
    return errorResponse(res, {
      email: 'Field is required',
      password: 'Field is required',
      statusCode: 400
    });
  }

  const emailError = checkEmailField(email);
  if (emailError) {
    error.email = emailError;
  }

  const passwordError = checkFormField(password, 6);
  if (passwordError) {
    error.password = passwordError;
  }

  if (!isEmpty(error)) {
    error.statusCode = 400;
    return errorResponse(res, error);
  }

  req.sanitizedBody = { email: email.trim(), password: password.trim() };
  next();
};

const validateCategory = (req, res, next) => {
  const { name } = req.body;

  const nameError = checkFormField(name, 2, 20);
  if (nameError) {
    return errorResponse(res, { name: nameError, statusCode: 400 });
  }

  req.sanitizedBody = { name: name.trim() };
  next();
};

export { validateLogin, validateSignup, validateCategory };
