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
  {
    videoSrc: "/videos/testimonials/julia.mp4",
    posterSrc: "/videos/testimonials/julia-poster.jpg",
    clientName: "Julia",
    subtitle: "Buyer",
  },
  {
    videoSrc: "/videos/testimonials/carradous.mp4",
    posterSrc: "/videos/testimonials/carradous-poster.jpg",
    clientName: "Mr Carradous",
    subtitle: "Buyer",
  },
];

export default function TestimonialSection({
  heading = "What Our Buyers Say",
  testimonials,
  className = "",
}) {
  const items = testimonials?.length ? testimonials : DEFAULT_TESTIMONIALS;

  return (
    <section className={`bg-white ${className}`} style={{ padding: "var(--section-breathing-lg) 0" }}>
      <div className="site-container">
        <ScrollReveal className="mb-10 md:mb-12">
          <p className="eyebrow-label">Client Stories</p>
          <h2 className="mb-0">{heading}</h2>
        </ScrollReveal>

        <StaggerGroup stagger={120}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
            {items.map((t, i) => (
              <ScrollReveal key={i}>
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
