import express from 'express';
import salonController from '../controllers/salons.controller';
import requireLogin from '../middlewares/requireLogin.middleware';
import { USER_ROLE } from '@thatnails/shared';
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

salonsRouter.post(
  '/:salonId/owners',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  salonController.createSalonOwner,
);

salonsRouter.get(
  '/:salonId/owners',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  salonController.getSalonOwners,
);

salonsRouter.delete(
  '/:salonId/owners/:userId',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  salonController.deleteSalonOwner,
);

export default salonsRouter;
