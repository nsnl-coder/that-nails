import { createApi } from '@reduxjs/toolkit/query/react';
import {
  USER_ROLE,
  validationSchema,
  type HttpResponse,
  type JsonSelectable,
  type SalonTable,
} from '@thatnails/shared';
import type z from 'zod';
import { fetchBaseQueryWithCredentials } from '../config/redux.config';

export interface GetSalonUsersResponse {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  role: USER_ROLE.OWNER | USER_ROLE.EMPLOYEE;
  assigned_at: string;
}

export const salonApi = createApi({
  reducerPath: 'salonApi',
  baseQuery: fetchBaseQueryWithCredentials,
  tagTypes: ['Salons', 'SalonUsers'],
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
    createSalonUser: builder.mutation({
      query: (
        data: z.infer<typeof validationSchema.salons.createSalonUser> & {
          salonId: number;
        },
      ) => ({
        url: `/salons/${data.salonId}/users`,
        method: 'POST',
        body: { email_or_phone: data.email_or_phone, role: data.role },
      }),
      invalidatesTags: (_, __, data) => [
        { type: 'SalonUsers', salonId: data.salonId },
      ],
    }),
    getSalonUsers: builder.query({
      query: (salonId: number) => ({
        url: `/salons/${salonId}/users`,
        method: 'GET',
      }),
      transformResponse: (response: HttpResponse<GetSalonUsersResponse[]>) =>
        response.data,
      providesTags: (result, error, salonId) => [
        { type: 'SalonUsers', salonId },
      ],
    }),
    deleteSalonUser: builder.mutation({
      query: (data: { salonId: number; userId: number }) => ({
        url: `/salons/${data.salonId}/users/${data.userId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_, __, data) => [
        { type: 'SalonUsers', salonId: data.salonId },
      ],
    }),
  }),
});

export const {
  useCreateSalonMutation,
  useGetSalonsQuery,
  useUpdateSalonMutation,
  useCreateSalonUserMutation,
  useGetSalonUsersQuery,
  useDeleteSalonUserMutation,
} = salonApi;
