import React from "react";
import { Button } from "@/components/ui/button";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { splitSentences } from "@/lib/utils";

/**
 * Compact CTA section — clean close to the page.
 *
 * @param {"warm"|"dark"|"minimal"|"image"} variant
 */
export default function CTASection({
  heading = "Let's find your property",
  supportingText,
  buttonText = "Start a Conversation",
  buttonHref,
  onButtonClick,
  variant = "warm",
  backgroundImage,
}) {
  const isDark = variant === "dark" || variant === "image";

  const sectionClasses = {
    warm: "bg-cream",
    dark: "bg-editorial-dark",
    minimal: "bg-white",
    image: "relative overflow-hidden",
  };

  const btnClasses = isDark
    ? "btn-cta bg-white text-[var(--hills)] hover:bg-white/90"
    : "btn-cta bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white";

  return (
    <section
      className={sectionClasses[variant] || sectionClasses.warm}
      style={{ padding: "var(--section-padding) 0" }}
    >
      {variant === "image" && backgroundImage && (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--ink)]/70 to-[var(--ink)]/40" />
        </>
      )}

      <div className={`site-container ${variant === "image" ? "relative z-10" : ""}`}>
        <ScrollReveal animation="fade-in">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="mb-4"
              style={{
                ...(isDark ? { color: "#fff" } : {}),
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              }}
            >
              {heading}
            </h2>

            {supportingText && (
              <p
                className="mb-6 text-[1.0625rem]"
                style={isDark ? { color: "rgba(255,255,255,0.65)", fontWeight: 300 } : { color: "var(--stone)", fontWeight: 300 }}
              >
                {splitSentences(supportingText).map((s, i) => (
                  <span key={i} style={{ display: "block" }}>{s}</span>
                ))}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {onButtonClick ? (
                <Button className={btnClasses} onClick={onButtonClick}>
                  {buttonText}
                </Button>
              ) : buttonHref ? (
                <a href={buttonHref}>
                  <Button className={btnClasses}>{buttonText}</Button>
                </a>
              ) : null}

              <a
                href="tel:0467634565"
                className="text-[15px] transition-colors"
                style={{ color: isDark ? "rgba(255,255,255,0.5)" : "var(--stone)", fontWeight: 300 }}
              >
                or call Chris on <span className="underline underline-offset-2" style={{ color: isDark ? "var(--sand)" : "var(--hills)", fontWeight: 400 }}>0467 634 565</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
