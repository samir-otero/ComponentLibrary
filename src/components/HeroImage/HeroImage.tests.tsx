import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { HeroImage } from "./HeroImage";

describe("HeroImage Component", () => {
  // Test 1: Component visibility (required)
  test("renders hero image component", () => {
    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Test hero image"
        title="Test Title"
      />,
    );

    const heroContainer = screen.getByRole("img").parentElement;
    expect(heroContainer).toBeInTheDocument();
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  // Test 2: Disabled state appearance change (required)
  test("changes appearance when component is in disabled state", () => {
    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Disabled hero image"
        title="Disabled Hero"
        disabled={true}
      />,
    );

    const heroContainer = screen.getByRole("img").parentElement;
    expect(heroContainer).toHaveStyle("opacity: 0.65");
    expect(heroContainer).toHaveStyle("cursor: not-allowed");
    expect(heroContainer).toHaveStyle("filter: grayscale(100%)");
  });

  // Additional tests for better coverage
  test("renders with title and subtitle", () => {
    const testTitle = "Hero Title";
    const testSubtitle = "Hero Subtitle";

    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Hero with text"
        title={testTitle}
        subtitle={testSubtitle}
      />,
    );

    expect(screen.getByText(testTitle)).toBeInTheDocument();
    expect(screen.getByText(testSubtitle)).toBeInTheDocument();
  });

  test("calls onClick handler when clicked and not disabled", () => {
    const handleClick = jest.fn();

    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Clickable hero"
        title="Clickable Hero"
        onClick={handleClick}
      />,
    );

    const heroContainer = screen.getByRole("button");
    fireEvent.click(heroContainer);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test("does not call onClick handler when disabled", () => {
    const handleClick = jest.fn();

    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Disabled clickable hero"
        title="Disabled Hero"
        onClick={handleClick}
        disabled={true}
      />,
    );

    const heroContainer = screen.getByRole("button");
    fireEvent.click(heroContainer);

    expect(handleClick).not.toHaveBeenCalled();
  });

  test("applies custom height", () => {
    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Custom height hero"
        title="Custom Height"
        height="600px"
      />,
    );

    const heroContainer = screen.getByRole("img").parentElement;
    expect(heroContainer).toHaveStyle("height: 600px");
  });

  test("applies custom text alignment", () => {
    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Left aligned hero"
        title="Left Aligned"
        textAlign="left"
      />,
    );

    const heroContainer = screen.getByRole("img").parentElement;
    expect(heroContainer).toHaveStyle("justify-content: flex-start");
  });

  test("applies custom vertical alignment", () => {
    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Top aligned hero"
        title="Top Aligned"
        verticalAlign="top"
      />,
    );

    const heroContainer = screen.getByRole("img").parentElement;
    expect(heroContainer).toHaveStyle("align-items: flex-start");
  });

  test("shows placeholder when src is empty", () => {
    render(<HeroImage src="" alt="Empty hero" title="Empty Hero" />);

    expect(screen.getByText("Hero image not available")).toBeInTheDocument();
  });

  test("handles image error with placeholder", async () => {
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    render(<HeroImage src="invalid-url" alt="Error hero" title="Error Hero" />);

    const imageElement = screen.getByRole("img");
    fireEvent.error(imageElement);

    await waitFor(() => {
      expect(screen.getByText("Hero image not available")).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  test("applies custom className", () => {
    const customClass = "custom-hero-class";

    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Custom class hero"
        title="Custom Class"
        className={customClass}
      />,
    );

    const heroContainer = screen.getByRole("img").parentElement;
    expect(heroContainer).toHaveClass(customClass);
  });

  test("renders custom children content", () => {
    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Hero with children"
        title="Hero Title"
      >
        <div>Custom Content</div>
      </HeroImage>,
    );

    expect(screen.getByText("Custom Content")).toBeInTheDocument();
  });

  test("sets correct object fit property", () => {
    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Object fit hero"
        title="Object Fit"
        objectFit="contain"
      />,
    );

    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveStyle("object-fit: contain");
  });

  test("clickable hero has correct accessibility attributes", () => {
    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Accessible hero"
        title="Accessible Hero"
        onClick={() => {}}
      />,
    );

    const heroContainer = screen.getByRole("button");
    expect(heroContainer).toHaveAttribute("tabIndex", "0");
    expect(heroContainer).toHaveAttribute("aria-label");
  });

  test("non-clickable hero does not have button role", () => {
    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Non-clickable hero"
        title="Static Hero"
      />,
    );

    const heroContainer = screen.getByRole("img").parentElement;
    expect(heroContainer).toHaveAttribute("tabIndex", "-1");
    expect(heroContainer).not.toHaveAttribute("role");
  });

  test("handles keyboard navigation for clickable hero", () => {
    const handleClick = jest.fn();

    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Keyboard hero"
        title="Keyboard Hero"
        onClick={handleClick}
      />,
    );

    const heroContainer = screen.getByRole("button");

    // Test Enter key
    fireEvent.keyDown(heroContainer, { key: "Enter" });
    expect(handleClick).toHaveBeenCalledTimes(1);

    // Test Space key
    fireEvent.keyDown(heroContainer, { key: " " });
    expect(handleClick).toHaveBeenCalledTimes(2);
  });

  test("applies correct loading attribute to image", () => {
    render(
      <HeroImage
        src="https://picsum.photos/1200/600"
        alt="Lazy loaded hero"
        title="Lazy Hero"
        loading="lazy"
      />,
    );

    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("loading", "lazy");
  });
});
