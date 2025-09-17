import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { AppDispatch, RootState } from '../store';
import { fetchClubs, setFilters } from '../store/clubsSlice';
import { logout } from '../store/authSlice';
import { Club } from '../types';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('football');
  
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { clubs, loading } = useSelector((state: RootState) => state.clubs);

  const sports = [
    { id: 'football', name: 'Football', icon: 'football-outline' },
    { id: 'tennis', name: 'Tennis', icon: 'tennisball-outline' },
    { id: 'basketball', name: 'Basketball', icon: 'basketball-outline' },
  ];

  useEffect(() => {
    dispatch(fetchClubs());
  }, [dispatch]);

  const handleSportFilter = (sport: string) => {
    setSelectedSport(sport);
    dispatch(setFilters({ sport }));
    dispatch(fetchClubs({ sport }));
  };

  const renderClubCard = (club: Club) => (
    <TouchableOpacity key={club.id} style={styles.clubCard}>
      <Image source={{ uri: club.image }} style={styles.clubImage} />
      <View style={styles.clubInfo}>
        <Text style={styles.clubName}>{club.name}</Text>
        <Text style={styles.clubLocation}>{club.address}, {club.city}</Text>
        <View style={styles.clubMeta}>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#fbbf24" />
            <Text style={styles.ratingText}>{club.rating}</Text>
            <Text style={styles.reviewCount}>({club.reviewCount})</Text>
          </View>
          <Text style={styles.price}>
            From {club.grounds?.[0]?.pricePerHour || 0} EGP/hr
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f9fafb" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <View>
            <Text style={styles.greeting}>Hello, {user?.firstName}!</Text>
            <Text style={styles.subtitle}>Find your perfect ground</Text>
          </View>
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => dispatch(logout())}
          >
            <Ionicons name="person-circle-outline" size={32} color="#3b82f6" />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search clubs, grounds..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color="#3b82f6" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Sport Filter Tabs */}
        <View style={styles.sportsContainer}>
          <Text style={styles.sectionTitle}>Sports</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.sportsRow}>
              {sports.map((sport) => (
                <TouchableOpacity
                  key={sport.id}
                  style={[
                    styles.sportTab,
                    selectedSport === sport.id && styles.activeSportTab,
                  ]}
                  onPress={() => handleSportFilter(sport.id)}
                >
                  <Ionicons
                    name={sport.icon as any}
                    size={24}
                    color={selectedSport === sport.id ? 'white' : '#6b7280'}
                  />
                  <Text
                    style={[
                      styles.sportTabText,
                      selectedSport === sport.id && styles.activeSportTabText,
                    ]}
                  >
                    {sport.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Popular Grounds */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Grounds</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          {clubs.map(renderClubCard)}
        </View>

        {/* Nearby Grounds */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>See all</Text>
            </TouchableOpacity>
          </View>
          {clubs.slice(0, 2).map(renderClubCard)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  profileButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9fafb',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  filterButton: {
    padding: 4,
  },
  content: {
    flex: 1,
  },
  sportsContainer: {
    paddingVertical: 20,
  },
  sportsRow: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  sportTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderRadius: 20,
    gap: 8,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  activeSportTab: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
  },
  sportTabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeSportTabText: {
    color: 'white',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  seeAll: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  clubCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  clubImage: {
    width: '100%',
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  clubInfo: {
    padding: 16,
  },
  clubName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  clubLocation: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  clubMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2937',
  },
  reviewCount: {
    fontSize: 14,
    color: '#6b7280',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#10b981',
  },
});

export default HomeScreen;