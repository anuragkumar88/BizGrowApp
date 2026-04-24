import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { Input, Button } from '@/components/ui';
import { LinearGradient } from 'expo-linear-gradient';

export default function CustomerLogin() {
  const router = useRouter();
  const { login, findUser } = useAuth();
  
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!phone || !password) {
      alert('Please enter phone and password');
      return;
    }
    const found = findUser(phone, password, 'customer');
    if (found) {
      login({ role: 'customer', name: found.name, phone: found.phone, storeName: 'Starbucks Coffee' });
      router.replace('/(customer-tabs)');
    } else {
      alert('Invalid credentials. Please sign up first.');
    }
  };

  return (
    <View className="flex-1">
      {/* Gradient Header */}
      <LinearGradient
        colors={['#10B981', '#059669', '#047857']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingTop: 60, paddingBottom: 40, paddingHorizontal: 24 }}
      >
        <TouchableOpacity 
          onPress={() => router.back()} 
          className="w-10 h-10 rounded-full bg-white/20 items-center justify-center mb-6"
        >
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <View className="flex-row items-center gap-3 mb-3">
          <View className="w-12 h-12 rounded-2xl bg-white/20 items-center justify-center">
            <Ionicons name="gift" size={24} color="#fff" />
          </View>
          <Text className="text-3xl font-sans-extrabold text-white">Welcome Back</Text>
        </View>
        <Text className="text-base font-sans-medium text-white/80">
          Sign in to check your reward points and exclusive offers.
        </Text>
      </LinearGradient>

      {/* Form Card */}
      <View className="flex-1 bg-background -mt-5 rounded-t-3xl">
          <ScrollView 
            contentContainerStyle={{ padding: 24, paddingTop: 32 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className="gap-5 mb-6">
              <View>
                <Text className="text-xs font-sans-semibold text-muted-foreground uppercase tracking-widest mb-2">Phone Number</Text>
                <View className="flex-row items-center rounded-2xl border border-border bg-card px-4">
                  <Ionicons name="call-outline" size={18} color="#64748B" />
                  <Input 
                    placeholder="+91 98765 43210" 
                    value={phone} 
                    onChangeText={setPhone} 
                    keyboardType="phone-pad"
                    style={{ flex: 1, borderWidth: 0, marginLeft: 8 }}
                  />
                </View>
              </View>
              <View>
                <Text className="text-xs font-sans-semibold text-muted-foreground uppercase tracking-widest mb-2">Password</Text>
                <View className="flex-row items-center rounded-2xl border border-border bg-card px-4">
                  <Ionicons name="lock-closed-outline" size={18} color="#64748B" />
                  <Input 
                    placeholder="••••••••" 
                    value={password} 
                    onChangeText={setPassword} 
                    secureTextEntry
                    style={{ flex: 1, borderWidth: 0, marginLeft: 8 }}
                  />
                </View>
              </View>
            </View>

            <TouchableOpacity className="self-end mb-6">
              <Text className="text-sm font-sans-semibold text-success">Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              className="items-center rounded-2xl bg-success py-4 mb-4 w-full"
              activeOpacity={0.7}
              onPress={handleLogin}
            >
              <Text className="text-base font-sans-bold text-white">Sign In</Text>
            </TouchableOpacity>

            {/* Divider */}
            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-border" />
              <Text className="mx-4 text-xs font-sans-semibold text-muted-foreground uppercase tracking-widest">or</Text>
              <View className="flex-1 h-px bg-border" />
            </View>

            {/* Social Login Mock */}
            <TouchableOpacity className="flex-row items-center justify-center gap-3 rounded-2xl border border-border bg-card py-4 mb-4">
              <Ionicons name="logo-google" size={20} color="#DB4437" />
              <Text className="text-sm font-sans-bold text-foreground">Continue with Google</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-4 mb-8">
              <Text className="text-sm font-sans-medium text-muted-foreground">New here? </Text>
              <TouchableOpacity onPress={() => router.replace('/(auth)/customer/signup')}>
                <Text className="text-sm font-sans-bold text-success">Join Rewards →</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      </View>
    </View>
  );
}
