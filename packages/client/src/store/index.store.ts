import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth.api';
import { categoryApi } from './categories.api';
import { checkinApi } from './checkins.api';
import { salonApi } from './salons.api';
import { serviceApi } from './services.api';
import { userSliceReducer } from './user.slice';

export const store = configureStore({
  reducer: {
    currrentUser: userSliceReducer,
    [checkinApi.reducerPath]: checkinApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [serviceApi.reducerPath]: serviceApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [salonApi.reducerPath]: salonApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(checkinApi.middleware)
      .concat(categoryApi.middleware)
      .concat(serviceApi.middleware)
      .concat(authApi.middleware)
      .concat(salonApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
