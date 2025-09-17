import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const recentSearches = [
    'Champions Sports Club',
    'Football grounds in Cairo',
    'Elite Football Academy',
    'Tennis courts nearby',
  ];

  const popularSearches = [
    'Football grounds',
    'Tennis courts',
    'Basketball courts',
    'Indoor facilities',
    'Outdoor fields',
  ];

  const searchSuggestions = [
    {
      id: 1,
      name: 'Champions Sports Club',
      location: 'Cairo',
      image: 'https://via.placeholder.com/60x60',
      rating: 4.5,
    },
    {
      id: 2,
      name: 'Elite Football Academy',
      location: 'Alexandria',
      image: 'https://via.placeholder.com/60x60',
      rating: 4.8,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={20} color="#6b7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search clubs, grounds, or sports..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#6b7280" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {searchQuery.length === 0 ? (
          <>
            {/* Recent Searches */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Recent Searches</Text>
                <TouchableOpacity>
                  <Text style={styles.clearText}>Clear all</Text>
                </TouchableOpacity>
              </View>
              {recentSearches.map((search, index) => (
                <TouchableOpacity key={index} style={styles.searchItem}>
                  <Ionicons name="time-outline" size={20} color="#6b7280" />
                  <Text style={styles.searchText}>{search}</Text>
                  <TouchableOpacity>
                    <Ionicons name="close-outline" size={16} color="#9ca3af" />
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>

            {/* Popular Searches */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Popular Searches</Text>
              <View style={styles.tagsContainer}>
                {popularSearches.map((search, index) => (
                  <TouchableOpacity key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </>
        ) : (
          /* Search Results */
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Search Results</Text>
            {searchSuggestions.map((suggestion) => (
              <TouchableOpacity key={suggestion.id} style={styles.resultItem}>
                <Image
                  source={{ uri: suggestion.image }}
                  style={styles.resultImage}
                />
                <View style={styles.resultInfo}>
                  <Text style={styles.resultName}>{suggestion.name}</Text>
                  <Text style={styles.resultLocation}>{suggestion.location}</Text>
                  <View style={styles.resultRating}>
                    <Ionicons name="star" size={14} color="#fbbf24" />
                    <Text style={styles.ratingText}>{suggestion.rating}</Text>
                  </View>
                </View>
                <Ionicons name="chevron-forward-outline" size={20} color="#9ca3af" />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Quick Filters */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Filters</Text>
          <View style={styles.filtersContainer}>
            <TouchableOpacity style={styles.filterChip}>
              <Ionicons name="location-outline" size={16} color="#3b82f6" />
              <Text style={styles.filterText}>Near me</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Ionicons name="star-outline" size={16} color="#3b82f6" />
              <Text style={styles.filterText}>Top rated</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Ionicons name="flash-outline" size={16} color="#3b82f6" />
              <Text style={styles.filterText}>Available now</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Ionicons name="wallet-outline" size={16} color="#3b82f6" />
              <Text style={styles.filterText}>Best price</Text>
            </TouchableOpacity>
          </View>
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 16,
  },
  clearText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  searchText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  tagText: {
    fontSize: 14,
    color: '#6b7280',
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    gap: 12,
  },
  resultImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  resultInfo: {
    flex: 1,
  },
  resultName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },
  resultLocation: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  resultRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1f2937',
  },
  filtersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    gap: 6,
  },
  filterText: {
    fontSize: 14,
    color: '#3b82f6',
    fontWeight: '500',
  },
});

export default SearchScreen;