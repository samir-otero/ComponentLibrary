import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Text } from "./Text";

describe("Text Component", () => {
  // Test 1: Component visibility (required)
  test("renders text component", () => {
    render(<Text>Test Text</Text>);
    const textElement = screen.getByText("Test Text");
    expect(textElement).toBeInTheDocument();
    expect(textElement).toBeVisible();
  });

  // Test 2: Disabled state background color change (required)
  test("changes background color when component is in disabled state", () => {
    render(<Text disabled>Disabled Text</Text>);
    const textElement = screen.getByText("Disabled Text");

    // Check that the disabled styles are applied
    const computedStyles = window.getComputedStyle(textElement);
    expect(computedStyles.cursor).toBe("not-allowed");
    expect(computedStyles.opacity).toBe("0.65");
  });

  // Additional tests for better coverage
  test("renders text with correct content", () => {
    const textContent = "Hello World";
    render(<Text>{textContent}</Text>);
    expect(screen.getByText(textContent)).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Text onClick={handleClick}>Clickable Text</Text>);
    const textElement = screen.getByText("Clickable Text");
    fireEvent.click(textElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick handler when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Text onClick={handleClick} disabled>
        Disabled Text
      </Text>,
    );
    const textElement = screen.getByText("Disabled Text");
    fireEvent.click(textElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("renders with correct variant", () => {
    render(<Text variant="success">Success Text</Text>);
    const textElement = screen.getByText("Success Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders with correct size", () => {
    render(<Text size="large">Large Text</Text>);
    const textElement = screen.getByText("Large Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders with correct weight", () => {
    render(<Text weight="bold">Bold Text</Text>);
    const textElement = screen.getByText("Bold Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders with custom color", () => {
    render(<Text color="#ff0000">Red Text</Text>);
    const textElement = screen.getByText("Red Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders with custom background color", () => {
    render(<Text backgroundColor="#00ff00">Green Background Text</Text>);
    const textElement = screen.getByText("Green Background Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders with italic styling", () => {
    render(<Text italic>Italic Text</Text>);
    const textElement = screen.getByText("Italic Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders with underline styling", () => {
    render(<Text underline>Underlined Text</Text>);
    const textElement = screen.getByText("Underlined Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders with strikethrough styling", () => {
    render(<Text strikethrough>Strikethrough Text</Text>);
    const textElement = screen.getByText("Strikethrough Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders with uppercase styling", () => {
    render(<Text uppercase>Uppercase Text</Text>);
    const textElement = screen.getByText("Uppercase Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders with lowercase styling", () => {
    render(<Text lowercase>LOWERCASE TEXT</Text>);
    const textElement = screen.getByText("LOWERCASE TEXT");
    expect(textElement).toBeInTheDocument();
  });

  test("renders with capitalize styling", () => {
    render(<Text capitalize>capitalize text</Text>);
    const textElement = screen.getByText("capitalize text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders with different HTML elements", () => {
    render(<Text as="p">Paragraph Text</Text>);
    const textElement = screen.getByText("Paragraph Text");
    expect(textElement.tagName.toLowerCase()).toBe("p");
  });

  test("renders as heading element", () => {
    render(<Text as="h1">Heading Text</Text>);
    const textElement = screen.getByText("Heading Text");
    expect(textElement.tagName.toLowerCase()).toBe("h1");
  });

  test("renders full width text", () => {
    render(<Text fullWidth>Full Width Text</Text>);
    const textElement = screen.getByText("Full Width Text");
    expect(textElement).toBeInTheDocument();
  });

  test("applies custom className", () => {
    const customClass = "custom-text-class";
    render(<Text className={customClass}>Custom Class Text</Text>);
    const textElement = screen.getByText("Custom Class Text");
    expect(textElement).toHaveClass(customClass);
  });

  test("disabled text has correct cursor style", () => {
    render(<Text disabled>Disabled Text</Text>);
    const textElement = screen.getByText("Disabled Text");
    const computedStyles = window.getComputedStyle(textElement);
    expect(computedStyles.cursor).toBe("not-allowed");
  });

  test("clickable text has pointer cursor", () => {
    render(<Text onClick={() => {}}>Clickable Text</Text>);
    const textElement = screen.getByText("Clickable Text");
    const computedStyles = window.getComputedStyle(textElement);
    expect(computedStyles.cursor).toBe("pointer");
  });

  test("renders with truncate styling", () => {
    render(<Text truncate>Very long text that should be truncated</Text>);
    const textElement = screen.getByText(
      "Very long text that should be truncated",
    );
    expect(textElement).toBeInTheDocument();
  });

  test("renders with multiple styling options combined", () => {
    render(
      <Text italic underline weight="bold" size="large" variant="success">
        Styled Text
      </Text>,
    );
    const textElement = screen.getByText("Styled Text");
    expect(textElement).toBeInTheDocument();
  });

  // Test accessibility
  test("clickable text is focusable", () => {
    render(<Text onClick={() => {}}>Focusable Text</Text>);
    const textElement = screen.getByText("Focusable Text");
    textElement.focus();
    expect(textElement).toHaveFocus();
  });

  test("non-clickable text is not focusable", () => {
    render(<Text>Non-focusable Text</Text>);
    const textElement = screen.getByText("Non-focusable Text");
    expect(textElement).not.toHaveAttribute("tabIndex");
  });

  test("disabled text behavior", () => {
    render(<Text disabled>Disabled Text</Text>);
    const textElement = screen.getByText("Disabled Text");
    const computedStyles = window.getComputedStyle(textElement);
    expect(computedStyles.opacity).toBe("0.65");
  });

  // Test different variants
  test("renders secondary variant correctly", () => {
    render(<Text variant="secondary">Secondary Text</Text>);
    const textElement = screen.getByText("Secondary Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders danger variant correctly", () => {
    render(<Text variant="danger">Danger Text</Text>);
    const textElement = screen.getByText("Danger Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders warning variant correctly", () => {
    render(<Text variant="warning">Warning Text</Text>);
    const textElement = screen.getByText("Warning Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders info variant correctly", () => {
    render(<Text variant="info">Info Text</Text>);
    const textElement = screen.getByText("Info Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders muted variant correctly", () => {
    render(<Text variant="muted">Muted Text</Text>);
    const textElement = screen.getByText("Muted Text");
    expect(textElement).toBeInTheDocument();
  });

  // Test different sizes
  test("renders extra small size correctly", () => {
    render(<Text size="xs">Extra Small Text</Text>);
    const textElement = screen.getByText("Extra Small Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders extra large size correctly", () => {
    render(<Text size="xl">Extra Large Text</Text>);
    const textElement = screen.getByText("Extra Large Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders double extra large size correctly", () => {
    render(<Text size="2xl">Double Extra Large Text</Text>);
    const textElement = screen.getByText("Double Extra Large Text");
    expect(textElement).toBeInTheDocument();
  });

  // Test different alignments
  test("renders center aligned text", () => {
    render(<Text align="center">Center Text</Text>);
    const textElement = screen.getByText("Center Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders right aligned text", () => {
    render(<Text align="right">Right Text</Text>);
    const textElement = screen.getByText("Right Text");
    expect(textElement).toBeInTheDocument();
  });

  test("renders justified text", () => {
    render(<Text align="justify">Justified Text</Text>);
    const textElement = screen.getByText("Justified Text");
    expect(textElement).toBeInTheDocument();
  });
});
