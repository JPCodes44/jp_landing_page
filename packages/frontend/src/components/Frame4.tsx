import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

const ITEMS = [
  "Continuous Lead gen",
  "Automated reporting",
  "Manual reporting",
  "Agentic internal tools",
];

const AccordionItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: string;
  isOpen: boolean;
  onToggle: () => void;
}) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const verticalBarRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    if (isOpen) {
      gsap.fromTo(
        content,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.35, ease: "power2.out" },
      );
    } else {
      gsap.to(content, { height: 0, opacity: 0, duration: 0.25, ease: "power2.in" });
    }
  }, [isOpen]);

  // Animate vertical bar: scaleY 1 → 0 on open (+ becomes −)
  useEffect(() => {
    const bar = verticalBarRef.current;
    if (!bar) return;
    gsap.to(bar, {
      scaleY: isOpen ? 0 : 1,
      duration: 0.3,
      ease: "power2.inOut",
    });
  }, [isOpen]);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;
    const onEnter = () => gsap.to(btn, { scale: 1.3, duration: 0.2, ease: "power2.out" });
    const onLeave = () => gsap.to(btn, { scale: 1, duration: 0.2, ease: "power2.out" });
    btn.addEventListener("mouseenter", onEnter);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mouseenter", onEnter);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between border-b-2 border-border-warm py-[2.2rem] pl-[4rem] pr-[4.5rem]">
        <span className="font-fanwood text-[3.5rem] text-text-primary">{item}</span>
        <button
          ref={btnRef}
          type="button"
          onClick={onToggle}
          className="relative flex items-center justify-center w-[1.6rem] h-[1.6rem] cursor-pointer bg-transparent border-none p-0"
          aria-expanded={isOpen}
          aria-label={isOpen ? "collapse" : "expand"}
        >
          <span className="absolute w-full h-[0.1rem] bg-text-primary" />
          <span ref={verticalBarRef} className="absolute w-[0.1rem] h-full bg-text-primary" />
        </button>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden pl-[4.5rem]"
        style={{ height: 0, opacity: 0 }}
      >
        <p className="font-fanwood text-[1.9rem] text-text-primary pl-[4rem] pr-[4.5rem] py-[2rem] leading-relaxed">
          More details about {item.toLowerCase()} coming soon.
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
        start: "top 80%",
        end: "top 20%",
        scrub: false,
      },
    });

    tl.fromTo(
      heading,
      { opacity: 0, y: "6rem" },
      { opacity: 1, y: 0, ease: "power2.out", duration: 0.8 },
    ).fromTo(
      accordion,
      { opacity: 0, y: "3rem" },
      { opacity: 1, y: 0, ease: "power2.out", duration: 0.6 },
      "-=0.4",
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section ref={sectionRef} className="w-full bg-bg-warm px-[3.75rem] pt-[24vh] pb-[8vh]">
      <h2
        ref={headingRef}
        className="font-fanwood text-[8rem] leading-none text-text-primary"
        style={{ opacity: 0 }}
      >
        Comprehensive Solutions:
      </h2>
      <div ref={accordionRef} className="mt-[12rem] mx-[2rem] px-[1.5rem]" style={{ opacity: 0 }}>
        {ITEMS.map((item, i) => (
          <AccordionItem
            key={item}
            item={item}
            isOpen={openIndex === i}
            onToggle={() => handleToggle(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default Frame4;
