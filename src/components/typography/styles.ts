import { TextStyledProps } from "@/shared/types/components.types";
import styled from "styled-components/native";

export const Text = styled.Text<TextStyledProps>`
    color: ${(props) => props?.color || '#1E293B'};
    font-size: ${(props) => props?.size || '14px'};
    font-weight: ${(props) => props?.weight || 500};
  `