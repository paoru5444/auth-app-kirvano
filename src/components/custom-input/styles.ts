import { colors } from "@/src/constants/theme";
import styled from "styled-components/native";

const borderColor: Record<string, string> = {
  blur: colors.lightGray,
  focused: colors.dark,
  error: colors.red
}

export const TextInput = styled.TextInput<{ borderVariant?: keyof typeof borderColor }>`
  width: 100%;
  color: ${colors.steal};
  padding: 10px;
  border-width: 2px;
  border-color: ${({ borderVariant = 'blur' }) => borderColor[borderVariant]};
  border-radius: 10px;
  background-color: ${colors.white}
`
