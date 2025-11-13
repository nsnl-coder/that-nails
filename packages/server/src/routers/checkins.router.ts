import express from 'express';
import checkinsController from '../controllers/checkins.controller';

const checkinsRouter = express.Router();

checkinsRouter.post('/', checkinsController.createCheckin);

export default checkinsRouter;
