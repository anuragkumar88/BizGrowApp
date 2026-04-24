import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from '@/app/components/ui';

type DataPoint = { label: string; value: number };
type RangeKey = 'today' | 'week' | 'month';

type TopCustomer = {
  rank: number;
  name: string;
  spend: number;
  points: number;
};

type TagData = {
  tag: string;
  count: number;
  color: string;
};

const REVENUE_DATA: Record<RangeKey, DataPoint[]> = {
  today: [
    { label: '9AM', value: 420 }, { label: '11AM', value: 850 },
    { label: '1PM', value: 630 }, { label: '3PM', value: 940 },
    { label: '5PM', value: 1100 }, { label: '7PM', value: 340 },
  ],
  week: [
    { label: 'Mon', value: 3200 }, { label: 'Tue', value: 4100 },
    { label: 'Wed', value: 2800 }, { label: 'Thu', value: 5200 },
    { label: 'Fri', value: 4800 }, { label: 'Sat', value: 6100 },
    { label: 'Sun', value: 3900 },
  ],
  month: [
    { label: 'W1', value: 18000 }, { label: 'W2', value: 22000 },
    { label: 'W3', value: 19500 }, { label: 'W4', value: 28000 },
  ],
};

const TOP_CUSTOMERS: TopCustomer[] = [
  { rank: 1, name: 'Ravi Gupta', spend: 4120, points: 412 },
  { rank: 2, name: 'Rahul Sharma', spend: 2840, points: 284 },
  { rank: 3, name: 'Amit Kumar', spend: 2100, points: 210 },
  { rank: 4, name: 'Priya Patel', spend: 1650, points: 165 },
  { rank: 5, name: 'Sunita Devi', spend: 900, points: 90 },
];

const TAG_DATA: TagData[] = [
  { tag: 'Regular', count: 68, color: '#16A34A' },
  { tag: 'High Spender', count: 24, color: '#2563EB' },
  { tag: 'New', count: 20, color: '#D97706' },
  { tag: 'Bread Buyer', count: 12, color: '#DC2626' },
];

const MAX_BAR_HEIGHT = 120;

function getRankColor(rank: number): string {
  if (rank === 1) return '#D97706';
  if (rank === 2) return '#6B7280';
  if (rank === 3) return '#CD7F32';
  return '#94A3B8';
}

