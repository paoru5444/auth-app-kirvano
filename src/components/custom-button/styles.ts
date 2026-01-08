import { ButtonVariant, ButtonVariantTypes } from "@/shared/types/components.types";
import styled from "styled-components/native";

export const variants: ButtonVariant = {
  primary: {
    background: '#1D61E7',
    borderWidth: '0px',
    borderColor: '#ffffffff',
    textColor: '#ffffff'
  },
  secondary: {
    background: '#ffffffff',
    borderWidth: '2px',
    borderColor: '#EDF1F3',
    textColor: '#1A1C1E'
  }
}

export const ButtonWrapper = styled.TouchableOpacity<{ variant: ButtonVariantTypes }>`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px 0;
  border-radius: 10px;
  background-color: ${({ variant }) => variants[variant].background};
  border-width: ${({ variant }) => variants[variant].borderWidth};
  border-color: ${({ variant }) => variants[variant].borderColor};
  align-items: center;
`