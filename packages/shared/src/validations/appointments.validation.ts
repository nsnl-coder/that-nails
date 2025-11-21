import { z } from 'zod';

const createAppointment = z.object({
  salon_id: z.number(),
  appointment_date: z.date(),
  phone: z.string().length(10, 'Phone number must be 10 digits'),
  name: z.string(),
  guests: z
    .array(
      z.object({
        technician_id: z.number(),
        services: z
          .array(z.number())
          .min(1, 'At least one service is required'),
      }),
    )
    .min(1, 'At least one guest is required'),
});

const checkAvailability = z.object({
  salon_id: z.number(),
  appointment_date: z.date(),
  guests: z.array(
    z.object({
      technician_id: z.number(),
      services: z.array(
        z.object({
          service_id: z.number(),
        }),
      ),
    }),
  ),
});

const appointmentsValidation = {
  create: createAppointment,
  checkAvailability: checkAvailability,
};

export default appointmentsValidation;
