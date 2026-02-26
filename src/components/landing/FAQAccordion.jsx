import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Minus, Plus } from "lucide-react";

export default function FAQAccordion({ items = [] }) {
  return (
    <div className="surface p-5 md:p-6 rounded-token">
      <Accordion type="single" collapsible className="space-y-3">
        {items.map((it, idx) => (
          <AccordionItem key={idx} value={`faq-${idx}`} className="border border-[var(--border)] rounded-token px-4 bg-white">
            <AccordionTrigger className="py-4 text-left items-start group [&>svg]:hidden no-underline hover:no-underline">
              <div className="flex w-full items-center justify-between">
                <span className="text-lg font-medium text-[var(--ink)]">{it.question}</span>
                <div className="ml-4 shrink-0 text-[var(--ink)]/60">
                  <Plus className="w-5 h-5 group-data-[state=open]:hidden" />
                  <Minus className="w-5 h-5 hidden group-data-[state=open]:block" />
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pt-0 pb-4 text-[var(--ink)]/80">
              {Array.isArray(it.bullets) && it.bullets.length > 0 ? (
                <ul className="list-disc ml-5 space-y-1">
                  {it.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : (
                <p>{it.answer}</p>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
