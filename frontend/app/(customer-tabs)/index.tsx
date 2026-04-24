import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '@/components/ui';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';

export default function CustomerDashboard() {
  const router = useRouter();

  const { user, logout } = useAuth();

  // Mock data for hackathon demo mixed with dynamic context
  const customerName = user?.name || "John Doe";
  const storeName = user?.storeName || "Starbucks Coffee";
  const points = 1250;
  
  const recentTransactions = [
    { id: 1, amount: 450, points: 45, date: "Today, 10:30 AM", items: "Caramel Macchiato" },
    { id: 2, amount: 280, points: 28, date: "Yesterday", items: "Blueberry Muffin" },
    { id: 3, amount: 1200, points: 120, date: "Apr 18, 2026", items: "Coffee Beans Pack" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      >
        
        {/* Header */}
        <View className="home-header mb-6">
          <View className="flex-row items-center">
            <Avatar name={customerName} size="md" backgroundColor="#0EA5E9" textColor="#fff" />
            <View>
              <Text className="home-greeting-sub">Welcome back,</Text>
              <Text className="home-greeting ml-0 mt-0.5">{customerName}</Text>
            </View>
          </View>
          <TouchableOpacity 
            onPress={() => {
              logout();
              router.push('/');
            }} 
            className="rounded-full bg-muted p-2"
          >
            <Ionicons name="log-out-outline" size={20} color="#0F172A" />
          </TouchableOpacity>
        </View>

        {/* Loyalty Card */}
        <View className="rounded-3xl bg-primary p-6 justify-between min-h-48 mb-6 shadow-sm overflow-hidden relative">
          <View className="absolute -right-10 -top-10 opacity-10">
             <Ionicons name="gift" size={150} color="#fff" />
          </View>
          <View>
            <Text className="text-white/80 font-sans-medium text-sm mb-1">{storeName} Rewards</Text>
            <Text className="text-white font-sans-extrabold text-5xl tracking-tight">{points}</Text>
            <Text className="text-white/90 font-sans-semibold text-base mt-1">Available Points</Text>
          </View>
          <View className="flex-row items-center justify-between mt-6 pt-4 border-t border-white/20">
            <Text className="text-white/80 font-sans-medium text-xs">Member since 2026</Text>
            <View className="bg-white/20 px-3 py-1 rounded-full">
               <Text className="text-white font-sans-bold text-xs">Gold Tier</Text>
            </View>
          </View>
        </View>

        {/* Quick Actions */}
        <View className="flex-row gap-3 mb-8">
          <TouchableOpacity className="flex-1 items-center rounded-2xl border border-border bg-card py-4 gap-2 shadow-sm" activeOpacity={0.7} onPress={() => router.push('/(customer-tabs)/rewards')}>
            <View className="bg-primary-light p-3 rounded-full">
               <Ionicons name="ticket-outline" size={24} color="#0EA5E9" />
            </View>
            <Text className="text-sm font-sans-bold text-foreground">Redeem</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            className="flex-1 items-center rounded-2xl border border-border bg-card py-4 gap-2 shadow-sm" 
            activeOpacity={0.7}
            onPress={() => alert('Scanner opening...')}
          >
            <View className="bg-secondary-light p-3 rounded-full">
               <Ionicons name="qr-code-outline" size={24} color="#0284C7" />
            </View>
            <Text className="text-sm font-sans-bold text-foreground">Scan Code</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View className="list-head mt-0 mb-4">
          <Text className="list-title text-xl">Recent Activity</Text>
        </View>

        {recentTransactions.map((tx) => (
          <View key={tx.id} className="transaction-card bg-card shadow-sm">
            <View>
              <Text className="text-base font-sans-bold text-foreground">{tx.items}</Text>
              <Text className="transaction-meta mt-1">{tx.date}</Text>
            </View>
            <View className="items-end">
              <Text className="transaction-amount text-foreground">₹{tx.amount}</Text>
              <View className="points-earned-badge mt-1 flex-row items-center gap-1">
                <Ionicons name="star" size={10} color="#0EA5E9" />
                <Text className="points-earned-text">+{tx.points} pts</Text>
              </View>
            </View>
          </View>
        ))}

        <View className="h-10" />
      </ScrollView>
    </SafeAreaView>
  );
}
