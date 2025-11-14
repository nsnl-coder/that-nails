import usersController from '../controllers/users.controller';
import express from 'express';

const usersRouter = express.Router();

usersRouter.post('/employees', usersController.createEmployee);
usersRouter.get('/employees', usersController.getEmployees);

export default usersRouter;
