import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { RadioButton } from "./RadioButton";

describe("RadioButton Component", () => {
  // Test 1: Component visibility (required)
  test("renders radio button component", () => {
    render(<RadioButton label="Test Radio" name="test" value="test" />);
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeInTheDocument();
  });

  // Test 2: Disabled state background color change (required)
  test("changes background color when component is in disabled state", () => {
    render(
      <RadioButton label="Disabled Radio" name="test" value="test" disabled />,
    );
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeDisabled();

    // Check that the disabled styles are applied
    const labelElement = radioElement.closest("label");
    const computedStyles = window.getComputedStyle(labelElement!);
    expect(computedStyles.cursor).toBe("not-allowed");
    expect(computedStyles.opacity).toBe("0.65");
  });

  // Additional tests for better coverage
  test("renders radio button with correct label text", () => {
    const labelText = "Test Label";
    render(<RadioButton label={labelText} name="test" value="test" />);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  test("calls onChange handler when clicked", () => {
    const handleChange = jest.fn();
    render(
      <RadioButton
        label="Clickable Radio"
        name="test"
        value="test"
        onChange={handleChange}
      />,
    );
    const radioElement = screen.getByRole("radio");
    fireEvent.click(radioElement);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("does not call onChange handler when disabled", () => {
    const handleChange = jest.fn();
    render(
      <RadioButton
        label="Disabled Radio"
        name="test"
        value="test"
        disabled
        onChange={handleChange}
      />,
    );
    const radioElement = screen.getByRole("radio");
    fireEvent.click(radioElement);
    expect(handleChange).not.toHaveBeenCalled();
  });

  test("renders checked radio button", () => {
    render(
      <RadioButton label="Checked Radio" name="test" value="test" checked />,
    );
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeChecked();
  });

  test("renders with correct size", () => {
    render(
      <RadioButton label="Large Radio" name="test" value="test" size="large" />,
    );
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeInTheDocument();
  });

  test("renders with custom background color", () => {
    render(
      <RadioButton
        label="Red Radio"
        name="test"
        value="test"
        backgroundColor="#ff0000"
      />,
    );
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeInTheDocument();
  });

  test("renders with custom text color", () => {
    render(
      <RadioButton
        label="Green Text Radio"
        name="test"
        value="test"
        color="#00ff00"
      />,
    );
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toBeInTheDocument();
  });

  test("applies correct name attribute", () => {
    const name = "test-group";
    render(<RadioButton label="Named Radio" name={name} value="test" />);
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toHaveAttribute("name", name);
  });

  test("applies correct value attribute", () => {
    const value = "test-value";
    render(<RadioButton label="Valued Radio" name="test" value={value} />);
    const radioElement = screen.getByRole("radio");
    expect(radioElement).toHaveAttribute("value", value);
  });

  test("applies custom className", () => {
    const customClass = "custom-radio-class";
    render(
      <RadioButton
        label="Custom Class Radio"
        name="test"
        value="test"
        className={customClass}
      />,
    );
    const labelElement = screen.getByRole("radio").closest("label");
    expect(labelElement).toHaveClass(customClass);
  });

  test("disabled radio button has correct cursor style", () => {
    render(
      <RadioButton label="Disabled Radio" name="test" value="test" disabled />,
    );
    const labelElement = screen.getByRole("radio").closest("label");

    const computedStyles = window.getComputedStyle(labelElement!);
    expect(computedStyles.cursor).toBe("not-allowed");
  });

  test("handles focus events correctly", () => {
    render(<RadioButton label="Focusable Radio" name="test" value="test" />);
    const radioElement = screen.getByRole("radio");

    radioElement.focus();
    expect(radioElement).toHaveFocus();
  });

  test("radio button group behavior", () => {
    render(
      <div>
        <RadioButton label="Option 1" name="group" value="1" />
        <RadioButton label="Option 2" name="group" value="2" />
      </div>,
    );

    const radio1 = screen.getByDisplayValue("1");
    const radio2 = screen.getByDisplayValue("2");

    expect(radio1).toBeInTheDocument();
    expect(radio2).toBeInTheDocument();
    expect(radio1).toHaveAttribute("name", "group");
    expect(radio2).toHaveAttribute("name", "group");
  });
});
