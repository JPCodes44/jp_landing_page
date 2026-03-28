const INTAKE_STEPS = [
  { step: "Health History", status: "Complete" },
  { step: "Consent Forms", status: "Complete" },
  { step: "Photo Consent", status: "Complete" },
  { step: "Skin Assessment", status: "Pending" },
  { step: "Treatment Plan", status: "Pending" },
];

const APPOINTMENTS = [
  { time: "9:00 AM", client: "Sarah M.", service: "Botox — Forehead", provider: "Dr. Patel" },
  { time: "10:30 AM", client: "Jessica L.", service: "HydraFacial", provider: "Amy R." },
  { time: "12:00 PM", client: "Monica T.", service: "Laser — Full Face", provider: "Dr. Patel" },
  { time: "2:00 PM", client: "Karen W.", service: "Chemical Peel", provider: "Amy R." },
];

const statusColor = (status: string) => (status === "Complete" ? "#4a7c59" : "#8b6914");

export const ClientIntakeCard = () => (
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
    {/* Left - Intake Checklist */}
    <div
      style={{
        flex: "0 0 35%",
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
          New Client Intake
        </div>
        <div style={{ fontSize: "0.45rem", color: "#666", marginBottom: "0.4rem" }}>
          Client: Sarah Mitchell — First Visit
        </div>
        {INTAKE_STEPS.map((item) => (
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
            }}
          >
            Send Intake Link
          </div>
          <div
            style={{
              border: "1px solid #d4d0c8",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.25rem",
              fontSize: "0.4rem",
              textAlign: "center",
            }}
          >
            Manual Entry
          </div>
        </div>
      </div>
    </div>

    {/* Right - Today's Schedule */}
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
          Today's Schedule
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "3.5rem 1fr 1fr 1fr",
            gap: "0.15rem",
            fontSize: "0.45rem",
          }}
        >
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Time</div>
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Client</div>
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Service</div>
          <div style={{ fontWeight: 700, padding: "0.2rem 0" }}>Provider</div>
          {APPOINTMENTS.map((apt) => (
            <>
              <div
                key={`${apt.time}-t`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {apt.time}
              </div>
              <div
                key={`${apt.time}-c`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {apt.client}
              </div>
              <div
                key={`${apt.time}-s`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {apt.service}
              </div>
              <div
                key={`${apt.time}-p`}
                style={{ padding: "0.25rem 0", borderTop: "1px solid #eee" }}
              >
                {apt.provider}
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
          <span style={{ fontSize: "0.4rem", color: "#666" }}>
            4 appointments — 2 providers on shift
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
            Book New
          </div>
        </div>
      </div>
    </div>
  </div>
);
