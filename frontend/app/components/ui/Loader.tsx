import React from 'react';
import { View, Text, ActivityIndicator } from 'react-native';

type LoaderProps = {
  size?: 'small' | 'large'
  color?: string
  fullScreen?: boolean
  label?: string
}

export default function Loader({
  size = 'small',
  color = '#16A34A',
  fullScreen = false,
  label,
}: LoaderProps) {
  const content = (
    <View className="items-center justify-center gap-2">
      <ActivityIndicator size={size} color={color} />
      {label && <Text className="text-sm font-sans-medium text-muted-foreground">{label}</Text>}
    </View>
  );

  if (fullScreen) {
    return (
      <View className="flex-1 bg-[#F5F5F0] items-center justify-center">
        {content}
      </View>
    );
  }

  return content;
}
