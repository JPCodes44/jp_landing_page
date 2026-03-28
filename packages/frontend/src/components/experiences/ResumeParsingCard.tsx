const PARSED_FIELDS = [
  { field: "Full Name", value: "Alexander Wright", confidence: "99%" },
  { field: "Current Role", value: "Senior Frontend Engineer", confidence: "98%" },
  { field: "Experience", value: "8+ Years (React, TS, Node)", confidence: "95%" },
  { field: "Education", value: "B.Sc. Computer Science", confidence: "99%" },
  { field: "Location", value: "Toronto, ON (Remote)", confidence: "92%" },
];

const SKILLS_EXTRACTED = [
  "React",
  "TypeScript",
  "GSAP",
  "Tailwind CSS",
  "Node.js",
  "GraphQL",
  "AWS",
  "Vitest",
];

export const ResumeParsingCard = () => (
  <div
    style={{
      backgroundColor: "#1a1a1a",
      borderRadius: "var(--exp-card-image-radius)",
      aspectRatio: "16 / 10",
      width: "100%",
      overflow: "hidden",
      display: "flex",
      padding: "1rem",
      gap: "0.75rem",
      fontFamily: '"Satoshi", sans-serif',
      color: "#e0e0e0",
      fontSize: "0.55rem",
    }}
  >
    {/* Left - Resume Preview Placeholder */}
    <div
      style={{
        flex: "0 0 40%",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "0.375rem",
          padding: "0.8rem",
          color: "#2d2d2d",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          boxShadow: "0 4px 6px rgba(0,0,0,0.3)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ fontSize: "0.8rem", fontWeight: 700, marginBottom: "0.4rem" }}>
          Alexander Wright
        </div>
        <div style={{ fontSize: "0.5rem", color: "#666", marginBottom: "0.6rem" }}>
          alex.wright@example.com | +1 (416) 555-0123
        </div>

        <div style={{ fontWeight: 700, fontSize: "0.55rem", marginBottom: "0.3rem" }}>
          EXPERIENCE
        </div>
        <div style={{ fontSize: "0.45rem", marginBottom: "0.4rem" }}>
          <div style={{ fontWeight: 600 }}>Senior Developer — TechFlow Solutions</div>
          <div>2020 – Present</div>
          <div style={{ marginTop: "0.2rem", color: "#444" }}>
            • Led the migration of legacy systems to modern React architecture...
          </div>
          <div style={{ color: "#444" }}>
            • Mentored 5+ junior developers and established CI/CD best practices...
          </div>
        </div>

        {/* Scanning Overlay Effect */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: 0,
            right: 0,
            height: "2px",
            backgroundColor: "rgba(74, 124, 89, 0.5)",
            boxShadow: "0 0 8px #4a7c59",
            zIndex: 1,
          }}
        />
      </div>
    </div>

    {/* Right - AI Extraction Result */}
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#f5f5f0",
          borderRadius: "0.375rem",
          padding: "0.6rem",
          color: "#2d2d2d",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            fontWeight: 700,
            fontSize: "0.6rem",
            marginBottom: "0.5rem",
            borderBottom: "1px solid #d4d0c8",
            paddingBottom: "0.35rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <span>AI Data Extraction</span>
          <span style={{ color: "#4a7c59" }}>Processing Complete</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.35rem" }}>
          {PARSED_FIELDS.map((f) => (
            <div
              key={f.field}
              style={{
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #eee",
                paddingBottom: "0.2rem",
              }}
            >
              <span style={{ fontWeight: 600, color: "#666" }}>{f.field}:</span>
              <span style={{ color: "#2d2d2d" }}>{f.value}</span>
              <span style={{ fontSize: "0.4rem", color: "#4a7c59" }}>{f.confidence}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "0.8rem" }}>
          <div style={{ fontWeight: 700, fontSize: "0.55rem", marginBottom: "0.3rem" }}>
            SKILLS DETECTED
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}>
            {SKILLS_EXTRACTED.map((skill) => (
              <span
                key={skill}
                style={{
                  backgroundColor: "#e8e5df",
                  padding: "0.15rem 0.4rem",
                  borderRadius: "1rem",
                  fontSize: "0.45rem",
                  border: "1px solid #d4d0c8",
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: "auto",
            paddingTop: "0.4rem",
            display: "flex",
            gap: "0.3rem",
          }}
        >
          <div
            style={{
              backgroundColor: "#4a7c59",
              color: "#fff",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.25rem",
              fontSize: "0.4rem",
              fontWeight: 600,
              flex: 1,
              textAlign: "center",
            }}
          >
            Sync to CRM/ATS
          </div>
        </div>
      </div>
    </div>
  </div>
);
