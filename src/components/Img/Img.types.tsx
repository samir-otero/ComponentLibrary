export interface ImgProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  borderRadius?: string;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent<HTMLImageElement>) => void;
  className?: string;
  loading?: 'lazy' | 'eager';
  placeholder?: string;
  fallbackSrc?: string;
}