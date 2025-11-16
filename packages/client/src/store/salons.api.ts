import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  validationSchema,
  type HttpResponse,
  type JsonSelectable,
  type SalonTable,
} from '@thatnails/shared';
import type z from 'zod';
import { API_BASE_URL } from '../config/env.config';

export const salonApi = createApi({
  reducerPath: 'salonApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Salons'],
  endpoints: (builder) => ({
    createSalon: builder.mutation({
      query: (salon: z.infer<typeof validationSchema.salons.create>) => ({
        url: '/salons',
        method: 'POST',
        body: salon,
      }),
      invalidatesTags: ['Salons'],
    }),
    getSalons: builder.query({
      query: () => ({
        url: '/salons',
        method: 'GET',
      }),
      transformResponse: (
        response: HttpResponse<JsonSelectable<SalonTable>[]>,
      ) => response.data,
      providesTags: ['Salons'],
    }),
    updateSalon: builder.mutation({
      query: (
        salon: z.infer<typeof validationSchema.salons.update> & { id: number },
      ) => ({
        url: `/salons/${salon.id}`,
        method: 'PUT',
        body: salon,
      }),
      invalidatesTags: ['Salons'],
    }),
  }),
});

export const {
  useCreateSalonMutation,
  useGetSalonsQuery,
  useUpdateSalonMutation,
} = salonApi;
