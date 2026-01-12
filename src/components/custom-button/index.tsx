import { ButtonVariantTypes } from '@/shared/types/components.types';
import React from 'react';
import { ActivityIndicator, Image, ImageSourcePropType } from 'react-native';
import Typography from '../typography';
import { ButtonWrapper, variants } from './styles';

interface CustomButtonProps {
  label: string;
  variant?: ButtonVariantTypes;
  leftIcon?: ImageSourcePropType;
  onPress: () => void;
  isSubmitting?: boolean
}

export default function CustomButton({
  label,
  variant = 'primary',
  leftIcon,
  onPress,
  isSubmitting,
  ...props
}: CustomButtonProps) {
  return (
    <ButtonWrapper variant={variant} onPress={onPress} disabled={isSubmitting} {...props}>
      {leftIcon && (
        <Image source={leftIcon} style={{ width: 18, height: 18 }} />
      )}
      <Typography size='14px' weight={700} color={variants[variant].textColor}>
        {isSubmitting ? <ActivityIndicator color={'#fff'} /> : label}
      </Typography>
    </ButtonWrapper>
  )
}
