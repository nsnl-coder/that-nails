import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../config/env.config';
import type { validationSchema } from '@thatnails/shared';
import type z from 'zod';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Services'],
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (service: z.infer<typeof validationSchema.services.create>) => ({
        url: '/services',
        method: 'POST',
        body: service,
      }),
      invalidatesTags: (_, __, service) => [
        { type: 'Services', id: service.category_id },
      ],
    }),
  }),
});

export const { useCreateServiceMutation } = serviceApi;
