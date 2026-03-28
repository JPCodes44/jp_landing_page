const INVENTORY = [
  { item: "Botox (100u vial)", qty: 12, expiry: "Sep 2026", status: "In Stock" },
  { item: "Juvéderm Ultra", qty: 8, expiry: "Jul 2026", status: "In Stock" },
  { item: "Restylane Lyft", qty: 2, expiry: "Apr 2026", status: "Low Stock" },
  { item: "Glycolic Acid 30%", qty: 6, expiry: "Dec 2026", status: "In Stock" },
  { item: "Hyaluronidase", qty: 1, expiry: "May 2026", status: "Low Stock" },
];

const COMPLIANCE = [
  { item: "Medical Director Agreement", status: "Current", expires: "Jan 2027" },
  { item: "Laser Safety Officer Cert", status: "Current", expires: "Nov 2026" },
  { item: "DEA Registration", status: "Expiring", expires: "Apr 2026" },
  { item: "Liability Insurance", status: "Current", expires: "Aug 2026" },
];

const invColor = (status: string) => (status === "In Stock" ? "#4a7c59" : "#8b6914");
const compColor = (status: string) => (status === "Current" ? "#4a7c59" : "#b35c00");

export const InventoryComplianceCard = () => (
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
    {/* Left - Inventory */}
    <div
      style={{
        flex: "1 1 55%",
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
          Product Inventory
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 2rem 3.5rem 3rem",
            gap: "0.15rem",
            fontSize: "0.45rem",
          }}
        >
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Product</div>
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Qty</div>
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Expiry</div>
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Status</div>
          {INVENTORY.map((inv) => (
            <>
              <div
                key={`${inv.item}-i`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {inv.item}
              </div>
              <div
                key={`${inv.item}-q`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {inv.qty}
              </div>
              <div
                key={`${inv.item}-e`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {inv.expiry}
              </div>
              <div
                key={`${inv.item}-s`}
                style={{
                  padding: "0.25rem 0",
                  borderTop: "1px solid #eee",
                  color: invColor(inv.status),
                  fontWeight: 600,
                }}
              >
                {inv.status}
              </div>
            </>
          ))}
        </div>
        <div
          style={{
            marginTop: "auto",
            paddingTop: "0.4rem",
            fontSize: "0.4rem",
            color: "#666",
          }}
        >
          Auto-reorder threshold: 3 units — Supplier: MedLine Direct
        </div>
      </div>
    </div>

    {/* Right - Compliance */}
    <div
      style={{
        flex: "1 1 45%",
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
          Compliance Status
        </div>
        {COMPLIANCE.map((c) => (
          <div
            key={c.item}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.3rem 0",
              borderBottom: "1px solid #eee",
              fontSize: "0.45rem",
            }}
          >
            <span style={{ flex: 1 }}>{c.item}</span>
            <span
              style={{
                color: compColor(c.status),
                fontWeight: 600,
                marginRight: "0.5rem",
                fontSize: "0.4rem",
              }}
            >
              {c.status}
            </span>
            <span style={{ color: "#888", fontSize: "0.4rem" }}>{c.expires}</span>
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
              backgroundColor: "#b35c00",
              color: "#fff",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.25rem",
              fontSize: "0.4rem",
              fontWeight: 600,
            }}
          >
            1 Expiring Soon
          </div>
        </div>
      </div>
    </div>
  </div>
);
