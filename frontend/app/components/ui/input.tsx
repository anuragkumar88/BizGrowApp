import React from 'react';
import { View, Text, TextInput, KeyboardTypeOptions } from 'react-native';

type InputProps = {
  label?: string
  placeholder?: string
  value: string
  onChangeText: (text: string) => void
  error?: string
  hint?: string
  secureTextEntry?: boolean
  keyboardType?: KeyboardTypeOptions
  editable?: boolean
  multiline?: boolean
  numberOfLines?: number
  icon?: React.ReactNode
  rightIcon?: React.ReactNode
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters'
}

export default function Input({
  label,
  placeholder,
  value,
  onChangeText,
  error,
  hint,
  secureTextEntry,
  keyboardType,
  editable = true,
  multiline = false,
  numberOfLines,
  icon,
  rightIcon,
  autoCapitalize,
}: InputProps) {
  const bgClass = editable ? 'bg-white' : 'bg-[#E4E4E7]';
  const borderClass = error ? 'border-[#DC2626]' : 'border-[rgba(0,0,0,0.1)]';
  const textClass = editable ? 'text-foreground' : 'text-muted-foreground';
  const heightClass = multiline ? 'min-h-[100px]' : '';

  return (
    <View className="w-full">
      {label && <Text className="text-sm font-sans-semibold text-[#1A1A2E] mb-1">{label}</Text>}
      <View className={`flex-row items-center border rounded-2xl px-4 py-4 gap-2 ${bgClass} ${borderClass} ${heightClass}`}>
        {icon}
        <TextInput
          className={`flex-1 font-sans-medium text-base p-0 ${textClass}`}
          placeholder={placeholder}
          placeholderTextColor="rgba(0,0,0,0.5)"
          value={value}
          onChangeText={onChangeText}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          editable={editable}
          multiline={multiline}
          numberOfLines={numberOfLines}
          autoCapitalize={autoCapitalize}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
        {rightIcon}
      </View>
      {error ? (
        <Text className="text-xs font-sans-medium text-[#DC2626] mt-1">{error}</Text>
      ) : hint ? (
        <Text className="text-xs font-sans-medium text-muted-foreground mt-1">{hint}</Text>
      ) : null}
    </View>
  );
}
