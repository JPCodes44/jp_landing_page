import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";
import { useBreakpoint } from "../hooks/useBreakpoint";
import {
  ANIM_DURATION_HEADING,
  ANIM_SCROLL_END,
  ANIM_SCROLL_START,
  ANIM_Y_HEADING,
} from "../theme";
import { CarrierVerificationCard } from "./experiences/CarrierVerificationCard";
import { FleetDashboardCard } from "./experiences/FleetDashboardCard";
import { IFTACalculatorCard } from "./experiences/IFTACalculatorCard";
import { T4AComplianceCard } from "./experiences/T4AComplianceCard";

interface ExperienceItem {
  visual: ReactNode;
  tags: string[];
  title: string;
  description: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    visual: <T4AComplianceCard />,
    tags: ["ONBOARDING", "CRA", "TAX FILING"],
    title: "T4A Compliance Engine",
    description:
      "Connects to QuickBooks, identifies all subcontractor payments subject to CRA's December 2025 penalty enforcement, and generates T4A slips. Box 048 compliant.",
  },
  {
    visual: <FleetDashboardCard />,
    tags: ["CVOR", "FLEET MGMT", "AI PARSING"],
    title: "Fleet Compliance Dashboard",
    description:
      "Real-time tracker for driver qualifications, vehicle inspections, insurance, and maintenance across your entire fleet. Color-coded status, automated alerts, AI-powered document parsing.",
  },
  {
    visual: <CarrierVerificationCard />,
    tags: ["MCDOT", "INSURANCE", "BROKERAGE"],
    title: "Carrier Compliance Verification",
    description:
      "Automated carrier onboarding and monitoring for freight brokerages. Handles document requests, AI-powered insurance parsing with minimum coverage thresholds, and continuous expiry monitoring.",
  },
  {
    visual: <IFTACalculatorCard />,
    tags: ["IFTA", "ELD DATA", "FUEL TAX"],
    title: "IFTA Fuel Tax Calculator",
    description:
      "Takes fuel card CSVs and ELD mileage exports, allocates by jurisdiction, calculates net tax, and produces a draft IFTA return. Saves 4-8 hours per quarter filing.",
  },
];

