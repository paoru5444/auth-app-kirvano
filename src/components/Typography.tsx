import React from 'react';
import styled from 'styled-components/native';

interface TypographyProps {
  children: React.ReactNode;
  weight?: number;
  size?: string;
  color?: string;
}

export default function Typography({ children, weight, size, color }: TypographyProps) {
  const Text = styled.Text<any>`
    color: ${(props) => props?.color || '#1E293B'};
    font-size: ${(props) => props?.size || '14px'};
    font-weight: ${(props) => props?.weight || 500};
  `

  return (
    <Text
      weight={weight}
      size={size}
      color={color}
    >
      {children}
    </Text>
  )
}