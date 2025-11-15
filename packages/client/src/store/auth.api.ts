import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  HttpResponse,
  USER_ROLE,
  UserTable,
  validationSchema,
} from '@thatnails/shared';
import type z from 'zod';
import { API_BASE_URL } from '../config/env.config';

export interface SignInResponse extends UserTable {
  role: USER_ROLE;
}

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: (data: z.infer<typeof validationSchema.auth.signIn>) => ({
        url: '/auth/sign-in',
        method: 'POST',
        body: data,
      }),
      transformResponse: (response: HttpResponse<SignInResponse>) =>
        response.data,
    }),
    signUp: builder.mutation({
      query: (data: z.infer<typeof validationSchema.auth.signUp>) => ({
        url: '/auth/sign-up',
        method: 'POST',
        body: data,
      }),
      transformResponse: (
        response: HttpResponse<z.infer<typeof validationSchema.auth.signUp>>,
      ) => response.data,
    }),
    getCurrentUser: builder.query({
      query: () => ({
        url: '/auth/current-user',
        method: 'GET',
      }),
      transformResponse: (response: HttpResponse<SignInResponse>) =>
        response.data,
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation, useGetCurrentUserQuery } =
  authApi;
