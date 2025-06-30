import React from 'react';
import styled from 'styled-components';
import { ButtonProps } from './Button.types';

const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) =>
    !['backgroundColor', 'color', 'variant', 'size', 'fullWidth'].includes(prop)
})<ButtonProps>`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  outline: none;

  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case 'small':
        return `
          padding: 8px 16px;
          font-size: 14px;
          min-height: 32px;
        `;
      case 'large':
        return `
          padding: 16px 32px;
          font-size: 18px;
          min-height: 48px;
        `;
      default:
        return `
          padding: 12px 24px;
          font-size: 16px;
          min-height: 40px;
        `;
    }
  }}

  /* Width */
  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}

  /* Variant styles */
  ${({ variant, backgroundColor, color }) => {
    const bgColor = backgroundColor || '#007bff';
    const textColor = color || '#ffffff';

    switch (variant) {
      case 'secondary':
        return `
          background-color: #6c757d;
          color: ${textColor};
          &:hover:not(:disabled) {
            background-color: #5a6268;
            transform: translateY(-1px);
          }
          &:active:not(:disabled) {
            background-color: #545b62;
            transform: translateY(0);
          }
        `;
      case 'outline':
        return `
          background-color: transparent;
          color: ${bgColor};
          border: 2px solid ${bgColor};
          &:hover:not(:disabled) {
            background-color: ${bgColor};
            color: ${textColor};
            transform: translateY(-1px);
          }
          &:active:not(:disabled) {
            background-color: ${bgColor};
            opacity: 0.9;
            transform: translateY(0);
          }
        `;
      default:
        return `
          background-color: ${bgColor};
          color: ${textColor};
          &:hover:not(:disabled) {
            background-color: ${bgColor};
            opacity: 0.9;
            transform: translateY(-1px);
          }
          &:active:not(:disabled) {
            background-color: ${bgColor};
            opacity: 0.8;
            transform: translateY(0);
          }
        `;
    }
  }}

  /* Disabled state */
  &:disabled {
    background-color: #e9ecef !important;
    color: #6c757d !important;
    cursor: not-allowed !important;
    opacity: 0.65;
    transform: none !important;
    border-color: #dee2e6 !important;
    &:hover {
      transform: none !important;
    }
  }

  /* Focus state */
  &:focus {
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  /* Responsive design */
  @media (max-width: 768px) {
    ${({ size }) => {
      switch (size) {
        case 'small':
          return `
            padding: 6px 12px;
            font-size: 12px;
            min-height: 28px;
          `;
        case 'large':
          return `
            padding: 14px 28px;
            font-size: 16px;
            min-height: 44px;
          `;
        default:
          return `
            padding: 10px 20px;
            font-size: 14px;
            min-height: 36px;
          `;
      }
    }}
  }

  @media (max-width: 480px) {
    ${({ fullWidth }) => !fullWidth && `
      min-width: 120px;
    `}
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  disabled = false,
  backgroundColor,
  color,
  variant = 'primary',
  size = 'medium',
  onClick,
  type = 'button',
  className,
  fullWidth = false,
  ...props
}) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && onClick) {
      onClick(event);
    }
  };

  // Extract custom props that shouldn't be passed to DOM
  const {
    // Remove any other custom props that might be in ...props
    ...domProps
  } = props;

  return (
    <StyledButton
      disabled={disabled}
      backgroundColor={backgroundColor}
      color={color}
      variant={variant}
      size={size}
      onClick={handleClick}
      type={type}
      className={className}
      fullWidth={fullWidth}
      // Only pass DOM-safe props
      {...domProps}
    >
      {children}
    </StyledButton>
  );
};