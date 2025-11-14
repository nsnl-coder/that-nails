import express from 'express';
import checkinsController from '../controllers/checkins.controller';

const checkinsRouter = express.Router();

checkinsRouter.post('/', checkinsController.createCheckin);
checkinsRouter.get('/', checkinsController.getCheckins);

export default checkinsRouter;
