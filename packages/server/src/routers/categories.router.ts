import express from 'express';
import categoriesController from '../controllers/categories.controller';

const categoriesRouter = express.Router();

categoriesRouter.get('/', categoriesController.getCategories);
categoriesRouter.post('/', categoriesController.createCategory);
categoriesRouter.get('/:id/services', categoriesController.getCategoryServices);
categoriesRouter.post('/:id/services', categoriesController.createService);

export default categoriesRouter;
