import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type BadgeProps = {
  label: string
  variant?: 'primary' | 'secondary' | 'danger' | 'warning' | 'muted'
  size?: 'sm' | 'md'
  onPress?: () => void
  onRemove?: () => void
}

export default function Badge({
  label,
  variant = 'primary',
  size = 'sm',
  onPress,
  onRemove,
}: BadgeProps) {
  let bgClass = '';
  let textClass = '';

  switch (variant) {
    case 'primary':
      bgClass = 'bg-primary-light';
      textClass = 'text-primary';
      break;
    case 'secondary':
      bgClass = 'bg-secondary-light';
      textClass = 'text-secondary';
      break;
    case 'danger':
      bgClass = 'bg-destructive-light';
      textClass = 'text-destructive';
      break;
    case 'warning':
      bgClass = 'bg-warning-light';
      textClass = 'text-warning';
      break;
    case 'muted':
      bgClass = 'bg-muted';
      textClass = 'text-muted-foreground';
      break;
  }

  let sizeClass = '';
  let textSizeClass = '';

  switch (size) {
    case 'sm':
      sizeClass = 'px-2 py-0.5';
      textSizeClass = 'text-xs';
      break;
    case 'md':
      sizeClass = 'px-3 py-1';
      textSizeClass = 'text-sm';
      break;
  }

  const content = (
    <View className={`rounded-full flex-row items-center justify-center ${bgClass} ${sizeClass} self-start`}>
      <Text className={`font-sans-bold ${textClass} ${textSizeClass}`}>{label}</Text>
      {onRemove && (
        <TouchableOpacity onPress={onRemove} className="ml-1 items-center justify-center" activeOpacity={0.7}>
          <Text className={`font-sans-bold ${textClass} ${textSizeClass}`}>×</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  if (onPress) {
    return <TouchableOpacity onPress={onPress} activeOpacity={0.7}>{content}</TouchableOpacity>;
  }

  return content;
}
