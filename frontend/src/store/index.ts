import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import clubsSlice from './clubsSlice';
import bookingsSlice from './bookingsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    clubs: clubsSlice,
    bookings: bookingsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;