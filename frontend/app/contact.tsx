import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button, Input } from '@/components/ui';
import { useState } from 'react';

export default function ContactScreen() {
  const router = useRouter();
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!subject || !message) {
      alert('Please fill out all fields');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('http://192.168.1.4:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, message }),
      });

      if (res.ok) {
        alert('Message Sent! We will contact you soon.');
        router.back();
      } else {
        alert('Failed to send message. Please try again later.');
      }
    } catch (err) {
      alert('Network error. Check your connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen options={{ headerShown: false }} />
      <View className="px-5 pt-4 pb-2 flex-row items-center">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2 rounded-full">
          <Ionicons name="arrow-back" size={24} color="#0F172A" />
        </TouchableOpacity>
        <Text className="text-xl font-sans-bold ml-2">Contact Us</Text>
      </View>
      
      <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 20, paddingBottom: 60 }} showsVerticalScrollIndicator={false}>
        
        <View className="items-center mb-8">
          <View className="size-20 rounded-full bg-primary-light items-center justify-center mb-4">
            <Ionicons name="headset" size={36} color="#0EA5E9" />
          </View>
          <Text className="text-2xl font-sans-bold text-center">We're here to help!</Text>
          <Text className="text-sm font-sans-medium text-muted-foreground text-center mt-2 px-4">
            Have a question or facing an issue? Send us a message and our support team will get back to you shortly.
          </Text>
        </View>

        <View className="gap-4 mb-8">
          <Input label="Subject" placeholder="How can we help?" value={subject} onChangeText={setSubject} />
          <Input 
            label="Message" 
            placeholder="Describe your issue..." 
            value={message} 
            onChangeText={setMessage} 
            multiline 
            numberOfLines={5} 
          />
        </View>

        <Button 
          label="Send Message" 
          onPress={handleSubmit} 
          size="lg" 
          fullWidth 
          loading={isSubmitting}
        />

        <View className="mt-12 gap-4">
          <Text className="text-sm font-sans-semibold text-muted-foreground uppercase tracking-widest mb-1">
            Other ways to reach us
          </Text>
          <TouchableOpacity className="flex-row items-center gap-3 bg-card border border-border p-4 rounded-2xl">
            <Ionicons name="mail-outline" size={24} color="#64748B" />
            <Text className="text-base font-sans-medium text-foreground">support@bizgrow.app</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center gap-3 bg-card border border-border p-4 rounded-2xl">
            <Ionicons name="call-outline" size={24} color="#64748B" />
            <Text className="text-base font-sans-medium text-foreground">1-800-BIZGROW</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}
