import { Router } from 'express';
import authController from '../controllers/auth.controller';
import requireLogin from '../middlewares/requireLogin.middleware';

const authRouter = Router();

authRouter.post('/sign-in', authController.signIn);
authRouter.post('/sign-up', authController.signUp);
authRouter.get('/current-user', requireLogin, authController.getCurrentUser);

export default authRouter;
