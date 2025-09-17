import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { RootState } from '../store';
import { authAPI } from '../services/api';
import { loginStart, loginSuccess, loginFailure, logout } from '../store/slices/authSlice';

const ProfileScreen: React.FC = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  });

  const handleLogin = async () => {
    if (!loginForm.email || !loginForm.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      dispatch(loginStart());
      const data = await authAPI.login(loginForm.email, loginForm.password);
      dispatch(loginSuccess(data));
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '', name: '', phone: '' });
    } catch (error) {
      dispatch(loginFailure('Invalid email or password'));
      Alert.alert('Error', 'Invalid email or password');
    }
  };

  const handleRegister = async () => {
    if (!loginForm.email || !loginForm.password || !loginForm.name) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      dispatch(loginStart());
      const data = await authAPI.register({
        email: loginForm.email,
        password: loginForm.password,
        name: loginForm.name,
        phone: loginForm.phone,
      });
      dispatch(loginSuccess(data));
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '', name: '', phone: '' });
    } catch (error) {
      dispatch(loginFailure('Registration failed'));
      Alert.alert('Error', 'Registration failed');
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: () => dispatch(logout()) },
      ]
    );
  };

  const ProfileItem = ({ icon, title, subtitle, onPress }: any) => (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center p-4 bg-dark-card rounded-lg mb-3 border border-dark-border"
    >
      <Ionicons name={icon} size={24} color="#3b82f6" />
      <View className="flex-1 ml-3">
        <Text className="text-dark-text font-semibold">{title}</Text>
        {subtitle && <Text className="text-dark-muted text-sm">{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#a1a1aa" />
    </TouchableOpacity>
  );

  if (!user) {
    return (
      <View className="flex-1 bg-dark-bg">
        <View className="p-4 bg-dark-card border-b border-dark-border">
          <Text className="text-dark-text text-2xl font-bold">Profile</Text>
        </View>

        <View className="flex-1 justify-center items-center p-6">
          <Ionicons name="person-circle" size={80} color="#a1a1aa" />
          <Text className="text-dark-text text-xl font-bold mt-4">Welcome to Malaaby</Text>
          <Text className="text-dark-muted text-center mt-2 mb-6">
            Sign in to book grounds and manage your reservations
          </Text>
          
          <TouchableOpacity
            onPress={() => setShowLoginModal(true)}
            className="bg-primary-500 rounded-lg px-8 py-3 w-full"
          >
            <Text className="text-white text-center font-semibold">Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Login/Register Modal */}
        <Modal visible={showLoginModal} transparent animationType="slide">
          <View className="flex-1 justify-end bg-black bg-opacity-50">
            <View className="bg-dark-card rounded-t-3xl p-6">
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-dark-text text-xl font-bold">
                  {isRegister ? 'Create Account' : 'Sign In'}
                </Text>
                <TouchableOpacity onPress={() => setShowLoginModal(false)}>
                  <Ionicons name="close" size={24} color="#a1a1aa" />
                </TouchableOpacity>
              </View>

              {isRegister && (
                <View className="mb-4">
                  <Text className="text-dark-text mb-2">Name</Text>
                  <TextInput
                    value={loginForm.name}
                    onChangeText={(text) => setLoginForm({ ...loginForm, name: text })}
                    className="bg-dark-bg border border-dark-border rounded-lg p-3 text-dark-text"
                    placeholder="Enter your name"
                    placeholderTextColor="#a1a1aa"
                  />
                </View>
              )}

              <View className="mb-4">
                <Text className="text-dark-text mb-2">Email</Text>
                <TextInput
                  value={loginForm.email}
                  onChangeText={(text) => setLoginForm({ ...loginForm, email: text })}
                  className="bg-dark-bg border border-dark-border rounded-lg p-3 text-dark-text"
                  placeholder="Enter your email"
                  placeholderTextColor="#a1a1aa"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View className="mb-4">
                <Text className="text-dark-text mb-2">Password</Text>
                <TextInput
                  value={loginForm.password}
                  onChangeText={(text) => setLoginForm({ ...loginForm, password: text })}
                  className="bg-dark-bg border border-dark-border rounded-lg p-3 text-dark-text"
                  placeholder="Enter your password"
                  placeholderTextColor="#a1a1aa"
                  secureTextEntry
                />
              </View>

              {isRegister && (
                <View className="mb-4">
                  <Text className="text-dark-text mb-2">Phone (optional)</Text>
                  <TextInput
                    value={loginForm.phone}
                    onChangeText={(text) => setLoginForm({ ...loginForm, phone: text })}
                    className="bg-dark-bg border border-dark-border rounded-lg p-3 text-dark-text"
                    placeholder="Enter your phone number"
                    placeholderTextColor="#a1a1aa"
                    keyboardType="phone-pad"
                  />
                </View>
              )}

              <TouchableOpacity
                onPress={isRegister ? handleRegister : handleLogin}
                className="bg-primary-500 rounded-lg p-4 mb-4"
                disabled={isLoading}
              >
                <Text className="text-white text-center font-semibold">
                  {isLoading ? 'Loading...' : (isRegister ? 'Create Account' : 'Sign In')}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setIsRegister(!isRegister)}
                className="p-2"
              >
                <Text className="text-primary-500 text-center">
                  {isRegister ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-dark-bg">
      <View className="p-4 bg-dark-card border-b border-dark-border">
        <Text className="text-dark-text text-2xl font-bold">Profile</Text>
      </View>

      <ScrollView className="flex-1 p-4">
        {/* User Info */}
        <View className="bg-dark-card rounded-xl p-4 mb-6 border border-dark-border">
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-primary-500 rounded-full items-center justify-center">
              <Text className="text-white text-xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-dark-text text-xl font-bold">{user.name}</Text>
              <Text className="text-dark-muted">{user.email}</Text>
              {user.phone && <Text className="text-dark-muted">{user.phone}</Text>}
            </View>
          </View>
        </View>

        {/* Profile Options */}
        <ProfileItem
          icon="person-outline"
          title="Edit Profile"
          subtitle="Update your personal information"
        />
        
        <ProfileItem
          icon="notifications-outline"
          title="Notifications"
          subtitle="Manage notification preferences"
        />
        
        <ProfileItem
          icon="card-outline"
          title="Payment Methods"
          subtitle="Manage your payment options"
        />
        
        <ProfileItem
          icon="help-circle-outline"
          title="Help & Support"
          subtitle="Get help with your account"
        />
        
        <ProfileItem
          icon="settings-outline"
          title="Settings"
          subtitle="App preferences and privacy"
        />

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center p-4 bg-dark-card rounded-lg mt-4 border border-red-500"
        >
          <Ionicons name="log-out-outline" size={24} color="#ef4444" />
          <Text className="text-red-500 font-semibold ml-3">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ProfileScreen;