import { render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Frame4 from "./Frame4";

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

describe("Frame4", () => {
  beforeEach(() => {
    mockMatchMedia(false);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders a section element", () => {
    render(<Frame4 />);
    const section = document.querySelector("section");
    expect(section).toBeInTheDocument();
  });

  it("renders the heading text", () => {
    render(<Frame4 />);
    expect(screen.getByText("Comprehensive Solutions:")).toBeInTheDocument();
  });

  it("renders all 4 accordion items", () => {
    render(<Frame4 />);
    expect(screen.getByText("Continuous Lead gen")).toBeInTheDocument();
    expect(screen.getByText("Automated reporting")).toBeInTheDocument();
    expect(screen.getByText("System Integrations")).toBeInTheDocument();
    expect(screen.getByText("Agentic internal tools")).toBeInTheDocument();
  });

  it("renders an expand button for each accordion item", () => {
    render(<Frame4 />);
    const expandButtons = screen.getAllByRole("button", { name: "expand" });
    expect(expandButtons).toHaveLength(4);
  });

  describe("with prefers-reduced-motion", () => {
    beforeEach(() => {
      mockMatchMedia(true);
    });

    it("renders heading and accordion visible when reduced motion is preferred", () => {
      render(<Frame4 />);
      expect(screen.getByText("Comprehensive Solutions:")).toBeInTheDocument();
      expect(screen.getByText("Continuous Lead gen")).toBeInTheDocument();
    });
  });
});
