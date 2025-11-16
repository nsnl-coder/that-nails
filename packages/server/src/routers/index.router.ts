import express from 'express';
import authRouter from './auth.router';
import categoriesRouter from './categories.router';
import checkinsRouter from './checkins.router';
import salonsRouter from './salons.router';
import usersRouter from './user.router';

const indexRouter = express.Router();

indexRouter.use('/api/v1/checkins', checkinsRouter);
indexRouter.use('/api/v1/categories', categoriesRouter);
indexRouter.use('/api/v1/users', usersRouter);
indexRouter.use('/api/v1/auth', authRouter);
indexRouter.use('/api/v1/salons', salonsRouter);

export default indexRouter;
