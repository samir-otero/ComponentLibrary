export interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  backgroundColor?: string;
  color?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "small" | "medium" | "large";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  fullWidth?: boolean;
}
