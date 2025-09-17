import React from 'react';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import './global.css';
import { store } from './src/store';
import Navigation from './src/navigation/AppNavigator';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="light" backgroundColor="#0a0a0a" />
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
}
