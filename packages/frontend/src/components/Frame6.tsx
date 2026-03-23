import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import { useBreakpoint } from "../hooks/useBreakpoint";
import {
  FRAME6_ARROW_BOB_DURATION,
  FRAME6_ARROW_BOB_Y,
  FRAME6_ARROW_SIZE,
  SECTION_PADDING_BOTTOM_LG,
} from "../theme";

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");
  const formInnerRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const submitTextRef = useRef<HTMLSpanElement>(null);
  const submitCheckRef = useRef<HTMLSpanElement>(null);
  const clickTlRef = useRef<gsap.core.Timeline | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const container = formInnerRef.current;
    const submit = submitRef.current;
    if (!container || !submit) return;

    const inputs = Array.from(container.querySelectorAll<HTMLElement>("input, textarea"));

    // Input hover
    const inputHandlers: { el: HTMLElement; enter: () => void; leave: () => void }[] = [];
    for (const el of inputs) {
      const enter = () =>
        gsap.to(el, {
          y: -3,
          boxShadow: "0px 6px 12px rgba(0,0,0,0.12)",
          duration: 0.25,
          ease: "power2.out",
        });
      const leave = () =>
        gsap.to(el, {
          y: 0,
          boxShadow: "0px 3px 3px rgba(0,0,0,0.15)",
          duration: 0.25,
          ease: "power2.out",
        });
      el.addEventListener("mouseenter", enter);
      el.addEventListener("mouseleave", leave);
      inputHandlers.push({ el, enter, leave });
    }

    // Submit hover
    const submitEnter = () =>
      gsap.to(submit, {
        scale: 1.04,
        backgroundImage: "linear-gradient(135deg, rgba(122,139,92,0.11), rgba(122,139,92,0.04))",
        boxShadow: "0px 6px 14px rgba(0,0,0,0.15)",
        duration: 0.4,
        ease: "power3.out",
      });
    const submitLeave = () =>
      gsap.to(submit, {
        scale: 1,
        backgroundImage: "linear-gradient(135deg, rgba(122,139,92,0), rgba(122,139,92,0))",
        boxShadow: "0px 3px 3px rgba(0,0,0,0.15)",
        duration: 0.4,
        ease: "power3.out",
      });
    const submitClick = () => {
      const text = submitTextRef.current;
      const check = submitCheckRef.current;
      if (!text || !check) return;

      // Kill any in-progress animation and reset state
      clickTlRef.current?.kill();
      gsap.set(text, { opacity: 1, y: 0 });
      gsap.set(check, { color: "#2d2d2d", scale: 1, opacity: 0, y: 0 });
      gsap.set(submit, { scale: 1 });

      const tl = gsap
        .timeline()
        // Press
        .to(submit, { scale: 0.94, duration: 0.1, ease: "power2.in" })
        .to(submit, { scale: 1, duration: 0.18, ease: "power2.out" })
        // "Submit" fades up and out
        .to(text, { opacity: 0, y: -10, duration: 0.2, ease: "power2.in" }, 0.12)
        // Checkmark fades in from below
        .fromTo(
          check,
          { opacity: 0, y: 12, scale: 0.8, color: "#2d2d2d" },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power2.out" },
          0.27,
        )
        // Expand prominently + green
        .to(check, { scale: 1.6, color: "#7aab6e", duration: 0.35, ease: "back.out(2)" }, 0.54)
        // Hold enlarged for a moment (implicit pause via label)
        .addLabel("hold")
        // Settle back to normal size, keep green
        .to(check, { scale: 1.15, duration: 0.25, ease: "power2.inOut" }, "hold+=0.55")
        // Fade checkmark out
        .to(
          check,
          { opacity: 0, y: -8, scale: 1, color: "#2d2d2d", duration: 0.22, ease: "power2.in" },
          "hold+=0.85",
        )
        // "Submit" returns from below
        .fromTo(
          text,
          { opacity: 0, y: 10 },
          { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" },
          "hold+=1.02",
        );
      tl.then(() => {
        clickTlRef.current = null;
      });
      clickTlRef.current = tl;
    };

    // Title hover
    const title = titleRef.current;
    const titleEnter = () =>
      gsap.to(title, {
        y: -3,
        textShadow: "0px 6px 12px rgba(0,0,0,0.12)",
        duration: 0.25,
        ease: "power2.out",
      });
    const titleLeave = () =>
      gsap.to(title, {
        y: 0,
        textShadow: "0px 0px 0px rgba(0,0,0,0)",
        duration: 0.25,
        ease: "power2.out",
      });
    title?.addEventListener("mouseenter", titleEnter);
    title?.addEventListener("mouseleave", titleLeave);

    submit.addEventListener("mouseenter", submitEnter);
    submit.addEventListener("mouseleave", submitLeave);
    submit.addEventListener("click", submitClick);

    return () => {
      for (const { el, enter, leave } of inputHandlers) {
        el.removeEventListener("mouseenter", enter);
        el.removeEventListener("mouseleave", leave);
      }
      title?.removeEventListener("mouseenter", titleEnter);
      title?.removeEventListener("mouseleave", titleLeave);
      submit.removeEventListener("mouseenter", submitEnter);
      submit.removeEventListener("mouseleave", submitLeave);
      submit.removeEventListener("click", submitClick);
    };
  }, []);

  const inputBaseStyle: React.CSSProperties = {
    fontFamily: '"Fanwood Text", serif',
    color: "#2d2d2d",
    backgroundColor: "#fefefe",
    border: "1px solid #2d2d2d",
    width: "100%",
    outline: "none",
  };
  const shadowStyle = { boxShadow: "0px 3px 3px rgba(0,0,0,0.15)" };
  const fieldStyle: React.CSSProperties = {
    fontSize: "var(--frame6-form-input-size)",
    padding: "var(--frame6-form-input-padding)",
    height: "var(--frame6-form-input-height)",
    fontStyle: "italic",
    backgroundColor: "#ffffff",
    ...shadowStyle,
  };
  const labelStyle: React.CSSProperties = {
    fontSize: "var(--frame6-form-label-size)",
    fontFamily: "satoshi",
    color: "#2d2d2d",
  };
  const gapStyle = { gap: "0.5rem" };

  return (
    <div ref={formInnerRef} style={{ padding: "var(--frame6-form-inner-padding)" }}>
      <h3
        ref={titleRef}
        style={{
          color: "#2d2d2d",
          textTransform: "uppercase",
          margin: 0,
          fontSize: "var(--frame6-form-title-size)",
          padding: "var(--frame6-form-title-padding)",
          marginBottom: "2rem",
          letterSpacing: "0.05em",
          fontFamily: "satoshi",
          cursor: "default",
        }}
      >
        Contact Me.
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "var(--frame6-form-field-gap)",
          paddingTop: "var(--frame6-form-fields-pt)",
        }}
      >
        {/* First + Last Name */}
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              ...gapStyle,
              flex: "var(--frame6-firstname-flex)",
            }}
          >
            <label htmlFor="firstName" style={labelStyle}>
              First Name
            </label>
            <input
              id="firstName"
              style={{ ...inputBaseStyle, ...fieldStyle }}
              placeholder="Your first name here.."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              ...gapStyle,
              flex: "var(--frame6-lastname-flex)",
            }}
          >
            <label htmlFor="lastName" style={labelStyle}>
              Last Name
            </label>
            <input
              id="lastName"
              style={{ ...inputBaseStyle, ...fieldStyle }}
              placeholder="Your last name here.."
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            ...gapStyle,
            width: "var(--frame6-email-width)",
          }}
        >
          <label htmlFor="email" style={labelStyle}>
            Email
          </label>
          <input
            id="email"
            type="email"
            style={{ ...inputBaseStyle, ...fieldStyle }}
            placeholder="Your email here.."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Comments */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            ...gapStyle,
            width: "var(--frame6-comments-width)",
          }}
        >
          <label htmlFor="comments" style={labelStyle}>
            Comments
          </label>
          <textarea
            id="comments"
            style={{
              ...inputBaseStyle,
              ...fieldStyle,
              height: "var(--frame6-form-textarea-height)",
              resize: "none",
            }}
            placeholder="Your comments here.."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        {/* Submit */}
        <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: "3rem" }}>
          <button
            ref={submitRef}
            type="button"
            style={{
              color: "#2d2d2d",
              border: "1px solid #2d2d2d",
              background: "transparent",
              cursor: "pointer",
              fontSize: "var(--frame6-submit-font-size)",
              padding: "var(--frame6-submit-padding-y) var(--frame6-submit-padding-x)",
              fontFamily: "satoshi",
              boxShadow: shadowStyle.boxShadow,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <span ref={submitTextRef} style={{ display: "block" }}>
              Submit
            </span>
            <span
              ref={submitCheckRef}
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: 0,
                fontFamily: "satoshi",
                fontSize: "var(--frame6-submit-font-size)",
              }}
            >
              ✓
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Frame6 = () => {
  const bp = useBreakpoint();

  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);
  const ctaGroupRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const arrow = arrowRef.current;
    const ctaGroup = ctaGroupRef.current;
    const spacer = spacerRef.current;
    const formEl = formRef.current;
    if (!section || !heading || !arrow || !ctaGroup || !spacer || !formEl) return;

    // Initial states
    gsap.set(formEl, { opacity: 0.1 });
    gsap.set(spacer, { height: 0 });
    gsap.set([heading, arrow], { opacity: 0.1, y: 40 });

    // Bob tween starts paused — plays after entrance completes
    const bobTween = gsap.to(arrow, {
      y: FRAME6_ARROW_BOB_Y,
      duration: FRAME6_ARROW_BOB_DURATION,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      paused: true,
    });

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set([heading, arrow], { opacity: 1, y: 0 });
      gsap.set(formEl, { opacity: 1 });
      bobTween.play();
      return () => {
        bobTween.kill();
      };
    }

    // Entrance animation — fires once when section is ~33% into viewport
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 5%",
        end: "top -20%",
        scrub: 3,
        onLeave: () => {
          bobTween.play();
        },
        onEnterBack: () => {
          bobTween.pause();
        },
        onLeaveBack: () => {
          bobTween.pause();
        },
      },
    });

    tl.to(heading, { opacity: 1, y: 0, duration: 1, ease: "none" }, 0);
    tl.to(arrow, { opacity: 1, y: 0, duration: 1, ease: "none" }, 0.15);

    // Extended state: arrow center reaches 33% from top
    let hasScrolledToForm = false;
    let scrollTween: gsap.core.Tween | null = null;

    const extendTl = gsap.timeline({
      scrollTrigger: {
        trigger: arrow,
        start: "center 66%",
        end: "+=500",
        scrub: 1,
        onUpdate: (self) => {
          // Arrow opacity tracks scroll position directly (no scrub lag)
          const t = self.progress;
          gsap.set(arrow, { opacity: 1 - t * 0.6 }); // 1 → 0.4
        },
        onEnter: () => {
          if (!hasScrolledToForm) {
            hasScrolledToForm = true;
            scrollTween?.kill();
            const targetY = formEl.getBoundingClientRect().top + window.scrollY;
            const proxy = { scrollY: window.scrollY };
            scrollTween = gsap.to(proxy, {
              scrollY: targetY,
              duration: 0.7,
              ease: "power2.inOut",
              onUpdate: () => {
                window.scrollTo(0, proxy.scrollY);
              },
            });
          }
        },
        onEnterBack: () => {
          hasScrolledToForm = false;
          scrollTween?.kill();
          scrollTween = null;
        },
      },
    });

    extendTl.to(ctaGroup, { y: "-4rem", ease: "power2.inOut", duration: 1 }, 0);
    extendTl.to(spacer, { height: "20vh", ease: "power2.inOut", duration: 1 }, 0);
    extendTl.to(arrow, { rotation: 180, ease: "power2.inOut", duration: 1 }, 0);
    extendTl.to(formEl, { opacity: 1, ease: "power2.inOut", duration: 1 }, 0);
    // Linger: hold expanded state briefly so the animation registers
    extendTl.to({}, { duration: 0.6 });

    // Arrow hover — scale up + submit-button gradient + drop-shadow
    // Shadow Y flips with rotation so it always points downward on screen
    let arrowHovered = false;
    const getShadowY = () => {
      const rot = gsap.getProperty(arrow, "rotation") as number;
      const rad = (rot * Math.PI) / 180;
      return Math.round(6 * Math.cos(rad));
    };
    const arrowEnter = () => {
      arrowHovered = true;
      const y = getShadowY();
      gsap.to(arrow, {
        scale: 1.04,
        backgroundImage: "linear-gradient(135deg, rgba(122,139,92,0.11), rgba(122,139,92,0.04))",
        filter: `drop-shadow(0px ${y}px 7px rgba(0,0,0,0.15))`,
        duration: 0.4,
        ease: "power3.out",
      });
    };
    const arrowLeave = () => {
      arrowHovered = false;
      const y = getShadowY();
      gsap.to(arrow, {
        scale: 1,
        backgroundImage: "linear-gradient(135deg, rgba(122,139,92,0), rgba(122,139,92,0))",
        filter: `drop-shadow(0px ${y}px 7px rgba(0,0,0,0))`,
        duration: 0.4,
        ease: "power3.out",
      });
    };
    // Keep shadow pointing down during rotation if hovered
    extendTl.eventCallback("onUpdate", () => {
      if (arrowHovered) {
        const y = getShadowY();
        gsap.set(arrow, { filter: `drop-shadow(0px ${y}px 7px rgba(0,0,0,0.15))` });
      }
    });
    arrow.addEventListener("mouseenter", arrowEnter);
    arrow.addEventListener("mouseleave", arrowLeave);

    // Arrow click — scroll to expand or collapse via Lenis
    const arrowClick = () => {
      const st = extendTl.scrollTrigger;
      if (!st) return;
      const progress = st.progress;
      const targetScroll =
        progress < 0.5
          ? st.end // expand: scroll to end of trigger
          : st.start - 10; // collapse: scroll just before trigger
      const distance = Math.abs(targetScroll - window.scrollY);
      // ~1s per 500px of scroll, clamped between 0.8s and 2.2s
      const duration = Math.min(2.2, Math.max(0.8, distance / 500));
      const lenis = window.__lenis;
      const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);
      if (lenis) {
        lenis.scrollTo(targetScroll, { duration, easing: easeInOut });
      } else {
        window.scrollTo({ top: targetScroll, behavior: "smooth" });
      }
    };
    arrow.addEventListener("click", arrowClick);

    // Independent subtle vertical parallax on the contact form (y only, no conflict)
    const formParallax = gsap.fromTo(
      formEl,
      { y: 60 },
      {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: formEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5,
        },
      },
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      extendTl.scrollTrigger?.kill();
      extendTl.kill();
      bobTween.kill();
      scrollTween?.kill();
      formParallax.scrollTrigger?.kill();
      formParallax.kill();
      arrow.removeEventListener("mouseenter", arrowEnter);
      arrow.removeEventListener("mouseleave", arrowLeave);
      arrow.removeEventListener("click", arrowClick);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        isolation: "isolate",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "var(--frame6-section-padding-top)",
        paddingBottom: SECTION_PADDING_BOTTOM_LG,
        paddingLeft: "var(--frame6-section-padding-x)",
        paddingRight: "var(--frame6-section-padding-x)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/styles/assets/2d/backgrounds/grid.png')",
          backgroundSize: bp === "mobile" ? "250% auto" : "100% auto",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.1,
          zIndex: -2,
          pointerEvents: "none",
        }}
      />
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
      {/* CTA group: heading + arrow animate together */}
      <div
        ref={ctaGroupRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            paddingLeft: "var(--frame6-cta-padding-x)",
            paddingRight: "var(--frame6-cta-padding-x)",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h2
            ref={headingRef}
            style={{
              fontFamily: '"Fanwood Text", serif',
              fontWeight: 400,
              color: "#2d2d2d",
              textAlign: "center",
              margin: 0,
              fontSize: "var(--frame6-cta-size)",
              lineHeight: "var(--frame6-cta-lh)",
              opacity: 0.1,
            }}
          >
            Ready to stop working for your business and let it work for you?
          </h2>
        </div>

        {/* Arrow centered on the top border of the form rect */}
        <div
          style={{
            position: "relative",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            marginBottom: `calc(-${FRAME6_ARROW_SIZE} / 2)`,
            zIndex: 2,
            paddingTop: "10rem",
          }}
        >
          <div
            ref={arrowRef}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              border: "1px solid #2d2d2d",
              backgroundColor: "#fefefe",
              width: FRAME6_ARROW_SIZE,
              height: FRAME6_ARROW_SIZE,
              opacity: 0.1,
              cursor: "pointer",
            }}
          >
            <svg
              width="1.2rem"
              height="1.2rem"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "#2d2d2d" }}
            >
              <title>Scroll down arrow</title>
              <line x1="12" y1="2" x2="12" y2="19" />
              <polyline points="19 12 12 19 5 12" />
            </svg>
          </div>
        </div>
      </div>

      {/* Spacer that expands in extended state */}
      <div ref={spacerRef} style={{ width: "100%", flexShrink: 0 }} />

      {/* Form with dashed SVG border overlay */}
      <div
        ref={formRef}
        style={{
          position: "relative",
          zIndex: 1,
          backgroundColor: "#ffffff",
          width: "calc(100% - var(--frame6-form-padding-x) * 2)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Dashed border — sits on top, pointer-events off */}
        <svg
          style={{
            position: "absolute",
            inset: 0,
            color: "#2d2d2d",
            pointerEvents: "none",
            width: "100%",
            height: "100%",
            display: "block",
            overflow: "visible",
          }}
        >
          <title>Form border</title>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            pathLength="500"
            strokeDasharray="3 2"
            strokeDashoffset="1.7"
          />
        </svg>

        <ContactForm />
      </div>
    </section>
  );
};

export default Frame6;
