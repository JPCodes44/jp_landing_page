import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect, useRef, useState } from "react";
import Footer from "./components/Footer";
import Frame1 from "./components/Frame1";
import Frame2 from "./components/Frame2";
import Frame3 from "./components/Frame3";
import Frame4 from "./components/Frame4";
import Frame5 from "./components/Frame5";
import Frame6 from "./components/Frame6";
import {
  FONT_SIZE_LOGO,
  FONT_SIZE_NAV_LINK,
  NAVBAR_BACKDROP_BLUR,
  NAVBAR_BACKDROP_SATURATE,
  NAVBAR_BORDER,
  NAVBAR_BOX_SHADOW,
  NAVBAR_HEIGHT,
} from "./theme";

const NAV_LINKS = [
  { href: "#services", label: "services" },
  { href: "#contact", label: "contact" },
  { href: "#experience", label: "experiences" },
  { href: "#about", label: "about" },
];

// Bar dimensions — tweak here to adjust icon appearance
const BAR_WIDTH = "1.8rem";
const BAR_HEIGHT = "2px";
const BAR_GAP = "8px";
// Distance (px) from bar1/bar3 center to the container's center line
// = bar height (2px) + gap (8px) = 10px
const BAR_Y_OFFSET = 10;

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoveredHref, setHoveredHref] = useState<string | null>(null);
  const bar1Ref = useRef<HTMLSpanElement>(null);
  const bar2Ref = useRef<HTMLSpanElement>(null);
  const bar3Ref = useRef<HTMLSpanElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (overlayRef.current) {
      gsap.set(overlayRef.current, {
        scaleY: 0,
        opacity: 0,
        pointerEvents: "none",
        transformOrigin: "top",
      });
    }
  }, []);

  // Smooth scroll with Lenis — lerps scroll position for fluid motion
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true,
    });

    // Expose for programmatic scrolling in other components
    window.__lenis = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      window.__lenis = undefined;
      lenis.destroy();
    };
  }, []);

  const toggleMenu = () => {
    const b1 = bar1Ref.current;
    const b2 = bar2Ref.current;
    const b3 = bar3Ref.current;
    if (!b1 || !b2 || !b3) return;

    const opening = !menuOpen;

    const overlay = overlayRef.current;

    if (opening) {
      gsap.to(b1, { rotation: 45, y: BAR_Y_OFFSET, duration: 0.35, ease: "power2.inOut" });
      gsap.to(b2, { scaleX: 0, opacity: 0, duration: 0.2, ease: "power2.in" });
      gsap.to(b3, { rotation: -45, y: -BAR_Y_OFFSET, duration: 0.35, ease: "power2.inOut" });
      if (overlay) {
        gsap.set(overlay, { pointerEvents: "auto" });
        gsap.to(overlay, {
          scaleY: 1,
          opacity: 1,
          duration: 0.45,
          ease: "power3.out",
          transformOrigin: "top",
        });
      }
    } else {
      gsap.to(b1, { rotation: 0, y: 0, duration: 0.35, ease: "power2.inOut" });
      gsap.to(b2, { scaleX: 1, opacity: 1, duration: 0.2, delay: 0.15, ease: "power2.out" });
      gsap.to(b3, { rotation: 0, y: 0, duration: 0.35, ease: "power2.inOut" });
      if (overlay) {
        gsap.to(overlay, {
          scaleY: 0,
          opacity: 0,
          duration: 0.35,
          ease: "power3.in",
          transformOrigin: "top",
          onComplete: () => {
            gsap.set(overlay, { pointerEvents: "none" });
          },
        });
      }
    }

    setMenuOpen(opening);
  };

  const barStyle: React.CSSProperties = {
    display: "block",
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    backgroundColor: "#1a1a1a",
    transformOrigin: "center",
  };

  return (
    <div>
      <main>
        <nav
          id="main-nav"
          style={{
            position: "sticky",
            top: 0,
            // Always above the overlay so the hamburger button remains clickable
            zIndex: 70,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: NAVBAR_HEIGHT,
            paddingLeft: "var(--nav-padding-x)",
            paddingRight: "var(--nav-padding-x)",
            backdropFilter: `${NAVBAR_BACKDROP_BLUR} ${NAVBAR_BACKDROP_SATURATE}`,
            WebkitBackdropFilter: `${NAVBAR_BACKDROP_BLUR} ${NAVBAR_BACKDROP_SATURATE}`,
            background: "transparent",
            boxShadow: NAVBAR_BOX_SHADOW,
            borderBottom: NAVBAR_BORDER,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: '"Fanwood Text", serif',
              color: "#2d2d2d",
              fontSize: FONT_SIZE_LOGO,
              pointerEvents: "auto",
            }}
          >
            Justin Mak.
          </span>

          {/* Hamburger / X — visible on mobile only, stays above overlay */}
          <button
            type="button"
            onClick={toggleMenu}
            className="nav-hamburger"
            style={{
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              gap: BAR_GAP,
              justifyContent: "center",
              pointerEvents: "auto",
            }}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            <span ref={bar1Ref} style={barStyle} />
            <span ref={bar2Ref} style={barStyle} />
            <span ref={bar3Ref} style={barStyle} />
          </button>

          {/* Nav links — visible on desktop only */}
          <ul
            className="nav-links"
            style={{
              gap: "2.5rem",
              listStyle: "none",
              margin: 0,
              padding: 0,
              pointerEvents: "auto",
            }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  onMouseEnter={() => setHoveredHref(href)}
                  onMouseLeave={() => setHoveredHref(null)}
                  style={{
                    fontFamily: '"Fanwood Text", serif',
                    fontWeight: 400,
                    color: "#2d2d2d",
                    textDecoration: "none",
                    fontSize: FONT_SIZE_NAV_LINK,
                    opacity: hoveredHref === href ? 0.7 : 1,
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Mobile full-screen nav overlay */}
        <div
          ref={overlayRef}
          className="nav-mobile-overlay"
          style={{
            position: "fixed",
            top: NAVBAR_HEIGHT,
            left: 0,
            right: 0,
            backgroundColor: "#fefefe",
            flexDirection: "column",
            zIndex: 60,
          }}
        >
          {/* Stacked nav links */}
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {NAV_LINKS.map(({ href, label }) => (
              <li key={href} style={{ borderBottom: NAVBAR_BORDER }}>
                <a
                  href={href}
                  onClick={toggleMenu}
                  style={{
                    fontFamily: '"Fanwood Text", serif',
                    fontWeight: 400,
                    color: "#2d2d2d",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    fontSize: FONT_SIZE_NAV_LINK,
                    paddingLeft: "var(--nav-padding-x)",
                    paddingRight: "var(--nav-padding-x)",
                    paddingTop: "1.25rem",
                    paddingBottom: "1.25rem",
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <Frame1 />
        <Frame2 />
        <Frame3 />
        <Frame4 />
        <Frame5 />
        <Frame6 />
        <Footer />
      </main>
    </div>
  );
};

export default App;
