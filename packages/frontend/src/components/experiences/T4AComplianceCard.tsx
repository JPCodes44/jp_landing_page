const PAYMENTS = [
  { name: "ABC Renovations", amount: "$15,000.00", status: "Ready to File" },
  { name: "XZT Tech Services", amount: "$8,200.00", status: "Ready to File" },
  { name: "XZT Tech Services", amount: "$25,000.00", status: "Ready to File" },
  { name: "Global Consulting", amount: "$25,000.00", status: "Ready to File" },
  { name: "Innovate Design", amount: "$25,041.32", status: "Ready Review" },
];

const statusColor = (status: string) => (status === "Ready to File" ? "#4a7c59" : "#8b6914");

export const T4AComplianceCard = () => (
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
    {/* Left sidebar - QuickBooks */}
    <div
      style={{
        width: "5rem",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <div
        style={{
          backgroundColor: "#2a2a2a",
          borderRadius: "0.375rem",
          padding: "0.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.375rem",
        }}
      >
        <span style={{ fontSize: "0.5rem", color: "#9ca3af", fontWeight: 600 }}>
          QuickBooks&reg; Integration
        </span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
          <div
            style={{
              width: "1rem",
              height: "1rem",
              borderRadius: "50%",
              backgroundColor: "#2d6b3f",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.4rem",
              color: "#fff",
            }}
          >
            QB
          </div>
        </div>
        <div
          style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.25rem" }}
        >
          <span style={{ color: "#9ca3af", fontSize: "0.45rem" }}>Connected</span>
          <div
            style={{
              width: "1.5rem",
              height: "0.75rem",
              borderRadius: "0.375rem",
              backgroundColor: "#4a7c59",
            }}
          />
        </div>
        <div style={{ display: "flex", gap: "0.25rem", marginTop: "0.25rem" }}>
          <div
            style={{
              padding: "0.15rem 0.3rem",
              backgroundColor: "#4a7c59",
              borderRadius: "0.2rem",
              fontSize: "0.4rem",
              color: "#fff",
            }}
          >
            Sync Data
          </div>
          <div
            style={{
              padding: "0.15rem 0.3rem",
              backgroundColor: "#4a7c59",
              borderRadius: "0.2rem",
              fontSize: "0.4rem",
              color: "#fff",
            }}
          >
            Refresh
          </div>
        </div>
      </div>
    </div>

    {/* Center - Payment table */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div
        style={{
          backgroundColor: "#f5f5f0",
          borderRadius: "0.375rem",
          padding: "0.5rem",
          color: "#2d2d2d",
          flex: 1,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: "0.5rem", marginBottom: "0.375rem" }}>
          Subcontractor Payments (2023-2024 Tax Year)
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.4rem" }}>
          <thead>
            <tr style={{ borderBottom: "0.0625rem solid #d4d0c8" }}>
              <th
                style={{ textAlign: "left", padding: "0.2rem 0", fontWeight: 500, color: "#666" }}
              >
                Payee Name
              </th>
              <th
                style={{ textAlign: "right", padding: "0.2rem 0", fontWeight: 500, color: "#666" }}
              >
                Amount (CAD)
              </th>
              <th
                style={{ textAlign: "right", padding: "0.2rem 0", fontWeight: 500, color: "#666" }}
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {PAYMENTS.map((p) => (
              <tr key={`${p.name}-${p.amount}`} style={{ borderBottom: "0.0625rem solid #e8e5e0" }}>
                <td style={{ padding: "0.2rem 0" }}>{p.name}</td>
                <td style={{ textAlign: "right", padding: "0.2rem 0" }}>{p.amount}</td>
                <td style={{ textAlign: "right", padding: "0.2rem 0" }}>
                  <span
                    style={{
                      backgroundColor: statusColor(p.status),
                      color: "#fff",
                      padding: "0.1rem 0.25rem",
                      borderRadius: "0.2rem",
                      fontSize: "0.35rem",
                    }}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div
          style={{
            marginTop: "0.5rem",
            padding: "0.375rem",
            backgroundColor: "#e8e5e0",
            borderRadius: "0.25rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "0.4rem",
          }}
        >
          <span>CRA Box 048: Payments for services rendered by subcontractors</span>
          <div
            style={{
              padding: "0.15rem 0.4rem",
              backgroundColor: "#4a7c59",
              color: "#fff",
              borderRadius: "0.2rem",
              fontSize: "0.35rem",
              fontWeight: 600,
            }}
          >
            Generate T4A Slips
          </div>
        </div>
      </div>
    </div>

    {/* Right - T4A Slip Preview */}
    <div
      style={{
        width: "7rem",
        flexShrink: 0,
        backgroundColor: "#f5f5f0",
        borderRadius: "0.375rem",
        padding: "0.5rem",
        color: "#2d2d2d",
        display: "flex",
        flexDirection: "column",
        gap: "0.25rem",
      }}
    >
      <div style={{ fontWeight: 600, fontSize: "0.5rem" }}>T4A Slip Preview</div>
      <div style={{ fontSize: "0.35rem", color: "#666" }}>Recipient</div>
      <div style={{ fontSize: "0.35rem", color: "#666" }}>Payment period and amounts</div>
      <div
        style={{
          marginTop: "0.25rem",
          padding: "0.25rem",
          backgroundColor: "#e8e5e0",
          borderRadius: "0.2rem",
          fontSize: "0.35rem",
        }}
      >
        <div style={{ fontWeight: 600 }}>Box 048: Payments of services</div>
        <div>$52,100.00</div>
      </div>
      <div style={{ fontSize: "0.3rem", color: "#999", marginTop: "auto" }}>
        Box CRA Preview or equivalence
      </div>
      <div style={{ fontSize: "0.3rem", color: "#999" }}>Box CRA Amenities</div>
    </div>
  </div>
);
