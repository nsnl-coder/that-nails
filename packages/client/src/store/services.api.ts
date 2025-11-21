import type {
  HttpResponse,
  JsonSelectable,
  ServiceTable,
  validationSchema,
} from '@thatnails/shared';
import type z from 'zod';
import { indexApi } from './index.api';

interface ServiceWithCategory extends JsonSelectable<ServiceTable> {
  category_name: string;
  category_id: number;
}

export const serviceApi = indexApi.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation({
      query: (
        data: z.infer<typeof validationSchema.services.createService> & {
          salonId: number;
        },
      ) => ({
        url: `/salons/${data.salonId}/services`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (_, __, data) => [
        {
          type: 'Services',
          categoryId: data.category_id || 'null',
          salonId: data.salonId,
        },
      ],
    }),
    getServices: builder.query({
      query: (salonId: number) => ({
        url: `/salons/${salonId}/services`,
        method: 'GET',
      }),
      transformResponse: (response: HttpResponse<ServiceWithCategory[]>) =>
        response.data,
      providesTags: (_, __, salonId) => [
        { type: 'Services', salonId: salonId },
      ],
    }),
  }),
});

export const { useCreateServiceMutation, useGetServicesQuery } = serviceApi;
