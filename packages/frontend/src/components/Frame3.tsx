import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import scrubDemoSrc from "../../styles/assets/2d/videos/scrubDemo.mp4";
import {
  COLOR_FRAME3_GREEN,
  COLOR_FRAME3_TAN,
  FRAME3_CONTAINER_HEIGHT,
  FRAME3_RECT_INITIAL_HEIGHT,
  FRAME3_RECT_INITIAL_INSET,
  FRAME3_RECT_TARGET_HEIGHT,
  FRAME3_RECT_TARGET_INSET,
} from "../theme";

gsap.registerPlugin(ScrollTrigger);

const Frame3 = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const rect = rectRef.current;
    const video = videoRef.current;
    if (!wrapper || !rect || !video) return;

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
      const setLastFrame = () => {
        video.currentTime = video.duration;
      };
      if (video.readyState >= 1) {
        setLastFrame();
      } else {
        video.addEventListener("loadedmetadata", setLastFrame, { once: true });
      }
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          if (video.duration) video.currentTime = self.progress * video.duration;
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
      },
      0,
    )
      // Linger: hold final state while user continues scrolling
      .to({}, { duration: 2 });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={wrapperRef}
      className="relative w-full bg-bg-warm"
      style={{ height: FRAME3_CONTAINER_HEIGHT }}
    >
      <div className="sticky top-0 h-screen w-full">
        <div
          ref={rectRef}
          className="absolute rounded-2xl border border-border-warm overflow-hidden"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            left: FRAME3_RECT_INITIAL_INSET,
            right: FRAME3_RECT_INITIAL_INSET,
            height: FRAME3_RECT_INITIAL_HEIGHT,
            backgroundColor: COLOR_FRAME3_TAN,
          }}
        >
          <video
            ref={videoRef}
            src={scrubDemoSrc}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            playsInline
            preload="auto"
          />
        </div>
      </div>
    </section>
  );
};

export default Frame3;
