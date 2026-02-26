import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function HomeFAQ() {
  const faqs = [
    {
      q: "What is a Buyers Agent?",
      a: "A Buyers Agent (buyers advocate) is a licensed professional who searches, evaluates, and negotiates property on behalf of the buyer, working exclusively for the buyer's interests."
    },
    {
      q: "Why should I use a Buyers Agent?",
      a: "We can save you time and money with local knowledge, access to off-market properties, and expert negotiation, reducing stress and complexity."
    },
    {
      q: "What's the difference between a Buyers Agent and a Selling Agent?",
      a: "A Buyers Agent represents the buyer and is paid by the buyer; a Selling Agent represents the seller and acts in the vendor’s best interests."
    },
    {
      q: "What services do Buyers Agents provide?",
      a: "Full property search, appraisal and negotiation, auction bidding, vendor advocacy, development sourcing, and property management guidance."
    },
    {
      q: "How much does a Buyers Agent cost?",
      a: "Fees vary by service and complexity, typically an engagement fee plus a success fee, either fixed or a percentage of the price."
    },
    {
      q: "Can Buyers Agents help with investment properties?",
      a: "Yes. We identify, evaluate, and negotiate investment properties using data and market insights to target high‑growth opportunities."
    },
    {
      q: "Do Buyers Agents have access to off‑market properties?",
      a: "Yes. Our agent network and industry contacts give access to properties not publicly listed, especially valuable in competitive markets."
    },
    {
      q: "How do I choose the right Buyers Agent?",
      a: "Look for strong reputation, local expertise, independence, transparent research systems, and proven negotiation capability."
    },
    {
      q: "Can Buyers Agents help overseas buyers?",
      a: "Absolutely. We regularly assist expat and overseas buyers with end‑to‑end guidance and compliance with local regulations."
    },
    {
      q: "What is the typical process?",
      a: "Initial consultation, tailored search, evaluations and appraisals, negotiation and securing the property, then guiding you to settlement."
    }
  ];

  // Split into two columns
  const mid = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, mid);
  const right = faqs.slice(mid);

  return (
    // Added mb-16 to create white space between grey section and footer
    <section className="py-16 md:py-20 bg-[var(--bright-grey)] mb-16">
      <div className="site-container">
        <h2 className="text-3xl md:text-4xl mb-6 text-center">Frequently Asked Questions</h2>

        {/* Two accordions side-by-side on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {left.map((f, idx) => (
              <AccordionItem key={`left-${idx}`} value={`left-${idx}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            {right.map((f, idx) => (
              <AccordionItem key={`right-${idx}`} value={`right-${idx}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent className="text-gray-700 leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
