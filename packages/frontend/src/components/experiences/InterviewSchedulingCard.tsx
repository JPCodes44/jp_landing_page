const CALENDAR_EVENTS = [
  { time: "10:00 AM", event: "Panel Interview: Mark R.", status: "Confirmed" },
  { time: "11:30 AM", event: "Technical Review: Sarah L.", status: "Pending" },
  { time: "2:00 PM", event: "Hiring Mgr Chat: Mike W.", status: "Confirmed" },
  { time: "4:00 PM", event: "Debrief: Engineering Team", status: "Upcoming" },
];

const FEEDBACK_QUEUE = [
  { interviewer: "Dr. Smith", role: "Engineering VP", status: "Submitted" },
  { interviewer: "Amy Chen", role: "Sr. Developer", status: "Missing" },
  { interviewer: "Jason Wu", role: "Product Lead", status: "Submitted" },
];

export const InterviewSchedulingCard = () => (
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
    {/* Left - Smart Scheduler */}
    <div
      style={{
        flex: "0 0 45%",
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
          <span>Interviewer Availability</span>
          <span style={{ fontSize: "0.45rem", fontWeight: 400 }}>March 27, 2026</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          {CALENDAR_EVENTS.map((e) => (
            <div
              key={e.time}
              style={{
                display: "flex",
                gap: "0.5rem",
                alignItems: "center",
                borderLeft: "2px solid #4a7c59",
                paddingLeft: "0.4rem",
              }}
            >
              <span style={{ fontWeight: 700, minWidth: "3rem" }}>{e.time}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600 }}>{e.event}</div>
                <div
                  style={{
                    fontSize: "0.45rem",
                    color: e.status === "Confirmed" ? "#4a7c59" : "#8b6914",
                  }}
                >
                  {e.status}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            marginTop: "auto",
            borderTop: "1px solid #d4d0c8",
            paddingTop: "0.5rem",
            display: "flex",
            justifyContent: "space-between",
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
            Auto-Schedule Next
          </div>
          <div
            style={{
              border: "1px solid #d4d0c8",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.25rem",
              fontSize: "0.4rem",
            }}
          >
            Reschedule
          </div>
        </div>
      </div>
    </div>

    {/* Right - Feedback Tracker */}
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
          Feedback Pipeline
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
          {FEEDBACK_QUEUE.map((f) => (
            <div
              key={f.interviewer}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
            >
              <div>
                <div style={{ fontWeight: 600 }}>{f.interviewer}</div>
                <div style={{ fontSize: "0.45rem", color: "#666" }}>{f.role}</div>
              </div>
              <span
                style={{
                  fontSize: "0.4rem",
                  padding: "0.1rem 0.4rem",
                  borderRadius: "1rem",
                  backgroundColor:
                    f.status === "Submitted" ? "rgba(74, 124, 89, 0.1)" : "rgba(139, 105, 20, 0.1)",
                  color: f.status === "Submitted" ? "#4a7c59" : "#8b6914",
                  border: `1px solid ${f.status === "Submitted" ? "#4a7c59" : "#8b6914"}`,
                }}
              >
                {f.status}
              </span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <div style={{ fontSize: "0.45rem", color: "#8b6914", textAlign: "center" }}>
            ⚠️ 1 feedback overdue (8 hours)
          </div>
          <div
            style={{
              backgroundColor: "#8b6914",
              color: "#fff",
              padding: "0.25rem 0.5rem",
              borderRadius: "0.25rem",
              fontSize: "0.4rem",
              fontWeight: 600,
              textAlign: "center",
            }}
          >
            Send Slack Reminder
          </div>
        </div>
      </div>
    </div>
  </div>
);
