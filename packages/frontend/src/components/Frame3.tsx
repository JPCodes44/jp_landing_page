import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import * as t from "../theme";

gsap.registerPlugin(ScrollTrigger);

// Pixels of scroll per frame during the linger phase.
// Higher = smoother scrub but taller section.
const PX_PER_FRAME = 12;

// Load all frame URLs in sorted order at build time
const frameModules = import.meta.glob("../../styles/assets/2d/videos/frame3Animation/*.png", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const FRAME_URLS: string[] = Object.keys(frameModules)
  .sort()
  .map((key) => frameModules[key]);

const TOTAL_FRAMES = FRAME_URLS.length;

const Frame3 = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const rect = rectRef.current;
    const canvas = canvasRef.current;
    if (!wrapper || !rect || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Pre-load all images
    const images: HTMLImageElement[] = FRAME_URLS.map((url) => {
      const img = new Image();
      img.src = url;
      return img;
    });

    let currentFrameIndex = -1;

    // Size the canvas to the image's natural resolution once, then just draw.
    // The rect's overflow:hidden acts as the window into the image.
    const initCanvas = (img: HTMLImageElement) => {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      // Size canvas CSS to cover the expanded rect, preserving aspect ratio.
      // FRAME3_RECT_TARGET_INSET = "2%" → 2% each side → 96vw total width
      // FRAME3_RECT_TARGET_HEIGHT = "96vh"
      const targetW =
        window.innerWidth * (1 - (2 * Number.parseFloat(FRAME3_RECT_TARGET_INSET)) / 100);
      const targetH = window.innerHeight * (Number.parseFloat(FRAME3_RECT_TARGET_HEIGHT) / 100);
      const scale = Math.max(targetW / img.naturalWidth, targetH / img.naturalHeight);
      canvas.style.width = `${img.naturalWidth * scale}px`;
      canvas.style.height = `${img.naturalHeight * scale}px`;
    };

    const drawFrame = (index: number) => {
      const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, index));
      if (clampedIndex === currentFrameIndex) return;
      currentFrameIndex = clampedIndex;

      const img = images[clampedIndex];
      const draw = () => {
        if (canvas.width !== img.naturalWidth) initCanvas(img);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
      if (img.complete && img.naturalWidth > 0) {
        draw();
      } else {
        img.onload = draw;
      }
    };

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(rect, {
        height: t.FRAME3_RECT_TARGET_HEIGHT,
        left: t.FRAME3_RECT_TARGET_INSET,
        right: t.FRAME3_RECT_TARGET_INSET,
        backgroundColor: t.COLOR_FRAME3_GREEN,
      });
      drawFrame(TOTAL_FRAMES - 1);
      return;
    }

    // Draw first frame immediately
    drawFrame(0);

    const cs = getComputedStyle(rect);
    tl.fromTo(
      rect,
      {
        height: cs.height,
        left: cs.left,
        right: cs.right,
        backgroundColor: cs.backgroundColor,
      },
      {
        height: t.FRAME3_RECT_TARGET_HEIGHT,
        left: t.FRAME3_RECT_TARGET_INSET,
        right: t.FRAME3_RECT_TARGET_INSET,
        backgroundColor: t.COLOR_FRAME3_GREEN,
        ease: "none",
        duration: 1,
      },
      0,
    )
      .fromTo(label, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.2 }, 0.8)
      .to({}, { duration: 2 });

    return () => {
      tl?.scrollTrigger?.kill();
      tl?.kill();
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#f5f3ef",
        height: "var(--f3-container-height)",
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
        }}
      >
        <div
          ref={rectRef}
          style={{
            position: "absolute",
            borderRadius: "1rem",
            border: "1px solid #d4d0c8",
            overflow: "hidden",
            top: "50%",
            transform: "translateY(-50%)",
            left: "var(--f3-rect-initial-inset)",
            right: "var(--f3-rect-initial-inset)",
            height: "var(--f3-rect-initial-height)",
            backgroundColor: "var(--f3-rect-initial-bg)",
          }}
        >
          <div
            ref={labelRef}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              fontFamily: '"Fanwood Text", serif',
              color: "#2d2d2d",
              opacity: 0,
              fontSize: "var(--f3-label-size)",
            }}
          >
            SOME COOL VISUAL WOAW
          </div>
        </div>
      </div>
    </section>
  );
};

export default Frame3;
