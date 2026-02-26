import React from "react";
import { Button } from "@/components/ui/button";
import EditableImage from "@/components/cms/EditableImage";

export default function FeatureSplit({
  title,
  description,
  image,
  imageAlt,
  imageLeft = false,
  mobileImageFirst = false,
  variant = "white",
  ctaLabel,
  ctaHref,
  mediaKey,
}) {
  const bg = variant === "bright" ? "bg-[var(--bright-grey)]" : "bg-white";

  return (
    <section className={`py-16 md:py-20 ${bg}`}>
      <div className="site-container">
        <div className={`grid lg:grid-cols-2 gap-10 items-center ${imageLeft ? "lg:grid-flow-dense" : ""}`}>
          <div className={`${imageLeft ? "lg:col-start-2" : ""} ${mobileImageFirst ? "order-first lg:order-none" : ""}`}>
            <div className="aspect-[4/3] rounded-token overflow-hidden border border-[var(--border)]">
              <EditableImage
                src={image || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop"}
                alt={imageAlt || title}
                mediaKey={mediaKey}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className={imageLeft ? "lg:col-start-1 lg:row-start-1" : ""}>
            <h2 className="mb-4">{title}</h2>
            <p className="text-gray-700 whitespace-pre-line leading-relaxed">{description}</p>
            {ctaLabel && ctaHref && (
              <div className="mt-6">
                <a href={ctaHref}>
                  <Button className="btn-cta bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white">
                    {ctaLabel}
                  </Button>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
