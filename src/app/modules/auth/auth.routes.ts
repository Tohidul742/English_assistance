import { Router } from 'express';
import { AuthController } from './auth.controller.js';
import { AuthValidation } from './auth.validation.js';
import { AuthMiddleware } from './auth.middleware.js';

const router = Router();
const authController = new AuthController();

router.post(
  '/sign-up',
  AuthMiddleware.validateRequest(AuthValidation.signUpValidationSchema),
  authController.signUp
);

router.post(
  '/login',
  AuthMiddleware.validateRequest(AuthValidation.loginValidationSchema),
  authController.login
);

router.post('/refresh-token', authController.refreshToken);

export const AuthRoutes: Router = router;
