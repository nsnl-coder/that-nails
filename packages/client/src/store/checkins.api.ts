import { createApi } from '@reduxjs/toolkit/query/react';
import type { HttpResponse } from '@thatnails/shared';
import { fetchBaseQueryWithCredentials } from '../config/redux.config';

interface GetCheckinsResponse {
  id: number;
  created_at: string;
  phone: string;
  full_name: string;
  email: string;
}

export const checkinApi = createApi({
  reducerPath: 'checkinsApi',
  baseQuery: fetchBaseQueryWithCredentials,
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
