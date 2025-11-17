import { USER_ROLE } from '@thatnails/shared';
import express from 'express';
import salonController from '../controllers/salons.controller';
import requireLogin from '../middlewares/requireLogin.middleware';
import requireRole from '../middlewares/requireRole.middleware';

const salonUsersRouter = express.Router({ mergeParams: true });

salonUsersRouter.get(
  '/',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  salonController.getSalonUsers,
);

salonUsersRouter.delete(
  '/:userId',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  salonController.deleteSalonUser,
);

salonUsersRouter.post(
  '/',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  salonController.createSalonUser,
);

export default salonUsersRouter;
