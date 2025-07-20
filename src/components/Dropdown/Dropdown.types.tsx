export interface DropdownProps {
  options: string[];
  placeholder?: string;
  disabled?: boolean;
  backgroundColor?: string;
  color?: string;
  size?: "small" | "medium" | "large";
  onChange?: (value: string) => void;
  value?: string;
  className?: string;
  fullWidth?: boolean;
}
