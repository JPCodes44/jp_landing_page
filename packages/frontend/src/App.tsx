import { useState } from "react";
import Footer from "./components/Footer";
import Frame1 from "./components/Frame1";
import Frame2 from "./components/Frame2";
import Frame3 from "./components/Frame3";
import Frame4 from "./components/Frame4";
import Frame5 from "./components/Frame5";
import Frame6 from "./components/Frame6";
import { useIsMobile } from "./hooks/useIsMobile";
import {
  FONT_SIZE_LOGO,
  FONT_SIZE_NAV_LINK,
  MOBILE_NAVBAR_PADDING_X,
  NAVBAR_BACKDROP_BLUR,
  NAVBAR_BACKDROP_SATURATE,
  NAVBAR_BORDER,
  NAVBAR_BOX_SHADOW,
  NAVBAR_HEIGHT,
  NAVBAR_PADDING_X,
} from "./theme";

const NAV_LINKS = [
  { href: "#services", label: "services" },
  { href: "#contact", label: "contact" },
  { href: "#experience", label: "experiences" },
  { href: "#about", label: "about" },
];

const App = () => {
  const isMobile = useIsMobile();
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="bg-bg-warm">
      <main>
        <nav
          id="main-nav"
          className="sticky top-0 z-50 flex items-center justify-between"
          style={{
            height: NAVBAR_HEIGHT,
            paddingLeft: isMobile ? MOBILE_NAVBAR_PADDING_X : NAVBAR_PADDING_X,
            paddingRight: isMobile ? MOBILE_NAVBAR_PADDING_X : NAVBAR_PADDING_X,
            backdropFilter: `${NAVBAR_BACKDROP_BLUR} ${NAVBAR_BACKDROP_SATURATE}`,
            WebkitBackdropFilter: `${NAVBAR_BACKDROP_BLUR} ${NAVBAR_BACKDROP_SATURATE}`,
            background: "transparent",
            boxShadow: NAVBAR_BOX_SHADOW,
            borderBottom: NAVBAR_BORDER,
          }}
        >
          <span className="font-fanwood text-text-primary" style={{ fontSize: FONT_SIZE_LOGO }}>
            Justin Mak.
          </span>

          {isMobile ? (
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              className="bg-transparent border-none cursor-pointer text-text-primary p-0"
              aria-label="Open menu"
              style={{ fontSize: "1.8rem", lineHeight: 1 }}
            >
              ≡
            </button>
          ) : (
            <ul className="flex gap-10 list-none m-0 p-0">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="font-fanwood font-normal text-text-primary no-underline hover:opacity-70"
                    style={{ fontSize: FONT_SIZE_NAV_LINK }}
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* Mobile full-screen nav overlay */}
        {isMobile && menuOpen && (
          <div className="fixed inset-0 bg-bg-warm flex flex-col" style={{ zIndex: 60 }}>
            {/* Top row: logo + close button */}
            <div
              className="flex items-center justify-between"
              style={{
                height: NAVBAR_HEIGHT,
                paddingLeft: MOBILE_NAVBAR_PADDING_X,
                paddingRight: MOBILE_NAVBAR_PADDING_X,
                borderBottom: NAVBAR_BORDER,
              }}
            >
              <span className="font-fanwood text-text-primary" style={{ fontSize: FONT_SIZE_LOGO }}>
                Justin Mak.
              </span>
              <button
                type="button"
                onClick={closeMenu}
                className="bg-transparent border-none cursor-pointer text-text-primary p-0"
                aria-label="Close menu"
                style={{ fontSize: "1.8rem", lineHeight: 1 }}
              >
                ×
              </button>
            </div>

            {/* Stacked nav links */}
            <ul className="list-none m-0 p-0 flex flex-col">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href} style={{ borderBottom: NAVBAR_BORDER }}>
                  <a
                    href={href}
                    onClick={closeMenu}
                    className="font-fanwood font-normal text-text-primary no-underline flex items-center"
                    style={{
                      fontSize: FONT_SIZE_NAV_LINK,
                      paddingLeft: MOBILE_NAVBAR_PADDING_X,
                      paddingRight: MOBILE_NAVBAR_PADDING_X,
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
        )}

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
