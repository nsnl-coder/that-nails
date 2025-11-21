import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQueryWithCredentials } from '../config/redux.config';

export const indexApi = createApi({
  reducerPath: 'indexApi',
  baseQuery: fetchBaseQueryWithCredentials,
  tagTypes: [
    'Services',
    'Categories',
    'CategoryServices',
    'Salons',
    'SalonUsers',
    'Appointments',
  ],
  endpoints: () => ({}),
});
