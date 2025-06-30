import React from 'react';
import styled from 'styled-components';
import { LabelProps } from './Label.types';

const StyledLabel = styled.label<LabelProps>`
  font-family: inherit;
  font-weight: 500;
  line-height: 1.5;
  cursor: ${({ disabled }) => disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.2s ease-in-out;
  display: inline-block;
  user-select: none;

  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          font-size: 12px;
          padding: 2px 0;
        `;
      case 'large':
        return `
          font-size: 18px;
          padding: 8px 0;
        `;
      default:
        return `
          font-size: 14px;
          padding: 4px 0;
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
          font-weight: 400;
        `;
      case 'success':
        return `
          color: #28a745;
          font-weight: 500;
        `;
      case 'danger':
        return `
          color: #dc3545;
          font-weight: 500;
        `;
      case 'warning':
        return `
          color: #ffc107;
          font-weight: 500;
        `;
      case 'info':
        return `
          color: #17a2b8;
          font-weight: 500;
        `;
      default:
        return `
          color: ${textColor};
        `;
    }
  }}

  /* Required indicator */
  ${({ required }) => required && `
    &::after {
      content: ' *';
      color: #dc3545;
      font-weight: bold;
    }
  `}

  /* Bold style */
  ${({ bold }) => bold && `
    font-weight: 700;
  `}

  /* Italic style */
  ${({ italic }) => italic && `
    font-style: italic;
  `}

  /* Underline style */
  ${({ underline }) => underline && `
    text-decoration: underline;
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
  }

  /* Hover effects for non-disabled labels */
  &:hover:not([disabled]) {
    ${({ variant, color }) => {
      if (variant === 'primary' || !variant) {
        return `opacity: 0.8;`;
      }
      return '';
    }}
  }

  /* Focus state for accessibility */
  &:focus {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    ${({ size }) => {
      switch (size) {
        case 'small':
          return `
            font-size: 11px;
            padding: 1px 0;
          `;
        case 'large':
          return `
            font-size: 16px;
            padding: 6px 0;
          `;
        default:
          return `
            font-size: 13px;
            padding: 3px 0;
          `;
      }
    }}
  }

  @media (max-width: 480px) {
    ${({ size }) => {
      switch (size) {
        case 'small':
          return `
            font-size: 10px;
            padding: 1px 0;
          `;
        case 'large':
          return `
            font-size: 15px;
            padding: 5px 0;
          `;
        default:
          return `
            font-size: 12px;
            padding: 2px 0;
          `;
      }
    }}
  }
`;

export const Label: React.FC<LabelProps> = ({
  children,
  disabled = false,
  color,
  backgroundColor,
  variant = 'primary',
  size = 'medium',
  required = false,
  bold = false,
  italic = false,
  underline = false,
  fullWidth = false,
  htmlFor,
  className,
  onClick,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLLabelElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  return (
    <StyledLabel
      disabled={disabled}
      color={color}
      backgroundColor={backgroundColor}
      variant={variant}
      size={size}
      required={required}
      bold={bold}
      italic={italic}
      underline={underline}
      fullWidth={fullWidth}
      htmlFor={htmlFor}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </StyledLabel>
  );
};