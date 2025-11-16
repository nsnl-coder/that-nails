import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../store/index.store';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';
import { API_BASE_URL } from './env.config';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const fetchBaseQueryWithCredentials = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include',
});
