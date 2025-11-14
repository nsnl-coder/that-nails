import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { HttpResponse } from '@thatnails/shared';
import { API_BASE_URL } from '../config/env.config';

interface GetCheckinsResponse {
  id: number;
  created_at: string;
  phone: string;
  full_name: string;
  email: string;
}

export const checkinApi = createApi({
  reducerPath: 'checkinsApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Checkins'],
  endpoints: (builder) => ({
    createCheckin: builder.mutation({
      query: (checkin) => ({
        url: '/checkins',
        method: 'POST',
        body: checkin,
      }),
    }),
    getCheckins: builder.query({
      query: () => ({
        url: '/checkins',
        method: 'GET',
      }),
      transformResponse: (
        response: HttpResponse<GetCheckinsResponse[]>,
      ): GetCheckinsResponse[] => response.data,
      providesTags: ['Checkins'],
    }),
  }),
});

export const { useCreateCheckinMutation, useGetCheckinsQuery } = checkinApi;
