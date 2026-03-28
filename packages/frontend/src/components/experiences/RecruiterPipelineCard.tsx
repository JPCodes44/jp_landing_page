const PIPELINE_STATS = [
  { stage: "Sourced", count: 42, change: "+12%" },
  { stage: "Screened", count: 28, change: "+5%" },
  { stage: "Technical", count: 12, change: "-2%" },
  { stage: "Final Round", count: 5, change: "+25%" },
  { stage: "Offers", count: 2, change: "0%" },
];

const RECRUITER_ACTIVITY = [
  { name: "Sarah J.", calls: 18, screens: 6, status: "High" },
  { name: "Tom B.", calls: 12, screens: 4, status: "On Track" },
  { name: "Elena R.", calls: 22, screens: 9, status: "High" },
];

export const RecruiterPipelineCard = () => (
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
    {/* Left - Pipeline Funnel */}
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
          Hiring Pipeline
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
            flex: 1,
            justifyContent: "center",
          }}
        >
          {PIPELINE_STATS.map((s, idx) => (
            <div key={s.stage} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <div
                style={{
                  backgroundColor: "#4a7c59",
                  height: "0.8rem",
                  width: `${100 - idx * 15}%`,
                  borderRadius: "0.15rem",
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "0.4rem",
                  color: "#fff",
                  fontSize: "0.4rem",
                  fontWeight: 600,
                }}
              >
                {s.count}
              </div>
              <span style={{ fontSize: "0.45rem", color: "#666", flex: 1 }}>{s.stage}</span>
              <span
                style={{
                  fontSize: "0.4rem",
                  color: s.change.startsWith("+")
                    ? "#4a7c59"
                    : s.change === "0%"
                      ? "#666"
                      : "#8b6914",
                }}
              >
                {s.change}
              </span>
            </div>
          ))}
        </div>

        <div
          style={{ marginTop: "0.5rem", fontSize: "0.4rem", color: "#666", textAlign: "center" }}
        >
          Avg. Time to Hire: 24 Days
        </div>
      </div>
    </div>

    {/* Right - Recruiter Productivity */}
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
          Team Activity (Today)
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.45rem" }}>
          <thead>
            <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
              <th style={{ padding: "0.3rem 0" }}>Recruiter</th>
              <th style={{ padding: "0.3rem 0" }}>Calls</th>
              <th style={{ padding: "0.3rem 0" }}>Screens</th>
              <th style={{ padding: "0.3rem 0" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {RECRUITER_ACTIVITY.map((r) => (
              <tr key={r.name} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "0.3rem 0", fontWeight: 600 }}>{r.name}</td>
                <td style={{ padding: "0.3rem 0" }}>{r.calls}</td>
                <td style={{ padding: "0.3rem 0" }}>{r.screens}</td>
                <td style={{ padding: "0.3rem 0", color: "#4a7c59", fontWeight: 600 }}>
                  {r.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div style={{ marginTop: "auto", display: "flex", gap: "0.3rem" }}>
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #d4d0c8",
              padding: "0.4rem",
              borderRadius: "0.375rem",
              flex: 1,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.4rem", color: "#666" }}>Weekly Goal</div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700 }}>82%</div>
          </div>
          <div
            style={{
              backgroundColor: "#fff",
              border: "1px solid #d4d0c8",
              padding: "0.4rem",
              borderRadius: "0.375rem",
              flex: 1,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "0.4rem", color: "#666" }}>Interviews</div>
            <div style={{ fontSize: "0.7rem", fontWeight: 700 }}>14</div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
