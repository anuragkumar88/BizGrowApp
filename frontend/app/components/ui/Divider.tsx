import React from 'react';
import { View, Text } from 'react-native';

type DividerProps = {
  label?: string
  color?: string
}

export default function Divider({ label, color = 'rgba(0,0,0,0.1)' }: DividerProps) {
  if (label) {
    return (
      <View className="flex-row items-center w-full my-4">
        <View className="flex-1 h-px" style={{ backgroundColor: color }} />
        <Text className="text-xs uppercase font-sans-semibold text-muted-foreground px-3">
          {label}
        </Text>
        <View className="flex-1 h-px" style={{ backgroundColor: color }} />
      </View>
    );
  }

  return (
    <View className="w-full h-px my-4" style={{ backgroundColor: color }} />
  );
}
