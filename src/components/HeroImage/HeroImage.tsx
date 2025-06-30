import React, { useState } from 'react';
import styled from 'styled-components';
import { HeroImageProps } from './HeroImage.types';

const HeroContainer = styled.div<HeroImageProps>`
  position: relative;
  width: 100%;
  height: ${({ height }) => height || '400px'};
  overflow: hidden;
  display: flex;
  align-items: ${({ verticalAlign }) => {
    switch (verticalAlign) {
      case 'top': return 'flex-start';
      case 'bottom': return 'flex-end';
      default: return 'center';
    }
  }};
  justify-content: ${({ textAlign }) => {
    switch (textAlign) {
      case 'left': return 'flex-start';
      case 'right': return 'flex-end';
      default: return 'center';
    }
  }};
  cursor: ${({ onClick, disabled }) => {
    if (disabled) return 'not-allowed';
    if (onClick) return 'pointer';
    return 'default';
  }};

  ${({ disabled }) => disabled && `
    opacity: 0.65;
    filter: grayscale(100%);
  `}

  ${({ onClick, disabled }) => onClick && !disabled && `
    transition: transform 0.3s ease-in-out;

    &:hover {
      transform: scale(1.02);
    }

    &:active {
      transform: scale(0.98);
    }
  `}

  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    height: ${({ height }) => {
      if (height && height.includes('px')) {
        const numericHeight = parseInt(height);
        return `${Math.max(numericHeight * 0.7, 250)}px`;
      }
      return '250px';
    }};
  }

  @media (max-width: 480px) {
    height: ${({ height }) => {
      if (height && height.includes('px')) {
        const numericHeight = parseInt(height);
        return `${Math.max(numericHeight * 0.6, 200)}px`;
      }
      return '200px';
    }};
  }
`;

const BackgroundImage = styled.img<HeroImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: ${({ objectFit }) => objectFit || 'cover'};
  z-index: 1;
`;

const Overlay = styled.div<HeroImageProps>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;

  ${({ overlayColor, overlayOpacity }) => {
    if (overlayColor) {
      return `background-color: ${overlayColor};`;
    }
    return `background-color: rgba(0, 0, 0, ${overlayOpacity || 0.3});`;
  }}

  ${({ showGradient, gradientDirection, overlayColor, overlayOpacity }) => {
    if (showGradient) {
      const baseColor = overlayColor || 'rgba(0, 0, 0, 0.7)';
      const transparentColor = overlayColor ?
        overlayColor.replace(/[\d.]+\)$/g, '0)') :
        'rgba(0, 0, 0, 0)';

      switch (gradientDirection) {
        case 'to-top':
          return `background: linear-gradient(to top, ${baseColor}, ${transparentColor});`;
        case 'to-left':
          return `background: linear-gradient(to left, ${baseColor}, ${transparentColor});`;
        case 'to-right':
          return `background: linear-gradient(to right, ${baseColor}, ${transparentColor});`;
        default:
          return `background: linear-gradient(to bottom, ${transparentColor}, ${baseColor});`;
      }
    }
    return '';
  }}
`;

const ContentWrapper = styled.div<HeroImageProps>`
  position: relative;
  z-index: 3;
  padding: 20px;
  text-align: ${({ textAlign }) => textAlign || 'center'};
  color: ${({ textColor }) => textColor || '#ffffff'};
  max-width: 800px;
  width: 100%;

  @media (max-width: 768px) {
    padding: 15px;
  }

  @media (max-width: 480px) {
    padding: 10px;
  }
`;

const HeroTitle = styled.h1<{ textColor?: string }>`
  font-size: 3rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }

  @media (max-width: 480px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.h2<{ textColor?: string }>`
  font-size: 1.5rem;
  font-weight: 400;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  line-height: 1.4;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1.25rem;
  }

  @media (max-width: 480px) {
    font-size: 1.125rem;
  }
`;

const PlaceholderDiv = styled.div<{ height?: string }>`
  background-color: #f8f9fa;
  border: 2px dashed #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 18px;
  text-align: center;
  height: ${({ height }) => height || '400px'};

  @media (max-width: 768px) {
    height: ${({ height }) => {
      if (height && height.includes('px')) {
        const numericHeight = parseInt(height);
        return `${Math.max(numericHeight * 0.7, 250)}px`;
      }
      return '250px';
    }};
  }
`;

export const HeroImage: React.FC<HeroImageProps> = ({
  src,
  alt,
  title,
  subtitle,
  height = '400px',
  overlayColor,
  overlayOpacity = 0.3,
  textColor = '#ffffff',
  textAlign = 'center',
  verticalAlign = 'center',
  disabled = false,
  onClick,
  className,
  loading = 'lazy',
  objectFit = 'cover',
  children,
  showGradient = false,
  gradientDirection = 'to-bottom',
  ...props
}) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!disabled && onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick(event as any);
    }
  };

  if (imageError || !src) {
    return (
      <PlaceholderDiv height={height} className={className}>
        Hero image not available
      </PlaceholderDiv>
    );
  }

  return (
    <HeroContainer
      src={src}
      alt={alt}
      height={height}
      textAlign={textAlign}
      verticalAlign={verticalAlign}
      disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={className}
      tabIndex={onClick && !disabled ? 0 : -1}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? `${title || alt} - clickable hero image` : undefined}
      {...props}
    >
      <BackgroundImage
        src={src}
        alt={alt}
        objectFit={objectFit}
        loading={loading}
        onError={handleImageError}
      />

      <Overlay
        src={src}
        alt={alt}
        overlayColor={overlayColor}
        overlayOpacity={overlayOpacity}
        showGradient={showGradient}
        gradientDirection={gradientDirection}
      />

      <ContentWrapper
        src={src}
        alt={alt}
        textAlign={textAlign}
        textColor={textColor}
      >
        {title && (
          <HeroTitle textColor={textColor}>
            {title}
          </HeroTitle>
        )}

        {subtitle && (
          <HeroSubtitle textColor={textColor}>
            {subtitle}
          </HeroSubtitle>
        )}

        {children}
      </ContentWrapper>
    </HeroContainer>
  );
};