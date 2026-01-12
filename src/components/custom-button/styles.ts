import { ButtonVariant, ButtonVariantTypes } from "@/shared/types/components.types";
import { colors } from "@/src/constants/theme";
import styled from "styled-components/native";

export const variants: ButtonVariant = {
  primary: {
    background: colors.blue,
    borderWidth: '0px',
    borderColor: 'transparent',
    textColor: colors.white
  },
  secondary: {
    background: 'transparent',
    borderWidth: '2px',
    borderColor: colors.lightGray,
    textColor: colors.dark
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