import { USER_ROLE } from '@thatnails/shared/dist/esm/enum';
import express from 'express';
import serviceController from '../controllers/services.controller';
import requireLogin from '../middlewares/requireLogin.middleware';
import requireRole from '../middlewares/requireRole.middleware';

const serviceRouter = express.Router();

serviceRouter.post(
  '/',
  requireLogin,
  requireRole(USER_ROLE.ROOT),
  serviceController.createService,
);

export default serviceRouter;
