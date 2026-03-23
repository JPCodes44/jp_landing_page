/// <reference types="vite/client" />

declare module "*.mp4" {
  const src: string;
  export default src;
}

interface Window {
  __lenis?: {
    scrollTo: (target: number, opts: { duration: number; easing: (t: number) => number }) => void;
  };
}
