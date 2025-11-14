import { configureStore } from '@reduxjs/toolkit';
import { checkinApi } from './checkins.api';

export const store = configureStore({
  reducer: {
    [checkinApi.reducerPath]: checkinApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(checkinApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
