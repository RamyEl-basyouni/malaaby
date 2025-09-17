export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

export interface Club {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  image: string;
  rating: number;
  reviewCount: number;
  grounds: Ground[];
  reviews: Review[];
}

export interface Ground {
  id: number;
  name: string;
  type: string;
  pricePerHour: number;
  description: string;
  amenities: string[];
  image: string;
  club: Club;
}

export interface Booking {
  id: number;
  startTime: Date;
  endTime: Date;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes: string;
  createdAt: Date;
  user: User;
  ground: Ground;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  createdAt: Date;
  club: Club;
  user: User;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}