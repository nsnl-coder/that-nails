import express from 'express';
import salonController from '../controllers/salons.controller';

const salonsRouter = express.Router();

salonsRouter.post('/', salonController.createSalon);
salonsRouter.get('/', salonController.getSalons);
salonsRouter.put('/:id', salonController.updateSalon);

export default salonsRouter;
