import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function CustomerLogin() {
  const router = useRouter();
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // For demo/hackathon purposes, direct bypass to the customer tabs
    if (phone && password) {
      router.replace('/(customer-tabs)');
    } else {
      Alert.alert('Error', 'Please enter phone number and password');
    }
  };

  return (
    <SafeAreaView className="auth-safe-area">
      <View className="auth-content">
        <View className="auth-brand-block">
          <Text className="auth-title mt-4">Customer Login</Text>
          <Text className="auth-subtitle">View your rewards and offers</Text>
        </View>

        <View className="auth-card">
          <View className="auth-form">
            <View className="auth-field">
              <Text className="auth-label">Phone Number</Text>
              <TextInput
                className="auth-input"
                placeholder="+1 234 567 8900"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
            </View>
            <View className="auth-field">
              <Text className="auth-label">Password</Text>
              <TextInput
                className="auth-input"
                placeholder="••••••••"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>
            
            <TouchableOpacity 
              className="auth-button mt-4"
              activeOpacity={0.8}
              onPress={handleLogin}
            >
              <Text className="auth-button-text">Sign In</Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-4 items-center" onPress={() => router.back()}>
              <Text className="auth-link-copy">Back to selection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
