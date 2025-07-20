import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { DropdownProps } from "./Dropdown.types";

const DropdownContainer = styled.div<{ fullWidth?: boolean }>`
  position: relative;
  display: inline-block;
  ${({ fullWidth }) => fullWidth && `width: 100%;`}
`;

// Define button props for styled component, omitting 'options' and other Dropdown-only props
type DropdownButtonProps = Pick<
  DropdownProps,
  "backgroundColor" | "color" | "size" | "fullWidth" | "disabled"
>;

const DropdownButton = styled.button<DropdownButtonProps>`
  border: 2px solid #dee2e6;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;
  font-weight: 400;
  text-align: left;
  text-decoration: none;
  transition: all 0.2s ease-in-out;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  outline: none;
  background-color: #ffffff;
  color: #333333;

  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          padding: 8px 12px;
          font-size: 14px;
          min-height: 32px;
        `;
      case "large":
        return `
          padding: 16px 20px;
          font-size: 18px;
          min-height: 48px;
        `;
      default:
        return `
          padding: 12px 16px;
          font-size: 16px;
          min-height: 40px;
        `;
    }
  }}

  /* Width */
  ${({ fullWidth }) => fullWidth && `width: 100%;`}

  /* Custom colors */
  ${({ backgroundColor, color }) => {
    if (backgroundColor) {
      return `background-color: ${backgroundColor};`;
    }
    if (color) {
      return `color: ${color};`;
    }
    return "";
  }}

  /* Hover state */
  &:hover:not(:disabled) {
    border-color: #007bff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  /* Focus state */
  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
  }

  /* Disabled state */
  &:disabled {
    background-color: #e9ecef !important;
    color: #6c757d !important;
    cursor: not-allowed !important;
    opacity: 0.65;
    border-color: #dee2e6 !important;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    ${({ size }) => {
      switch (size) {
        case "small":
          return `
            padding: 6px 10px;
            font-size: 12px;
            min-height: 28px;
          `;
        case "large":
          return `
            padding: 14px 18px;
            font-size: 16px;
            min-height: 44px;
          `;
        default:
          return `
            padding: 10px 14px;
            font-size: 14px;
            min-height: 36px;
          `;
      }
    }}
  }
`;

const DropdownList = styled.ul<{
  isOpen: boolean;
  size?: "small" | "medium" | "large";
}>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: #ffffff;
  border: 2px solid #dee2e6;
  border-top: none;
  border-radius: 0 0 4px 4px;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1000;
  max-height: 200px;
  overflow-y: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? "block" : "none")};

  /* Responsive design */
  @media (max-width: 768px) {
    max-height: 150px;
  }
`;

const DropdownItem = styled.li<{ size?: "small" | "medium" | "large" }>`
  padding: ${({ size }) => {
    switch (size) {
      case "small":
        return "8px 12px";
      case "large":
        return "16px 20px";
      default:
        return "12px 16px";
    }
  }};
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  font-size: ${({ size }) => {
    switch (size) {
      case "small":
        return "14px";
      case "large":
        return "18px";
      default:
        return "16px";
    }
  }};

  &:hover {
    background-color: #f8f9fa;
  }

  &:active {
    background-color: #e9ecef;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    padding: ${({ size }) => {
      switch (size) {
        case "small":
          return "6px 10px";
        case "large":
          return "14px 18px";
        default:
          return "10px 14px";
      }
    }};
    font-size: ${({ size }) => {
      switch (size) {
        case "small":
          return "12px";
        case "large":
          return "16px";
        default:
          return "14px";
      }
    }};
  }
`;

const ChevronIcon = styled.span<{ isOpen: boolean }>`
  transform: ${({ isOpen }) => (isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  transition: transform 0.2s ease-in-out;
  margin-left: 8px;
  font-size: 12px;
`;

export const Dropdown: React.FC<DropdownProps> = ({
  options = [],
  placeholder = "Select an option",
  disabled = false,
  backgroundColor,
  color,
  size = "medium",
  onChange,
  value,
  className,
  fullWidth = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleSelect = (option: string) => {
    if (!disabled) {
      setSelectedValue(option);
      setIsOpen(false);
      if (onChange) {
        onChange(option);
      }
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  const displayValue = selectedValue || placeholder;

  return (
    <DropdownContainer
      ref={dropdownRef}
      fullWidth={fullWidth}
      className={className}
    >
      <DropdownButton
        onClick={handleToggle}
        disabled={disabled}
        backgroundColor={backgroundColor}
        color={color}
        size={size}
        fullWidth={fullWidth}
        type="button"
        {...props}
      >
        <span>{displayValue}</span>
        <ChevronIcon isOpen={isOpen}>▼</ChevronIcon>
      </DropdownButton>
      <DropdownList isOpen={isOpen} size={size}>
        {options.map((option, index) => (
          <DropdownItem
            key={index}
            onClick={() => handleSelect(option)}
            size={size}
          >
            {option}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  );
};
