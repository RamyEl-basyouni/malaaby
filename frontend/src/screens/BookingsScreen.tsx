import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '../store';
import { bookingsAPI } from '../services/api';
import { fetchBookingsStart, fetchBookingsSuccess, fetchBookingsFailure } from '../store/slices/bookingsSlice';
import { Booking } from '../types';

const BookingsScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { bookings, isLoading } = useSelector((state: RootState) => state.bookings);
  const [refreshing, setRefreshing] = useState(false);

  const loadBookings = async () => {
    if (!user) return;
    
    try {
      dispatch(fetchBookingsStart());
      const data = await bookingsAPI.getUserBookings(user.id);
      dispatch(fetchBookingsSuccess(data));
    } catch (error) {
      dispatch(fetchBookingsFailure('Failed to load bookings'));
      Alert.alert('Error', 'Failed to load bookings');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadBookings();
    setRefreshing(false);
  };

  useEffect(() => {
    loadBookings();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return '#10b981';
      case 'pending':
        return '#f59e0b';
      case 'cancelled':
        return '#ef4444';
      case 'completed':
        return '#6b7280';
      default:
        return '#6b7280';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const renderBookingCard = (booking: Booking) => (
    <View key={booking.id} className="bg-dark-card rounded-xl p-4 mb-4 border border-dark-border">
      <View className="flex-row mb-3">
        <Image
          source={{ uri: booking.ground.images[0] || 'https://via.placeholder.com/80x80' }}
          className="w-16 h-16 rounded-lg mr-3"
        />
        <View className="flex-1">
          <Text className="text-dark-text text-lg font-bold">{booking.ground.club.name}</Text>
          <Text className="text-dark-muted text-sm">{booking.ground.name}</Text>
          <View className="flex-row items-center mt-1">
            <View
              className="w-2 h-2 rounded-full mr-2"
              style={{ backgroundColor: getStatusColor(booking.status) }}
            />
            <Text className="text-dark-muted text-sm capitalize">{booking.status}</Text>
          </View>
        </View>
        <Text className="text-primary-500 text-lg font-bold">${booking.totalPrice}</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons name="calendar" size={16} color="#3b82f6" />
          <Text className="text-dark-text ml-2">{formatDate(booking.date)}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="time" size={16} color="#3b82f6" />
          <Text className="text-dark-text ml-2">{booking.startTime} - {booking.endTime}</Text>
        </View>
      </View>

      {booking.notes && (
        <View className="mt-3 pt-3 border-t border-dark-border">
          <Text className="text-dark-muted text-sm">{booking.notes}</Text>
        </View>
      )}
    </View>
  );

  if (!user) {
    return (
      <View className="flex-1 bg-dark-bg justify-center items-center">
        <Ionicons name="person-circle" size={64} color="#a1a1aa" />
        <Text className="text-dark-muted text-lg mt-4">Please login to view bookings</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-dark-bg">
      <View className="p-4 bg-dark-card border-b border-dark-border">
        <Text className="text-dark-text text-2xl font-bold">My Bookings</Text>
      </View>

      <ScrollView
        className="flex-1 p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3b82f6" />
        }
      >
        {bookings.length === 0 && !isLoading ? (
          <View className="flex-1 justify-center items-center mt-20">
            <Ionicons name="calendar" size={64} color="#a1a1aa" />
            <Text className="text-dark-muted text-lg mt-4">No bookings yet</Text>
            <Text className="text-dark-muted text-sm mt-2 text-center">
              Book a ground to see your reservations here
            </Text>
          </View>
        ) : (
          bookings.map(renderBookingCard)
        )}
      </ScrollView>
    </View>
  );
};

export default BookingsScreen;