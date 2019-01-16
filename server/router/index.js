import { Router } from 'express';
import userController from '../controllers/user';
import categoriesController from '../controllers/categories';
import { validateSignup, validateLogin, validateCategory } from '../middlewares/validation';
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
router.post('/categories', authenticate, admin, validateCategory, categoriesController.create);
router.put('/categories/:id', authenticate, admin, validateCategory, categoriesController.update);
router.delete('/categories/:id', authenticate, admin, categoriesController.delete);

export default router;
