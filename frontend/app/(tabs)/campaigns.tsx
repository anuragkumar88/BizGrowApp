import { Badge } from '@/app/components/ui';
import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import {
  ActivityIndicator,
  Linking,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type PastCampaign = {
  id: string;
  snippet: string;
  date: string;
  tags: string[];
  reach: number;
};

const MOCK_TAGS = ['Regular', 'High Spender', 'New', 'Bread Buyer'];
const MOCK_CUSTOMERS_COUNT = 124;

const PAST_CAMPAIGNS: PastCampaign[] = [
  { id: '1', snippet: '50% off on bread today only! Come visit us...', date: 'Today, 10:30 AM', tags: ['Bread Buyer'], reach: 18 },
  { id: '2', snippet: 'Special Diwali offer for our valued customers...', date: 'Yesterday, 6:00 PM', tags: ['Regular', 'High Spender'], reach: 45 },
  { id: '3', snippet: 'Fresh stock of Amul milk arrived! Get yours...', date: '3 days ago', tags: ['Regular'], reach: 62 },
];

const MOCK_AI_MESSAGE =
  '🍞 Fresh bread alert! We have 50 loaves available today at special price. Visit us before 6 PM. Show this message for extra 10 loyalty points! — BizGrow Store';

function getTagBadgeVariant(tag: string): 'danger' | 'secondary' | 'primary' {
  if (tag === 'High Spender') return 'danger';
  if (tag === 'New') return 'secondary';
  return 'primary';
}

export default function CampaignsScreen() {
  const [aiInput, setAiInput] = useState('');
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleGenerate = () => {
    if (!aiInput.trim()) return;
    setIsGenerating(true);
    setGeneratedMessage('');
    setTimeout(() => {
      setGeneratedMessage(MOCK_AI_MESSAGE);
      setIsGenerating(false);
    }, 1500);
  };

  const audienceCount = selectedTags.length === 0 ? 0 : selectedTags.length * 12;
  const canSend = generatedMessage.length > 0 && selectedTags.length > 0;

  return (
    <SafeAreaView className="flex-1 bg-background" edges={['top']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40, paddingHorizontal: 16 }}
      >
        {/* Header */}
        <View className="mt-4 mb-5">
          <Text className="text-2xl font-extrabold font-sans-bold text-foreground">Campaigns</Text>
        </View>

        {/* AI Generator Card */}
        <View className="ai-card">
          <View className="flex-row items-center gap-2 mb-1">
            <Text className="text-xl">✨</Text>
            <Text className="ai-card-title">AI Campaign Generator</Text>
          </View>
          <Text className="ai-card-sub">
            Describe your stock or offer in plain language
          </Text>

          <TextInput
            className="ai-input mb-3 pl-6"
            placeholder="E.g. 50 bread loaves expiring today…"
            placeholderTextColor="rgba(255,255,255,0.5)"
            value={aiInput}
            onChangeText={setAiInput}
            multiline
            numberOfLines={3}
            textAlignVertical="top"
          />

          <TouchableOpacity
            className="ai-button"
            activeOpacity={0.85}
            onPress={handleGenerate}
          >
            {isGenerating ? (
              <ActivityIndicator color="#002147" />
            ) : (
              <Text className="ai-button-text">✨ Generate with AI</Text>
            )}
          </TouchableOpacity>

          {/* Generated Message Preview */}
          {generatedMessage.length > 0 && (
            <View className="mt-3 rounded-2xl bg-white/10 border border-white/20 p-4">
              <Text className="text-xs font-sans-semibold text-white/60 mb-2">Edit message</Text>
              <TextInput
                className="text-white font-sans-medium text-base"
                value={generatedMessage}
                onChangeText={setGeneratedMessage}
                multiline
                textAlignVertical="top"
                placeholderTextColor="rgba(255,255,255,0.4)"
              />
            </View>
          )}
        </View>

        {/* Target Audience */}
        <View className="mb-5">
          <Text className="list-title mb-3">Target Audience</Text>

          <View className="flex-row flex-wrap gap-2 mb-3">
            {MOCK_TAGS.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <TouchableOpacity
                  key={tag}
                  className={`tag-chip ${isSelected ? 'tag-chip-active' : ''}`}
                  onPress={() => toggleTag(tag)}
                  activeOpacity={0.7}
                >
                  <Text className={`tag-chip-text ${isSelected ? 'tag-chip-text-active' : ''}`}>
                    {tag}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View className="flex-row items-center gap-2">
            <View className="rounded-full bg-[#DCFCE7] px-3 py-1">
              <Text className="text-xs font-sans-bold font-bold text-[#16A34A]">
                {audienceCount} customers selected
              </Text>
            </View>
          </View>
        </View>

        {/* Send Section */}
        {canSend && (
          <View className="rounded-2xl bg-[#F0FDF4] p-4 mb-5">
            <View className="flex-row items-center gap-2 mb-3">
              <Ionicons name="logo-whatsapp" size={22} color="#16A34A" />
              <Text className="text-sm font-sans-semibold text-[#16A34A]">
                Ready to send to {audienceCount} customers
              </Text>
            </View>
            <TouchableOpacity
              className="whatsapp-button"
              activeOpacity={0.85}
              onPress={() => Linking.openURL(`https://wa.me/?text=${encodeURIComponent(generatedMessage)}`)}
            >
              <Ionicons name="logo-whatsapp" size={20} color="#fff" />
              <Text className="whatsapp-button-text">📲 Open WhatsApp</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Past Campaigns */}
        <View className="list-head">
          <Text className="list-title">Past Campaigns</Text>
          <View className="rounded-full bg-[#232A45] px-3 py-1">
            <Text className="text-xs font-sans-bold text-white">{PAST_CAMPAIGNS.length}</Text>
          </View>
        </View>

        {PAST_CAMPAIGNS.map((campaign) => (
          <View key={campaign.id} className="past-campaign-card">
            <Text className="past-campaign-snippet" numberOfLines={2}>
              {campaign.snippet}
            </Text>
            <View className="flex-row items-center justify-between mb-2">
              <Text className="past-campaign-meta">{campaign.date}</Text>
              <Text className="past-campaign-meta">→ {campaign.reach} people</Text>
            </View>
            <View className="flex-row flex-wrap gap-1.5">
              {campaign.tags.map((tag) => (
                <Badge key={tag} label={tag} variant={getTagBadgeVariant(tag)} size="sm" />
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
