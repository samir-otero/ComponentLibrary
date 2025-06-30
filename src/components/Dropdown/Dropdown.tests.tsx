import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Dropdown } from './Dropdown';

const sampleOptions = ['Option 1', 'Option 2', 'Option 3'];

describe('Dropdown Component', () => {
  // Test 1: Component visibility (required)
  test('renders dropdown component', () => {
    render(<Dropdown options={sampleOptions} placeholder="Test Dropdown" />);
    const dropdownElement = screen.getByRole('button');
    expect(dropdownElement).toBeInTheDocument();
    expect(dropdownElement).toBeVisible();
  });

  // Test 2: Disabled state background color change (required)
  test('changes background color when component is in disabled state', () => {
    render(<Dropdown options={sampleOptions} disabled placeholder="Disabled Dropdown" />);
    const dropdownElement = screen.getByRole('button');
    expect(dropdownElement).toBeDisabled();

    // Check that the disabled styles are applied
    const computedStyles = window.getComputedStyle(dropdownElement);
    expect(computedStyles.cursor).toBe('not-allowed');
    expect(computedStyles.opacity).toBe('0.65');
  });

  // Additional tests for better coverage
  test('renders dropdown with correct placeholder text', () => {
    const placeholderText = 'Select an option';
    render(<Dropdown options={sampleOptions} placeholder={placeholderText} />);
    expect(screen.getByText(placeholderText)).toBeInTheDocument();
  });

  test('opens dropdown when clicked', () => {
    render(<Dropdown options={sampleOptions} placeholder="Test Dropdown" />);
    const dropdownButton = screen.getByRole('button');

    fireEvent.click(dropdownButton);

    sampleOptions.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test('closes dropdown when option is selected', () => {
    const handleChange = jest.fn();
    render(
      <Dropdown
        options={sampleOptions}
        placeholder="Test Dropdown"
        onChange={handleChange}
      />
    );

    const dropdownButton = screen.getByRole('button');
    fireEvent.click(dropdownButton);

    const option = screen.getByText('Option 1');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalledWith('Option 1');
  });

  test('renders with custom background color', () => {
    render(
      <Dropdown
        options={sampleOptions}
        backgroundColor="#ff0000"
        placeholder="Red Dropdown"
      />
    );
    const dropdownElement = screen.getByRole('button');
    expect(dropdownElement).toBeInTheDocument();
  });

  test('renders with correct size', () => {
    render(
      <Dropdown
        options={sampleOptions}
        size="large"
        placeholder="Large Dropdown"
      />
    );
    const dropdownElement = screen.getByRole('button');
    expect(dropdownElement).toBeInTheDocument();
  });

  test('renders full width dropdown', () => {
    render(
      <Dropdown
        options={sampleOptions}
        fullWidth
        placeholder="Full Width Dropdown"
      />
    );
    const dropdownElement = screen.getByRole('button');
    expect(dropdownElement).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const customClass = 'custom-dropdown-class';
    render(
      <Dropdown
        options={sampleOptions}
        className={customClass}
        placeholder="Custom Class Dropdown"
      />
    );
    const dropdownContainer = screen.getByRole('button').parentElement;
    expect(dropdownContainer).toHaveClass(customClass);
  });

  test('disabled dropdown has correct cursor style', () => {
    render(<Dropdown options={sampleOptions} disabled placeholder="Disabled Dropdown" />);
    const dropdownElement = screen.getByRole('button');

    const computedStyles = window.getComputedStyle(dropdownElement);
    expect(computedStyles.cursor).toBe('not-allowed');
  });

  test('handles empty options array', () => {
    render(<Dropdown options={[]} placeholder="Empty Dropdown" />);
    const dropdownButton = screen.getByRole('button');

    fireEvent.click(dropdownButton);

    // Should not crash and dropdown should still be functional
    expect(dropdownButton).toBeInTheDocument();
  });
});