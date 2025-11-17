import { USER_ROLE } from '@thatnails/shared';
import express from 'express';
import serviceController from '../controllers/services.controller';
import requireLogin from '../middlewares/requireLogin.middleware';
import requireRole from '../middlewares/requireRole.middleware';

const serviceRouter = express.Router({ mergeParams: true });

serviceRouter.post(
  '/',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  serviceController.createService,
);

export default serviceRouter;
