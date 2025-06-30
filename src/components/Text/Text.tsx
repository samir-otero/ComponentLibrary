import React from 'react';
import styled from 'styled-components';
import { TextProps } from './Text.types';

const StyledText = styled.span<TextProps>`
  font-family: inherit;
  line-height: 1.5;
  transition: all 0.2s ease-in-out;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'inherit'};
  user-select: ${({ disabled }) => disabled ? 'none' : 'auto'};

  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case 'xs':
        return `
          font-size: 10px;
        `;
      case 'small':
        return `
          font-size: 12px;
        `;
      case 'large':
        return `
          font-size: 18px;
        `;
      case 'xl':
        return `
          font-size: 22px;
        `;
      case '2xl':
        return `
          font-size: 28px;
        `;
      default:
        return `
          font-size: 14px;
        `;
    }
  }}

  /* Color and background */
  ${({ color, backgroundColor, disabled }) => {
    const textColor = disabled ? '#6c757d' : (color || '#212529');
    const bgColor = disabled ? '#f8f9fa' : (backgroundColor || 'transparent');

    return `
      color: ${textColor};
      background-color: ${bgColor};
    `;
  }}

  /* Variant styles */
  ${({ variant, color, disabled }) => {
    if (disabled) {
      return `
        color: #6c757d !important;
        opacity: 0.65;
      `;
    }

    const textColor = color || '#212529';

    switch (variant) {
      case 'secondary':
        return `
          color: #6c757d;
        `;
      case 'success':
        return `
          color: #28a745;
        `;
      case 'danger':
        return `
          color: #dc3545;
        `;
      case 'warning':
        return `
          color: #ffc107;
        `;
      case 'info':
        return `
          color: #17a2b8;
        `;
      case 'light':
        return `
          color: #f8f9fa;
        `;
      case 'dark':
        return `
          color: #343a40;
        `;
      case 'muted':
        return `
          color: #6c757d;
          opacity: 0.75;
        `;
      default:
        return `
          color: ${textColor};
        `;
    }
  }}

  /* Weight variants */
  ${({ weight }) => {
    switch (weight) {
      case 'light':
        return `font-weight: 300;`;
      case 'normal':
        return `font-weight: 400;`;
      case 'medium':
        return `font-weight: 500;`;
      case 'semibold':
        return `font-weight: 600;`;
      case 'bold':
        return `font-weight: 700;`;
      case 'extrabold':
        return `font-weight: 800;`;
      default:
        return `font-weight: 400;`;
    }
  }}

  /* Text styling */
  ${({ italic }) => italic && `font-style: italic;`}
  ${({ underline }) => underline && `text-decoration: underline;`}
  ${({ strikethrough }) => strikethrough && `text-decoration: line-through;`}
  ${({ uppercase }) => uppercase && `text-transform: uppercase;`}
  ${({ lowercase }) => lowercase && `text-transform: lowercase;`}
  ${({ capitalize }) => capitalize && `text-transform: capitalize;`}

  /* Text alignment */
  ${({ align }) => {
    switch (align) {
      case 'left':
        return `text-align: left;`;
      case 'center':
        return `text-align: center;`;
      case 'right':
        return `text-align: right;`;
      case 'justify':
        return `text-align: justify;`;
      default:
        return `text-align: left;`;
    }
  }}

  /* Display variants */
  ${({ as }) => {
    switch (as) {
      case 'div':
      case 'p':
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        return `display: block;`;
      default:
        return `display: inline;`;
    }
  }}

  /* Truncate text */
  ${({ truncate }) => truncate && `
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;
  `}

  /* Full width */
  ${({ fullWidth }) => fullWidth && `
    width: 100%;
    display: block;
  `}

  /* Disabled state */
  &:disabled,
  &[disabled] {
    color: #6c757d !important;
    background-color: #f8f9fa !important;
    opacity: 0.65;
    cursor: not-allowed !important;
    user-select: none;
  }

  /* Hover effects for non-disabled text with onClick */
  ${({ onClick, disabled }) => onClick && !disabled && `
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  `}

  /* Focus state for accessibility when clickable */
  ${({ onClick }) => onClick && `
    &:focus {
      outline: 2px solid #007bff;
      outline-offset: 2px;
    }
  `}

  /* Responsive design */
  @media (max-width: 768px) {
    ${({ size }) => {
      switch (size) {
        case 'xs':
          return `font-size: 9px;`;
        case 'small':
          return `font-size: 11px;`;
        case 'large':
          return `font-size: 16px;`;
        case 'xl':
          return `font-size: 20px;`;
        case '2xl':
          return `font-size: 24px;`;
        default:
          return `font-size: 13px;`;
      }
    }}
  }

  @media (max-width: 480px) {
    ${({ size }) => {
      switch (size) {
        case 'xs':
          return `font-size: 8px;`;
        case 'small':
          return `font-size: 10px;`;
        case 'large':
          return `font-size: 15px;`;
        case 'xl':
          return `font-size: 18px;`;
        case '2xl':
          return `font-size: 22px;`;
        default:
          return `font-size: 12px;`;
      }
    }}
  }
`;

export const Text: React.FC<TextProps> = ({
  children,
  disabled = false,
  color,
  backgroundColor,
  variant = 'primary',
  size = 'medium',
  weight = 'normal',
  italic = false,
  underline = false,
  strikethrough = false,
  uppercase = false,
  lowercase = false,
  capitalize = false,
  align = 'left',
  truncate = false,
  fullWidth = false,
  as = 'span',
  className,
  onClick,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <StyledText
      disabled={disabled}
      color={color}
      backgroundColor={backgroundColor}
      variant={variant}
      size={size}
      weight={weight}
      italic={italic}
      underline={underline}
      strikethrough={strikethrough}
      uppercase={uppercase}
      lowercase={lowercase}
      capitalize={capitalize}
      align={align}
      truncate={truncate}
      fullWidth={fullWidth}
      as={as}
      className={className}
      onClick={handleClick}
      tabIndex={onClick && !disabled ? 0 : undefined}
      {...props}
    >
      {children}
    </StyledText>
  );
};