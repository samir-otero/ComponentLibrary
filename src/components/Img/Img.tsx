import React, { useState } from 'react';
import styled from 'styled-components';
import { ImgProps } from './Img.types';

type ImgWrapperProps = Omit<ImgProps, 'src' | 'alt'>;

const StyledImageWrapper = styled.div<ImgWrapperProps>`
  display: inline-block;
  position: relative;
  overflow: hidden;

  ${({ borderRadius }) => borderRadius && `
    border-radius: ${borderRadius};
  `}

  ${({ width }) => width && `
    width: ${typeof width === 'number' ? `${width}px` : width};
  `}

  ${({ height }) => height && `
    height: ${typeof height === 'number' ? `${height}px` : height};
  `}

  ${({ disabled }) => disabled && `
    opacity: 0.65;
    cursor: not-allowed;
    filter: grayscale(100%);
  `}

  ${({ onClick, disabled }) => onClick && !disabled && `
    cursor: pointer;
    transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out;

    &:hover {
      transform: scale(1.02);
      opacity: 0.9;
    }

    &:active {
      transform: scale(0.98);
    }
  `}

  /* Responsive design */
  @media (max-width: 768px) {
    max-width: 100%;
    height: auto;
  }
`;

const StyledImage = styled.img<ImgProps>`
  width: 100%;
  height: 100%;
  display: block;

  ${({ objectFit }) => objectFit && `
    object-fit: ${objectFit};
  `}

  ${({ borderRadius }) => borderRadius && `
    border-radius: ${borderRadius};
  `}

  transition: all 0.2s ease-in-out;

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
`;

const PlaceholderDiv = styled.div<{ width?: string | number; height?: string | number; borderRadius?: string }>`
  background-color: #f8f9fa;
  border: 2px dashed #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 14px;
  text-align: center;

  ${({ width }) => width && `
    width: ${typeof width === 'number' ? `${width}px` : width};
  `}

  ${({ height }) => height && `
    height: ${typeof height === 'number' ? `${height}px` : height};
  `}

  ${({ borderRadius }) => borderRadius && `
    border-radius: ${borderRadius};
  `}

  min-height: 100px;
  min-width: 100px;
`;

export const Img: React.FC<ImgProps> = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  borderRadius,
  disabled = false,
  onClick,
  className,
  loading = 'lazy',
  placeholder = 'Image not available',
  fallbackSrc,
  ...props
}) => {
  const [imageError, setImageError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  const handleImageError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setImageError(true);
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLImageElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  if (imageError || !currentSrc) {
    return (
      <PlaceholderDiv
        width={width}
        height={height}
        borderRadius={borderRadius}
        className={className}
      >
        {placeholder}
      </PlaceholderDiv>
    );
  }

  return (
    <StyledImageWrapper
      width={width}
      height={height}
      borderRadius={borderRadius}
      disabled={disabled}
      onClick={onClick}
      className={className}
    >
      <StyledImage
        src={currentSrc}
        alt={alt}
        objectFit={objectFit}
        borderRadius={borderRadius}
        loading={loading}
        onError={handleImageError}
        onClick={handleClick}
        disabled={disabled}
        tabIndex={onClick && !disabled ? 0 : -1}
        {...props}
      />
    </StyledImageWrapper>
  );
};