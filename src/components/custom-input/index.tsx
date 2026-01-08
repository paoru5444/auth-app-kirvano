import React, { useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { KeyboardTypeOptions, View } from 'react-native';
import Typography from '../typography';
import { TextInput } from './styles';

interface InputProps {
  control: Control<any>;
  name: string;
  label?: string;
  error?: { message?: string };
  placeholder?: string;
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
}

function Input({
  control,
  name,
  label,
  error,
  placeholder,
  keyboardType = 'default',
  secureTextEntry
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const borderVariant = error?.message ? 'error' : (isFocused ? 'focused' : 'blur');

  const handleOnBlur = (onBlur: () => void) => {
    setIsFocused(false)
    return onBlur()
  }

  return (
    <View style={{ gap: 8 }}>
      <Typography color={'#6C7278'} size='12px'>{label}</Typography>

      <Controller
        control={control}
        name={name}
        defaultValue={''}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder={placeholder}
            onBlur={() => handleOnBlur(onBlur)}
            onFocus={() => setIsFocused(true)}
            onChangeText={onChange}
            value={value}
            style={{ backgroundColor: '#ffffff' }}
            borderVariant={borderVariant}
            autoCorrect={false}
            keyboardType={keyboardType}
            secureTextEntry={secureTextEntry}
            autoCapitalize='none'
          />
        )}
      />

      {error && (
        <Typography color={'#F54927'} size='12px'>
          * {error?.message ?? ''}
        </Typography>
      )}
    </View>
  )
}

export default React.memo(Input)
