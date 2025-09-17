import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { clubsAPI } from '../services/api';
import { Club } from '../types';

interface ClubsState {
  clubs: Club[];
  selectedClub: Club | null;
  loading: boolean;
  error: string | null;
  filters: {
    city: string;
    sport: string;
  };
}

const initialState: ClubsState = {
  clubs: [],
  selectedClub: null,
  loading: false,
  error: null,
  filters: {
    city: '',
    sport: '',
  },
};

export const fetchClubs = createAsyncThunk(
  'clubs/fetchClubs',
  async (filters?: any) => {
    const response = await clubsAPI.getAll(filters);
    return response;
  }
);

export const fetchClubById = createAsyncThunk(
  'clubs/fetchClubById',
  async (id: number) => {
    const response = await clubsAPI.getById(id);
    return response;
  }
);

const clubsSlice = createSlice({
  name: 'clubs',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedClub: (state) => {
      state.selectedClub = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClubs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClubs.fulfilled, (state, action) => {
        state.loading = false;
        state.clubs = action.payload;
      })
      .addCase(fetchClubs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch clubs';
      })
      .addCase(fetchClubById.fulfilled, (state, action) => {
        state.selectedClub = action.payload;
      });
  },
});

export const { setFilters, clearSelectedClub } = clubsSlice.actions;
export default clubsSlice.reducer;