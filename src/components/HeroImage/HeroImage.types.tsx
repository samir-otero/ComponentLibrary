export interface HeroImageProps {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  height?: string;
  overlayColor?: string;
  overlayOpacity?: number;
  textColor?: string;
  textAlign?: "left" | "center" | "right";
  verticalAlign?: "top" | "center" | "bottom";
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  className?: string;
  loading?: "lazy" | "eager";
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down";
  children?: React.ReactNode;
  showGradient?: boolean;
  gradientDirection?: "to-top" | "to-bottom" | "to-left" | "to-right";
}
