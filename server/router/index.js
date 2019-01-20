import { Router } from 'express';
import userController from '../controllers/user';
import categoriesController from '../controllers/categories';
import commandsController from '../controllers/commands';
import {
  validateSignup, validateLogin,
  validateCategory, validateCommand,
  validateCategoryFields, validateCommandFields
} from '../middlewares/validation';
import authenticate from '../middlewares/authenticate';
import admin from '../middlewares/admin';

const router = Router();

// Signup route
router.post('/signup', validateSignup, userController.signup);

// Login route
router.post('/login', validateLogin, userController.login);

// categories routes
router.get('/categories/:id', categoriesController.fetchOne);
router.get('/categories', categoriesController.fetchAll);

// Admin categories routes
router.post('/categories', authenticate, admin, validateCategoryFields, categoriesController.create);
router.put('/categories/:id',
  authenticate, admin, validateCategoryFields, categoriesController.update);
router.delete('/categories/:id', authenticate, admin, categoriesController.delete);

// commands routes
router.post('/commands/search', commandsController.search);
router.post('/commands',
  authenticate, validateCommandFields, validateCategory, commandsController.create);
router.put('/commands/:id',
  authenticate, validateCommandFields,
  validateCategory, validateCommand, commandsController.update);

router.delete('/commands/:id', authenticate, validateCommand, commandsController.delete);

router.all('*', (req, res) => {
  res.status(404).send({
    success: false,
    error: {
      message: 'Route does not exist'
    }
  });
});

export default router;
