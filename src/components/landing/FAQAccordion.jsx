import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollReveal from "@/components/shared/ScrollReveal";

export default function FAQAccordion({ items = [] }) {
  const mid = Math.ceil(items.length / 2);
  const left = items.slice(0, mid);
  const right = items.slice(mid);

  const renderItem = (it, idx, prefix) => (
    <AccordionItem key={`${prefix}-${idx}`} value={`${prefix}-${idx}`}>
      <AccordionTrigger
        className="text-left"
        style={{ fontWeight: "var(--font-body-medium)" }}
      >
        {it.question}
      </AccordionTrigger>
      <AccordionContent
        style={{
          fontWeight: "var(--font-body-light)",
          color: "var(--stone)",
          lineHeight: "1.7",
        }}
      >
        {it.answer ? (
          <p>{it.answer}</p>
        ) : Array.isArray(it.bullets) && it.bullets.length > 0 ? (
          <ul className="space-y-1.5">
            {it.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="shrink-0 mt-[2px]" style={{ color: "var(--hills)" }}>—</span>
                {b}
              </li>
            ))}
          </ul>
        ) : null}
      </AccordionContent>
    </AccordionItem>
  );

  return (
    <ScrollReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-0 max-w-5xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {left.map((it, idx) => renderItem(it, idx, "left"))}
        </Accordion>
        <Accordion type="single" collapsible className="w-full">
          {right.map((it, idx) => renderItem(it, idx, "right"))}
        </Accordion>
      </div>
    </ScrollReveal>
  );
}
