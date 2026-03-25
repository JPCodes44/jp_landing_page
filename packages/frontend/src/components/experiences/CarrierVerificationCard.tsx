const CHECKLIST = [
  "1. PROFILE COMPLETE",
  "2. INSURANCE PLACED",
  "3. SAFETY SYSTEM CHECK",
  "4. CONTRACTOR STATUS",
  "5. VERIFIED",
];

export const CarrierVerificationCard = () => (
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
      fontSize: "0.5rem",
    }}
  >
    {/* Left - Carrier Profile */}
    <div
      style={{
        width: "35%",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          fontSize: "0.4rem",
          color: "#9ca3af",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          fontWeight: 600,
        }}
      >
        Carrier Onboarding Verification
      </div>

      {/* Carrier Profile Card */}
      <div
        style={{
          backgroundColor: "#f5f5f0",
          borderRadius: "0.375rem",
          padding: "0.5rem",
          color: "#2d2d2d",
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "0.375rem",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: "0.45rem", color: "#666" }}>CARRIER PROFILE</div>
        <div
          style={{
            width: "2rem",
            height: "2rem",
            backgroundColor: "#4a7c59",
            borderRadius: "0.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: "0.5rem",
          }}
        >
          &#9733;
        </div>
        <div style={{ fontSize: "0.35rem", color: "#666" }}>MC NUMBER: 12345</div>
        <div style={{ fontSize: "0.35rem", color: "#666" }}>DOT: 987654</div>

        {/* Threshold bars */}
        <div style={{ marginTop: "auto" }}>
          <div style={{ fontSize: "0.35rem", color: "#9ca3af", marginBottom: "0.2rem" }}>
            MINIMUM COVERAGE RATE THRESHOLDS
          </div>
          {[75, 90, 60].map((width) => (
            <div
              key={width}
              style={{
                height: "0.35rem",
                backgroundColor: "#e8e5e0",
                borderRadius: "0.125rem",
                marginBottom: "0.15rem",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${width}%`,
                  backgroundColor: "#4a7c59",
                  borderRadius: "0.125rem",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Center - Insurance Certificate */}
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
          padding: "0.5rem",
          color: "#2d2d2d",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{ fontWeight: 600, fontSize: "0.45rem", color: "#666", marginBottom: "0.375rem" }}
        >
          INSURANCE CERTIFICATE VIEWER
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: "#e8e5e0",
            borderRadius: "0.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "80%",
              height: "85%",
              backgroundColor: "#fff",
              borderRadius: "0.2rem",
              padding: "0.4rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.2rem",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((line) => (
              <div
                key={line}
                style={{
                  height: "0.3rem",
                  backgroundColor: "#e8e5e0",
                  borderRadius: "0.125rem",
                  width: `${60 + Math.random() * 35}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Expiry monitoring */}
      <div
        style={{
          backgroundColor: "#f5f5f0",
          borderRadius: "0.375rem",
          padding: "0.4rem 0.5rem",
          color: "#2d2d2d",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontSize: "0.35rem", color: "#9ca3af", fontWeight: 600 }}>
          EXPIRY MONITORING CALENDAR
        </span>
        <div style={{ display: "flex", gap: "0.25rem" }}>
          {[
            { day: "S", id: "sun", active: false },
            { day: "M", id: "mon", active: false },
            { day: "T", id: "tue", active: true },
            { day: "W", id: "wed", active: false },
            { day: "T", id: "thu", active: false },
          ].map((d) => (
            <div
              key={d.id}
              style={{
                width: "0.75rem",
                height: "0.75rem",
                borderRadius: "0.125rem",
                backgroundColor: d.active ? "#4a7c59" : "#e8e5e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.3rem",
                color: d.active ? "#fff" : "#666",
              }}
            >
              {d.day}
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Right - Checklist */}
    <div
      style={{
        width: "8rem",
        flexShrink: 0,
        backgroundColor: "#f5f5f0",
        borderRadius: "0.375rem",
        padding: "0.5rem",
        color: "#2d2d2d",
        display: "flex",
        flexDirection: "column",
        gap: "0.375rem",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: "0.4rem", color: "#666" }}>DOCUMENT REVIEW CA</div>
      {CHECKLIST.map((item) => (
        <div
          key={item}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            fontSize: "0.35rem",
          }}
        >
          <div
            style={{
              width: "0.5rem",
              height: "0.5rem",
              borderRadius: "50%",
              backgroundColor: "#4a7c59",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "0.25rem",
              flexShrink: 0,
            }}
          >
            &#10003;
          </div>
          <span>{item}</span>
        </div>
      ))}
    </div>
  </div>
);
