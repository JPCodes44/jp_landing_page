const METRICS = [
  { label: "Monthly Revenue", value: "$84,200", change: "+12%" },
  { label: "Active Members", value: "142", change: "+8" },
  { label: "Avg. Ticket", value: "$380", change: "+$25" },
  { label: "Retention Rate", value: "87%", change: "+3%" },
];

const SERVICES = [
  { name: "Botox / Dysport", revenue: "$28,400", pct: 34 },
  { name: "Dermal Fillers", revenue: "$19,600", pct: 23 },
  { name: "Laser Treatments", revenue: "$15,200", pct: 18 },
  { name: "Facials & Peels", revenue: "$12,800", pct: 15 },
  { name: "Memberships", revenue: "$8,200", pct: 10 },
];

export const RevenueAnalyticsCard = () => (
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
    {/* Left - KPI Cards */}
    <div
      style={{
        flex: "0 0 35%",
        display: "flex",
        flexDirection: "column",
        gap: "0.4rem",
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: "0.5rem",
          color: "#999",
          paddingBottom: "0.2rem",
        }}
      >
        March 2026 — Dashboard
      </div>
      {METRICS.map((m) => (
        <div
          key={m.label}
          style={{
            backgroundColor: "#f5f5f0",
            borderRadius: "0.375rem",
            padding: "0.45rem 0.5rem",
            color: "#2d2d2d",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div style={{ fontSize: "0.4rem", color: "#888" }}>{m.label}</div>
            <div style={{ fontSize: "0.65rem", fontWeight: 700, marginTop: "0.1rem" }}>
              {m.value}
            </div>
          </div>
          <span
            style={{
              color: "#4a7c59",
              fontWeight: 600,
              fontSize: "0.45rem",
            }}
          >
            {m.change}
          </span>
        </div>
      ))}
    </div>

    {/* Right - Revenue Breakdown */}
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
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
          Revenue by Service
        </div>
        {SERVICES.map((s) => (
          <div
            key={s.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.3rem 0",
              borderBottom: "1px solid #eee",
              fontSize: "0.45rem",
            }}
          >
            <span style={{ flex: "0 0 5.5rem" }}>{s.name}</span>
            <div
              style={{
                flex: 1,
                height: "0.4rem",
                backgroundColor: "#e8e5df",
                borderRadius: "0.2rem",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  width: `${s.pct}%`,
                  height: "100%",
                  backgroundColor: "#4a7c59",
                  borderRadius: "0.2rem",
                }}
              />
            </div>
            <span style={{ flex: "0 0 3rem", textAlign: "right", fontWeight: 600 }}>
              {s.revenue}
            </span>
          </div>
        ))}
        <div
          style={{
            marginTop: "auto",
            paddingTop: "0.4rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.4rem", color: "#666" }}>
            Membership churn: 4.2% — LTV: $2,840
          </span>
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
            Export Report
          </div>
        </div>
      </div>
    </div>
  </div>
);
