import { Avatar, Badge, Button, Input } from '@/app/components/ui';
import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  FlatList,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Customer = {
  id: string;
  name: string;
  phone: string;
  tags: string[];
  points: number;
  lastVisit: string;
};

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Rahul Sharma', phone: '9876543210', tags: ['Regular', 'High Spender'], points: 284, lastVisit: '2 hours ago' },
  { id: '2', name: 'Priya Patel', phone: '9845012345', tags: ['New'], points: 165, lastVisit: 'Yesterday' },
  { id: '3', name: 'Amit Kumar', phone: '9812345678', tags: ['Regular', 'Bread Buyer'], points: 210, lastVisit: '3 days ago' },
  { id: '4', name: 'Sunita Devi', phone: '9800112233', tags: ['Regular'], points: 90, lastVisit: '1 week ago' },
  { id: '5', name: 'Ravi Gupta', phone: '9867345621', tags: ['High Spender'], points: 412, lastVisit: 'Today' },
];

const ALL_TAGS = ['All', 'Regular', 'High Spender', 'New', 'Bread Buyer'];
const SELECTABLE_TAGS = ['Regular', 'New', 'High Spender', 'Bread Buyer'];

function getTagVariant(tag: string): 'danger' | 'secondary' | 'primary' {
  if (tag === 'High Spender') return 'danger';
  if (tag === 'New') return 'secondary';
  return 'primary';
}

export default function CustomersScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const filteredCustomers = MOCK_CUSTOMERS.filter((c) => {
    const matchesSearch =
      searchQuery.trim() === '' ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery);
    const matchesTag = activeTag === 'All' || c.tags.includes(activeTag);
    return matchesSearch && matchesTag;
  });

  const toggleSelectedTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSave = () => {
    setNewName('');
    setNewPhone('');
    setSelectedTags([]);
    setModalVisible(false);
  };

  const renderCustomer = ({ item }: { item: Customer }) => (
    <TouchableOpacity
      className="rounded-2xl border border-border bg-card p-4 mb-2"
      activeOpacity={0.75}
      onPress={() => router.push(`/customer/${item.id}` as never)}
    >
      {/* Row 1: Avatar + Name + Phone */}
      <View className="flex-row items-center mb-3">
        <Avatar name={item.name} size="md" backgroundColor="#232A45" textColor="#FCFCFC" />
        <View className="ml-3 flex-1">
          <Text className="text-base font-sans-bold font-bold text-foreground">{item.name}</Text>
          <Text className="text-sm font-sans-medium text-muted-foreground">{item.phone}</Text>
        </View>
      </View>

      {/* Row 2: Tag pills */}
      <View className="flex-row flex-wrap gap-1.5 mb-3">
        {item.tags.map((tag) => (
          <Badge key={tag} label={tag} variant={getTagVariant(tag)} size="sm" />
        ))}
      </View>

      {/* Row 3: Last visit + Points + Chevron */}
      <View className="flex-row items-center justify-between">
        <Text className="text-xs font-sans-medium text-muted-foreground">
          Last visit: {item.lastVisit}
        </Text>
        <View className="flex-row items-center gap-2">
          <View className="rounded-full bg-[#DCFCE7] px-3 py-1">
            <Text className="text-xs font-sans-bold font-bold text-[#16A34A]">
              {item.points} pts
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={16} color="#64748B" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FCFCFC' }} edges={['top']}>

      {/* Header */}
      <View className="flex-row items-center justify-between px-4 mt-4 mb-4">
        <Text className="text-2xl font-extrabold font-sans-bold text-foreground">Customers</Text>
        <View className="rounded-full bg-primary px-3 py-1">
          <Text className="text-xs font-sans-bold text-white">{MOCK_CUSTOMERS.length} total</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-4 mb-3">
        <View className="flex-row items-center rounded-2xl border border-border bg-white px-4 py-3 gap-2">
          <Ionicons name="search-outline" size={18} color="#64748B" />
          <TextInput
            className="flex-1 font-sans-medium text-base p-0 text-foreground"
            placeholder="Search by name or phone…"
            placeholderTextColor="#94A3B8"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      {/* Tag Filter Chips */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 18, gap: 6 }}
        style={{ flexGrow: 0, marginBottom: 14 }}
      >
        {ALL_TAGS.map((tag) => (
          <TouchableOpacity
            key={tag}
            className={`tag-chip ${activeTag === tag ? 'tag-chip-active' : ''}`}
            onPress={() => setActiveTag(tag)}
            activeOpacity={0.7}
          >
            <Text className={`tag-chip-text ${activeTag === tag ? 'tag-chip-text-active' : ''}`}>
              {tag}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Customer List — flex: 1 ensures it fills available height */}
      <FlatList
        data={filteredCustomers}
        keyExtractor={(item) => item.id}
        renderItem={renderCustomer}
        showsVerticalScrollIndicator={false}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ListEmptyComponent={
          <View style={{ alignItems: 'center', paddingVertical: 64 }}>
            <Ionicons name="people-outline" size={50} color="#CBD5E1" />
            <Text className="text-base font-sans-medium text-muted-foreground mt-3">
              No customers found
            </Text>
          </View>
        }
      />

      {/* FAB — below the list, above the tab bar */}
      <View style={{ alignItems: 'flex-end', paddingHorizontal: 20, paddingBottom: 12, backgroundColor: 'transparent' }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingHorizontal: 20,
            height: 50,
            borderRadius: 25,
            backgroundColor: '#16A34A',
            elevation: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 4.65,
          }}
          activeOpacity={0.85}
          onPress={() => setModalVisible(true)}
        >
          <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Add Customer</Text>
          <Ionicons name="add" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Add Customer Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="modal-overlay">
          <View className="modal-container">
            {/* Modal Header */}
            <View className="modal-header">
              <Text className="modal-title">Add Customer</Text>
              <TouchableOpacity
                className="modal-close"
                onPress={() => setModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text className="modal-close-text">×</Text>
              </TouchableOpacity>
            </View>

            {/* Modal Body */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ padding: 20, gap: 20 }}
            >
              <Input
                label="Full Name"
                placeholder="e.g. Rahul Sharma"
                value={newName}
                onChangeText={setNewName}
              />
              <Input
                label="Phone Number"
                placeholder="e.g. 9876543210"
                value={newPhone}
                onChangeText={setNewPhone}
                keyboardType="numeric"
              />

              {/* Tag Multi-Select */}
              <View>
                <Text className="text-sm font-sans-semibold text-foreground mb-2">Tags</Text>
                <View className="flex-row flex-wrap gap-2">
                  {SELECTABLE_TAGS.map((tag) => {
                    const isSelected = selectedTags.includes(tag);
                    return (
                      <TouchableOpacity
                        key={tag}
                        className={`tag-chip ${isSelected ? 'tag-chip-active' : ''}`}
                        onPress={() => toggleSelectedTag(tag)}
                        activeOpacity={0.7}
                      >
                        <Text className={`tag-chip-text ${isSelected ? 'tag-chip-text-active' : ''}`}>
                          {tag}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>

              <Button
                label="Save Customer"
                onPress={handleSave}
                variant="primary"
                size="lg"
                fullWidth
              />
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
