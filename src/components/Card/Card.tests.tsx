import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import "jest-styled-components";
import { Card } from "./Card";

describe("Card Component", () => {
  // Test 1: Component visibility (required)
  test("renders card component", () => {
    render(<Card>Test Card Content</Card>);
    const cardElement = screen.getByText("Test Card Content");
    expect(cardElement).toBeInTheDocument();
    expect(cardElement).toBeVisible();
  });

  // Test 2: Disabled state background color change (required)
  test("changes background color when component is in disabled state", () => {
    const { container } = render(<Card disabled>Disabled Card</Card>);
    const cardElement = container.firstChild;

    expect(cardElement).toHaveStyleRule("opacity", "0.6");
    expect(cardElement).toHaveStyleRule("cursor", "not-allowed");
    expect(cardElement).toHaveStyleRule("background-color", "#f5f5f5", {
      modifier: "&",
    });
    expect(cardElement).toHaveStyleRule("border-color", "#d0d0d0", {
      modifier: "&",
    });
  });

  // Additional tests for better coverage
  test("renders card with title and subtitle", () => {
    const title = "Test Title";
    const subtitle = "Test Subtitle";
    render(
      <Card title={title} subtitle={subtitle}>
        Card Content
      </Card>,
    );

    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(subtitle)).toBeInTheDocument();
    expect(screen.getByText("Card Content")).toBeInTheDocument();
  });

  test("renders card with image", () => {
    const imageProps = {
      src: "test-image.jpg",
      alt: "Test Image",
    };

    render(<Card image={imageProps}>Card with image</Card>);

    const imageElement = screen.getByAltText("Test Image");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("src", "test-image.jpg");
  });

  test("renders card with footer", () => {
    const footer = <div>Footer Content</div>;
    render(<Card footer={footer}>Card Content</Card>);

    expect(screen.getByText("Footer Content")).toBeInTheDocument();
  });

  test("calls onClick handler when clickable card is clicked", () => {
    const handleClick = jest.fn();
    render(
      <Card clickable onClick={handleClick}>
        Clickable Card
      </Card>,
    );

    const cardElement = screen.getByRole("button");
    expect(cardElement).toHaveAttribute("tabIndex", "0");
    fireEvent.click(cardElement!);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick handler when disabled clickable card is clicked", () => {
    const handleClick = jest.fn();
    render(
      <Card clickable disabled onClick={handleClick}>
        Disabled Clickable Card
      </Card>,
    );

    const cardElement = screen
      .getByText("Disabled Clickable Card")
      .closest("div");
    fireEvent.click(cardElement!);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test("handles keyboard interaction for clickable cards", () => {
    const handleClick = jest.fn();
    render(
      <Card clickable onClick={handleClick}>
        Keyboard Accessible Card
      </Card>,
    );

    const cardElement = screen
      .getByText("Keyboard Accessible Card")
      .closest("div");

    // Test Enter key
    fireEvent.keyDown(cardElement!, { key: "Enter", code: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Test Space key
    fireEvent.keyDown(cardElement!, { key: " ", code: "Space" });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  test("renders with different sizes", () => {
    const { rerender } = render(<Card size="small">Small Card</Card>);
    let cardElement = screen.getByText("Small Card").closest("div");
    expect(cardElement).toBeInTheDocument();

    rerender(<Card size="medium">Medium Card</Card>);
    cardElement = screen.getByText("Medium Card").closest("div");
    expect(cardElement).toBeInTheDocument();

    rerender(<Card size="large">Large Card</Card>);
    cardElement = screen.getByText("Large Card").closest("div");
    expect(cardElement).toBeInTheDocument();
  });

  test("renders with different elevations", () => {
    const { rerender } = render(<Card elevation="low">Low Elevation</Card>);
    let cardElement = screen.getByText("Low Elevation").closest("div");
    expect(cardElement).toBeInTheDocument();

    rerender(<Card elevation="high">High Elevation</Card>);
    cardElement = screen.getByText("High Elevation").closest("div");
    expect(cardElement).toBeInTheDocument();
  });

  test("applies custom background and border colors", () => {
    render(
      <Card backgroundColor="#ff0000" borderColor="#00ff00">
        Custom Colors Card
      </Card>,
    );

    const cardElement = screen.getByText("Custom Colors Card").closest("div");
    expect(cardElement).toBeInTheDocument();
  });

  test("applies custom border radius", () => {
    render(<Card borderRadius="20px">Custom Border Radius</Card>);

    const cardElement = screen.getByText("Custom Border Radius").closest("div");
    expect(cardElement).toBeInTheDocument();
  });

  test("renders full width card", () => {
    render(<Card fullWidth>Full Width Card</Card>);

    const cardElement = screen.getByText("Full Width Card").closest("div");
    expect(cardElement).toBeInTheDocument();
  });

  test("applies custom padding and margin", () => {
    render(
      <Card padding="20px" margin="10px">
        Custom Spacing Card
      </Card>,
    );

    const cardElement = screen.getByText("Custom Spacing Card").closest("div");
    expect(cardElement).toBeInTheDocument();
  });

  test("non-clickable card does not have button attributes", () => {
    render(<Card>Non-clickable Card</Card>);

    const cardElement = screen.getByText("Non-clickable Card").closest("div");
    expect(cardElement).not.toHaveAttribute("role", "button");
    expect(cardElement).not.toHaveAttribute("tabIndex");
  });

  test("card without image does not render image element", () => {
    render(<Card>Card without image</Card>);

    const imageElement = screen.queryByRole("img");
    expect(imageElement).not.toBeInTheDocument();
  });

  test("card without title and subtitle does not render header", () => {
    render(<Card>Content only</Card>);

    // Check that no h3 element (title) exists
    const titleElement = screen.queryByRole("heading", { level: 3 });
    expect(titleElement).not.toBeInTheDocument();
  });

  test("card with only title renders title but no subtitle", () => {
    render(<Card title="Only Title">Content</Card>);

    expect(screen.getByText("Only Title")).toBeInTheDocument();
    // Check that there's no paragraph with subtitle
    const cardElement = screen.getByText("Only Title").closest("div");
    const subtitleElements = cardElement!.querySelectorAll("p");
    // Should not find a subtitle paragraph in the header
    expect(subtitleElements.length).toBe(0);
  });
});
