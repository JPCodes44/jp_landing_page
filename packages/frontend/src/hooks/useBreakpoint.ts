import { useEffect, useState } from "react";

const PHONE_BREAKPOINT = 480;
const MOBILE_BREAKPOINT = 767;
const TABLET_BREAKPOINT = 1000;
const LAPTOP_SM_BREAKPOINT = 1220;
const LAPTOP_BREAKPOINT = 1440;
const DESKTOP_SM_BREAKPOINT = 1550;
const DESKTOP_BREAKPOINT = 1700;

type Breakpoint =
  | "phone"
  | "mobile"
  | "tablet"
  | "laptop-sm"
  | "laptop"
  | "desktop-sm"
  | "desktop"
  | "large-desktop";

const getBreakpoint = (): Breakpoint => {
  if (typeof window === "undefined") return "desktop";
  if (window.innerWidth <= PHONE_BREAKPOINT) return "phone";
  if (window.innerWidth <= MOBILE_BREAKPOINT) return "mobile";
  if (window.innerWidth <= TABLET_BREAKPOINT) return "tablet";
  if (window.innerWidth <= LAPTOP_SM_BREAKPOINT) return "laptop-sm";
  if (window.innerWidth <= LAPTOP_BREAKPOINT) return "laptop";
  if (window.innerWidth <= DESKTOP_SM_BREAKPOINT) return "desktop-sm";
  if (window.innerWidth <= DESKTOP_BREAKPOINT) return "desktop";
  return "large-desktop";
};

/**
 * Returns the current breakpoint based on the project's breakpoints (480px, 767px, 1000px, 1220px, 1440px, 1550px, 1700px).
 * Use this only for layout differences that cannot be handled with CSS custom properties.
 */
export const useBreakpoint = (): Breakpoint => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getBreakpoint);

  useEffect(() => {
    const handler = () => setBreakpoint(getBreakpoint());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  return breakpoint;
};
