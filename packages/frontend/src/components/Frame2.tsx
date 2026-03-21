import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import bellImg from "../../styles/assets/2d/visuals/bell.png";
import calendarImg from "../../styles/assets/2d/visuals/calendar.png";
import sliderImg from "../../styles/assets/2d/visuals/slider.png";
import tasksImg from "../../styles/assets/2d/visuals/tasks.png";
import temperatureImg from "../../styles/assets/2d/visuals/temperature.png";
import workflowImg from "../../styles/assets/2d/visuals/workflow.png";
import { useBreakpoint } from "../hooks/useBreakpoint";
import {
  FRAME2_HEADING_INITIAL_OPACITY,
  LINE_HEIGHT_HEADING,
  PARA_MARGIN_TOP_SM,
  PARA_MAX_WIDTH,
} from "../theme";

gsap.registerPlugin(ScrollTrigger);

const icons = [
  { src: sliderImg, alt: "slider" },
  { src: temperatureImg, alt: "temperature" },
  { src: workflowImg, alt: "workflow" },
  { src: bellImg, alt: "bell" },
  { src: calendarImg, alt: "calendar" },
  { src: tasksImg, alt: "tasks" },
];

const ICON_FROM_Y = "10rem";
const ICON_STAGGER = 0.08;
const ICON_DURATION = 0.6;
const ICON_EASE = "power3.out";

