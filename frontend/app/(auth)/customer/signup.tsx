import { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../../context/AuthContext';
import { Input, Button } from '@/components/ui';
import { LinearGradient } from 'expo-linear-gradient';

export default function CustomerSignup() {
  const router = useRouter();
  const { login, register } = useAuth();
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = () => {
    if (!name || !phone || !password) {
      alert('Please fill all fields');
      return;
    }
    register({ role: 'customer', name, phone, password });
    login({ role: 'customer', name, phone, storeName: 'Starbucks Coffee' });
    router.replace('/(customer-tabs)');
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
            <Ionicons name="sparkles" size={24} color="#fff" />
          </View>
          <Text className="text-3xl font-sans-extrabold text-white">Join Rewards</Text>
        </View>
        <Text className="text-base font-sans-medium text-white/80">
          Create an account to earn points and unlock exclusive rewards.
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
              By signing up, you agree to our{' '}
              <Text className="text-success font-sans-bold">Terms of Service</Text> and{' '}
              <Text className="text-success font-sans-bold">Privacy Policy</Text>.
            </Text>

            <TouchableOpacity 
              className="items-center rounded-2xl bg-success py-4 mb-4 w-full"
              activeOpacity={0.7}
              onPress={handleSignup}
            >
              <Text className="text-base font-sans-bold text-white">Create Account</Text>
            </TouchableOpacity>

            <View className="flex-row justify-center mt-4 mb-8">
              <Text className="text-sm font-sans-medium text-muted-foreground">Already a member? </Text>
              <TouchableOpacity onPress={() => router.replace('/(auth)/customer/login')}>
                <Text className="text-sm font-sans-bold text-success">Sign In →</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
      </View>
    </View>
  );
}
