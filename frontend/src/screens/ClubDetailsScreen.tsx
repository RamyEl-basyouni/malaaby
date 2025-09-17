import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '../store';
import { bookingsAPI } from '../services/api';
import { addBooking } from '../store/slices/bookingsSlice';
import { Club, Ground } from '../types';

interface Props {
  route: any;
  navigation: any;
}

const ClubDetailsScreen: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state: RootState) => state.auth);
  const club: Club = route.params.club;
  
  const [selectedGround, setSelectedGround] = useState<Ground | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    date: new Date().toISOString().split('T')[0],
    startTime: '18:00',
    endTime: '19:00',
    notes: '',
  });

  const handleBookNow = (ground: Ground) => {
    if (!user || !token) {
      Alert.alert('Login Required', 'Please login to make a booking');
      return;
    }
    setSelectedGround(ground);
    setShowBookingModal(true);
  };

  const submitBooking = async () => {
    if (!selectedGround || !token) return;

    try {
      const booking = await bookingsAPI.createBooking(
        {
          groundId: selectedGround.id,
          date: bookingForm.date,
          startTime: bookingForm.startTime,
          endTime: bookingForm.endTime,
          notes: bookingForm.notes,
        },
        token
      );
      
      dispatch(addBooking(booking));
      setShowBookingModal(false);
      Alert.alert('Success', 'Booking confirmed!', [
        { text: 'OK', onPress: () => navigation.navigate('Bookings') }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create booking');
    }
  };

  const renderGround = (ground: Ground) => (
    <View key={ground.id} className="bg-dark-card rounded-xl p-4 mb-4 border border-dark-border">
      <View className="flex-row mb-3">
        <Image
          source={{ uri: ground.images[0] || 'https://via.placeholder.com/80x80' }}
          className="w-20 h-20 rounded-lg mr-3"
        />
        <View className="flex-1">
          <Text className="text-dark-text text-lg font-bold">{ground.name}</Text>
          <Text className="text-dark-muted text-sm capitalize">{ground.sportType} • {ground.groundType}</Text>
          <Text className="text-primary-500 text-lg font-bold mt-1">${ground.pricePerHour}/hr</Text>
        </View>
      </View>
      
      {ground.description && (
        <Text className="text-dark-muted text-sm mb-3">{ground.description}</Text>
      )}
      
      <TouchableOpacity
        onPress={() => handleBookNow(ground)}
        className="bg-primary-500 rounded-lg p-3"
      >
        <Text className="text-white text-center font-semibold">Book Now</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="flex-1 bg-dark-bg">
      <ScrollView>
        {/* Header Image */}
        <Image
          source={{ uri: club.images[0] || 'https://via.placeholder.com/400x250' }}
          className="w-full h-64"
          resizeMode="cover"
        />

        <View className="p-4">
          {/* Club Info */}
          <Text className="text-dark-text text-2xl font-bold mb-2">{club.name}</Text>
          <Text className="text-dark-muted mb-4">{club.description}</Text>

          <View className="flex-row items-center mb-4">
            <Ionicons name="location" size={16} color="#3b82f6" />
            <Text className="text-dark-muted ml-2">{club.address}</Text>
          </View>

          <View className="flex-row items-center mb-4">
            <Ionicons name="star" size={16} color="#fbbf24" />
            <Text className="text-dark-text ml-2 font-semibold">{club.rating}</Text>
            <Text className="text-dark-muted ml-1">({club.reviewCount} reviews)</Text>
          </View>

          {/* Facilities */}
          <Text className="text-dark-text text-lg font-bold mb-3">Facilities</Text>
          <View className="flex-row flex-wrap mb-6">
            {club.facilities.map((facility, index) => (
              <View key={index} className="bg-dark-bg rounded-full px-3 py-2 mr-2 mb-2">
                <Text className="text-dark-muted text-sm">{facility}</Text>
              </View>
            ))}
          </View>

          {/* Grounds */}
          <Text className="text-dark-text text-lg font-bold mb-3">Available Grounds</Text>
          {club.grounds.map(renderGround)}

          {/* Reviews */}
          <Text className="text-dark-text text-lg font-bold mb-3">Reviews</Text>
          {club.reviews.map((review) => (
            <View key={review.id} className="bg-dark-card rounded-lg p-3 mb-3 border border-dark-border">
              <View className="flex-row items-center mb-2">
                <View className="flex-row">
                  {[...Array(5)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name="star"
                      size={14}
                      color={i < review.rating ? '#fbbf24' : '#4b5563'}
                    />
                  ))}
                </View>
                <Text className="text-dark-muted ml-2 text-sm">{review.user.name}</Text>
              </View>
              <Text className="text-dark-text">{review.comment}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Booking Modal */}
      <Modal visible={showBookingModal} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black bg-opacity-50">
          <View className="bg-dark-card rounded-t-3xl p-6">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-dark-text text-xl font-bold">Book {selectedGround?.name}</Text>
              <TouchableOpacity onPress={() => setShowBookingModal(false)}>
                <Ionicons name="close" size={24} color="#a1a1aa" />
              </TouchableOpacity>
            </View>

            <View className="mb-4">
              <Text className="text-dark-text mb-2">Date</Text>
              <TextInput
                value={bookingForm.date}
                onChangeText={(text) => setBookingForm({ ...bookingForm, date: text })}
                className="bg-dark-bg border border-dark-border rounded-lg p-3 text-dark-text"
                placeholder="YYYY-MM-DD"
                placeholderTextColor="#a1a1aa"
              />
            </View>

            <View className="flex-row mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-dark-text mb-2">Start Time</Text>
                <TextInput
                  value={bookingForm.startTime}
                  onChangeText={(text) => setBookingForm({ ...bookingForm, startTime: text })}
                  className="bg-dark-bg border border-dark-border rounded-lg p-3 text-dark-text"
                  placeholder="HH:MM"
                  placeholderTextColor="#a1a1aa"
                />
              </View>
              <View className="flex-1 ml-2">
                <Text className="text-dark-text mb-2">End Time</Text>
                <TextInput
                  value={bookingForm.endTime}
                  onChangeText={(text) => setBookingForm({ ...bookingForm, endTime: text })}
                  className="bg-dark-bg border border-dark-border rounded-lg p-3 text-dark-text"
                  placeholder="HH:MM"
                  placeholderTextColor="#a1a1aa"
                />
              </View>
            </View>

            <View className="mb-6">
              <Text className="text-dark-text mb-2">Notes (optional)</Text>
              <TextInput
                value={bookingForm.notes}
                onChangeText={(text) => setBookingForm({ ...bookingForm, notes: text })}
                className="bg-dark-bg border border-dark-border rounded-lg p-3 text-dark-text"
                placeholder="Add any special requests..."
                placeholderTextColor="#a1a1aa"
                multiline
                numberOfLines={3}
              />
            </View>

            <TouchableOpacity
              onPress={submitBooking}
              className="bg-primary-500 rounded-lg p-4"
            >
              <Text className="text-white text-center font-semibold">Confirm Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ClubDetailsScreen;