const Frame2 = () => {
  const bp = useBreakpoint();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const iconRefs = useRef<(HTMLImageElement | null)[]>([]);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const paragraph = paragraphRef.current;
    const track = marqueeTrackRef.current;

    if (!section || !heading || !paragraph) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mql = window.matchMedia("(max-width: 767px)");

    let marqueeTween: gsap.core.Tween | null = null;
    let desktopTl: gsap.core.Timeline | null = null;
    let mobileTl: gsap.core.Timeline | null = null;
    let mobileParallax: gsap.core.Tween | null = null;

    const initMobile = () => {
      gsap.set(heading, { opacity: 0.1, y: "2rem" });
      gsap.set(paragraph, { opacity: 0.1, y: "2rem" });

      if (!prefersReducedMotion) {
        mobileTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top 66%",
            end: "top 20%",
            scrub: 1.5,
          },
        });
        mobileTl.to(heading, { opacity: 1, y: 0, ease: "power2.out", duration: 1 }, 0);
        mobileTl.to(paragraph, { opacity: 1, y: 0, ease: "power2.out", duration: 1 }, 0.2);
      } else {
        gsap.set(heading, { opacity: 1, y: 0 });
        gsap.set(paragraph, { opacity: 1, y: 0 });
      }

      // Parallax on the content container — independent from entrance y on individual elements
      const content = contentRef.current;
      if (content && !prefersReducedMotion) {
        mobileParallax = gsap.fromTo(
          content,
          { y: 30 },
          {
            y: -30,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          },
        );
      }

      if (!track || prefersReducedMotion) return;
      marqueeTween = gsap.fromTo(
        track,
        { x: 0 },
        { x: "-50%", duration: 18, ease: "none", repeat: -1 },
      );
    };

    const initDesktop = () => {
      gsap.set(heading, { opacity: FRAME2_HEADING_INITIAL_OPACITY, y: 0 });
      gsap.set(paragraph, { opacity: 0, y: "2rem" });

      const iconEls = iconRefs.current.filter(Boolean) as HTMLImageElement[];
      if (iconEls.length === 0) return;

      if (prefersReducedMotion) {
        gsap.set(heading, { opacity: 1 });
        gsap.set(paragraph, { opacity: 1, y: 0 });
        for (const el of iconEls) gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      desktopTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "top -10%",
          scrub: 1,
        },
      });

      const rotations = [66, -66, 66, -66, 66, -66];
      desktopTl.fromTo(
        iconEls,
        {
          opacity: 0,
          y: ICON_FROM_Y,
          rotation: (i: number) => rotations[i],
          transformOrigin: "50% 100%",
        },
        {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: ICON_DURATION,
          ease: ICON_EASE,
          stagger: { each: ICON_STAGGER, from: "start" },
        },
        0,
      );
      desktopTl.fromTo(
        heading,
        { opacity: FRAME2_HEADING_INITIAL_OPACITY },
        { opacity: 1, duration: 1, ease: "power2.out" },
        0.3,
      );
      desktopTl.fromTo(
        paragraph,
        { opacity: 0, y: "2rem" },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
        0.3,
      );
    };

    const killAll = () => {
      marqueeTween?.kill();
      marqueeTween = null;
      mobileTl?.scrollTrigger?.kill();
      mobileTl?.kill();
      mobileTl = null;
      mobileParallax?.scrollTrigger?.kill();
      mobileParallax?.kill();
      mobileParallax = null;
      desktopTl?.scrollTrigger?.kill();
      desktopTl?.kill();
      desktopTl = null;
    };

    const handleBreakpoint = (e: MediaQueryListEvent | { matches: boolean }) => {
      killAll();
      if (e.matches) initMobile();
      else initDesktop();
    };

    // Init on mount
    handleBreakpoint({ matches: mql.matches });

    mql.addEventListener("change", handleBreakpoint);
    return () => {
      mql.removeEventListener("change", handleBreakpoint);
      killAll();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        paddingTop: "var(--frame2-section-padding-top)",
        paddingBottom: "var(--frame2-section-padding-bottom)",
        paddingLeft: "var(--frame2-section-padding-x)",
        paddingRight: "var(--frame2-section-padding-x)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: bp === "mobile" ? "-170vh" : "-6vh",
          left: 0,
          right: 0,
          height: bp === "mobile" ? "calc(100% + 100vh)" : "calc(100% + 100vh)",
          backgroundImage:
            bp === "mobile"
              ? "url('./styles/assets/2d/backgrounds/image_frame2.png')"
              : "url('./styles/assets/2d/backgrounds/grid.png')",
          backgroundSize: bp === "mobile" ? "150% auto" : "100% auto",
          backgroundPosition: "center 200%",
          backgroundRepeat: "no-repeat",
          opacity: 0.1,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('./styles/assets/2d/backgrounds/image.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.6,
          pointerEvents: "none",
        }}
      />
      <div className="frame2-layout">
        <div ref={contentRef} className="frame2-left">
          <h2
            ref={headingRef}
            style={{
              fontFamily: '"Fanwood Text", serif',
              fontWeight: 400,
              color: "#2d2d2d",
              margin: 0,
              fontSize: "var(--frame2-h2-size)",
              lineHeight: LINE_HEIGHT_HEADING,
              opacity: FRAME2_HEADING_INITIAL_OPACITY,
            }}
          >
            What I do:
          </h2>
          <div style={{ marginLeft: "var(--frame2-desc-indent)" }}>
            <div className="frame2-subtext">
              <p
                ref={paragraphRef}
                style={{
                  fontFamily: '"Fanwood Text", serif',
                  fontWeight: 400,
                  color: "#2d2d2d",
                  marginBottom: 0,
                  paddingRight: "var(--frame2-padding-right)",
                  fontSize: "var(--frame2-body-size)",
                  lineHeight: "var(--frame2-body-lh)",
                  maxWidth: PARA_MAX_WIDTH,
                  marginTop: PARA_MARGIN_TOP_SM,
                  opacity: 0,
                }}
              >
                I specialize in creating &ldquo;
                <span style={{ color: "#7a8b5c" }}>agentic</span>&rdquo; workflows. That means your
                business doesn&rsquo;t just have tools; it has autonomous systems that handle lead
                gen, reporting, and customer care without you lifting a finger.
              </p>
            </div>
          </div>

          {/* Mobile marquee — hidden on desktop via CSS */}
          <div className="frame2-marquee-outer">
            <div ref={marqueeTrackRef} className="frame2-marquee-track">
              {[...icons, ...icons].map((icon, i) => (
                <img
                  // biome-ignore lint/suspicious/noArrayIndexKey: intentional duplicate for seamless loop
                  key={i}
                  src={icon.src}
                  alt={icon.alt}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Desktop icon grid — hidden on mobile via CSS */}
        <div className="frame2-icon-container">
          {icons.map((icon, i) => (
            <img
              key={icon.alt}
              ref={(el) => {
                iconRefs.current[i] = el;
              }}
              src={icon.src}
              alt={icon.alt}
              style={{ opacity: 0 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Frame2;
