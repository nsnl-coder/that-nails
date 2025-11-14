import { configureStore } from '@reduxjs/toolkit';
import { checkinApi } from './checkins.api';
import { categoryApi } from './categories.api';
import { serviceApi } from './services.api';

export const store = configureStore({
  reducer: {
    [checkinApi.reducerPath]: checkinApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(checkinApi.middleware)
      .concat(categoryApi.middleware)
      .concat(serviceApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
