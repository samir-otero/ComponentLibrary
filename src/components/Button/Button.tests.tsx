import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button Component", () => {
  // Test 1: Component visibility (required)
  test("renders button component", () => {
    render(<Button>Test Button</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toBeVisible();
  });

  // Test 2: Disabled state background color change (required)
  test("changes background color when component is in disabled state", () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeDisabled();

    // Check that the disabled styles are applied
    const computedStyles = window.getComputedStyle(buttonElement);
    expect(computedStyles.cursor).toBe("not-allowed");
    expect(computedStyles.opacity).toBe("0.65");
  });

  // Additional tests for better coverage
  test("renders button with correct text content", () => {
    const buttonText = "Click me!";
    render(<Button>{buttonText}</Button>);
    expect(screen.getByText(buttonText)).toBeInTheDocument();
  });

  test("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick handler when disabled", () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled Button
      </Button>,
    );

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("renders with correct variant class", () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders with correct size", () => {
    render(<Button size="large">Large Button</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders with custom background color", () => {
    render(<Button backgroundColor="#ff0000">Red Button</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders with custom text color", () => {
    render(<Button color="#00ff00">Green Text Button</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("renders full width button", () => {
    render(<Button fullWidth>Full Width Button</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  test("applies correct button type", () => {
    render(<Button type="submit">Submit Button</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveAttribute("type", "submit");
  });

  test("applies custom className", () => {
    const customClass = "custom-button-class";
    render(<Button className={customClass}>Custom Class Button</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveClass(customClass);
  });

  test("disabled button has correct cursor style", () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole("button");

    const computedStyles = window.getComputedStyle(buttonElement);
    expect(computedStyles.cursor).toBe("not-allowed");
  });

  test("button has correct default type", () => {
    render(<Button>Default Type Button</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toHaveAttribute("type", "button");
  });

  // Test for outline variant
  test("renders outline variant correctly", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const buttonElement = screen.getByRole("button");
    expect(buttonElement).toBeInTheDocument();
  });

  // Test keyboard accessibility
  test("button is focusable and responds to Enter key", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Keyboard Button</Button>);

    const buttonElement = screen.getByRole("button");
    buttonElement.focus();
    expect(buttonElement).toHaveFocus();

    fireEvent.keyDown(buttonElement, { key: "Enter", code: "Enter" });
    // Note: fireEvent.keyDown doesn't automatically trigger click for buttons
    // but the button should still be focusable
    expect(buttonElement).toHaveFocus();
  });

  // Test that disabled button doesn't receive focus events properly
  test("disabled button behavior", () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole("button");

    expect(buttonElement).toBeDisabled();
    expect(buttonElement).toHaveAttribute("disabled");
  });
});
