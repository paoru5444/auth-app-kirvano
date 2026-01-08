
export type ContainerProps = {
  direction?: string;
  align?: string;
  justify?: string;
  gap?: string;
}

export type ButtonVariantItem = {
  background: string;
  borderWidth: string;
  borderColor: string;
  textColor: string;
}

export type ButtonVariant = {
  primary: ButtonVariantItem;
  secondary: ButtonVariantItem;
}

export type ButtonVariantTypes = 'primary' | 'secondary';

export type TextStyledProps = {
  color?: string;
  size?: string;
  weight?: number;
}