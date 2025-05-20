import { Router } from 'express';
import { authController } from './auth.module';

const authRoute = Router();

authRoute.post('/register', authController.register);
authRoute.post('/login', authController.login);

export default authRoute;
