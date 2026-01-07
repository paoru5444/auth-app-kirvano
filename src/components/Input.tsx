import React from 'react';
import { KeyboardTypeOptions, View } from 'react-native';
import styled from 'styled-components/native';
import { images } from '../constants';
import Typography from './Typography';

interface InputProps {
  label?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  value: string;
  onChangeText?: (text: string) => void;
  iconLeft: keyof typeof images;
}

const TextInput = styled.TextInput`
  width: 100%;
  color: '#475569';
  padding: 10px;
  border-width: 2px;
  border-color: #CBD5E1;
  border-radius: 10px;
`

export default function Input({
  label,
  secureTextEntry,
  keyboardType = 'default',
  value,
  onChangeText,
  iconLeft
}: InputProps) {
  return (
    <View style={{ gap: 8 }}>
      <Typography weight={600} color={'#1E293B'}>{label}</Typography>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        autoCapitalize='none'
        autoCorrect={false}
        style={{ backgroundColor: '#ffffff' }}
        inlineImageLeft={iconLeft}
      />
    </View>
  )
}
