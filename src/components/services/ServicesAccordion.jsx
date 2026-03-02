import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function ServicesAccordion({ items = [], defaultOpenFirst = true }) {
  const firstId = items.length ? `item-0` : undefined;
  return (
    <div className="max-w-4xl mx-auto">
      <Accordion type="single" collapsible defaultValue={defaultOpenFirst ? firstId : undefined} className="space-y-4">
        {items.map((it, idx) => (
          <AccordionItem
            key={idx}
            value={`item-${idx}`}
            className="border border-[var(--border)] rounded-token px-5 sm:px-6"
          >
            <AccordionTrigger className="py-5 sm:py-6 text-left items-center">
              <span className="text-lg sm:text-xl font-medium">{it.title}</span>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-6 text-[var(--ink)]/70 text-sm sm:text-base leading-relaxed whitespace-pre-line">
              {it.body}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
