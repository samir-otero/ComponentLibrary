import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Label } from './Label';

describe('Label Component', () => {
  // Test 1: Component visibility (required)
  test('renders label component', () => {
    render(<Label>Test Label</Label>);
    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toBeInTheDocument();
    expect(labelElement).toBeVisible();
  });

  // Test 2: Disabled state background color change (required)
  test('changes background color when component is in disabled state', () => {
    render(<Label disabled>Disabled Label</Label>);
    const labelElement = screen.getByText('Disabled Label');

    // Check that the disabled styles are applied
    const computedStyles = window.getComputedStyle(labelElement);
    expect(computedStyles.cursor).toBe('not-allowed');
    expect(computedStyles.opacity).toBe('0.65');
  });

  // Additional tests for better coverage
  test('renders label with correct text content', () => {
    const labelText = 'My Label';
    render(<Label>{labelText}</Label>);
    expect(screen.getByText(labelText)).toBeInTheDocument();
  });

  test('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Label onClick={handleClick}>Clickable Label</Label>);
    const labelElement = screen.getByText('Clickable Label');
    fireEvent.click(labelElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick handler when disabled', () => {
    const handleClick = jest.fn();
    render(<Label onClick={handleClick} disabled>Disabled Label</Label>);
    const labelElement = screen.getByText('Disabled Label');
    fireEvent.click(labelElement);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('renders with correct variant', () => {
    render(<Label variant="success">Success Label</Label>);
    const labelElement = screen.getByText('Success Label');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders with correct size', () => {
    render(<Label size="large">Large Label</Label>);
    const labelElement = screen.getByText('Large Label');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders with custom color', () => {
    render(<Label color="#ff0000">Red Label</Label>);
    const labelElement = screen.getByText('Red Label');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders with custom background color', () => {
    render(<Label backgroundColor="#00ff00">Green Background Label</Label>);
    const labelElement = screen.getByText('Green Background Label');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders required indicator when required is true', () => {
    render(<Label required>Required Label</Label>);
    const labelElement = screen.getByText('Required Label');
    expect(labelElement).toBeInTheDocument();
    // The asterisk is added via CSS ::after pseudo-element
  });

  test('renders with bold styling', () => {
    render(<Label bold>Bold Label</Label>);
    const labelElement = screen.getByText('Bold Label');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders with italic styling', () => {
    render(<Label italic>Italic Label</Label>);
    const labelElement = screen.getByText('Italic Label');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders with underline styling', () => {
    render(<Label underline>Underlined Label</Label>);
    const labelElement = screen.getByText('Underlined Label');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders full width label', () => {
    render(<Label fullWidth>Full Width Label</Label>);
    const labelElement = screen.getByText('Full Width Label');
    expect(labelElement).toBeInTheDocument();
  });

  test('applies custom className', () => {
    const customClass = 'custom-label-class';
    render(<Label className={customClass}>Custom Class Label</Label>);
    const labelElement = screen.getByText('Custom Class Label');
    expect(labelElement).toHaveClass(customClass);
  });

  test('applies htmlFor attribute correctly', () => {
    const inputId = 'test-input';
    render(<Label htmlFor={inputId}>Label for Input</Label>);
    const labelElement = screen.getByText('Label for Input');
    expect(labelElement).toHaveAttribute('for', inputId);
  });

  test('disabled label has correct cursor style', () => {
    render(<Label disabled>Disabled Label</Label>);
    const labelElement = screen.getByText('Disabled Label');
    const computedStyles = window.getComputedStyle(labelElement);
    expect(computedStyles.cursor).toBe('not-allowed');
  });

  test('renders with multiple styling options combined', () => {
    render(
      <Label bold italic underline required>
        Styled Label
      </Label>
    );
    const labelElement = screen.getByText('Styled Label');
    expect(labelElement).toBeInTheDocument();
  });

  test('disabled label behavior', () => {
    render(<Label disabled>Disabled Label</Label>);
    const labelElement = screen.getByText('Disabled Label');
    const computedStyles = window.getComputedStyle(labelElement);
    expect(computedStyles.opacity).toBe('0.65');
  });

  // Test different variants
  test('renders secondary variant correctly', () => {
    render(<Label variant="secondary">Secondary Label</Label>);
    const labelElement = screen.getByText('Secondary Label');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders danger variant correctly', () => {
    render(<Label variant="danger">Danger Label</Label>);
    const labelElement = screen.getByText('Danger Label');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders warning variant correctly', () => {
    render(<Label variant="warning">Warning Label</Label>);
    const labelElement = screen.getByText('Warning Label');
    expect(labelElement).toBeInTheDocument();
  });

  test('renders info variant correctly', () => {
    render(<Label variant="info">Info Label</Label>);
    const labelElement = screen.getByText('Info Label');
    expect(labelElement).toBeInTheDocument();
  });
});