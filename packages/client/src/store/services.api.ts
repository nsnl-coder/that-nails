import { createApi } from '@reduxjs/toolkit/query/react';
import type { validationSchema } from '@thatnails/shared';
import type z from 'zod';
import { fetchBaseQueryWithCredentials } from '../config/redux.config';

export const serviceApi = createApi({
  reducerPath: 'serviceApi',
  baseQuery: fetchBaseQueryWithCredentials,
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
