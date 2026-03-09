import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import {
  FRAME5_CONTAINER_HEIGHT,
  FRAME5_HEADING_FINAL_SIZE,
  FRAME5_HEADING_FINAL_TOP,
  FRAME5_HEADING_INITIAL_OPACITY,
  FRAME5_HEADING_INITIAL_SIZE,
  FRAME5_HEADING_INITIAL_TOP,
  FRAME5_RECT_BG_COLOR,
  FRAME5_RECT_INITIAL_HEIGHT,
  FRAME5_RECT_INITIAL_INSET,
  FRAME5_RECT_INITIAL_TOP,
  FRAME5_SECTION_DARK_BG,
  FRAME5_VIDEO_BG_COLOR,
} from "../theme";

gsap.registerPlugin(ScrollTrigger);

const Frame5 = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const dividerRef = useRef<HTMLHRElement>(null);
  const rectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sticky = stickyRef.current;
    const heading = headingRef.current;
    const divider = dividerRef.current;
    const rect = rectRef.current;
    if (!wrapper || !sticky || !heading || !divider || !rect) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(heading, {
        fontSize: FRAME5_HEADING_FINAL_SIZE,
        opacity: 1,
        top: FRAME5_HEADING_FINAL_TOP,
      });
      gsap.set([divider, rect], { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    // Phase 1 (0–1.0): Heading animates from large+muted to small+opaque
    tl.fromTo(
      heading,
      {
        fontSize: FRAME5_HEADING_INITIAL_SIZE,
        opacity: FRAME5_HEADING_INITIAL_OPACITY,
        top: FRAME5_HEADING_INITIAL_TOP,
      },
      {
        fontSize: FRAME5_HEADING_FINAL_SIZE,
        opacity: 1,
        top: FRAME5_HEADING_FINAL_TOP,
        ease: "none",
        duration: 1,
      },
      0,
    );

    // Phase 2 (0.7–1.0): Divider and rect fade in
    tl.fromTo([divider, rect], { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.3 }, 0.7);

    // Phase 3 (1.2–2.0): Rect expands to fullscreen
    tl.to(
      rect,
      {
        top: 0,
        left: 0,
        right: 0,
        height: "100vh",
        borderRadius: "0.75rem",
        ease: "none",
        duration: 0.8,
      },
      1.2,
    );

    // Section bg darkens starting at position 1.2
    tl.to(
      sticky,
      {
        backgroundColor: FRAME5_SECTION_DARK_BG,
        ease: "none",
        duration: 0.4,
      },
      1.2,
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative w-full"
      style={{ height: FRAME5_CONTAINER_HEIGHT }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden bg-bg-warm">
        <h2
          ref={headingRef}
          className="absolute font-fanwood text-text-primary"
          style={{
            fontSize: FRAME5_HEADING_INITIAL_SIZE,
            opacity: FRAME5_HEADING_INITIAL_OPACITY,
            top: FRAME5_HEADING_INITIAL_TOP,
            left: "3.75rem",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          My Services In Action:
        </h2>
        <hr
          ref={dividerRef}
          className="absolute"
          style={{
            opacity: 0,
            top: "9rem",
            left: "3.75rem",
            right: "3.75rem",
            border: "none",
            borderTop: "1px solid currentColor",
          }}
        />
        <div
          ref={rectRef}
          className="absolute rounded-2xl overflow-hidden"
          style={{
            opacity: 0,
            top: FRAME5_RECT_INITIAL_TOP,
            left: FRAME5_RECT_INITIAL_INSET,
            right: FRAME5_RECT_INITIAL_INSET,
            height: FRAME5_RECT_INITIAL_HEIGHT,
            backgroundColor: FRAME5_RECT_BG_COLOR,
          }}
        >
          <div
            className="flex items-center justify-center h-full font-fanwood text-text-primary"
            style={{ backgroundColor: FRAME5_VIDEO_BG_COLOR }}
          >
            <span className="font-fanwood text-text-primary">some video</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Frame5;
