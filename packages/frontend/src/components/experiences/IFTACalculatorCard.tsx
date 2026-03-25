const JURISDICTIONS = [
  {
    state: "CA",
    prov: "5%",
    miles: "490",
    total: "1,533",
    taxable: "357",
    rate: "$3",
    net: "$70.00",
  },
  {
    state: "TX",
    prov: "4%",
    miles: "4,100",
    total: "4,100",
    taxable: "357",
    rate: "$3",
    net: "$70.00",
  },
  {
    state: "NY",
    prov: "7%",
    miles: "510",
    total: "1,574",
    taxable: "376",
    rate: "-",
    net: "$35.00",
  },
  {
    state: "IL",
    prov: "8%",
    miles: "340",
    total: "1,074",
    taxable: "216",
    rate: "-",
    net: "$19.00",
  },
  {
    state: "OH",
    prov: "7%",
    miles: "340",
    total: "1,074",
    taxable: "216",
    rate: "$3",
    net: "$19.00",
  },
  {
    state: "MI",
    prov: "6%",
    miles: "197",
    total: "467.5",
    taxable: "88.5",
    rate: "$7",
    net: "$9.00",
  },
  { state: "GA", prov: "7%", miles: "507", total: "2,090", taxable: "1,069", rate: "-", net: "-" },
];

const SUMMARY = [
  { label: "Total Miles:", value: "34,000" },
  { label: "Tax Owed:", value: "+1,200.00" },
  { label: "Net Tax:", value: "$1,555" },
  { label: "Total Due/Refund:", value: "$420.00" },
];

export const IFTACalculatorCard = () => (
  <div
    style={{
      backgroundColor: "#f5f5f0",
      borderRadius: "var(--exp-card-image-radius)",
      aspectRatio: "16 / 10",
      width: "100%",
      overflow: "hidden",
      display: "flex",
      padding: "1rem",
      gap: "0.75rem",
      fontFamily: '"Satoshi", sans-serif',
      color: "#2d2d2d",
      fontSize: "0.5rem",
      border: "0.0625rem solid #d4d0c8",
    }}
  >
    {/* Left - Title + Table */}
    <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      <div style={{ fontWeight: 700, fontSize: "0.65rem" }}>IFTA Fuel Tax Calculator</div>

      {/* Jurisdiction Breakdown */}
      <div style={{ fontSize: "0.4rem", color: "#666", fontWeight: 600, marginBottom: "0.15rem" }}>
        Jurisdiction Breakdown
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.35rem" }}>
        <thead>
          <tr style={{ borderBottom: "0.125rem solid #d4d0c8" }}>
            {[
              "State/Province",
              "Total Mileage",
              "Total Distance",
              "Taxable Gallons",
              "Tax Rate",
              "Net Due/ Collected",
            ].map((h) => (
              <th
                key={h}
                style={{
                  textAlign: "left",
                  padding: "0.2rem 0.15rem",
                  fontWeight: 600,
                  color: "#666",
                  fontSize: "0.3rem",
                }}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {JURISDICTIONS.map((j) => (
            <tr key={j.state} style={{ borderBottom: "0.0625rem solid #e8e5e0" }}>
              <td style={{ padding: "0.15rem", fontWeight: 600 }}>{j.state}</td>
              <td style={{ padding: "0.15rem", color: "#666" }}>{j.prov}</td>
              <td style={{ padding: "0.15rem", color: "#666" }}>{j.miles}</td>
              <td style={{ padding: "0.15rem", color: "#666" }}>{j.total}</td>
              <td style={{ padding: "0.15rem", color: "#666" }}>{j.taxable}</td>
              <td style={{ padding: "0.15rem", color: "#666" }}>{j.net}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        style={{
          marginTop: "auto",
          fontSize: "0.3rem",
          color: "#9ca3af",
        }}
      >
        Quarterly Filing Status: Q4 2023 · Draft in Preview
      </div>
    </div>

    {/* Right panel */}
    <div
      style={{
        width: "35%",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      {/* Fuel Card CSV Upload */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "0.375rem",
          padding: "0.5rem",
          border: "0.0625rem solid #e8e5e0",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: "0.4rem", marginBottom: "0.375rem" }}>
          Fuel Card CSV Upload
        </div>
        <div style={{ fontSize: "0.3rem", color: "#999", marginBottom: "0.25rem" }}>
          Draft IFTA Return Preview
        </div>
        <div
          style={{
            padding: "0.25rem 0.5rem",
            backgroundColor: "#4a7c59",
            color: "#fff",
            borderRadius: "0.25rem",
            textAlign: "center",
            fontSize: "0.35rem",
            fontWeight: 600,
            cursor: "default",
          }}
        >
          Browse Files
        </div>
        <div style={{ fontSize: "0.3rem", color: "#999", marginTop: "0.25rem" }}>
          Connect to ELD Provider
        </div>
      </div>

      {/* ELD Data Import */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "0.375rem",
          padding: "0.5rem",
          border: "0.0625rem solid #e8e5e0",
        }}
      >
        <div style={{ fontWeight: 600, fontSize: "0.4rem", marginBottom: "0.25rem" }}>
          ELD Data Import
        </div>
        <div
          style={{
            height: "0.3rem",
            backgroundColor: "#e8e5e0",
            borderRadius: "0.125rem",
            width: "80%",
          }}
        />
      </div>

      {/* Tax Calculation Summary */}
      <div
        style={{
          backgroundColor: "#fff",
          borderRadius: "0.375rem",
          padding: "0.5rem",
          border: "0.0625rem solid #e8e5e0",
          flex: 1,
        }}
      >
        <div style={{ fontWeight: 600, fontSize: "0.4rem", marginBottom: "0.375rem" }}>
          Tax Calculation Summary
        </div>
        {SUMMARY.map((s) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.35rem",
              marginBottom: "0.15rem",
            }}
          >
            <span style={{ color: "#666" }}>{s.label}</span>
            <span style={{ fontWeight: 600 }}>{s.value}</span>
          </div>
        ))}
        <div
          style={{
            marginTop: "0.375rem",
            padding: "0.2rem 0.4rem",
            backgroundColor: "#4a7c59",
            color: "#fff",
            borderRadius: "0.2rem",
            textAlign: "center",
            fontSize: "0.35rem",
            fontWeight: 600,
          }}
        >
          Generate Official Return
        </div>
      </div>
    </div>
  </div>
);
