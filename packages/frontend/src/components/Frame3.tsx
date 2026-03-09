import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const Frame3 = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const rectRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const rect = rectRef.current;
    const label = labelRef.current;
    if (!wrapper || !rect || !label) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set(rect, { height: "96vh", left: "2%", right: "2%", backgroundColor: "#c2f0c2" });
      gsap.set(label, { opacity: 1 });
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

    tl.to(
      rect,
      {
        height: "96vh",
        left: "2%",
        right: "2%",
        backgroundColor: "#c2f0c2",
        ease: "none",
        duration: 1,
      },
      0,
    ).fromTo(label, { opacity: 0 }, { opacity: 1, ease: "none", duration: 0.2 }, 0.8);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section ref={wrapperRef} className="relative w-full bg-bg-warm " style={{ height: "300vh" }}>
      <div className="sticky top-0 h-screen w-full">
        <div
          ref={rectRef}
          className="absolute rounded-2xl border border-border-warm overflow-hidden"
          style={{
            top: "50%",
            transform: "translateY(-50%)",
            left: "10%",
            right: "10%",
            height: "48vh",
            backgroundColor: "#dedad5",
          }}
        >
          <div
            ref={labelRef}
            className="flex items-center justify-center h-full font-fanwood text-[2rem] text-text-primary"
            style={{ opacity: 0 }}
          >
            SOME COOL VISUAL WOAW
          </div>
        </div>
      </div>
    </section>
  );
};

export default Frame3;
