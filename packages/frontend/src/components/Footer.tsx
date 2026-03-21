import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useBreakpoint } from "../hooks/useBreakpoint";
import { FOOTER_NAME_SIZE } from "../theme";

gsap.registerPlugin(ScrollTrigger);

const desktopAllContacts = [
  { label: "Location:", value: "376 Vogel Place @uwaterloo" },

  { label: "", value: "" },
  { label: "Email:", value: "@j29mak@uwaterloo.ca" },
  { label: "Phone Number:", value: "+1 (905) - 865 - 1230" },
];

const mobileAllContacts = [
  { label: "Email:", value: "@j29mak@uwaterloo.ca" },

  { label: "", value: "" },
  { label: "Location:", value: "376 Vogel Place @uwaterloo" },

  { label: "Phone Number:", value: "+1 (905) - 865 - 1230" },
];

const contactItemStyle: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
};

const labelStyle: React.CSSProperties = {
  color: "#2d2d2d",
  fontSize: "var(--footer-contact-font-size)",
  fontFamily: "fanwood",
  fontWeight: 400,
};

const valueStyle: React.CSSProperties = {
  color: "#2d2d2d",
  fontSize: "var(--footer-contact-font-size)",
  fontFamily: "fanwood text",
  fontWeight: 500,
};

const Footer = () => {
  const bp = useBreakpoint();
  const contactRowRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = contactRowRef.current;
    if (!el) return;

    const st = gsap.fromTo(
      el,
      { y: 40 },
      {
        y: -40,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: 3,
        },
      },
    );

    // Contact item hover (label + value pairs)
    const contactItems = Array.from(el.querySelectorAll<HTMLElement>("[data-contact-item]"));
    const contactHandlers: { el: HTMLElement; enter: () => void; leave: () => void }[] = [];
    for (const item of contactItems) {
      const enter = () =>
        gsap.to(item, {
          scale: 1.04,
          duration: 0.25,
          ease: "power2.out",
          transformOrigin: "left center",
        });
      const leave = () => gsap.to(item, { scale: 1, duration: 0.25, ease: "power2.out" });
      item.addEventListener("mouseenter", enter);
      item.addEventListener("mouseleave", leave);
      contactHandlers.push({ el: item, enter, leave });
    }

    // Justin Mak hover
    const name = nameRef.current;
    const nameEnter = () =>
      gsap.to(name, {
        scale: 1.02,
        duration: 0.4,
        ease: "power2.out",
        transformOrigin: "center bottom",
      });
    const nameLeave = () => gsap.to(name, { scale: 1, duration: 0.4, ease: "power2.out" });
    name?.addEventListener("mouseenter", nameEnter);
    name?.addEventListener("mouseleave", nameLeave);

    return () => {
      if (st.scrollTrigger) st.scrollTrigger.kill();
      st.kill();
      for (const { el: item, enter, leave } of contactHandlers) {
        item.removeEventListener("mouseenter", enter);
        item.removeEventListener("mouseleave", leave);
      }
      name?.removeEventListener("mouseenter", nameEnter);
      name?.removeEventListener("mouseleave", nameLeave);
    };
  }, []);

  return (
    <footer
      style={{
        position: "relative",
        isolation: "isolate",
        width: "100%",
        overflowX: "visible",
        overflowY: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            bp === "mobile"
              ? "url('/styles/assets/2d/backgrounds/image_frame2.png')"
              : "url('/styles/assets/2d/backgrounds/grid.png')",
          backgroundSize: "110% auto",
          backgroundPosition: "center -20%",
          backgroundRepeat: "no-repeat",
          opacity: 0.2,
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
      {/* Contact info row */}
      <div
        ref={contactRowRef}
        style={{
          paddingLeft: "var(--footer-padding-x)",
          paddingRight: "var(--footer-padding-x)",
          paddingTop: "var(--footer-padding-top)",
          paddingBottom: "var(--footer-padding-bottom)",
          display: "flex",
          justifyContent: "var(--footer-outer-justify)" as React.CSSProperties["justifyContent"],
        }}
      >
        {bp === "desktop" ? (
          /* Desktop: all three in a flat row, with dashed border box */
          <div
            style={{
              display: "flex",
              gap: "var(--footer-contact-gap)",
              justifyContent: "center",
            }}
          >
            {desktopAllContacts
              .filter(({ label }) => label !== "")
              .map(({ label, value }) => (
                <div key={label} data-contact-item style={contactItemStyle}>
                  <span style={labelStyle}>{label}</span>
                  <span style={valueStyle}>{value}</span>
                </div>
              ))}
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "auto auto",
                columnGap: "var(--footer-contact-row-gap)",
                rowGap: "var(--footer-contact-gap)",
                width: "fit-content",
              }}
            >
              {mobileAllContacts.map(({ label, value }) => (
                <div key={label} data-contact-item style={contactItemStyle}>
                  <span style={labelStyle}>{label}</span>
                  <span style={valueStyle}>{value}</span>
                </div>
              ))}
            </div>{" "}
          </div>
        )}
      </div>

      {/* Large name — crops at bottom */}
      <div
        ref={nameRef}
        style={{
          width: "100%",
          lineHeight: 0.85,
          userSelect: "none",
          textAlign: "center",
          whiteSpace: "nowrap",
          fontSize: FOOTER_NAME_SIZE,
          fontFamily: "Fanwood Text",
          fontWeight: 500,
          overflow: "hidden",
          color: "#1a1a1a",
          marginBottom: "var(--footer-name-margin-bottom)",
        }}
      >
        Justin Mak
      </div>
    </footer>
  );
};

export default Footer;
