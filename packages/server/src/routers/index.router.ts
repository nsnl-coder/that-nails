import express from 'express';
import checkinsRouter from './checkins.router';

const indexRouter = express.Router();

indexRouter.use('/api/v1/checkins', checkinsRouter);

export default indexRouter;
