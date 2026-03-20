import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";
import {
  FRAME6_ARROW_BOB_DURATION,
  FRAME6_ARROW_BOB_Y,
  FRAME6_ARROW_SIZE,
  FRAME6_HEADING_INITIAL_OPACITY,
  SECTION_PADDING_BOTTOM_LG,
} from "../theme";

gsap.registerPlugin(ScrollTrigger);

const ContactForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [comments, setComments] = useState("");

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
    <div style={{ padding: "var(--frame6-form-inner-padding)" }}>
      <h3
        style={{
          color: "#2d2d2d",
          textTransform: "uppercase",
          margin: 0,
          fontSize: "var(--frame6-form-title-size)",
          padding: "var(--frame6-form-title-padding)",
          marginBottom: "2rem",
          letterSpacing: "0.05em",
          fontFamily: "satoshi",
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
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

const Frame6 = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const arrowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const arrow = arrowRef.current;
    if (!section || !heading || !arrow) return;

    const bobTween = gsap.to(arrow, {
      y: FRAME6_ARROW_BOB_Y,
      duration: FRAME6_ARROW_BOB_DURATION,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set([heading, arrow], { opacity: 1 });
      return () => {
        bobTween.kill();
      };
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top -33%",
        scrub: 1,
      },
    });

    tl.fromTo(
      [heading, arrow],
      { opacity: FRAME6_HEADING_INITIAL_OPACITY },
      { opacity: 1, ease: "power2.out", duration: 1 },
      0,
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      bobTween.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#fefefe",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "var(--frame6-section-padding-top)",
        paddingBottom: SECTION_PADDING_BOTTOM_LG,
        paddingLeft: "var(--frame6-section-padding-x)",
        paddingRight: "var(--frame6-section-padding-x)",
      }}
    >
      {/* CTA heading */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
          width: "100%",
          paddingLeft: "var(--frame6-cta-padding-x)",
          paddingRight: "var(--frame6-cta-padding-x)",
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
            opacity: FRAME6_HEADING_INITIAL_OPACITY,
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
          zIndex: 1,
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
            opacity: FRAME6_HEADING_INITIAL_OPACITY,
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
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </div>
      </div>

      {/* Form with dashed SVG border overlay */}
      <div
        style={{
          position: "relative",
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
