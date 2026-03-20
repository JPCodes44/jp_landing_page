import { useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 767;

/**
 * Returns the current breakpoint based on the project's single breakpoint (767px).
 * Use this only for layout differences that cannot be handled with CSS custom properties.
 */
export const useBreakpoint = (): "mobile" | "desktop" => {
  const [breakpoint, setBreakpoint] = useState<"mobile" | "desktop">(() =>
    typeof window !== "undefined" && window.innerWidth <= MOBILE_BREAKPOINT ? "mobile" : "desktop",
  );

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const handler = (e: MediaQueryListEvent) => setBreakpoint(e.matches ? "mobile" : "desktop");
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return breakpoint;
};
