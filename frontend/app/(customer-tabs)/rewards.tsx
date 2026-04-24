import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function CustomerRewards() {
  const offers = [
    { id: 1, title: "Free Coffee", desc: "Redeem for 500 points", points: 500, icon: "cafe" },
    { id: 2, title: "20% Off Next Visit", desc: "Redeem for 1000 points", points: 1000, icon: "pricetag" },
    { id: 3, title: "Buy 1 Get 1 Free", desc: "Special birthday offer", points: 0, icon: "gift" },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-5 pt-4 pb-2">
        <Text className="text-3xl font-sans-bold text-foreground">Rewards</Text>
        <Text className="text-sm font-sans-medium text-muted-foreground mt-1">
          Redeem your points for exclusive offers
        </Text>
      </View>
      
      <ScrollView className="flex-1 px-5 pt-4">
        {offers.map(offer => (
          <View key={offer.id} className="rounded-2xl border border-border bg-card p-4 mb-4 flex-row items-center shadow-sm">
            <View className="bg-primary-light p-4 rounded-xl mr-4">
              <Ionicons name={offer.icon as any} size={28} color="#0EA5E9" />
            </View>
            <View className="flex-1">
              <Text className="text-lg font-sans-bold text-foreground">{offer.title}</Text>
              <Text className="text-sm font-sans-medium text-muted-foreground mt-1">{offer.desc}</Text>
            </View>
            <TouchableOpacity className="bg-primary px-4 py-2 rounded-xl" activeOpacity={0.8}>
              <Text className="text-white font-sans-bold text-sm">
                {offer.points > 0 ? `${offer.points} pts` : 'Claim'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
