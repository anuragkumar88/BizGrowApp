import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { Input, Button } from '@/components/ui';
import { LinearGradient } from 'expo-linear-gradient';

export default function MerchantSignup() {
  const router = useRouter();
  const { login, register } = useAuth();
  
  const [name, setName] = useState('');
  const [storeName, setStoreName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!name || !storeName || !email || !password) {
      alert('Please fill all fields');
      return;
    }
    register({ role: 'merchant', name, storeName, email, password });
    login({ role: 'merchant', name, storeName, email });
    router.replace('/(tabs)');
  };

  return (
    <View className="flex-1">
      {/* Gradient Header */}
      <LinearGradient
        colors={['#0EA5E9', '#0284C7', '#0369A1']}
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
            <Ionicons name="rocket" size={24} color="#fff" />
          </View>
          <Text className="text-3xl font-sans-extrabold text-white">Create Store</Text>
        </View>
        <Text className="text-base font-sans-medium text-white/80">
          Set up your business on BizGrow and start rewarding customers.
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
                <Text className="text-xs font-sans-semibold text-muted-foreground uppercase tracking-widest mb-2">Your Name</Text>
                <View className="flex-row items-center rounded-2xl border border-border bg-card px-4">
                  <Ionicons name="person-outline" size={18} color="#64748B" />
                  <Input 
                    placeholder="Full Name" 
                    value={name} 
                    onChangeText={setName}
                    style={{ flex: 1, borderWidth: 0, marginLeft: 8 }}
                  />
                </View>
              </View>
              <View>
                <Text className="text-xs font-sans-semibold text-muted-foreground uppercase tracking-widest mb-2">Store Name</Text>
                <View className="flex-row items-center rounded-2xl border border-border bg-card px-4">
                  <Ionicons name="storefront-outline" size={18} color="#64748B" />
                  <Input 
                    placeholder="Your Store Name" 
                    value={storeName} 
                    onChangeText={setStoreName}
                    style={{ flex: 1, borderWidth: 0, marginLeft: 8 }}
                  />
                </View>
              </View>
              <View>
                <Text className="text-xs font-sans-semibold text-muted-foreground uppercase tracking-widest mb-2">Email</Text>
                <View className="flex-row items-center rounded-2xl border border-border bg-card px-4">
                  <Ionicons name="mail-outline" size={18} color="#64748B" />
                  <Input 
                    placeholder="you@example.com" 
                    value={email} 
                    onChangeText={setEmail} 
                    keyboardType="email-address" 
                    autoCapitalize="none"
                    style={{ flex: 1, borderWidth: 0, marginLeft: 8 }}
                  />
                </View>
              </View>
              <View>
                <Text className="text-xs font-sans-semibold text-muted-foreground uppercase tracking-widest mb-2">Password</Text>
                <View className="flex-row items-center rounded-2xl border border-border bg-card px-4">
                  <Ionicons name="lock-closed-outline" size={18} color="#64748B" />
                  <Input 
                    placeholder="Min 8 characters" 
                    value={password} 
                    onChangeText={setPassword} 
                    secureTextEntry
                    style={{ flex: 1, borderWidth: 0, marginLeft: 8 }}
                  />
                </View>
              </View>
            </View>

            {/* Terms */}
            <Text className="text-xs font-sans-medium text-muted-foreground text-center mb-6 leading-5">
              By creating an account, you agree to our{' '}
              <Text className="text-primary font-sans-bold">Terms of Service</Text> and{' '}
              <Text className="text-primary font-sans-bold">Privacy Policy</Text>.
            </Text>

            <TouchableOpacity 
              onPress={handleSignup}
              className="items-center rounded-2xl bg-primary py-4 w-full"
              activeOpacity={0.7}
            >
              <Text className="text-base font-sans-bold text-white">Create Account</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-6 mb-8">
              <Text className="text-sm font-sans-medium text-muted-foreground">Already have a store? </Text>
              <TouchableOpacity onPress={() => router.replace('/(auth)/merchant/login')}>
                <Text className="text-sm font-sans-bold text-primary">Sign In →</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      </View>
    </View>
  );
}
