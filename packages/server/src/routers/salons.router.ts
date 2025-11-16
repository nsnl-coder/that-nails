import { USER_ROLE } from '@thatnails/shared';
import express from 'express';
import salonController from '../controllers/salons.controller';
import requireLogin from '../middlewares/requireLogin.middleware';
import requireRole from '../middlewares/requireRole.middleware';

const salonsRouter = express.Router();

salonsRouter.post(
  '/',
  requireLogin,
  requireRole(USER_ROLE.ROOT),
  salonController.createSalon,
);

salonsRouter.get(
  '/',
  requireLogin,
  requireRole(USER_ROLE.ROOT),
  salonController.getSalons,
);

salonsRouter.put(
  '/:salonId',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  salonController.updateSalon,
);

salonsRouter.get(
  '/:salonId/users',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  salonController.getSalonUsers,
);

salonsRouter.delete(
  '/:salonId/users/:userId',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  salonController.deleteSalonUser,
);

salonsRouter.post(
  '/:salonId/users',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  salonController.createSalonUser,
);

export default salonsRouter;
