import { colors } from "@/src/constants/theme";
import { Dimensions } from "react-native";
import styled from "styled-components/native";
const { width } = Dimensions.get('screen')

export const HeaderContainer = styled.View`
  width: ${width}px;
  height: 300px;
  justify-content: flex-end;
  gap: 48px;
  padding: 32px 16px;
  background-color: ${colors.dark};
`

export const FormWrapper = styled.View`
  flex: 1;
  width: 100%;
  padding: 24px 16px;
  gap: 16px;
  background-color: ${colors.white};
`

export const Separator = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 8px 0;
`

export const Line = styled.View`
  flex: 1%;
  border-width: 1px;
  border-color: ${colors.lightGray}
`