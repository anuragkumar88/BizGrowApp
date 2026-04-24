import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Transaction = {
  id: string;
  customerName: string;
  amount: number;
  time: string;
  points: number;
  items: string;
};

type Customer = {
  id: string;
  name: string;
  totalSpend: number;
  points: number;
};

const recentTransactions: Transaction[] = [
  { id: '1', customerName: 'Rahul Sharma', amount: 340, time: '10:30 AM', points: 34, items: 'Bread, Milk' },
  { id: '2', customerName: 'Priya Patel', amount: 180, time: '11:15 AM', points: 18, items: 'Rice' },
  { id: '3', customerName: 'Amit Kumar', amount: 520, time: '12:00 PM', points: 52, items: 'Oil, Dal, Sugar' },
  { id: '4', customerName: 'Sunita Devi', amount: 95, time: '1:45 PM', points: 9, items: 'Biscuits' },
  { id: '5', customerName: 'Ravi Gupta', amount: 760, time: '3:20 PM', points: 76, items: 'Atta, Ghee' },
];

const topCustomers: Customer[] = [
  { id: '1', name: 'Rahul Sharma', totalSpend: 2840, points: 284 },
  { id: '2', name: 'Amit Kumar', totalSpend: 2100, points: 210 },
  { id: '3', name: 'Priya Patel', totalSpend: 1650, points: 165 },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        {/* 1. Header */}
        <View className="home-header px-4 mt-4">
          <View className="flex-row items-center">
            <View className="home-avatar mr-0">
              <Text className="home-avatar-text font-bold">AS</Text>
            </View>
            <View>
              <Text className="home-greeting-sub">Good morning !</Text>
              <Text className="home-greeting font-extrabold ">Aryan's Store</Text>
            </View>
          </View>
          <TouchableOpacity className="size-10 items-center justify-center rounded-full border border-border bg-card">
            <Ionicons name="notifications-outline" size={20} color="#1A1A2E" />
          </TouchableOpacity>
        </View>

        {/* 2. Revenue Card */}
        <View className="px-4">
          <View className="home-revenue-card">
            <View>
              <Text className="home-revenue-label font-bold">Today's Revenue</Text>
              <Text className="home-revenue-amount mt-1 font-5xl font-bold">₹4,280</Text>
            </View>
            <View className="flex-row justify-between items-end mt-4">
              <Text className="text-sm font-sans-medium text-white/70">↑ 12% vs yesterday</Text>
              <Text className="text-sm font-sans-medium text-white/70">24 Apr</Text>
            </View>
          </View>
        </View>

        {/* 3. Stats Row */}
        <View className="flex-row gap-3 px-4 mb-5 mt-2">
          <View className="home-stats-card">
            <Text className="home-stats-value font-extrabold">124</Text>
            <Text className="home-stats-label font-bold">Customers</Text>
          </View>
          <View className="home-stats-card">
            <Text className="home-stats-value font-extrabold">8</Text>
            <Text className="home-stats-label font-bold">Transaction</Text>
          </View>
          <View className="home-stats-card">
            <Text className="home-stats-value font-extrabold">3</Text>
            <Text className="home-stats-label font-bold">Campaigns</Text>
          </View>
        </View>

        {/* 4. Quick Actions Row */}
        <View className="px-4 mb-2">
          <Text className="list-title mb-3">Quick Actions</Text>
          <View className="flex-row gap-3">
            <TouchableOpacity className="home-quick-action" onPress={() => router.push('/(tabs)/customers')}>
              <Ionicons name="person-add-outline" size={24} color="#fcfcfc" />
              <Text className="home-quick-action-text font-bold">Add Customer</Text>
            </TouchableOpacity>
            <TouchableOpacity className="home-quick-action" onPress={() => router.push('/transaction/new')}>
              <Ionicons name="receipt-outline" size={24} color="#fcfcfc" />
              <Text className="home-quick-action-text font-bold">Log Sale</Text>
            </TouchableOpacity>
            <TouchableOpacity className="home-quick-action" onPress={() => router.push('/(tabs)/campaigns')}>
              <Ionicons name="megaphone-outline" size={24} color="#fcfcfc" />
              <Text className="home-quick-action-text font-bold">Campaign</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 5. Recent Transactions */}
        <View className="px-4">
          <View className="list-head">
            <Text className="list-title">Recent Transactions</Text>
            <TouchableOpacity className="list-action">
              <Text className="list-action-text">See All</Text>
            </TouchableOpacity>
          </View>

          {recentTransactions.map((t) => (
            <View className="transaction-card" key={t.id}>
              <View className="flex-1">
                <Text className="text-lg font-bold font-sans-bold text-foreground/70">{t.customerName}</Text>
                <Text className="transaction-meta mt-1">{t.items}</Text>
              </View>
              <View className="items-end">
                <Text className="transaction-meta mb-1">{t.time}</Text>
                <Text className="transaction-amount mb-1">₹{t.amount}</Text>
                <View className="points-earned-badge mt-0.5">
                  <Text className="points-earned-text">{t.points} pts</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* 6. Top Customers */}
        <View className="px-4 mt-2">
          <View className="list-head">
            <Text className="list-title">Top Customers</Text>
            <Pressable className="list-action">
              <Text className="list-action-text">View All</Text>
            </Pressable>
          </View>
        </View>
        
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {topCustomers.map(c => (
            <View key={c.id} className="w-[160px] rounded-2xl border border-border bg-card p-4 mr-3">
              <View className="customer-avatar mb-3">
                <Text className="customer-avatar-text font-extrabold">
                  {c.name.split(' ').map(n => n[0]).join('').substring(0, 2)}
                </Text>
              </View>
              <Text className="customer-name mb-1" numberOfLines={1}>{c.name}</Text>
              <Text className="text-base font-bold font-sans-bold text-primary mb-1">₹{c.totalSpend}</Text>
              <Text className="text-xs font-sans-medium text-muted-foreground">{c.points} pts</Text>
            </View>
          ))}
        </ScrollView>
      </ScrollView>
    </SafeAreaView>
  );
}
