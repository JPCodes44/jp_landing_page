import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import {
  COLOR_FRAME3_GREEN,
  COLOR_FRAME3_TAN,
  FRAME3_RECT_INITIAL_HEIGHT,
  FRAME3_RECT_INITIAL_INSET,
  FRAME3_RECT_TARGET_HEIGHT,
  FRAME3_RECT_TARGET_INSET,
} from "../theme";

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
        initCanvas(img);
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
        height: FRAME3_RECT_TARGET_HEIGHT,
        left: FRAME3_RECT_TARGET_INSET,
        right: FRAME3_RECT_TARGET_INSET,
        backgroundColor: COLOR_FRAME3_GREEN,
      });
      drawFrame(TOTAL_FRAMES - 1);
      return;
    }

    // Draw first frame immediately
    drawFrame(0);

    let tl: gsap.core.Timeline | undefined;

    const buildAnimation = () => {
      // Expansion: 1 viewport-height of scroll (same feel regardless of frame count)
      const expansionPx = window.innerHeight;
      // Linger: enough scroll to comfortably scrub all frames
      const lingerPx = TOTAL_FRAMES * PX_PER_FRAME;
      // Total section height = sticky viewport + scroll distance
      wrapper.style.height = `${window.innerHeight + expansionPx + lingerPx}px`;

      // GSAP units: expansion = 1, linger scales proportionally so px/unit stays constant
      const lingerUnits = lingerPx / expansionPx;

      tl?.scrollTrigger?.kill();
      tl?.kill();

      tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          scrub: 2,
          onUpdate: (self) => {
            drawFrame(Math.round(self.progress * (TOTAL_FRAMES - 1)));
          },
        },
      });

      tl.to(
        rect,
        {
          height: FRAME3_RECT_TARGET_HEIGHT,
          left: FRAME3_RECT_TARGET_INSET,
          right: FRAME3_RECT_TARGET_INSET,
          backgroundColor: COLOR_FRAME3_GREEN,
          ease: "none",
          duration: 1,
          immediateRender: false,
        },
        0,
      )
        // Linger: hold expanded state while frames scrub to the end
        .to({}, { duration: lingerUnits });
    };

    buildAnimation();

    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const img = images[Math.max(0, currentFrameIndex)];
        if (img?.complete && img.naturalWidth > 0) initCanvas(img);
        buildAnimation();
      }, 50);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      tl?.scrollTrigger?.kill();
      tl?.kill();
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="frame-bg"
      style={{
        position: "relative",
        isolation: "isolate",
        width: "100%",
        // Height is set dynamically in the effect once frame count is known.
        // 300vh is a reasonable fallback until then.
        height: "300vh",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/styles/assets/2d/backgrounds/image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.6,
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "sticky", top: 0, height: "100vh", width: "100%" }}>
        <div
          ref={rectRef}
          style={{
            position: "absolute",
            borderRadius: "1rem",
            border: "1px solid #d4d0c8",
            overflow: "hidden",
            top: "50%",
            transform: "translateY(-50%)",
            left: FRAME3_RECT_INITIAL_INSET,
            right: FRAME3_RECT_INITIAL_INSET,
            height: FRAME3_RECT_INITIAL_HEIGHT,
            backgroundColor: COLOR_FRAME3_TAN,
          }}
        >
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Frame3;
