const SCREENING_STEPS = [
  { step: "Initial Screen", status: "Complete" },
  { step: "Technical Assessment", status: "Complete" },
  { step: "Cultural Fit Interview", status: "In Progress" },
  { step: "Background Check", status: "Pending" },
  { step: "Reference Verification", status: "Pending" },
];

const CANDIDATES = [
  { name: "John Doe", role: "Software Engineer", source: "LinkedIn", status: "Technical" },
  { name: "Jane Smith", role: "Product Manager", source: "Referral", status: "Final Round" },
  { name: "Mike Johnson", role: "DevOps Engineer", source: "Indeed", status: "Screening" },
  { name: "Emily Brown", role: "UX Designer", source: "Glassdoor", status: "Initial" },
];

const statusColor = (status: string) => {
  if (status === "Complete" || status === "Final Round") return "#4a7c59";
  if (status === "In Progress" || status === "Technical") return "#8b6914";
  return "#666";
};

export const CandidateIntakeCard = () => (
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
    {/* Left - Screening Workflow */}
    <div
      style={{
        flex: "0 0 38%",
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
          Candidate Screening
        </div>
        <div style={{ fontSize: "0.45rem", color: "#666", marginBottom: "0.4rem" }}>
          Candidate: John Doe — Senior Engineer
        </div>
        {SCREENING_STEPS.map((item) => (
          <div
            key={item.step}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.3rem 0",
              borderBottom: "1px solid #eee",
            }}
          >
            <span>{item.step}</span>
            <span
              style={{
                color: statusColor(item.status),
                fontWeight: 600,
                fontSize: "0.45rem",
              }}
            >
              {item.status}
            </span>
          </div>
        ))}
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
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            Move to Next Stage
          </div>
        </div>
      </div>
    </div>

    {/* Right - Active Candidates */}
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
          }}
        >
          Active Candidates
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 0.8fr 0.8fr",
            gap: "0.15rem",
            fontSize: "0.45rem",
          }}
        >
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Name</div>
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Role</div>
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Source</div>
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Status</div>
          {CANDIDATES.map((c) => (
            <>
              <div
                key={`${c.name}-n`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {c.name}
              </div>
              <div
                key={`${c.name}-r`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {c.role}
              </div>
              <div
                key={`${c.name}-s`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {c.source}
              </div>
              <div
                key={`${c.name}-st`}
                style={{
                  padding: "0.25rem 0",
                  borderTop: "1px solid #eee",
                  color: statusColor(c.status),
                  fontWeight: 600,
                }}
              >
                {c.status}
              </div>
            </>
          ))}
        </div>
        <div
          style={{
            marginTop: "auto",
            paddingTop: "0.4rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.4rem", color: "#666" }}>12 active — 4 new this week</span>
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
            Add Candidate
          </div>
        </div>
      </div>
    </div>
  </div>
);
