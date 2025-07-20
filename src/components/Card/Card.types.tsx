export interface CardImage {
  src: string;
  alt?: string;
}

export interface CardProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  image?: CardImage;
  footer?: React.ReactNode;
  disabled?: boolean;
  clickable?: boolean;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: string;
  elevation?: "none" | "low" | "default" | "medium" | "high";
  size?: "small" | "medium" | "large";
  padding?: string;
  margin?: string;
  fullWidth?: boolean;
  onClick?: (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => void;
  className?: string;
}
