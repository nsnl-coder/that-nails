import {
  validationSchema,
  type CategoryTable,
  type HttpResponse,
  type JsonSelectable,
  type ServiceTable,
} from '@thatnails/shared';
import type z from 'zod';
import { indexApi } from './index.api';

export const categoryApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: (salonId: number) => ({
        url: `/salons/${salonId}/categories`,
        method: 'GET',
      }),
      transformResponse: (
        response: HttpResponse<JsonSelectable<CategoryTable>[]>,
      ) => response.data,
      providesTags: (_, __, salonId) => [
        { type: 'Categories', salonId: salonId },
      ],
    }),
    createCategory: builder.mutation({
      query: (
        data: z.infer<typeof validationSchema.categories.createCategory> & {
          salonId: number;
        },
      ) => ({
        url: `/salons/${data.salonId}/categories`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Categories'],
    }),
    getCategoryServices: builder.query({
      query: (data: { categoryId: number; salonId: number }) => ({
        url: `/salons/${data.salonId}/categories/${data.categoryId}/services`,
        method: 'GET',
      }),
      transformResponse: (
        response: HttpResponse<JsonSelectable<ServiceTable>[]>,
      ) => response.data,
      providesTags: (_, __, data) => [
        {
          type: 'Services',
          categoryId: data.categoryId || 'null',
          salonId: data.salonId,
        },
      ],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useGetCategoryServicesQuery,
} = categoryApi;
