import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function InfoSplit({
  title,
  description,
  bullets = [],
  imageUrl,
  imageAlt = "",
  imageSide = "right",
}) {
  const imageFirst = imageSide === "left";
  return (
    <section className="py-10 md:py-14 bg-white">
      <div className="site-container">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
          {imageFirst && (
            <div className="rounded-token overflow-hidden surface p-0">
              <div className="aspect-[16/10] md:aspect-[4/3]">
                <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          )}

          <div className="surface p-6 md:p-8 rounded-token">
            {title && <h2 className="mb-2">{title}</h2>}
            {description && <p className="text-gray-700 mb-4">{description}</p>}
            {bullets?.length > 0 && (
              <ul className="space-y-2">
                {bullets.map((b, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-[var(--hills)] mt-0.5 shrink-0" />
                    <span className="text-[var(--ink)]/90">{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {!imageFirst && (
            <div className="rounded-token overflow-hidden surface p-0">
              <div className="aspect-[16/10] md:aspect-[4/3]">
                <img src={imageUrl} alt={imageAlt} className="w-full h-full object-cover" loading="lazy" />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
