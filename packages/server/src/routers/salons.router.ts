import { USER_ROLE } from '@thatnails/shared';
import express from 'express';
import salonController from '../controllers/salons.controller';
import requireLogin from '../middlewares/requireLogin.middleware';
import requireRole from '../middlewares/requireRole.middleware';
import categoriesRouter from './categories.router';
import servicesRouter from './services.router';
import salonUsersRouter from './salonUsers.router';

const salonsRouter = express.Router();

salonsRouter.use('/:salonId/categories', categoriesRouter);
salonsRouter.use('/:salonId/services', servicesRouter);
salonsRouter.use('/:salonId/users', salonUsersRouter);

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

export default salonsRouter;
