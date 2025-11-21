import type z from 'zod';
import type { validationSchema } from '../../../shared/dist/esm/validations/index.validation';
import { indexApi } from './index.api';

const appointmentApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    createAppointment: builder.mutation({
      query: (
        appointment: z.infer<typeof validationSchema.appointments.create>,
      ) => ({
        url: '/appointments',
        method: 'POST',
        body: appointment,
      }),
      invalidatesTags: (_, __, data) => [
        { type: 'Appointments', salonId: data.salon_id },
      ],
    }),
  }),
});

export const { useCreateAppointmentMutation } = appointmentApi;
