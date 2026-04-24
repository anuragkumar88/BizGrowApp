import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function RewardsScreen() {
  const router = useRouter();

  const rewards = [
    { id: 1, title: 'Free Coffee', points: 500, icon: 'cafe' },
    { id: 2, title: '10% Off Next Purchase', points: 800, icon: 'pricetag' },
    { id: 3, title: 'Free Pastry', points: 1200, icon: 'pizza' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-5 pt-4 pb-4 flex-row items-center border-b border-border bg-card">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 rounded-full">
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text className="text-xl font-sans-bold ml-2">Redeem Rewards</Text>
      </View>
      
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 60 }}>
        <Text className="text-sm font-sans-medium text-muted-foreground mb-6">
          You have 1250 points available to redeem.
        </Text>

        {rewards.map((reward) => (
          <View key={reward.id} className="rounded-2xl border border-border bg-card p-4 mb-4 flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center gap-4">
              <View className="bg-primary-light p-3 rounded-full">
                <Ionicons name={reward.icon as any} size={24} color="#0EA5E9" />
              </View>
              <View>
                <Text className="text-base font-sans-bold text-foreground">{reward.title}</Text>
                <Text className="text-sm font-sans-medium text-primary mt-1">{reward.points} pts</Text>
              </View>
            </View>
            <TouchableOpacity 
              className="bg-primary px-4 py-2 rounded-full"
              onPress={() => alert(`Redeemed ${reward.title} for ${reward.points} points!`)}
            >
              <Text className="text-white font-sans-bold text-sm">Redeem</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
