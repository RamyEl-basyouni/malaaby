import axios from 'axios';
import { Club, ClubFilters, User, Booking } from '../types';

const API_BASE_URL = 'http://localhost:3000'; // Change this to your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Auth API
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  register: async (userData: { email: string; password: string; name: string; phone?: string }) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },
};

// Clubs API
export const clubsAPI = {
  getClubs: async (filters?: ClubFilters) => {
    const params = new URLSearchParams();
    if (filters?.sportType) params.append('sportType', filters.sportType);
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters?.distance) params.append('distance', filters.distance.toString());
    if (filters?.groundType) params.append('groundType', filters.groundType);
    if (filters?.userLat) params.append('userLat', filters.userLat.toString());
    if (filters?.userLng) params.append('userLng', filters.userLng.toString());

    const response = await api.get(`/clubs?${params.toString()}`);
    return response.data;
  },

  getClub: async (id: number) => {
    const response = await api.get(`/clubs/${id}`);
    return response.data;
  },
};

// Bookings API
export const bookingsAPI = {
  getUserBookings: async (userId: number) => {
    const response = await api.get(`/bookings/user/${userId}`);
    return response.data;
  },

  createBooking: async (bookingData: {
    groundId: number;
    date: string;
    startTime: string;
    endTime: string;
    notes?: string;
  }, token: string) => {
    const response = await api.post('/bookings', bookingData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  },
};

export default api;