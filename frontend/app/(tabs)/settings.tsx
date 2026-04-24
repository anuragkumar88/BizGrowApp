import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar, Button, Input } from '@/app/components/ui';

type StoreData = {
  name: string;
  email: string;
  pointsRate: number;
  redemptionDays: number;
};

const MOCK_STORE: StoreData = {
  name: "Aryan's Kirana Store",
  email: 'sinhaaryan622@gmail.com',
  pointsRate: 10,
  redemptionDays: 30,
};

export default function SettingsScreen() {
  const [storeName, setStoreName] = useState(MOCK_STORE.name);
  const [isEditingName, setIsEditingName] = useState(false);

  const [pointsRate, setPointsRate] = useState(String(MOCK_STORE.pointsRate));
  const [isEditingPoints, setIsEditingPoints] = useState(false);

  const [redemptionDays, setRedemptionDays] = useState(String(MOCK_STORE.redemptionDays));
  const [isEditingRedemption, setIsEditingRedemption] = useState(false);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', style: 'destructive', onPress: () => {} },
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
      >
        {/* Header */}
        <View className="mt-4 mb-5">
          <Text className="text-2xl font-extrabold font-sans-bold text-foreground">Settings</Text>
        </View>

        {/* Store Info Card */}
        <View className="rounded-2xl border border-border bg-card p-5 mb-6 items-center">
          <Avatar name={MOCK_STORE.name} size="xl" backgroundColor="#232A45" textColor="#FCFCFC" />
          <Text className="text-lg font-extrabold font-sans-bold text-foreground mt-3">
            {storeName}
          </Text>
          <Text className="text-sm font-sans-medium text-muted-foreground mt-1">
            {MOCK_STORE.email}
          </Text>
        </View>

        {/* STORE Section */}
        <Text className="text-xs font-sans-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Store
        </Text>
        <View className="rounded-2xl border border-border bg-card mb-4 overflow-hidden">
          <View className="px-5 py-4">
            {isEditingName ? (
              <View>
                <Input
                  label="Store Name"
                  placeholder="Enter store name"
                  value={storeName}
                  onChangeText={setStoreName}
                />
                <TouchableOpacity
                  className="mt-3 items-center rounded-2xl bg-[#16A34A] py-3"
                  activeOpacity={0.85}
                  onPress={() => setIsEditingName(false)}
                >
                  <Text className="text-sm font-sans-bold text-white">Save</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                className="flex-row items-center justify-between"
                activeOpacity={0.7}
                onPress={() => setIsEditingName(true)}
              >
                <Text className="text-sm font-sans-semibold text-foreground">Store Name</Text>
                <View className="flex-row items-center gap-2">
                  <Text className="text-sm font-sans-medium text-muted-foreground" numberOfLines={1}>
                    {storeName}
                  </Text>
                  <Ionicons name="create-outline" size={16} color="#64748B" />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* LOYALTY Section */}
        <Text className="text-xs font-sans-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Loyalty
        </Text>
        <View className="rounded-2xl border border-border bg-card mb-4 overflow-hidden">
          {/* Points Rate Row */}
          <View className="px-5 py-4">
            <TouchableOpacity
              className="flex-row items-center justify-between"
              activeOpacity={0.7}
              onPress={() => setIsEditingPoints((prev) => !prev)}
            >
              <Text className="text-sm font-sans-semibold text-foreground">Points Rate</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-sm font-sans-medium text-muted-foreground">
                  ₹{pointsRate} = 1 point
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#64748B" />
              </View>
            </TouchableOpacity>
            {isEditingPoints && (
              <View className="mt-3">
                <Input
                  label="Points Rate (₹ per point)"
                  placeholder="e.g. 10"
                  value={pointsRate}
                  onChangeText={setPointsRate}
                  keyboardType="numeric"
                />
              </View>
            )}
          </View>
          <View className="h-px bg-border mx-5" />
          {/* Redemption Period Row */}
          <View className="px-5 py-4">
            <TouchableOpacity
              className="flex-row items-center justify-between"
              activeOpacity={0.7}
              onPress={() => setIsEditingRedemption((prev) => !prev)}
            >
              <Text className="text-sm font-sans-semibold text-foreground">Redemption Period</Text>
              <View className="flex-row items-center gap-2">
                <Text className="text-sm font-sans-medium text-muted-foreground">
                  Every {redemptionDays} days
                </Text>
                <Ionicons name="chevron-forward" size={16} color="#64748B" />
              </View>
            </TouchableOpacity>
            {isEditingRedemption && (
              <View className="mt-3">
                <Input
                  label="Redemption Period (days)"
                  placeholder="e.g. 30"
                  value={redemptionDays}
                  onChangeText={setRedemptionDays}
                  keyboardType="numeric"
                />
              </View>
            )}
          </View>
        </View>

        {/* ACCOUNT Section */}
        <Text className="text-xs font-sans-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Account
        </Text>
        <View className="rounded-2xl border border-border bg-card mb-6 overflow-hidden">
          <View className="px-5 py-4 flex-row items-center justify-between">
            <Text className="text-sm font-sans-semibold text-foreground">Email</Text>
            <Text className="text-sm font-sans-medium text-muted-foreground">{MOCK_STORE.email}</Text>
          </View>
          <View className="h-px bg-border mx-5" />
          <View className="px-5 py-4 flex-row items-center justify-between">
            <Text className="text-sm font-sans-semibold text-foreground">App Version</Text>
            <Text className="text-sm font-sans-medium text-muted-foreground">v1.0.0</Text>
          </View>
        </View>

        {/* Logout Button */}
        <Button
          label="Logout"
          onPress={handleLogout}
          variant="danger"
          size="lg"
          fullWidth
          icon={<Ionicons name="log-out-outline" size={20} color="#fff" />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}
