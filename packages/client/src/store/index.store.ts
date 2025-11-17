import { configureStore } from '@reduxjs/toolkit';
import { userSliceReducer } from './user.slice';
import { indexApi } from './index.api';

export const store = configureStore({
  reducer: {
    currrentUser: userSliceReducer,
    [indexApi.reducerPath]: indexApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(indexApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
