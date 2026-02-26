import React from "react";
import { Button } from "@/components/ui/button";
import ReviewsCarousel from "./ReviewsCarousel";

// Simple CTA section with optional reviews slider
export default function CTASection({
  heading = "Ready to get started?",
  supportingText,
  buttonText = "Get in touch",
  buttonHref,
  onButtonClick,
  showReviewsCarousel = false,
}) {
  return (
    <section className="py-12 md:py-16">
      <div className="site-container">
        <div className="p-6 md:p-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-2">{heading}</h2>
            {supportingText && (
              <p className="text-gray-600 mb-5 md:mb-6">{supportingText}</p>
            )}

            {onButtonClick ? (
              <Button
                className="btn-cta bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white"
                onClick={onButtonClick}
              >
                {buttonText}
              </Button>
            ) : buttonHref ? (
              <a href={buttonHref}>
                <Button className="btn-cta bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white">
                  {buttonText}
                </Button>
              </a>
            ) : null}
          </div>

          {showReviewsCarousel ? (
            <div className="mt-6 md:mt-8">
              <ReviewsCarousel />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
