import axios from 'axios';
import { AuthResponse, Club, Booking } from '../types';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const authAPI = {
  login: (username: string, password: string): Promise<AuthResponse> =>
    api.post('/auth/login', { username, password }).then(res => res.data),
};

export const clubsAPI = {
  getAll: (filters?: any): Promise<Club[]> =>
    api.get('/clubs', { params: filters }).then(res => res.data),
  
  getById: (id: number): Promise<Club> =>
    api.get(`/clubs/${id}`).then(res => res.data),
};

export const bookingsAPI = {
  create: (bookingData: any, token: string): Promise<Booking> =>
    api.post('/bookings', bookingData, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => res.data),
  
  getByUser: (userId: number): Promise<Booking[]> =>
    api.get(`/bookings/${userId}`).then(res => res.data),
};

export default api;