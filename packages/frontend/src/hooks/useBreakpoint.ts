import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 767;
const LAPTOP_BREAKPOINT = 1440;

const getBreakpoint = (): "mobile" | "laptop" | "desktop" => {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth <= MOBILE_BREAKPOINT) return "mobile";
  if (window.innerWidth <= LAPTOP_BREAKPOINT) return "laptop";
  return "desktop";
};

/**
 * Returns the current breakpoint based on the project's breakpoints (767px, 1440px).
 * Use this only for layout differences that cannot be handled with CSS custom properties.
 */
export const useBreakpoint = (): "mobile" | "laptop" | "desktop" => {
  const [breakpoint, setBreakpoint] = useState<"mobile" | "laptop" | "desktop">(getBreakpoint);

  useEffect(() => {
    const handler = () => setBreakpoint(getBreakpoint());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return breakpoint;
};
