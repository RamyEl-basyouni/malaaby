export interface User {
  id: number;
  email: string;
  name: string;
  phone?: string;
}

export interface Club {
  id: number;
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  images: string[];
  facilities: string[];
  rating: number;
  reviewCount: number;
  grounds: Ground[];
  reviews: Review[];
}

export interface Ground {
  id: number;
  name: string;
  sportType: 'football' | 'volleyball' | 'tennis';
  groundType: 'grass' | 'artificial' | 'sand' | 'clay';
  pricePerHour: number;
  images: string[];
  description?: string;
  availableHours: string[];
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user: User;
  createdAt: string;
}

export interface Booking {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  notes?: string;
  ground: Ground & { club: Club };
  createdAt: string;
}

export interface ClubFilters {
  sportType?: 'football' | 'volleyball' | 'tennis';
  minPrice?: number;
  maxPrice?: number;
  distance?: number;
  groundType?: 'grass' | 'artificial' | 'sand' | 'clay';
  userLat?: number;
  userLng?: number;
}