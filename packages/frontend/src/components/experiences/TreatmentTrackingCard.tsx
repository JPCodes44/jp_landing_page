const TREATMENTS = [
  { date: "Mar 12", area: "Forehead", units: "20u", provider: "Dr. Patel", next: "Jun 12" },
  { date: "Mar 12", area: "Crow's Feet", units: "12u", provider: "Dr. Patel", next: "Jun 12" },
  { date: "Feb 28", area: "Full Face", units: "—", provider: "Amy R.", next: "Mar 28" },
  { date: "Feb 14", area: "Nasolabial", units: "1mL", provider: "Dr. Patel", next: "Aug 14" },
];

export const TreatmentTrackingCard = () => (
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
    {/* Left - Before/After */}
    <div
      style={{
        flex: "0 0 30%",
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
          }}
        >
          Photo Progress
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.4rem",
            flex: 1,
          }}
        >
          <div
            style={{
              flex: 1,
              backgroundColor: "#e8e5df",
              borderRadius: "0.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "0.2rem",
            }}
          >
            <span style={{ fontSize: "1rem", opacity: 0.3 }}>◐</span>
            <span style={{ fontSize: "0.35rem", color: "#888" }}>Before</span>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "#e8e5df",
              borderRadius: "0.25rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "0.2rem",
            }}
          >
            <span style={{ fontSize: "1rem", opacity: 0.3 }}>◑</span>
            <span style={{ fontSize: "0.35rem", color: "#888" }}>After</span>
          </div>
        </div>
        <div
          style={{
            marginTop: "0.4rem",
            fontSize: "0.4rem",
            color: "#666",
            textAlign: "center",
          }}
        >
          AI-aligned comparison — consistent lighting & angle
        </div>
      </div>
    </div>

    {/* Right - Treatment Log */}
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
          <span>Treatment History — Sarah M.</span>
          <span style={{ fontWeight: 400, fontSize: "0.4rem", color: "#888" }}>Client #4821</span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3rem 1fr 2.5rem 3.5rem 3rem",
            gap: "0.15rem",
            fontSize: "0.45rem",
          }}
        >
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Date</div>
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Area</div>
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Units</div>
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Provider</div>
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Next</div>
          {TREATMENTS.map((t) => (
            <>
              <div
                key={`${t.date}-${t.area}-d`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {t.date}
              </div>
              <div
                key={`${t.date}-${t.area}-a`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {t.area}
              </div>
              <div
                key={`${t.date}-${t.area}-u`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {t.units}
              </div>
              <div
                key={`${t.date}-${t.area}-p`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {t.provider}
              </div>
              <div
                key={`${t.date}-${t.area}-n`}
                style={{
                  padding: "0.25rem 0",
                  borderTop: "1px solid #eee",
                  color: "#4a7c59",
                  fontWeight: 600,
                }}
              >
                {t.next}
              </div>
            </>
          ))}
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
            }}
          >
            Log Treatment
          </div>
          <div
            style={{
              border: "1px solid #d4d0c8",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.25rem",
              fontSize: "0.4rem",
            }}
          >
            Upload Photos
          </div>
        </div>
      </div>
    </div>
  </div>
);
