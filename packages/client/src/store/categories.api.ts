import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_BASE_URL } from '../config/env.config';
import {
  validationSchema,
  type CategoryTable,
  type HttpResponse,
  type JsonSelectable,
  type ServiceTable,
} from '@thatnails/shared';
import type z from 'zod';

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
  tagTypes: ['Categories', 'Services'],
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => ({
        url: '/categories',
        method: 'GET',
      }),
      transformResponse: (
        response: HttpResponse<JsonSelectable<CategoryTable>[]>,
      ) => response.data,
      providesTags: ['Categories'],
    }),
    createCategory: builder.mutation({
      query: (
        data: z.infer<typeof validationSchema.categories.createCategory>,
      ) => ({
        url: '/categories',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Categories'],
    }),
    getCategoryServices: builder.query({
      query: (categoryId: number) => ({
        url: `/categories/${categoryId}/services`,
        method: 'GET',
      }),
      transformResponse: (
        response: HttpResponse<JsonSelectable<ServiceTable>[]>,
      ) => response.data,
      providesTags: (_, __, categoryId) => [
        { type: 'Services', categoryId: categoryId },
      ],
    }),
    createService: builder.mutation({
      query: (
        data: z.infer<typeof validationSchema.categories.createService> & {
          categoryId: number;
        },
      ) => ({
        url: `/categories/${data.categoryId}/services`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_, __, categoryId) => [
        { type: 'Services', categoryId: categoryId },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetCategoryServicesQuery,
  useCreateServiceMutation,
} = categoryApi;
