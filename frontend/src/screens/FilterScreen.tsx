import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '../store';
import { setFilters } from '../store/slices/clubsSlice';
import { ClubFilters } from '../types';

interface Props {
  navigation: any;
}

const FilterScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const currentFilters = useSelector((state: RootState) => state.clubs.filters);
  
  const [filters, setLocalFilters] = useState<ClubFilters>(currentFilters);

  const sportTypes = [
    { value: 'football', label: 'Football', icon: 'football' },
    { value: 'tennis', label: 'Tennis', icon: 'tennisball' },
    { value: 'volleyball', label: 'Volleyball', icon: 'basketball' },
  ];

  const groundTypes = [
    { value: 'grass', label: 'Grass' },
    { value: 'artificial', label: 'Artificial' },
    { value: 'sand', label: 'Sand' },
    { value: 'clay', label: 'Clay' },
  ];

  const priceRanges = [
    { min: 0, max: 50, label: '$0 - $50' },
    { min: 51, max: 100, label: '$51 - $100' },
    { min: 101, max: 150, label: '$101 - $150' },
    { min: 151, max: 999, label: '$151+' },
  ];

  const distances = [
    { value: 5, label: '5 km' },
    { value: 10, label: '10 km' },
    { value: 20, label: '20 km' },
    { value: 50, label: '50 km' },
  ];

  const applyFilters = () => {
    dispatch(setFilters(filters));
    navigation.goBack();
  };

  const clearFilters = () => {
    setLocalFilters({});
  };

  const renderOptionButton = (
    isSelected: boolean,
    onPress: () => void,
    label: string,
    icon?: string
  ) => (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center p-3 rounded-lg border mr-2 mb-2 ${
        isSelected
          ? 'bg-primary-500 border-primary-500'
          : 'bg-dark-card border-dark-border'
      }`}
    >
      {icon && (
        <Ionicons
          name={icon as any}
          size={20}
          color={isSelected ? 'white' : '#a1a1aa'}
          style={{ marginRight: 8 }}
        />
      )}
      <Text className={isSelected ? 'text-white font-semibold' : 'text-dark-muted'}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-dark-bg">
      <ScrollView className="flex-1 p-4">
        {/* Sport Type */}
        <View className="mb-6">
          <Text className="text-dark-text text-lg font-bold mb-3">Sport Type</Text>
          <View className="flex-row flex-wrap">
            {sportTypes.map((sport) => (
              <View key={sport.value}>
                {renderOptionButton(
                  filters.sportType === sport.value,
                  () => setLocalFilters({
                    ...filters,
                    sportType: filters.sportType === sport.value ? undefined : sport.value as any,
                  }),
                  sport.label,
                  sport.icon
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Ground Type */}
        <View className="mb-6">
          <Text className="text-dark-text text-lg font-bold mb-3">Ground Type</Text>
          <View className="flex-row flex-wrap">
            {groundTypes.map((ground) => (
              <View key={ground.value}>
                {renderOptionButton(
                  filters.groundType === ground.value,
                  () => setLocalFilters({
                    ...filters,
                    groundType: filters.groundType === ground.value ? undefined : ground.value as any,
                  }),
                  ground.label
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Price Range */}
        <View className="mb-6">
          <Text className="text-dark-text text-lg font-bold mb-3">Price Range per Hour</Text>
          <View className="flex-row flex-wrap">
            {priceRanges.map((range) => (
              <View key={`${range.min}-${range.max}`}>
                {renderOptionButton(
                  filters.minPrice === range.min && filters.maxPrice === range.max,
                  () => setLocalFilters({
                    ...filters,
                    minPrice: filters.minPrice === range.min ? undefined : range.min,
                    maxPrice: filters.maxPrice === range.max ? undefined : range.max,
                  }),
                  range.label
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Distance */}
        <View className="mb-6">
          <Text className="text-dark-text text-lg font-bold mb-3">Distance from Me</Text>
          <View className="flex-row flex-wrap">
            {distances.map((dist) => (
              <View key={dist.value}>
                {renderOptionButton(
                  filters.distance === dist.value,
                  () => setLocalFilters({
                    ...filters,
                    distance: filters.distance === dist.value ? undefined : dist.value,
                  }),
                  dist.label
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View className="p-4 border-t border-dark-border bg-dark-card">
        <View className="flex-row space-x-3">
          <TouchableOpacity
            onPress={clearFilters}
            className="flex-1 p-3 rounded-lg border border-dark-border bg-dark-bg"
          >
            <Text className="text-dark-muted text-center font-semibold">Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={applyFilters}
            className="flex-1 p-3 rounded-lg bg-primary-500"
          >
            <Text className="text-white text-center font-semibold">Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FilterScreen;