import "@testing-library/jest-dom";
import "jest-styled-components";

// JSDOM polyfills
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock window.matchMedia
global.matchMedia =
  global.matchMedia ||
  function (query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // deprecated
      removeListener: jest.fn(), // deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    };
  };

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Ensure document.createRange exists
if (!global.document.createRange) {
  global.document.createRange = () =>
    ({
      setStart: jest.fn(),
      setEnd: jest.fn(),
      setStartBefore: jest.fn(),
      setStartAfter: jest.fn(),
      setEndBefore: jest.fn(),
      setEndAfter: jest.fn(),
      selectNode: jest.fn(),
      selectNodeContents: jest.fn(),
      collapse: jest.fn(),
      cloneContents: jest.fn(),
      deleteContents: jest.fn(),
      extractContents: jest.fn(),
      insertNode: jest.fn(),
      surroundContents: jest.fn(),
      cloneRange: jest.fn(),
      detach: jest.fn(),
      isPointInRange: jest.fn(),
      compareBoundaryPoints: jest.fn(),
      comparePoint: jest.fn(),
      createContextualFragment: jest.fn(),
      getBoundingClientRect: jest.fn(),
      getClientRects: jest.fn(),
      // Required properties
      commonAncestorContainer: document.body,
      startContainer: document.body,
      endContainer: document.body,
      startOffset: 0,
      endOffset: 0,
      collapsed: false,
      END_TO_START: 2,
      END_TO_END: 1,
      START_TO_END: 3,
      START_TO_START: 0,
    }) as unknown as Range;
}
