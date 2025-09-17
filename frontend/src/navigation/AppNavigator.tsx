import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import FilterScreen from '../screens/FilterScreen';
import ClubDetailsScreen from '../screens/ClubDetailsScreen';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Home Stack Navigator
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#1a1a1a' },
        headerTintColor: '#ffffff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Clubs' }} />
      <Stack.Screen name="Filter" component={FilterScreen} options={{ title: 'Filter Clubs' }} />
      <Stack.Screen name="ClubDetails" component={ClubDetailsScreen} options={{ title: 'Club Details' }} />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Bookings') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: '#a1a1aa',
        tabBarStyle: {
          backgroundColor: '#1a1a1a',
          borderTopColor: '#2a2a2a',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStack} 
        options={{ title: 'Home' }}
      />
      <Tab.Screen name="Bookings" component={BookingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer theme={{
      dark: true,
      colors: {
        primary: '#3b82f6',
        background: '#0a0a0a',
        card: '#1a1a1a',
        text: '#ffffff',
        border: '#2a2a2a',
        notification: '#3b82f6',
      },
      fonts: {
        regular: {
          fontFamily: 'System',
          fontWeight: 'normal',
        },
        medium: {
          fontFamily: 'System',
          fontWeight: '500',
        },
        bold: {
          fontFamily: 'System',
          fontWeight: 'bold',
        },
        heavy: {
          fontFamily: 'System',
          fontWeight: '900',
        },
      },
    }}>
      <MainNavigator />
    </NavigationContainer>
  );
}