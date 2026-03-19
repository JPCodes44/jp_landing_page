import { useEffect, useState } from "react";

const BREAKPOINT = 768;

export const useIsMobile = (): boolean => {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < BREAKPOINT);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${BREAKPOINT - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isMobile;
};
