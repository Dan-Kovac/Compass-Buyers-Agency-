import React from "react";
import { CheckCircle } from "lucide-react";

const DEFAULT_CHECKLIST = [
  "Tailored guidance for first‑home buyers and investors",
  "Clear, timely updates you can rely on",
  "End‑to‑end coordination with trusted local partners",
];

export default function InvestmentAndRelationship({
  heading = "A Relationship‑First Approach",
  body = "Your partners for the full journey - not just the transaction. Expect transparent advice, streamlined communication and support from initial consult to settlement.",
  imageUrl = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8be7777cb_ChrisCompass.jpg",
  imageAlt = "Chris from Compass Buyers Agency speaking with a client",
  checklist = DEFAULT_CHECKLIST,
} = {}) {
  const items = checklist && checklist.length > 0 ? checklist : DEFAULT_CHECKLIST;

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="site-container">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Image */}
          <div className="aspect-[4/3] rounded-[20px] overflow-hidden surface">
            <img
              src={imageUrl}
              alt={imageAlt}
              className="w-full h-full object-cover object-center"
              loading="lazy" />
          </div>

          {/* Copy */}
          <div>
            <h3 className="bg-slate-50 mb-3 text-2xl">{heading}</h3>
            <p className="text-gray-700 mb-4">{body}</p>
            <ul className="text-gray-700 space-y-2">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-[var(--hills)] mt-[2px]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
