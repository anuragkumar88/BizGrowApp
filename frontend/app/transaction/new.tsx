import { Avatar, Badge, Button, Input } from '@/app/components/ui';
import '@/global.css';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Customer = {
  id: string;
  name: string;
  phone: string;
};

const MOCK_CUSTOMERS: Customer[] = [
  { id: '1', name: 'Rahul Sharma', phone: '9876543210' },
  { id: '2', name: 'Priya Patel', phone: '9845012345' },
  { id: '3', name: 'Amit Kumar', phone: '9812345678' },
  { id: '4', name: 'Sunita Devi', phone: '9800112233' },
  { id: '5', name: 'Ravi Gupta', phone: '9867345621' },
];

type TransactionItem = {
  id: string;
  name: string;
  amount: number;
};

export default function NewTransactionScreen() {
  const router = useRouter();

  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const [items, setItems] = useState<TransactionItem[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');

  const [notes, setNotes] = useState('');

  const filteredCustomers = MOCK_CUSTOMERS.filter(
    (c) =>
      c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
      c.phone.includes(customerSearch)
  );

  const handleAddItem = () => {
    if (!newItemName.trim() || !newItemAmount.trim()) return;
    
    const amountNum = parseFloat(newItemAmount);
    if (isNaN(amountNum) || amountNum <= 0) return;

    setItems((prev) => [
      ...prev,
      {
        id: Math.random().toString(),
        name: newItemName.trim(),
        amount: amountNum,
      },
    ]);
    setNewItemName('');
    setNewItemAmount('');
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveTransaction = () => {
    // Save logic would go here
    router.back();
  };

  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  const pointsEarned = Math.floor(totalAmount / 10); // 1 point per ₹10

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#FCFCFC' }} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {/* Header */}
        <View className="flex-row items-center px-4 py-4 border-b border-border bg-white">
          <TouchableOpacity
            className="p-2 -ml-2"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
          </TouchableOpacity>
          <Text className="text-xl font-sans-bold font-extrabold text-foreground ml-2">
            Log Transaction
          </Text>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ padding: 20, gap: 24, paddingBottom: 40 }}
          keyboardShouldPersistTaps="handled"
        >
          {/* 1. Customer Selection */}
          <View style={{ zIndex: 10 }}>
            <Text className="text-base font-sans-bold font-bold text-foreground mb-3">
              Customer Details
            </Text>
            
            {selectedCustomer ? (
              <View className="flex-row items-center justify-between rounded-2xl border border-[#16A34A] bg-[#DCFCE7] p-4">
                <View className="flex-row items-center">
                  <Avatar name={selectedCustomer.name} size="md" backgroundColor="#16A34A" textColor="#fff" />
                  <View className="ml-3">
                    <Text className="text-base font-sans-bold text-[#064E3B]">
                      {selectedCustomer.name}
                    </Text>
                    <Text className="text-sm font-sans-medium text-[#065F46]">
                      {selectedCustomer.phone}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="p-2 bg-white/50 rounded-full"
                  onPress={() => setSelectedCustomer(null)}
                >
                  <Ionicons name="close" size={20} color="#064E3B" />
                </TouchableOpacity>
              </View>
            ) : (
              <View className="relative">
                <Input
                  placeholder="Search customer by name or phone..."
                  value={customerSearch}
                  onChangeText={setCustomerSearch}
                  icon={<Ionicons name="search-outline" size={20} color="#64748B" />}
                />
                
                {customerSearch.length > 0 && (
                  <View className="absolute top-[105%] left-0 right-0 bg-white border border-border rounded-xl shadow-lg elevation-5 z-50 max-h-[200px] overflow-hidden">
                    <ScrollView keyboardShouldPersistTaps="handled" nestedScrollEnabled>
                      {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((c) => (
                          <TouchableOpacity
                            key={c.id}
                            className="flex-row items-center p-3 border-b border-border last:border-b-0"
                            onPress={() => {
                              setSelectedCustomer(c);
                              setCustomerSearch('');
                            }}
                          >
                            <Avatar name={c.name} size="sm" backgroundColor="#232A45" textColor="#FCFCFC" />
                            <View className="ml-3">
                              <Text className="font-sans-bold text-foreground">{c.name}</Text>
                              <Text className="text-xs font-sans-medium text-muted-foreground">{c.phone}</Text>
                            </View>
                          </TouchableOpacity>
                        ))
                      ) : (
                        <View className="p-4 items-center">
                          <Text className="text-sm font-sans-medium text-muted-foreground">No customers found</Text>
                        </View>
                      )}
                    </ScrollView>
                  </View>
                )}
              </View>
            )}
          </View>

          {/* 2. Items Section */}
          <View style={{ zIndex: 1 }}>
            <Text className="text-base font-sans-bold font-bold text-foreground mb-3">
              Items
            </Text>
            
            {/* Added Items List */}
            {items.length > 0 && (
              <View className="mb-4 gap-2">
                {items.map((item) => (
                  <View key={item.id} className="flex-row items-center justify-between bg-card border border-border rounded-xl p-3">
                    <View className="flex-1">
                      <Text className="font-sans-bold text-foreground">{item.name}</Text>
                    </View>
                    <View className="flex-row items-center gap-3">
                      <Text className="font-sans-bold text-primary">₹{item.amount.toFixed(2)}</Text>
                      <TouchableOpacity
                        className="p-1 rounded-full bg-[#FEE2E2]"
                        onPress={() => handleRemoveItem(item.id)}
                      >
                        <Ionicons name="trash-outline" size={16} color="#DC2626" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Add New Item Inputs */}
            <View className="flex-row gap-2 items-start">
              <View className="flex-1">
                <Input
                  placeholder="Item Name (e.g. Bread)"
                  value={newItemName}
                  onChangeText={setNewItemName}
                />
              </View>
              <View className="w-1/3">
                <Input
                  placeholder="Amount"
                  value={newItemAmount}
                  onChangeText={setNewItemAmount}
                  keyboardType="numeric"
                />
              </View>
            </View>
            
            <TouchableOpacity
              className="mt-3 flex-row items-center justify-center py-3 rounded-xl border border-dashed border-primary bg-primary/5"
              onPress={handleAddItem}
            >
              <Ionicons name="add" size={20} color="#6366F1" />
              <Text className="ml-2 font-sans-bold text-primary">Add Item</Text>
            </TouchableOpacity>
          </View>

          {/* 3. Summary & Notes */}
          <View className="p-4 rounded-2xl bg-card border border-border mt-2 z-0">
            <View className="flex-row items-center justify-between mb-4">
              <Text className="text-base font-sans-bold text-foreground">Total Amount</Text>
              <Text className="text-2xl font-extrabold text-foreground">₹{totalAmount.toFixed(2)}</Text>
            </View>
            
            <View className="flex-row items-center justify-between mb-4 pb-4 border-b border-border border-dashed">
              <Text className="text-sm font-sans-medium text-muted-foreground">Points to be earned</Text>
              <Badge label={`+${pointsEarned} pts`} variant="primary" />
            </View>

            <View>
              <Text className="text-sm font-sans-semibold text-foreground mb-2">Notes (Optional)</Text>
              <Input
                placeholder="Add any remarks..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
              />
            </View>
          </View>

        </ScrollView>

        {/* Footer */}
        <View className="p-4 bg-white border-t border-border z-0">
          <Button
            label="Save Transaction"
            onPress={handleSaveTransaction}
            variant="primary"
            size="lg"
            fullWidth
            disabled={!selectedCustomer || items.length === 0}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
