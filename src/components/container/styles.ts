import { ContainerProps } from "@/shared/types/components.types";
import styled from "styled-components/native";

export const StyledContainer = styled.View<ContainerProps>`
  flex-direction: ${(props) => props.direction || 'column'};
  align-items: ${(props) => props.align || 'flex-start'};
  justify-content: ${(props) => props.justify || 'flex-start'};
  gap: ${(props) => props.gap || '0px'};
`