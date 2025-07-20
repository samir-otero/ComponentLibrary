export interface LabelProps {
  children: React.ReactNode;
  disabled?: boolean;
  color?: string;
  backgroundColor?: string;
  variant?: "primary" | "secondary" | "success" | "danger" | "warning" | "info";
  size?: "small" | "medium" | "large";
  required?: boolean;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fullWidth?: boolean;
  htmlFor?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLLabelElement>) => void;
}
