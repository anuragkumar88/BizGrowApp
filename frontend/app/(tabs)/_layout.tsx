import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { View } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E2E8F0',
          elevation: 0,
          shadowOpacity: 0,
          height: 100,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarActiveTintColor: '#0EA5E9',
        tabBarInactiveTintColor: '#94A3B8',

      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center h-full w-12">
              {focused && <View className="h-1 w-5 rounded-full bg-primary absolute top-[-4]" />}
              <Ionicons name={focused ? 'home' : 'home-outline'} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center h-full w-12">
              {focused && <View className="h-1 w-4 rounded-full bg-primary absolute top-[-4]" />}
              <Ionicons name={focused ? 'people' : 'people-outline'} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="campaigns"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center h-full w-12">
              {focused && <View className="h-1 w-4 rounded-full bg-primary absolute top-[-4]" />}
              <Ionicons name={focused ? 'megaphone' : 'megaphone-outline'} size={24} color={color} />

            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="analytics"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center h-full w-12">
              {focused && <View className="h-1 w-4 rounded-full bg-primary absolute top-[-4]" />}
              <Ionicons name={focused ? 'bar-chart' : 'bar-chart-outline'} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused, color }) => (
            <View className="items-center justify-center h-full w-12">
              {focused && <View className="h-1 w-4 rounded-full bg-primary absolute top-[-4]" />}
              <Ionicons name={focused ? 'settings' : 'settings-outline'} size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
