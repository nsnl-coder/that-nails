import {
  ApiError,
  APPOINTMENT_STATUS,
  validationSchema,
} from '@thatnails/shared';
import { Request, Response } from 'express';
import db from '../config/db.config';

const createAppointment = async (req: Request, res: Response) => {
  const user = req.readUser();

  const { salon_id, appointment_date, guests } =
    await validationSchema.appointments.create.parseAsync(req.body);

  const appointment = await db
    .insertInto('appointments')
    .values({
      customer_id: user.id,
      salon_id,
      appointment_date,
      status: APPOINTMENT_STATUS.PENDING,
    })
    .returningAll()
    .executeTakeFirst();

  if (!appointment) {
    throw ApiError.APP.UNEXPECTED_ERROR;
  }

  for (const guest of guests) {
    const newGuest = await db
      .insertInto('guests')
      .values({
        appointment_id: appointment.id,
        technician_id: guest.technician_id,
      })
      .returningAll()
      .executeTakeFirst();

    if (!newGuest) {
      throw ApiError.APP.UNEXPECTED_ERROR;
    }

    for (const service of guest.services) {
      const newService = await db
        .insertInto('guest_service')
        .values({
          guest_id: newGuest.id,
          service_id: service.service_id,
          duration: service.duration,
          price: service.price,
        })

        .returningAll()
        .executeTakeFirst();

      if (!newService) {
        throw ApiError.APP.UNEXPECTED_ERROR;
      }
    }
  }

  res.status(200).json({
    status: 'success',
    data: appointment,
  });
};

const checkAvailability = async (req: Request, res: Response) => {
  const { salon_id, appointment_date, guests } =
    await validationSchema.appointments.checkAvailability.parseAsync(req.body);

  const availableTimes = await db
    .selectFrom('appointments')
    .selectAll()
    .where('salon_id', '=', salon_id)
    .where('appointment_date', '=', appointment_date)
    .execute();
};

const appointmentController = {
  createAppointment,
  checkAvailability,
};

export default appointmentController;
