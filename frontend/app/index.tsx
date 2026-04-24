import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LandingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="auth-safe-area">
      <View className="auth-content justify-center">
        
        <View className="auth-brand-block mb-10">
          <View className="auth-logo-mark mb-4">
            <Text className="auth-logo-mark-text">B</Text>
          </View>
          <Text className="auth-wordmark">BizGrow</Text>
          <Text className="auth-wordmark-sub mt-2">Choose your portal</Text>
        </View>

        <TouchableOpacity 
          className="auth-button mb-4 flex-row justify-center items-center gap-2"
          activeOpacity={0.8}
          onPress={() => router.push('/(auth)/merchant/login')}
        >
          <Ionicons name="storefront" size={20} color="#fff" />
          <Text className="auth-button-text">I am a Merchant</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          className="auth-secondary-button flex-row justify-center items-center gap-2"
          activeOpacity={0.8}
          onPress={() => router.push('/(auth)/customer/login')}
        >
          <Ionicons name="person" size={20} color="#0EA5E9" />
          <Text className="auth-secondary-button-text">I am a Customer</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}