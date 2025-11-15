import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SignInResponse } from './auth.api';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: undefined as SignInResponse | null | undefined,
  },
  reducers: {
    setUser: (state, action: PayloadAction<SignInResponse | null>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = undefined;
    },
  },
});

export const userSliceActions = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
