import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Booking } from '../../types';

interface BookingsState {
  bookings: Booking[];
  isLoading: boolean;
  error: string | null;
}

const initialState: BookingsState = {
  bookings: [],
  isLoading: false,
  error: null,
};

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    fetchBookingsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchBookingsSuccess: (state, action: PayloadAction<Booking[]>) => {
      state.isLoading = false;
      state.bookings = action.payload;
      state.error = null;
    },
    fetchBookingsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.unshift(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchBookingsStart,
  fetchBookingsSuccess,
  fetchBookingsFailure,
  addBooking,
  clearError,
} = bookingsSlice.actions;

export default bookingsSlice.reducer;