import { useIsMobile } from "../hooks/useIsMobile";
import {
  FONT_SIZE_BODY,
  FONT_SIZE_HERO_H1,
  HERO_MAX_WIDTH,
  HERO_WIDTH,
  LINE_HEIGHT_BODY,
  LINE_HEIGHT_HEADING,
  MOBILE_FONT_SIZE_HERO_H1,
  MOBILE_FRAME1_PADDING_X,
  MOBILE_HERO_WIDTH,
  MOBILE_PARA_MAX_WIDTH,
  PARA_MARGIN_TOP,
} from "../theme";

const Frame1 = () => {
  const isMobile = useIsMobile();

  return (
    <section
      className="min-h-screen w-full bg-bg-warm flex items-center justify-center"
      style={{
        paddingLeft: isMobile ? MOBILE_FRAME1_PADDING_X : undefined,
        paddingRight: isMobile ? MOBILE_FRAME1_PADDING_X : undefined,
      }}
    >
      <div
        className="flex flex-col"
        style={{
          width: isMobile ? MOBILE_HERO_WIDTH : HERO_WIDTH,
          textAlign: isMobile ? "center" : undefined,
          alignItems: isMobile ? "center" : undefined,
        }}
      >
        <h1
          className="font-fanwood font-normal text-text-primary m-0"
          style={{
            fontSize: isMobile ? MOBILE_FONT_SIZE_HERO_H1 : FONT_SIZE_HERO_H1,
            lineHeight: isMobile ? "1.6" : LINE_HEIGHT_HEADING,
          }}
        >
          I build systems that <span className="text-accent-green">scale your business</span> while
          you sleep.
        </h1>
        <p
          className="font-fanwood font-normal text-text-primary mb-0"
          style={{
            fontSize: FONT_SIZE_BODY,
            lineHeight: LINE_HEIGHT_BODY,
            marginTop: PARA_MARGIN_TOP,
            maxWidth: isMobile ? MOBILE_PARA_MAX_WIDTH : HERO_MAX_WIDTH,
          }}
        >
          Hi, I'm Justin. I transform manual bottlenecks into automated growth engines. No robotic
          templates—just high-performance web experiences and agentic tools designed for humans.
        </p>
      </div>
    </section>
  );
};

export default Frame1;
