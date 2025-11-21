import { USER_ROLE } from '@thatnails/shared';
import { Router } from 'express';
import appointmentController from '../controllers/appointment.controller';
import requireLogin from '../middlewares/requireLogin.middleware';
import requireRole from '../middlewares/requireRole.middleware';

const appointmentRouter = Router();

appointmentRouter.post(
  '/',
  requireLogin,
  requireRole(USER_ROLE.OWNER),
  appointmentController.createAppointment,
);

export default appointmentRouter;