const ExperienceCard = ({ item }: { item: ExperienceItem }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const onEnter = () =>
      gsap.to(card, {
        scale: 1.02,
        duration: 0.25,
        ease: "power2.out",
      });
    const onLeave = () =>
      gsap.to(card, {
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });

    card.addEventListener("mouseenter", onEnter);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mouseenter", onEnter);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "0.75rem",
      }}
    >
      {/* Card visual */}
      {item.visual}

      {/* Tags */}
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          flexWrap: "wrap",
          marginTop: "0.25rem",
        }}
      >
        {item.tags.map((tag) => (
          <span
            key={tag}
            style={{
              border: "0.0625rem solid var(--color-border-warm)",
              borderRadius: "62.4375rem",
              padding: "0.25rem 0.75rem",
              fontSize: "var(--exp-tag-size)",
              fontFamily: '"Fanwood Text", serif',
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "var(--color-text-primary)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Title */}
      <h3
        style={{
          fontFamily: '"Fanwood Text", serif',
          fontWeight: 700,
          fontSize: "var(--exp-card-title-size)",
          color: "var(--color-text-primary)",
          margin: 0,
        }}
      >
        {item.title}
      </h3>

      {/* Description */}
      <p
        style={{
          fontFamily: '"Fanwood Text", serif',
          fontSize: "var(--exp-card-desc-size)",
          lineHeight: 1.6,
          color: "var(--color-text-primary)",
          margin: 0,
        }}
      >
        {item.description}
      </p>
    </div>
  );
};

export const Experiences = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const breakpoint = useBreakpoint();
  const isMobile = ["phone-sm", "phone", "mobile-sm", "mobile"].includes(breakpoint);

  const bgImage = isMobile
    ? "/styles/assets/2d/backgrounds/image_frame2.png"
    : "/styles/assets/2d/backgrounds/grid.png";

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const header = headerRef.current;
    const grid = gridRef.current;
    const cta = ctaRef.current;
    if (!section || !header || !grid || !cta) return;

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      gsap.set([header, grid, cta], { opacity: 1, y: 0 });
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: ANIM_SCROLL_START,
        end: ANIM_SCROLL_END,
        scrub: false,
      },
    });

    tl.fromTo(
      header,
      { opacity: 0, y: ANIM_Y_HEADING },
      { opacity: 1, y: 0, ease: "power2.out", duration: ANIM_DURATION_HEADING },
    )
      .fromTo(
        grid.children,
        { opacity: 0, y: "3rem" },
        { opacity: 1, y: 0, stagger: 0.15, ease: "power2.out", duration: 0.6 },
        "-=0.3",
      )
      .fromTo(
        cta,
        { opacity: 0, y: "2rem" },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.5 },
        "-=0.2",
      );

    const headingEl = header.querySelector("h2");
    let headingParallax: gsap.core.Tween | null = null;
    if (headingEl) {
      headingParallax = gsap.fromTo(
        headingEl,
        { y: 25 },
        {
          y: -25,
          ease: "none",
          immediateRender: false,
          scrollTrigger: {
            trigger: headingEl,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        },
      );
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      if (headingParallax) {
        headingParallax.scrollTrigger?.kill();
        headingParallax.kill();
      }
    };
  }, []);

  return (
    <section
      id="experiences"
      ref={sectionRef}
      className="frame-bg"
      style={{
        width: "100%",
        position: "relative",
        isolation: "isolate",
        paddingLeft: "var(--exp-section-padding-x)",
        paddingRight: "var(--exp-section-padding-x)",
        paddingTop: "var(--exp-section-padding-top)",
        paddingBottom: "var(--exp-section-padding-bottom)",
      }}
    >
      {/* Background overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${bgImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.12,
          zIndex: -1,
          pointerEvents: "none",
        }}
      />

      {/* Header */}
      <div ref={headerRef} style={{ opacity: 0, marginBottom: "var(--exp-header-mb)" }}>
        <span
          style={{
            fontFamily: '"Fanwood Text", serif',
            fontSize: "var(--exp-label-size)",
            letterSpacing: "var(--exp-label-spacing)",
            textTransform: "uppercase",
            color: "var(--color-text-primary)",
            display: "block",
            marginBottom: "1.5rem",
          }}
        >
          Trucking Compliance Systems
        </span>
        <h2
          style={{
            fontFamily: '"Fanwood Text", serif',
            fontSize: "var(--exp-heading-size)",
            lineHeight: 1.15,
            color: "var(--color-text-primary)",
            margin: 0,
            maxWidth: "40rem",
          }}
        >
          Compliance systems built for carriers, fleets, and brokerages
        </h2>
        <p
          style={{
            fontFamily: '"Fanwood Text", serif',
            fontSize: "var(--exp-desc-size)",
            lineHeight: 1.6,
            color: "var(--color-text-primary)",
            marginTop: "1.5rem",
            maxWidth: "50rem",
          }}
        >
          Purpose-built tools for CRA T4A enforcement, CVOR scoring, carrier verification, and IFTA
          filing. Third-generation products — purpose-designed, battle-tested frameworks your
          drivers, dispatchers, and accountants actually use.
        </p>
      </div>

      {/* Cards Grid */}
      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: "var(--exp-grid-columns)",
          gap: "var(--exp-grid-gap)",
          opacity: 0,
        }}
      >
        {EXPERIENCES.map((item) => (
          <ExperienceCard key={item.title} item={item} />
        ))}
      </div>

      {/* Bottom CTA */}
      <div
        ref={ctaRef}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "4rem",
          paddingTop: "2rem",
          borderTop: "0.0625rem solid var(--color-border-warm)",
          opacity: 0,
        }}
      >
        <p
          style={{
            fontFamily: '"Fanwood Text", serif',
            fontSize: "var(--exp-cta-size)",
            color: "var(--color-text-primary)",
            margin: 0,
          }}
        >
          Need a system built for trucking? Let's talk compliance.
        </p>
        <a
          href="#contact"
          style={{
            fontFamily: '"Fanwood Text", serif',
            fontSize: "var(--exp-cta-size)",
            color: "var(--color-text-primary)",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            whiteSpace: "nowrap",
          }}
        >
          Book a Call
          <span style={{ fontSize: "1.25em" }}>&rarr;</span>
        </a>
      </div>
    </section>
  );
};
