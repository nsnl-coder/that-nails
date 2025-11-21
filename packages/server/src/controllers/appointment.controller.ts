import {
  ApiError,
  APPOINTMENT_STATUS,
  USER_ROLE,
  validationSchema,
} from '@thatnails/shared';
import { Request, Response } from 'express';
import db from '../config/db.config';

const createAppointment = async (req: Request, res: Response) => {
  const user = req.readUser();

  const { salon_id, appointment_date, guests } =
    await validationSchema.appointments.create.parseAsync(req.body);

  const services = await db.selectFrom('services').selectAll().execute();
  const mappedServices: {
    [service_id: number]: {
      service_name: string;
      service_id: number;
      duration: number;
      price: number;
    };
  } = {};

  for (const service of services) {
    mappedServices[service.id] = {
      service_name: service.name,
      service_id: service.id,
      duration: service.duration,
      price: service.price,
    };
  }

  const appointment = await db
    .insertInto('appointments')
    .values({
      customer_id: user.id,
      salon_id,
      appointment_date,
      status: APPOINTMENT_STATUS.PENDING,
      guests: guests.map((guest) => ({
        technician_id: guest.technician_id,
        services: guest.services.map(
          (service_id) => mappedServices[service_id],
        ),
      })),
    })
    .returningAll()
    .executeTakeFirst();

  if (!appointment) {
    throw ApiError.APP.UNEXPECTED_ERROR;
  }

  res.status(200).json({
    status: 'success',
    data: appointment,
  });
};

const checkAvailability = async (req: Request, res: Response) => {
  const { salon_id, appointment_date, guests } =
    await validationSchema.appointments.checkAvailability.parseAsync(req.body);

  const appointments = await db
    .selectFrom('appointments')
    .selectAll()
    .where('salon_id', '=', salon_id)
    .where('appointment_date', '>=', appointment_date)
    .orderBy('appointment_date', 'asc')
    .execute();

  const technicians = await db
    .selectFrom('salon_users')
    .selectAll()
    .where('salon_id', '=', salon_id)
    .where('role', '=', USER_ROLE.EMPLOYEE)
    .execute();

  // booked appointment blocks
  const appointmentBlocks: {
    startTime: number;
    endTime: number;
    technician_id: number;
  }[] = appointments.flatMap((appointment) =>
    appointment.guests.flatMap((guest) =>
      guest.services.map((service) => ({
        startTime: appointment.appointment_date.getTime(),
        endTime:
          appointment.appointment_date.getTime() + service.duration * 60 * 1000,
        technician_id: guest.technician_id,
      })),
    ),
  );
  const services = await db.selectFrom('services').selectAll().execute();
  const mappedServices: {
    [service_id: number]: {
      duration: number;
    };
  } = {};

  for (const service of services) {
    mappedServices[service.id] = { duration: service.duration };
  }

  // proposed appointment blocks
  guests.forEach((guest) => {
    const totalDuration = guest.services.reduce(
      (acc, service) => acc + mappedServices[service.service_id].duration,
      0,
    );

    appointmentBlocks.push({
      startTime: appointment_date.getTime(),
      endTime: appointment_date.getTime() + totalDuration * 60 * 1000,
      technician_id: guest.technician_id,
    });
  });

  const salonOpenTime = new Date(appointment_date).setHours(9);
  const salonCloseTime = new Date(appointment_date).setHours(20);

  const checkTimeBlock: {
    [key: string]: number[]; // array of technician ids;
  } = {};

  // check each 30 minutes slot
  for (
    let checkTime = salonOpenTime;
    checkTime < salonCloseTime;
    checkTime += 30 * 60 * 1000
  ) {
    const checkTimeISO = new Date(checkTime).toISOString();

    for (const appointmentBlock of appointmentBlocks) {
      const isBlocked =
        checkTime >= appointmentBlock.startTime &&
        checkTime <= appointmentBlock.endTime;
      appointmentBlock.endTime >= checkTime;

      if (isBlocked) {
        checkTimeBlock[checkTimeISO] = checkTimeBlock[checkTimeISO] || [];
        checkTimeBlock[checkTimeISO].push(appointmentBlock.technician_id);
      }
    }
  }

  const availableSlots: string[] = [];
};

const appointmentController = {
  createAppointment,
  checkAvailability,
};

export default appointmentController;
