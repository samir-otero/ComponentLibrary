import React from "react";
import styled from "styled-components";
import { RadioButtonProps } from "./RadioButton.types";

const RadioContainer = styled.label<RadioButtonProps>`
  display: inline-flex;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.65 : 1)};
  font-family: inherit;
  user-select: none;
  transition: all 0.2s ease-in-out;

  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          font-size: 14px;
          gap: 6px;
        `;
      case "large":
        return `
          font-size: 18px;
          gap: 10px;
        `;
      default:
        return `
          font-size: 16px;
          gap: 8px;
        `;
    }
  }}

  /* Custom text color */
  ${({ color }) => color && `color: ${color};`}

  /* Responsive design */
  @media (max-width: 768px) {
    ${({ size }) => {
      switch (size) {
        case "small":
          return `
            font-size: 12px;
            gap: 4px;
          `;
        case "large":
          return `
            font-size: 16px;
            gap: 8px;
          `;
        default:
          return `
            font-size: 14px;
            gap: 6px;
          `;
      }
    }}
  }
`;

const HiddenRadio = styled.input.attrs({ type: "radio" })`
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
`;

const CustomRadio = styled.div<RadioButtonProps>`
  position: relative;
  display: inline-block;
  border-radius: 50%;
  border: 2px solid #dee2e6;
  background-color: #ffffff;
  transition: all 0.2s ease-in-out;
  flex-shrink: 0;

  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          width: 16px;
          height: 16px;
        `;
      case "large":
        return `
          width: 24px;
          height: 24px;
        `;
      default:
        return `
          width: 20px;
          height: 20px;
        `;
    }
  }}

  /* Custom colors */
  ${({ backgroundColor }) =>
    backgroundColor &&
    `
    border-color: ${backgroundColor};
  `}

  /* Checked state */
  ${HiddenRadio}:checked + & {
    border-color: ${({ backgroundColor }) => backgroundColor || "#007bff"};
    background-color: ${({ backgroundColor }) => backgroundColor || "#007bff"};
  }

  /* Checked state inner circle */
  ${HiddenRadio}:checked + &::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    background-color: #ffffff;

    ${({ size }) => {
      switch (size) {
        case "small":
          return `
            width: 6px;
            height: 6px;
            top: 3px;
            left: 3px;
          `;
        case "large":
          return `
            width: 10px;
            height: 10px;
            top: 5px;
            left: 5px;
          `;
        default:
          return `
            width: 8px;
            height: 8px;
            top: 4px;
            left: 4px;
          `;
      }
    }}
  }

  /* Hover state */
  ${RadioContainer}:hover:not([disabled]) & {
    border-color: ${({ backgroundColor }) => backgroundColor || "#007bff"};
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
  }

  /* Focus state */
  ${HiddenRadio}:focus + & {
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    outline: none;
  }

  /* Disabled state */
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #e9ecef !important;
    border-color: #dee2e6 !important;

    &::after {
      background-color: #6c757d !important;
    }
  `}

  /* Responsive design */
  @media (max-width: 768px) {
    ${({ size }) => {
      switch (size) {
        case "small":
          return `
            width: 14px;
            height: 14px;
          `;
        case "large":
          return `
            width: 22px;
            height: 22px;
          `;
        default:
          return `
            width: 18px;
            height: 18px;
          `;
      }
    }}

    ${HiddenRadio}:checked + &::after {
      ${({ size }) => {
        switch (size) {
          case "small":
            return `
              width: 4px;
              height: 4px;
              top: 3px;
              left: 3px;
            `;
          case "large":
            return `
              width: 8px;
              height: 8px;
              top: 5px;
              left: 5px;
            `;
          default:
            return `
              width: 6px;
              height: 6px;
              top: 4px;
              left: 4px;
            `;
        }
      }}
    }
  }
`;

const LabelText = styled.span<{ disabled?: boolean; color?: string }>`
  ${({ disabled, color }) => `
    color: ${disabled ? "#6c757d" : color || "#333333"};
  `}
`;

export const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  name,
  value,
  checked = false,
  disabled = false,
  backgroundColor,
  color,
  size = "medium",
  onChange,
  className,
  ...props
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(event);
    }
  };

  return (
    <RadioContainer
      disabled={disabled}
      size={size}
      color={color}
      className={className}
      name={name}
      value={value}
    >
      <HiddenRadio
        name={name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        {...props}
      />
      <CustomRadio
        disabled={disabled}
        backgroundColor={backgroundColor}
        size={size}
        name={name}
        value={value}
      />
      {label && (
        <LabelText disabled={disabled} color={color}>
          {label}
        </LabelText>
      )}
    </RadioContainer>
  );
};
