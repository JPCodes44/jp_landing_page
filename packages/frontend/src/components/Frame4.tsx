import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

const ITEMS = ["Continuous Lead gen", "Automated reporting", "Agentic internal tools"];

const Frame4 = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const accordionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wrapper = wrapperRef.current;
    const heading = headingRef.current;
    const accordion = accordionRef.current;
    if (!wrapper || !heading || !accordion) return;

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
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });

    tl.fromTo(
      heading,
      { opacity: 0, y: "40vh" },
      { opacity: 1, y: 0, ease: "none", duration: 0.7 },
      0,
    ).fromTo(accordion, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.3 }, 0.7);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={wrapperRef} className="relative w-full bg-bg-warm" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen w-full px-[3.75rem] flex flex-col justify-center">
        <h2
          ref={headingRef}
          className="font-fanwood text-[8rem] leading-none text-text-primary"
          style={{ opacity: 0 }}
        >
          Comprehensive Solutions:
        </h2>
        <div ref={accordionRef} className="mt-[2rem]" style={{ opacity: 0 }}>
          {ITEMS.map((item) => (
            <div
              key={item}
              className="flex items-center justify-between border-t border-border-warm py-[1rem]"
            >
              <span className="font-fanwood text-[1.8rem] text-text-primary">{item}</span>
              <span className="font-fanwood text-[1.8rem] text-text-primary">+</span>
            </div>
          ))}
          <div className="border-t border-border-warm" />
        </div>
      </div>
    </section>
  );
};

export default Frame4;
