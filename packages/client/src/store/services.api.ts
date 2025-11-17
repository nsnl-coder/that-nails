import type { validationSchema } from '@thatnails/shared';
import type z from 'zod';
import { indexApi } from './index.api';

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
  }),
});

export const { useCreateServiceMutation } = serviceApi;
