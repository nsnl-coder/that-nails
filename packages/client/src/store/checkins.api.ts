import type { HttpResponse } from '@thatnails/shared';
import { indexApi } from './index.api';

interface GetCheckinsResponse {
  id: number;
  created_at: string;
  phone: string;
  full_name: string;
  email: string;
}

export const checkinApi = indexApi.injectEndpoints({
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
    }),
  }),
});

export const { useCreateCheckinMutation, useGetCheckinsQuery } = checkinApi;
