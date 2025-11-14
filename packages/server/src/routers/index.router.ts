import express from 'express';
import checkinsRouter from './checkins.router';
import categoriesRouter from './categories.router';
import usersRouter from './user.router';

const indexRouter = express.Router();

indexRouter.use('/api/v1/checkins', checkinsRouter);
indexRouter.use('/api/v1/categories', categoriesRouter);
indexRouter.use('/api/v1/users', usersRouter);

export default indexRouter;
