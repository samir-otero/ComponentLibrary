export interface TextProps {
  children: React.ReactNode;
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark' | 'muted';
  size?: 'xs' | 'small' | 'medium' | 'large' | 'xl' | '2xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold';
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  uppercase?: boolean;
  lowercase?: boolean;
  capitalize?: boolean;
  align?: 'left' | 'center' | 'right' | 'justify';
  truncate?: boolean;
  fullWidth?: boolean;
  as?: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
}