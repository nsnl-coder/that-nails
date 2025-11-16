import { createApi } from '@reduxjs/toolkit/query/react';
import {
  validationSchema,
  type HttpResponse,
  type JsonSelectable,
  type SalonTable,
} from '@thatnails/shared';
import type z from 'zod';
import { fetchBaseQueryWithCredentials } from '../config/redux.config';

export interface GetSalonOwnersResponse {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  assigned_at: string;
}

export const salonApi = createApi({
  reducerPath: 'salonApi',
  baseQuery: fetchBaseQueryWithCredentials,
  tagTypes: ['Salons', 'SalonOwners'],
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
    createSalonOwner: builder.mutation({
      query: (
        data: z.infer<typeof validationSchema.salons.createSalonOwner> & {
          salonId: number;
        },
      ) => ({
        url: `/salons/${data.salonId}/owners`,
        method: 'POST',
        body: { email_or_phone: data.email_or_phone },
      }),
      invalidatesTags: (_, __, data) => [
        { type: 'SalonOwners', salonId: data.salonId },
      ],
    }),
    getSalonOwners: builder.query({
      query: (salonId: number) => ({
        url: `/salons/${salonId}/owners`,
        method: 'GET',
      }),
      transformResponse: (response: HttpResponse<GetSalonOwnersResponse[]>) =>
        response.data,
      providesTags: (_, __, salonId) => [
        { type: 'SalonOwners', salonId: salonId },
      ],
    }),
    deleteSalonOwner: builder.mutation({
      query: (data: { salonId: number; userId: number }) => ({
        url: `/salons/${data.salonId}/owners/${data.userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, data) => [
        { type: 'SalonOwners', salonId: data.salonId },
      ],
    }),
  }),
});

export const {
  useCreateSalonMutation,
  useGetSalonsQuery,
  useUpdateSalonMutation,
  useCreateSalonOwnerMutation,
  useGetSalonOwnersQuery,
  useDeleteSalonOwnerMutation,
} = salonApi;
