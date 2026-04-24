import { TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import React from 'react';

type ButtonProps = {
  label: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'danger' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  icon?: React.ReactNode
  fullWidth?: boolean
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  icon,
  fullWidth = false,
}: ButtonProps) {
  let bgClass = '';
  let textClass = '';
  let borderClass = '';

  switch (variant) {
    case 'primary':
      bgClass = 'bg-[#16A34A]';
      textClass = 'text-white';
      break;
    case 'secondary':
      bgClass = 'bg-[#2563EB]';
      textClass = 'text-white';
      break;
    case 'danger':
      bgClass = 'bg-[#DC2626]';
      textClass = 'text-white';
      break;
    case 'outline':
      bgClass = 'bg-transparent';
      borderClass = 'border border-[#16A34A]';
      textClass = 'text-[#16A34A]';
      break;
    case 'ghost':
      bgClass = 'bg-transparent';
      textClass = 'text-[#16A34A]';
      break;
  }

  let sizeClass = '';
  let textSizeClass = '';
  switch (size) {
    case 'sm':
      sizeClass = 'py-2 px-4';
      textSizeClass = 'text-sm';
      break;
    case 'md':
      sizeClass = 'py-3 px-5';
      textSizeClass = 'text-base';
      break;
    case 'lg':
      sizeClass = 'py-4 px-6';
      textSizeClass = 'text-lg';
      break;
  }

  const opacityClass = disabled || loading ? 'opacity-40' : 'opacity-100';
  const widthClass = fullWidth ? 'w-full' : 'self-start';

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      className={`rounded-2xl flex-row items-center justify-center gap-2 ${bgClass} ${borderClass} ${sizeClass} ${opacityClass} ${widthClass}`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' || variant === 'ghost' ? '#16A34A' : 'white'} />
      ) : (
        <>
          {icon}
          <Text className={`font-sans-bold ${textClass} ${textSizeClass}`}>{label}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
