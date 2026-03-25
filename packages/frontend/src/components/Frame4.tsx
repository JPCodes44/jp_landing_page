import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  ANIM_BUTTON_SCALE_HOVER,
  ANIM_DURATION_ACCORDION_CLOSE,
  ANIM_DURATION_ACCORDION_IN,
  ANIM_DURATION_ACCORDION_OPEN,
  ANIM_DURATION_BUTTON_SCALE,
  ANIM_DURATION_HEADING,
  ANIM_DURATION_ICON_TOGGLE,
  ANIM_SCROLL_END,
  ANIM_SCROLL_START,
  ANIM_Y_ACCORDION,
  ANIM_Y_HEADING,
  FRAME4_SECTION_PADDING_BOTTOM,
  FRAME4_SECTION_PADDING_TOP,
  LINE_THICKNESS,
} from "../theme";

const ITEMS = [
  "Continuous Lead gen",
  "Automated reporting",
  "System Integrations",
  "Agentic internal tools",
];

const SUBITEMS = [
  "I connect your website forms, CRM, inbox, and outreach workflows so new leads are captured, enriched, routed, and followed up with automatically. Instead of opportunities getting lost between email, spreadsheets, and manual handoffs, the system keeps your pipeline moving from first touch to booked call.",
  "I pull data directly from the tools your team already uses — CRMs, spreadsheets, internal trackers, form submissions, and communication platforms like Teams — and turn it into structured reports automatically. That means fewer manual updates, less copy-paste, and less misalignment between what leadership sees and what teams are actually working on.",
  "I connect the platforms your team already uses, including CRMs, spreadsheets, forms, shared inboxes, and tools like Teams, so data and tasks move cleanly between systems. Instead of relying on manual handoffs and copy-paste coordination, your operations become more consistent, trackable, and aligned.",
  "I build internal AI tools that connect to your CRM, knowledge base, spreadsheets, shared documents, and communication tools so your team can retrieve information, draft updates, complete repetitive actions, and stay aligned from one place. Instead of bouncing between systems and relying on tribal knowledge, your team gets operational tools that actually fit how work moves through the business.",
];

const AccordionItem = ({
  item,
  subItem,
  isOpen,
  onToggle,
}: {
  item: string;
  subItem: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const verticalBarRef = useRef<HTMLSpanElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    if (isOpen) {
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: ANIM_DURATION_ACCORDION_OPEN, ease: "power2.out" },
      );
    } else {
      gsap.to(content, {
        height: 0,
        opacity: 0,
        duration: ANIM_DURATION_ACCORDION_CLOSE,
        ease: "power2.in",
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const bar = verticalBarRef.current;
    if (!bar) return;
    gsap.to(bar, {
      scaleY: isOpen ? 0 : 1,
      duration: ANIM_DURATION_ICON_TOGGLE,
      ease: "power2.inOut",
    });
  }, [isOpen]);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const onEnter = () =>
      gsap.to(btn, {
        scale: ANIM_BUTTON_SCALE_HOVER,
        duration: ANIM_DURATION_BUTTON_SCALE,
        ease: "power2.out",
      });
    const onLeave = () =>
      gsap.to(btn, { scale: 1, duration: ANIM_DURATION_BUTTON_SCALE, ease: "power2.out" });
    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    const label = labelRef.current;
    if (!label) return;
    const onEnter = () =>
      gsap.to(label, {
        scale: 1.04,
        duration: 0.25,
        ease: "power2.out",
        transformOrigin: "left center",
      });
    const onLeave = () => gsap.to(label, { scale: 1, duration: 0.25, ease: "power2.out" });
    label.addEventListener("mouseenter", onEnter);
    label.addEventListener("mouseleave", onLeave);
    return () => {
      label.removeEventListener("mouseenter", onEnter);
      label.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "2px solid #d4d0c8",
          paddingTop: "var(--accordion-padding-y)",
          paddingBottom: "var(--accordion-padding-y)",
          paddingLeft: "var(--accordion-item-pl)",
          paddingRight: "var(--accordion-item-pr)",
        }}
      >
        <span
          ref={labelRef}
          style={{
            fontFamily: '"Fanwood Text", serif',
            color: "#2d2d2d",
            fontSize: "var(--accordion-item-size)",
            cursor: "default",
          }}
        >
          {item}
        </span>
        <button
          ref={btnRef}
          type="button"
          onClick={onToggle}
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            background: "transparent",
            border: "none",
            padding: 0,
            width: "var(--accordion-button-size)",
            height: "var(--accordion-button-size)",
          }}
          aria-expanded={isOpen}
          aria-label={isOpen ? "collapse" : "expand"}
        >
          <span
            style={{
              position: "absolute",
              backgroundColor: "#2d2d2d",
              width: "100%",
              height: LINE_THICKNESS,
            }}
          />
          <span
            ref={verticalBarRef}
            style={{
              position: "absolute",
              backgroundColor: "#2d2d2d",
              width: LINE_THICKNESS,
              height: "100%",
            }}
          />
        </button>
      </div>
      <div
        ref={contentRef}
        style={{
          overflow: "hidden",
          height: 0,
          opacity: 0,
          paddingLeft: "var(--accordion-content-pl)",
        }}
      >
        <p
          style={{
            fontFamily: '"Fanwood Text", serif',
            color: "#2d2d2d",
            lineHeight: "var(--accordion-content-lh)",
            fontSize: "var(--accordion-content-size)",
            paddingLeft: "var(--accordion-content-px)",
            paddingRight: "var(--accordion-content-pr)",
            paddingTop: "var(--accordion-content-pt)",
            paddingBottom: "var(--accordion-content-py)",
          }}
        >
          {subItem}
        </p>
      </div>
    </div>
  );
};

