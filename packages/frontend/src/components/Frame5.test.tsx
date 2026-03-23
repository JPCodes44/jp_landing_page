import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Frame5 from "./Frame5";

const mockMatchMedia = (prefersReduced: boolean) => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: prefersReduced && query === "(prefers-reduced-motion: reduce)",
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
};

describe("Frame5", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders heading text 'You need human expertise:'", () => {
    render(<Frame5 />);
    const heading = screen.getByText("You need human expertise:");
    expect(heading).toBeInTheDocument();
  });

  it("renders video element", () => {
    render(<Frame5 />);
    const video = document.querySelector("video");
    expect(video).toBeInTheDocument();
    expect(video?.getAttribute("src")).toContain("vid.mp4");
  });

  describe("with prefers-reduced-motion", () => {
    beforeEach(() => {
      mockMatchMedia(true);
    });

    it("heading is visible (opacity: 1, small size) when reduced motion is preferred", () => {
      render(<Frame5 />);
      const smallHeading = screen.getByText("AI is a tool, not the automation.");
      expect(smallHeading).toBeInTheDocument();
      expect(smallHeading.tagName).toBe("H2");
    });
  });
});
