import React from 'react';
import { View, TouchableOpacity } from 'react-native';

type CardProps = {
  children: React.ReactNode
  onPress?: () => void
  style?: string
  padded?: boolean
  bordered?: boolean
}

export default function Card({
  children,
  onPress,
  style = '',
  padded = true,
  bordered = true,
}: CardProps) {
  const paddingClass = padded ? 'p-4' : '';
  const borderClass = bordered ? 'border border-[rgba(0,0,0,0.1)]' : '';

  const className = `bg-white rounded-2xl ${paddingClass} ${borderClass} ${style}`.trim();

  if (onPress) {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress} className={className}>
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View className={className}>
      {children}
    </View>
  );
}
