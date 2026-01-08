import React from 'react';
import { StyleProp, TextStyle } from 'react-native';
import { Text } from './styles';

interface TypographyProps {
  children: React.ReactNode;
  weight?: number;
  size?: string;
  color?: string;
  style?: StyleProp<TextStyle>;
}

export default function Typography({ children, weight, size, color, style }: TypographyProps) {
  return (
    <Text
      weight={weight}
      size={size}
      color={color}
      style={style}
    >
      {children}
    </Text>
  )
}