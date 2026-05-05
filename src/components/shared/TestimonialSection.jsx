import React from "react";
import VideoTestimonialCard from "./VideoTestimonialCard";
import ScrollReveal, { StaggerGroup } from "./ScrollReveal";

/**
 * TestimonialSection — static grid of video testimonials.
 */

const DEFAULT_TESTIMONIALS = [
  {
    videoSrc: "/videos/testimonials/alyssa.mp4",
    posterSrc: "/videos/testimonials/alyssa-poster.jpg",
    clientName: "Alyssa",
    subtitle: "Buyer",
  },
  {
    videoSrc: "/videos/testimonials/calvin.mp4",
    posterSrc: "/videos/testimonials/calvin-poster.jpg",
    clientName: "Calvin",
    subtitle: "Buyer",
  },
];

export default function TestimonialSection({
  heading = "In our clients' own words",
  subtitle = "Real conversations with the buyers we've worked alongside. Hear what working with Compass actually felt like, and what it changed for them.",
  testimonials,
  className = "",
}) {
  const items = testimonials?.length ? testimonials : DEFAULT_TESTIMONIALS;

  return (
    <section id="testimonials" className={`bg-sand-wash ${className}`} style={{ padding: "var(--section-padding) 0" }}>
      <div className="site-container">
        <ScrollReveal className="mb-10 md:mb-12">
          <p className="eyebrow-label">Client Stories</p>
          <h2 className="mb-2">{heading}</h2>
          {subtitle && (
            <p
              style={{
                fontWeight: "var(--font-body-light)",
                fontSize: "1.0625rem",
                color: "var(--stone)",
                lineHeight: "1.7",
                maxWidth: "48ch",
              }}
            >
              {subtitle}
            </p>
          )}
        </ScrollReveal>

        <StaggerGroup stagger={80}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {items.map((t, i) => (
              <ScrollReveal key={i} animation="scale-subtle" duration={600}>
                <VideoTestimonialCard
                  videoSrc={t.videoSrc}
                  posterSrc={t.posterSrc}
                  clientName={t.clientName}
                  subtitle={t.subtitle}
                  size="full"
                />
              </ScrollReveal>
            ))}
          </div>
        </StaggerGroup>
      </div>
    </section>
  );
}
