import { useBreakpoint } from "../hooks/useBreakpoint";
import { FOOTER_NAME_SIZE } from "../theme";

const desktopAllContacts = [
  { label: "Location:", value: "Akatos House @uwaterloo" },

  { label: "", value: "" },
  { label: "Email:", value: "@j29mak@uwaterloo.ca" },
  { label: "Phone Number:", value: "+1 (905) - 865 - 1230" },
];

const mobileAllContacts = [
  { label: "Email:", value: "@j29mak@uwaterloo.ca" },

  { label: "", value: "" },
  { label: "Location:", value: "Akatos House @uwaterloo" },

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

  return (
    <footer
      style={{
        position: "relative",
        width: "100%",
        backgroundColor: "#fefefe",
        overflowX: "visible",
        overflowY: "hidden",
      }}
    >
      {/* Contact info row */}
      <div
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
          /* Desktop: all three in a flat row */
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
                <div key={label} style={contactItemStyle}>
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
                gap: "var(--footer-contact-gap)",
                width: "fit-content",
              }}
            >
              {mobileAllContacts.map(({ label, value }) => (
                <div key={label} style={contactItemStyle}>
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
