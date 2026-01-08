import { Dimensions } from "react-native";
import styled from "styled-components/native";
const { width, height } = Dimensions.get('screen')


export const HeaderContainer = styled.ImageBackground`
  width: ${width}px;
  height: 260px;
  justify-content: center;
  gap: 48px;
  padding-left: 16px;
`

export const FormWrapper = styled.View`
  flex: 1;
  width: 100%;
  padding: 24px 16px;
  gap: 16px;
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
  border-color: #EDF1F3;
`