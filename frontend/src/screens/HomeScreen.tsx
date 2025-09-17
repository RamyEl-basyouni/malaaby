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
import { clubsAPI } from '../services/api';
import { fetchClubsStart, fetchClubsSuccess, fetchClubsFailure } from '../store/slices/clubsSlice';
import { Club } from '../types';

interface Props {
  navigation: any;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const { clubs, isLoading, filters } = useSelector((state: RootState) => state.clubs);
  const [refreshing, setRefreshing] = useState(false);

  const loadClubs = async () => {
    try {
      dispatch(fetchClubsStart());
      const data = await clubsAPI.getClubs(filters);
      dispatch(fetchClubsSuccess(data));
    } catch (error) {
      dispatch(fetchClubsFailure('Failed to load clubs'));
      Alert.alert('Error', 'Failed to load clubs');
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadClubs();
    setRefreshing(false);
  };

  useEffect(() => {
    loadClubs();
  }, [filters]);

  const renderClubCard = (club: Club) => (
    <TouchableOpacity
      key={club.id}
      className="bg-dark-card rounded-xl mb-4 overflow-hidden border border-dark-border"
      onPress={() => navigation.navigate('ClubDetails', { club })}
    >
      <Image
        source={{ uri: club.images[0] || 'https://via.placeholder.com/400x200' }}
        className="w-full h-48"
        resizeMode="cover"
      />
      <View className="p-4">
        <Text className="text-dark-text text-xl font-bold mb-2">{club.name}</Text>
        <Text className="text-dark-muted text-sm mb-2">{club.address}</Text>
        
        <View className="flex-row items-center mb-2">
          <Ionicons name="star" size={16} color="#fbbf24" />
          <Text className="text-dark-text ml-1 font-semibold">{club.rating}</Text>
          <Text className="text-dark-muted ml-1">({club.reviewCount} reviews)</Text>
        </View>

        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Ionicons name="location" size={16} color="#3b82f6" />
            <Text className="text-dark-muted ml-1 text-sm">
              {club.grounds.length} ground{club.grounds.length !== 1 ? 's' : ''}
            </Text>
          </View>
          <Text className="text-primary-500 font-semibold">
            From ${Math.min(...club.grounds.map(g => g.pricePerHour))}/hr
          </Text>
        </View>

        <View className="flex-row flex-wrap mt-2">
          {club.facilities.slice(0, 3).map((facility, index) => (
            <View key={index} className="bg-dark-bg rounded-full px-2 py-1 mr-2 mb-1">
              <Text className="text-dark-muted text-xs">{facility}</Text>
            </View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-dark-bg">
      <View className="flex-row items-center justify-between p-4 bg-dark-card border-b border-dark-border">
        <Text className="text-dark-text text-2xl font-bold">Find Clubs</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Filter')}
          className="p-2 bg-primary-500 rounded-lg"
        >
          <Ionicons name="filter" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <ScrollView
        className="flex-1 p-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#3b82f6" />
        }
      >
        {clubs.length === 0 && !isLoading ? (
          <View className="flex-1 justify-center items-center mt-20">
            <Ionicons name="search" size={64} color="#a1a1aa" />
            <Text className="text-dark-muted text-lg mt-4">No clubs found</Text>
            <Text className="text-dark-muted text-sm mt-2 text-center">
              Try adjusting your filters or check back later
            </Text>
          </View>
        ) : (
          clubs.map(renderClubCard)
        )}
      </ScrollView>
    </View>
  );
};

export default HomeScreen;