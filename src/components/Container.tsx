import React from 'react';
import styled from 'styled-components/native';

interface ContainerProps {
  direction?: string;
  align?: string;
  justify?: string;
  gap?: string;
  style?: any;
  children: React.ReactNode;
}

export default function Container({ direction, align, justify, gap, style, children }: ContainerProps) {
  const Container = styled.View<any>`
    flex-direction: ${(props) => props.direction || 'column'};
    align-items: ${(props) => props.align || 'center'};
    justify-content: ${(props) => props.justify || 'flex-start'};
    gap: ${(props) => props.gap || '0px'};
  `
  return (
    <Container
      direction={direction}
      align={align}
      justify={justify}
      gap={gap}
      style={style}
    >
      {children}
    </Container>
  )
}