export default function AnalyticsScreen() {
  const [activeRange, setActiveRange] = useState<RangeKey>('today');

  const rangeData = REVENUE_DATA[activeRange];
  const maxValue = Math.max(...rangeData.map((d) => d.value));
  const tagTotal = TAG_DATA.reduce((sum, t) => sum + t.count, 0);

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
      >
        {/* Header */}
        <View className="mt-4 mb-5">
          <Text className="text-2xl font-extrabold font-sans-bold text-foreground">Analytics</Text>
        </View>

        {/* Date Range Toggle */}
        <View className="flex-row bg-muted rounded-full p-1 mb-5">
          {(['today', 'week', 'month'] as RangeKey[]).map((range) => {
            const label = range === 'today' ? 'Today' : range === 'week' ? 'This Week' : 'This Month';
            const isActive = activeRange === range;
            return (
              <TouchableOpacity
                key={range}
                className={`flex-1 items-center py-2 px-4 rounded-full ${isActive ? 'bg-primary' : ''}`}
                onPress={() => setActiveRange(range)}
                activeOpacity={0.8}
              >
                <Text
                  className={`text-sm font-sans-semibold ${isActive ? 'text-white' : 'text-muted-foreground'}`}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Revenue Bar Chart */}
        <View className="rounded-2xl border border-border bg-card p-4 mb-5">
          <Text className="text-base font-sans-bold font-bold text-foreground mb-4">
            Revenue Chart
          </Text>
          <View className="flex-row items-end justify-between" style={{ height: MAX_BAR_HEIGHT + 32 }}>
            {rangeData.map((item) => {
              const barHeight = Math.max(
                Math.round((item.value / maxValue) * MAX_BAR_HEIGHT),
                4
              );
              return (
                <View key={item.label} className="items-center flex-1">
                  <View
                    className="rounded-t-lg bg-[#16A34A]"
                    style={{ width: '65%', height: barHeight }}
                  />
                  <Text className="text-[10px] font-sans-medium text-muted-foreground mt-1.5">
                    {item.label}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* Stats Cards 2x2 */}
        <View className="flex-row gap-3 mb-3">
          <View className="flex-1 rounded-2xl border border-border bg-card p-4">
            <Text className="text-xl font-extrabold font-sans-bold text-[#16A34A]">₹28,480</Text>
            <Text className="text-xs font-sans-medium text-muted-foreground mt-1">Total Revenue</Text>
          </View>
          <View className="flex-1 rounded-2xl border border-border bg-card p-4">
            <Text className="text-xl font-extrabold font-sans-bold text-[#2563EB]">186</Text>
            <Text className="text-xs font-sans-medium text-muted-foreground mt-1">Transactions</Text>
          </View>
        </View>
        <View className="flex-row gap-3 mb-5">
          <View className="flex-1 rounded-2xl border border-border bg-card p-4">
            <Text className="text-xl font-extrabold font-sans-bold text-[#D97706]">14</Text>
            <Text className="text-xs font-sans-medium text-muted-foreground mt-1">New Customers</Text>
          </View>
          <View className="flex-1 rounded-2xl border border-border bg-card p-4">
            <Text className="text-xl font-extrabold font-sans-bold text-[#EF4444]">1,240</Text>
            <Text className="text-xs font-sans-medium text-muted-foreground mt-1">Points Redeemed</Text>
          </View>
        </View>

        {/* Top Customers */}
        <View className="list-head mb-3">
          <Text className="list-title">Top Customers</Text>
        </View>
        <View className="rounded-2xl border border-border bg-card mb-5 overflow-hidden">
          {TOP_CUSTOMERS.map((customer, idx) => (
            <View key={customer.rank}>
              <View className="flex-row items-center px-4 py-3 gap-3">
                <Text
                  className="text-base font-extrabold font-sans-bold w-6 text-center"
                  style={{ color: getRankColor(customer.rank) }}
                >
                  {customer.rank}
                </Text>
                <Avatar name={customer.name} size="sm" backgroundColor="#232A45" textColor="#FCFCFC" />
                <Text className="flex-1 text-sm font-sans-semibold text-foreground" numberOfLines={1}>
                  {customer.name}
                </Text>
                <Text className="text-sm font-sans-bold font-bold text-[#16A34A]">
                  ₹{customer.spend.toLocaleString()}
                </Text>
              </View>
              {idx < TOP_CUSTOMERS.length - 1 && (
                <View className="h-px bg-border mx-4" />
              )}
            </View>
          ))}
        </View>

        {/* Tag Breakdown */}
        <View className="list-head mb-3">
          <Text className="list-title">Customer Tags</Text>
        </View>
        <View className="rounded-2xl border border-border bg-card p-4 mb-5">
          {TAG_DATA.map((item) => {
            const pct = Math.round((item.count / tagTotal) * 100);
            return (
              <View key={item.tag} className="mb-4">
                <View className="flex-row justify-between items-center mb-1.5">
                  <Text className="text-sm font-sans-semibold text-foreground">{item.tag}</Text>
                  <View className="flex-row items-center gap-2">
                    <Text className="text-xs font-sans-medium text-muted-foreground">{pct}%</Text>
                    <Text className="text-xs font-sans-bold font-bold text-foreground">{item.count}</Text>
                  </View>
                </View>
                <View className="h-2 rounded-full bg-muted w-full">
                  <View
                    className="h-2 rounded-full"
                    style={{ width: `${pct}%`, backgroundColor: item.color }}
                  />
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
