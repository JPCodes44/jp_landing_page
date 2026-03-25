/// <reference types="vite/client" />

declare module "*.mp4" {
  const src: string;
  export default src;
}

interface Window {
  __lenis?: import("lenis").default;
}