const Frame4 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const heading = headingRef.current;
    const accordion = accordionRef.current;
    const section = sectionRef.current;
    if (!heading || !accordion || !section) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(heading, { opacity: 1, y: 0 });
      gsap.set(accordion, { opacity: 1 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: ANIM_SCROLL_START,
        end: ANIM_SCROLL_END,
        scrub: false,
      },
    });

    tl.fromTo(
      heading,
      { opacity: 0, y: ANIM_Y_HEADING },
      { opacity: 1, y: 0, ease: "power2.out", duration: ANIM_DURATION_HEADING },
    ).fromTo(
      accordion,
      { opacity: 0, y: ANIM_Y_ACCORDION },
      { opacity: 1, y: 0, ease: "power2.out", duration: ANIM_DURATION_ACCORDION_IN },
      "-=0.4",
    );

    // Parallax — independent y scroll, same as contact form
    const headingParallax = gsap.fromTo(
      heading,
      { y: 25 },
      {
        y: -25,
        ease: "none",
        immediateRender: false,
        scrollTrigger: {
          trigger: heading,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      },
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      headingParallax.scrollTrigger?.kill();
      headingParallax.kill();
    };
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      ref={sectionRef}
      className="frame-bg"
      style={{
        width: "100%",
        position: "relative",
        isolation: "isolate",
        paddingLeft: "var(--frame4-section-padding-x)",
        paddingRight: "var(--frame4-section-padding-x)",
        paddingTop: FRAME4_SECTION_PADDING_TOP,
        paddingBottom: FRAME4_SECTION_PADDING_BOTTOM,
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
          opacity: 0.3,
          zIndex: -1,
          pointerEvents: "none",
        }}
      />
      <h2
        ref={headingRef}
        style={{
          fontFamily: '"Fanwood Text", serif',
          lineHeight: 1,
          color: "#2d2d2d",
          opacity: 0,
          fontSize: "var(--frame4-heading-size)",
        }}
      >
        Comprehensive Solutions:
      </h2>
      <div
        ref={accordionRef}
        style={{
          opacity: 0,
          marginTop: "var(--accordion-margin-top)",
          marginLeft: "var(--accordion-wrapper-mx)",
          marginRight: "var(--accordion-wrapper-mx)",
          paddingLeft: "var(--accordion-wrapper-px)",
          paddingRight: "var(--accordion-wrapper-px)",
        }}
      >
        {ITEMS.map((item, i) => (
          <AccordionItem
            key={item}
            item={item}
            subItem={SUBITEMS[i]}
            isOpen={openIndex === i}
            onToggle={() => handleToggle(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Frame4;
