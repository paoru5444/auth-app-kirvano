import styled from "styled-components/native";

const borderColor: Record<string, string> = {
  blur: '#EDF1F3',
  focused: '#1A1C1E',
  error: '#F54927'
}

export const TextInput = styled.TextInput<{ borderVariant?: keyof typeof borderColor }>`
  width: 100%;
  color: #475569;
  padding: 10px;
  border-width: 2px;
  border-color: ${({ borderVariant = 'blur' }) => borderColor[borderVariant]};
  border-radius: 10px;
`
