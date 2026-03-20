import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Frame2 from "./Frame2";

describe("Frame2", () => {
  it("renders heading 'What I do:'", () => {
    render(<Frame2 />);
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("What I do:");
  });

  it("renders body text with 'agentic' highlighted", () => {
    render(<Frame2 />);
    const agentic = screen.getByText("agentic");
    expect(agentic).toBeInTheDocument();
    expect(agentic.tagName).toBe("SPAN");
    expect((agentic as HTMLElement).style.color).toBeTruthy();
  });

  it("renders 6 icon images", () => {
    render(<Frame2 />);
    const images = screen.getAllByRole("img");
    expect(images).toHaveLength(18);
  });
});
