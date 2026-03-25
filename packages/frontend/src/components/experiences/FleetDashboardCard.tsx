const FLEET_ROWS = [
  {
    carrier: "CARRIER",
    license: "LICENCE#",
    trailers: "TRAILERS",
    make: "MAKE",
    vin: "VIN#",
    year: "YEAR",
    truck: "TRUCK#",
  },
];

export const FleetDashboardCard = () => (
  <div
    style={{
      backgroundColor: "#1a1a1a",
      borderRadius: "var(--exp-card-image-radius)",
      aspectRatio: "16 / 10",
      width: "100%",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      padding: "1rem",
      gap: "0.5rem",
      fontFamily: '"Satoshi", sans-serif',
      color: "#e0e0e0",
      fontSize: "0.5rem",
    }}
  >
    {/* Top row: Fleet table header */}
    <div
      style={{
        backgroundColor: "#2a2a2a",
        borderRadius: "0.375rem",
        padding: "0.4rem 0.5rem",
        display: "flex",
        gap: "0.75rem",
        fontSize: "0.4rem",
        color: "#9ca3af",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      }}
    >
      {FLEET_ROWS[0] &&
        Object.values(FLEET_ROWS[0]).map((val) => (
          <span key={val} style={{ flex: 1 }}>
            {val}
          </span>
        ))}
    </div>

    {/* Main content area */}
    <div style={{ display: "flex", gap: "0.75rem", flex: 1, minHeight: 0 }}>
      {/* Left - Table data */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#f5f5f0",
          borderRadius: "0.375rem",
          padding: "0.5rem",
          color: "#2d2d2d",
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
        }}
      >
        {[1, 2, 3, 4, 5].map((row) => (
          <div
            key={row}
            style={{
              display: "flex",
              gap: "0.5rem",
              fontSize: "0.35rem",
              padding: "0.15rem 0",
              borderBottom: "0.0625rem solid #e8e5e0",
              color: "#666",
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((col) => (
              <div
                key={col}
                style={{
                  flex: 1,
                  backgroundColor: "#e8e5e0",
                  height: "0.4rem",
                  borderRadius: "0.125rem",
                }}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Right - Map + Compliance Score */}
      <div
        style={{
          width: "45%",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        {/* Map area */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#e8e5e0",
            borderRadius: "0.375rem",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(135deg, #c8d5b9 0%, #e8e5e0 40%, #b8c5a5 70%, #d4d0c8 100%)",
              opacity: 0.6,
            }}
          />
          {/* Truck icons */}
          {[
            { top: "20%", left: "30%" },
            { top: "45%", left: "60%" },
            { top: "65%", left: "25%" },
          ].map((pos) => (
            <div
              key={`${pos.top}-${pos.left}`}
              style={{
                position: "absolute",
                top: pos.top,
                left: pos.left,
                width: "0.8rem",
                height: "0.5rem",
                backgroundColor: "#4a7c59",
                borderRadius: "0.125rem",
              }}
            />
          ))}
        </div>

        {/* Compliance score */}
        <div
          style={{
            display: "flex",
            gap: "0.375rem",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#f5f5f0",
              borderRadius: "0.375rem",
              padding: "0.4rem",
              flex: 1,
              color: "#2d2d2d",
              fontSize: "0.35rem",
            }}
          >
            <div style={{ color: "#9ca3af", fontSize: "0.3rem", marginBottom: "0.15rem" }}>
              DOCUMENT UPLOAD
            </div>
            <div style={{ display: "flex", gap: "0.25rem", alignItems: "center" }}>
              <div
                style={{
                  width: "0.6rem",
                  height: "0.6rem",
                  borderRadius: "50%",
                  backgroundColor: "#4a7c59",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontSize: "0.25rem",
                }}
              >
                &#10003;
              </div>
              <span>Imported loaded</span>
            </div>
          </div>
          <div
            style={{
              backgroundColor: "#f5f5f0",
              borderRadius: "0.375rem",
              padding: "0.4rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              color: "#2d2d2d",
            }}
          >
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                border: "0.2rem solid #4a7c59",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 700,
              }}
            >
              78
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
