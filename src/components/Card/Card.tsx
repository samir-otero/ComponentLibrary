import React from "react";
import styled from "styled-components";
import { CardProps } from "./Card.types";

// Filter out styling-only props from being passed to the DOM
const StyledCard = styled.div.withConfig({
  shouldForwardProp: (prop) => {
    // Don't forward styling-only props to DOM
    const stylingProps = [
      "backgroundColor",
      "borderColor",
      "borderRadius",
      "elevation",
      "size",
      "fullWidth",
      "clickable",
      "disabled",
      "padding",
      "margin",
    ];

    // Only block the styling props, allow everything else through
    return !stylingProps.includes(prop);
  },
})<CardProps>`
  background-color: ${({ backgroundColor }) => backgroundColor || "#ffffff"};
  border: 1px solid ${({ borderColor }) => borderColor || "#e0e0e0"};
  border-radius: ${({ borderRadius }) => borderRadius || "8px"};
  box-shadow: ${({ elevation }) => {
    switch (elevation) {
      case "low":
        return "0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)";
      case "medium":
        return "0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)";
      case "high":
        return "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)";
      default:
        return "0 2px 4px rgba(0, 0, 0, 0.1)";
    }
  }};
  padding: ${({ padding }) => padding || "16px"};
  margin: ${({ margin }) => margin || "0"};
  transition: all 0.3s ease-in-out;
  cursor: ${({ clickable, disabled }) => {
    if (disabled) return "not-allowed";
    if (clickable) return "pointer";
    return "default";
  }};
  opacity: ${({ disabled }) => (disabled ? "0.6" : "1")};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  position: relative;
  overflow: hidden;

  /* Size variants */
  ${({ size }) => {
    switch (size) {
      case "small":
        return `
          max-width: 280px;
          min-height: 120px;
        `;
      case "large":
        return `
          max-width: 600px;
          min-height: 300px;
        `;
      default:
        return `
          max-width: 400px;
          min-height: 200px;
        `;
    }
  }}

  /* Full width */
  ${({ fullWidth }) =>
    fullWidth &&
    `
    width: 100%;
    max-width: none;
  `}

  /* Hover effects for clickable cards */
  ${({ clickable, disabled }) =>
    clickable &&
    !disabled &&
    `
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }

    &:active {
      transform: translateY(0);
    }
  `}

  /* Disabled state */
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #f5f5f5;
    border-color: #d0d0d0;
    color: #999999;
    * {
      color: #999999;
    }
  `}

  /* Responsive design */
  @media (max-width: 768px) {
    padding: ${({ padding }) => padding || "12px"};
    ${({ size }) => {
      switch (size) {
        case "small":
          return `
            max-width: 240px;
            min-height: 100px;
          `;
        case "large":
          return `
            max-width: 100%;
            min-height: 250px;
          `;
        default:
          return `
            max-width: 100%;
            min-height: 180px;
          `;
      }
    }}
  }

  @media (max-width: 480px) {
    margin: ${({ margin }) => margin || "0 0 16px 0"};
    padding: ${({ padding }) => padding || "12px"};
    ${({ size }) => {
      switch (size) {
        case "small":
          return `
            min-height: 80px;
          `;
        case "large":
          return `
            min-height: 200px;
          `;
        default:
          return `
            min-height: 150px;
          `;
      }
    }}
  }
`;

const CardHeader = styled.div`
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e0e0e0;
`;

const CardTitle = styled.h3`
  margin: 0 0 4px 0;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.4;
  color: inherit;
`;

const CardSubtitle = styled.p`
  margin: 0;
  font-size: 14px;
  color: #666666;
  line-height: 1.4;
`;

const CardContent = styled.div`
  flex-grow: 1;
  line-height: 1.6;
`;

const CardFooter = styled.div`
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const CardImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 12px;
`;

export const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  image,
  footer,
  disabled = false,
  clickable = false,
  backgroundColor,
  borderColor,
  borderRadius,
  elevation = "default",
  size = "medium",
  padding,
  margin,
  fullWidth = false,
  onClick,
  className,
  ...props
}) => {
  const handleInteraction = (
    event:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>,
  ) => {
    if (!disabled && clickable && onClick) {
      if (
        (event as React.MouseEvent<HTMLDivElement>).type === "click" ||
        ((event as React.KeyboardEvent<HTMLDivElement>).type === "keydown" &&
          ((event as React.KeyboardEvent<HTMLDivElement>).key === "Enter" ||
            (event as React.KeyboardEvent<HTMLDivElement>).key === " "))
      ) {
        if ((event as React.KeyboardEvent<HTMLDivElement>).type === "keydown") {
          (event as React.KeyboardEvent<HTMLDivElement>).preventDefault();
        }
        onClick(event);
      }
    }
  };

  return (
    <StyledCard
      // Styling props - these will be filtered out by shouldForwardProp
      disabled={disabled}
      clickable={clickable}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      borderRadius={borderRadius}
      elevation={elevation}
      size={size}
      fullWidth={fullWidth}
      padding={padding}
      margin={margin}
      // DOM props - these will be forwarded to the DOM element
      onClick={handleInteraction}
      onKeyDown={handleInteraction}
      className={className}
      tabIndex={clickable && !disabled ? 0 : undefined}
      role={clickable ? "button" : undefined}
      aria-disabled={disabled ? true : undefined}
      {...props}
    >
      {image && <CardImage src={image.src} alt={image.alt || "Card image"} />}
      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}
      <CardContent>{children}</CardContent>
      {footer && <CardFooter>{footer}</CardFooter>}
    </StyledCard>
  );
};
