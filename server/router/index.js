import { Router } from 'express';
import userController from '../controllers/user';
import { validateSignup, validateLogin } from '../middlewares/validation';

const router = Router();

// Signup route
router.post('/signup', validateSignup, userController.signup);

// Login route
router.post('/login', validateLogin, userController.login);

export default router;
