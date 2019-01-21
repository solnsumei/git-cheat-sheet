import validator from 'validator';
import Category from '../models/Category';
import Command from '../models/Command';
import {
  isEmpty,
  errorResponse,
  isUnauthorised,
  notFoundError
} from '../helpers/utils';

const noInputFieldsError = res => errorResponse(res, {
  message: 'All fields cannot be empty',
  statusCode: 400,
});

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

const checkFormField = (field, min = 0, max = 0, nullable = false) => {
  const isFieldNull = isNullOrEmpty(field);

  if (!nullable && isFieldNull) {
    return 'Field is required';
  }

  if (!isFieldNull) {
    if (min > 0 && field.trim().length < min) {
      return `Field cannot be less than ${min} chars`;
    }

    if (max > 0 && field.trim().length > max) {
      return `Field cannot be more than ${max} chars`;
    }

    return false;
  }

  return false;
};

const validateSignup = (req, res, next) => {
  const { name, email, password } = req.body;
  const error = {};

  if (isEmpty(req.body)) {
    return noInputFieldsError(res);
  }

  const nameError = checkFormField(name, 3, 30);
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
    return noInputFieldsError(res);
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

const validateCategoryFields = (req, res, next) => {
  const { name } = req.body;

  const nameError = checkFormField(name, 3, 30);
  if (nameError) {
    return errorResponse(res, { name: nameError, statusCode: 400 });
  }

  req.sanitizedBody = { name: name.trim() };
  next();
};

const validateCommandFields = (req, res, next) => {
  const { snippet, action, category } = req.body;
  const isUpdate = !isNullOrEmpty(req.params.id);
  const error = {};

  if (snippet === undefined
      && action === undefined
      && category === undefined
  ) {
    return noInputFieldsError(res);
  }

  const snippetError = checkFormField(snippet, 3, 60, isUpdate);
  if (snippetError) {
    error.snippet = snippetError;
  }

  const actionError = checkFormField(action, 3, 100, isUpdate);
  if (actionError) {
    error.action = actionError;
  }

  const categoryNotSet = isNullOrEmpty(category);
  if (categoryNotSet && !isUpdate) {
    error.category = 'Field is required';
  }

  if (!isEmpty(error)) {
    error.statusCode = 400;
    return errorResponse(res, error);
  }

  req.sanitizedBody = {
    snippet: snippet !== undefined ? snippet.trim() : null,
    action: action !== undefined ? action.trim() : null,
    category: category !== undefined ? category : null
  };

  next();
};

const validateCategory = (req, res, next) => {
  const { category } = req.sanitizedBody;

  if (!isNullOrEmpty(category)) {
    return Category.findById(category, (err, foundCategory) => {
      if (err || !foundCategory) {
        return errorResponse(res, { category: 'Category is invalid', statusCode: 400 });
      }
      next();
    });
  }

  next();
};

const validateCommand = (req, res, next) => {
  const { id } = req.params;
  if (isNullOrEmpty(id)) {
    return errorResponse(res, { message: 'Invalid command id', statusCode: 400 });
  }

  return Command.findById(id, (err, command) => {
    if (err || !command) {
      return errorResponse(res, notFoundError);
    }

    const unauthorised = isUnauthorised(command, req.auth);
    if (unauthorised) {
      return errorResponse(res, unauthorised);
    }

    req.command = command;
    next();
  });
};

export {
  validateLogin,
  validateSignup,
  validateCategory,
  validateCategoryFields,
  validateCommandFields,
  validateCommand
};
