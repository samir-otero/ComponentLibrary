export interface RadioButtonProps {
  label?: string;
  name: string;
  value: string;
  checked?: boolean;
  disabled?: boolean;
  backgroundColor?: string;
  color?: string;
  size?: "small" | "medium" | "large";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}
