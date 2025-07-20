import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Img } from "./Img";

describe("Img Component", () => {
  // Test 1: Component visibility (required)
  test("renders image component", async () => {
    render(<Img src="https://picsum.photos/400/300" alt="Test image" />);

    const imageElement = screen.getByRole("img");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute("alt", "Test image");
  });

  // Test 2: Disabled state background color change (required)
  test("changes appearance when component is in disabled state", () => {
    render(
      <Img
        src="https://picsum.photos/400/300"
        alt="Disabled image"
        disabled={true}
      />,
    );

    const imageWrapper = screen.getByRole("img").parentElement;
    expect(imageWrapper).toHaveStyle("opacity: 0.65");
    expect(imageWrapper).toHaveStyle("cursor: not-allowed");
    expect(imageWrapper).toHaveStyle("filter: grayscale(100%)");
  });

  // Additional tests for better coverage
  test("renders with correct src and alt attributes", () => {
    const testSrc = "https://picsum.photos/200/200";
    const testAlt = "Test image description";

    render(<Img src={testSrc} alt={testAlt} />);

    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("src", testSrc);
    expect(imageElement).toHaveAttribute("alt", testAlt);
  });

  test("applies custom width and height", () => {
    render(
      <Img
        src="https://picsum.photos/400/300"
        alt="Custom size image"
        width="500px"
        height="300px"
      />,
    );

    const imageWrapper = screen.getByRole("img").parentElement;
    expect(imageWrapper).toHaveStyle("width: 500px");
    expect(imageWrapper).toHaveStyle("height: 300px");
  });

  test("applies border radius", () => {
    render(
      <Img
        src="https://picsum.photos/400/300"
        alt="Rounded image"
        borderRadius="10px"
      />,
    );

    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveStyle("border-radius: 10px");
  });

  test("applies object fit property", () => {
    render(
      <Img
        src="https://picsum.photos/400/300"
        alt="Object fit image"
        objectFit="contain"
      />,
    );

    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveStyle("object-fit: contain");
  });

  test("shows placeholder when src is empty", () => {
    render(<Img src="" alt="Empty image" placeholder="No image available" />);

    expect(screen.getByText("No image available")).toBeInTheDocument();
  });

  test("applies custom className", () => {
    const customClass = "custom-image-class";

    render(
      <Img
        src="https://picsum.photos/400/300"
        alt="Custom class image"
        className={customClass}
      />,
    );

    const imageWrapper = screen.getByRole("img").parentElement;
    expect(imageWrapper).toHaveClass(customClass);
  });

  test("sets correct loading attribute", () => {
    render(
      <Img
        src="https://picsum.photos/400/300"
        alt="Lazy loaded image"
        loading="lazy"
      />,
    );

    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("loading", "lazy");
  });

  test("handles image error with placeholder", async () => {
    // Mock console.error to avoid noise in test output
    const consoleSpy = jest.spyOn(console, "error").mockImplementation();

    render(
      <Img
        src="invalid-url"
        alt="Error image"
        placeholder="Image failed to load"
      />,
    );

    const imageElement = screen.getByRole("img");

    // Simulate image load error
    fireEvent.error(imageElement);

    await waitFor(() => {
      expect(screen.getByText("Image failed to load")).toBeInTheDocument();
    });

    consoleSpy.mockRestore();
  });

  test("clickable image has correct tabIndex", () => {
    render(
      <Img
        src="https://picsum.photos/400/300"
        alt="Focusable image"
        onClick={() => {}}
      />,
    );

    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("tabIndex", "0");
  });

  test("non-clickable image has correct tabIndex", () => {
    render(
      <Img src="https://picsum.photos/400/300" alt="Non-focusable image" />,
    );

    const imageElement = screen.getByRole("img");
    expect(imageElement).toHaveAttribute("tabIndex", "-1");
  });
});
