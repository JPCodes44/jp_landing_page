import { PARA_MARGIN_TOP } from "../theme";

const Frame1 = () => {
  return (
    <section
      style={{
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "#FEFEFE",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "var(--frame1-section-padding-x)",
        paddingRight: "var(--frame1-section-padding-x)",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "var(--frame1-content-width)",
          textAlign: "var(--frame1-content-text-align)" as React.CSSProperties["textAlign"],
          alignItems: "var(--frame1-content-align-items)" as React.CSSProperties["alignItems"],
        }}
      >
        <h1
          style={{
            fontFamily: '"Fanwood Text", serif',
            fontWeight: 400,
            color: "#2d2d2d",
            margin: 0,
            fontSize: "var(--frame1-h1-size)",
            lineHeight: "var(--frame1-h1-lh)",
          }}
        >
          I build systems that <span style={{ color: "#7a8b5c" }}>scale your business</span> while
          you sleep.
        </h1>
        <div className="frame1-subtext">
          <p
            style={{
              fontFamily: '"Fanwood Text", serif',
              fontWeight: 400,
              color: "#2d2d2d",
              marginBottom: 0,
              fontSize: "var(--frame1-body-size)",
              lineHeight: "var(--frame1-body-lh)",
              marginTop: PARA_MARGIN_TOP,
              maxWidth: "var(--frame1-p-max-width)",
            }}
          >
            Hi, I'm Justin. I transform manual bottlenecks into automated growth engines. No robotic
            templates—just high-performance web experiences and agentic tools designed for humans.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Frame1;
