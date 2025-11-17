import express from 'express';
import categoriesController from '../controllers/categories.controller';
import requireLogin from '../middlewares/requireLogin.middleware';
import requireRole from '../middlewares/requireRole.middleware';
import { USER_ROLE } from '@thatnails/shared';

const categoriesRouter = express.Router({ mergeParams: true });

categoriesRouter.get(
  '/',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  categoriesController.getCategories,
);
categoriesRouter.post(
  '/',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  categoriesController.createCategory,
);
categoriesRouter.get(
  '/:id/services',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  categoriesController.getCategoryServices,
);

export default categoriesRouter;
