import React from 'react';
import { View, Text } from 'react-native';

type AvatarProps = {
  name: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  backgroundColor?: string
  textColor?: string
}

export default function Avatar({
  name,
  size = 'md',
  backgroundColor = '#DCFCE7',
  textColor = '#16A34A',
}: AvatarProps) {
  let sizePx = 40;
  let textSizeClass = 'text-sm';

  switch (size) {
    case 'sm':
      sizePx = 32;
      textSizeClass = 'text-xs';
      break;
    case 'md':
      sizePx = 40;
      textSizeClass = 'text-sm';
      break;
    case 'lg':
      sizePx = 48;
      textSizeClass = 'text-base';
      break;
    case 'xl':
      sizePx = 64;
      textSizeClass = 'text-xl';
      break;
  }

  const getInitials = (nameStr: string) => {
    if (!nameStr) return '';
    const parts = nameStr.trim().split(/\s+/);
    if (parts.length === 1) {
      return nameStr.substring(0, 2).toUpperCase();
    }
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const initials = getInitials(name);

  return (
    <View
      style={{
        width: sizePx,
        height: sizePx,
        borderRadius: sizePx / 2,
        backgroundColor,
      }}
      className="items-center justify-center"
    >
      <Text style={{ color: textColor }} className={`font-sans-bold ${textSizeClass}`}>
        {initials}
      </Text>
    </View>
  );
}
