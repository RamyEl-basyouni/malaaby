import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Club, ClubFilters } from '../../types';

interface ClubsState {
  clubs: Club[];
  selectedClub: Club | null;
  filters: ClubFilters;
  isLoading: boolean;
  error: string | null;
}

const initialState: ClubsState = {
  clubs: [],
  selectedClub: null,
  filters: {},
  isLoading: false,
  error: null,
};

const clubsSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    fetchClubsStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    fetchClubsSuccess: (state, action: PayloadAction<Club[]>) => {
      state.isLoading = false;
      state.clubs = action.payload;
      state.error = null;
    },
    fetchClubsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setSelectedClub: (state, action: PayloadAction<Club>) => {
      state.selectedClub = action.payload;
    },
    setFilters: (state, action: PayloadAction<ClubFilters>) => {
      state.filters = action.payload;
    },
    clearFilters: (state) => {
      state.filters = {};
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  fetchClubsStart,
  fetchClubsSuccess,
  fetchClubsFailure,
  setSelectedClub,
  setFilters,
  clearFilters,
  clearError,
} = clubsSlice.actions;

export default clubsSlice.reducer;