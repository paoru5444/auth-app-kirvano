import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { StyledContainer } from './styles';

interface ContainerProps {
  direction?: string;
  align?: string;
  justify?: string;
  gap?: string;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

export default function Container({ direction, align, justify, gap, style, children }: ContainerProps) {
  return (
    <StyledContainer
      direction={direction}
      align={align}
      justify={justify}
      gap={gap}
      style={style}
    >
      {children}
    </StyledContainer>
  )
}