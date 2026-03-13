import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollReveal from "@/components/shared/ScrollReveal";

const DEFAULT_FAQS = [
  {
    q: "What does a buyers agent actually do?",
    a: "We work exclusively for you. We search properties on and off market, evaluate what they're genuinely worth, negotiate on your behalf, and manage the process through to settlement. In markets like Byron Bay and the Gold Coast, where 42% of deals happen off-market and quality listings attract multiple bidders, that independent representation changes what you pay and what you get.",
  },
  {
    q: "How much does it cost?",
    a: "Our fees depend on the service and complexity. There's a small engagement fee to begin, then a success fee when we secure your property. We're upfront about costs from the first conversation. Most clients find the fee pays for itself through a better price, off-market access, or catching a costly issue during due diligence.",
  },
  {
    q: "Do you have access to off-market properties?",
    a: "Around 42% of the properties we've secured were off-market or pre-market. We've built relationships with selling agents across Byron, Ballina, Tweed, and the Gold Coast over 15 years of repeat business. In tight markets, that access often determines whether you secure or miss out.",
  },
  {
    q: "Can you help with investment properties?",
    a: "We analyse rental yields, vacancy rates, council zoning, and growth indicators across the region. We cover everything from sub-$1M entry points in Ballina to $3M+ prestige in Byron Bay. Many of our investor clients are based in Sydney or Melbourne and rely on us as their local eyes and ears.",
  },
  {
    q: "What's the typical process and timeline?",
    a: "It starts with a free consultation where we learn what you're looking for. From there, we build a shortlist, arrange inspections, and provide appraisals. When you find the right property, we negotiate or bid on your behalf and manage everything through to settlement. Most clients go from first call to keys in four to eight weeks.",
  },
  {
    q: "Can you help if I'm buying from interstate or overseas?",
    a: "We regularly work with buyers relocating from Sydney, Melbourne, and overseas. We handle inspections via video walkthroughs, coordinate with solicitors, and manage the entire process remotely. Several recent clients settled in Byron Bay and Kingscliff without visiting until after exchange.",
  },
];

export default function HomeFAQ({
  heading = "Frequently Asked Questions",
  faqItems,
} = {}) {
  const faqs = (faqItems && faqItems.length > 0)
    ? faqItems.map(f => ({ q: f.question, a: f.answer }))
    : DEFAULT_FAQS;

  const mid = Math.ceil(faqs.length / 2);
  const left = faqs.slice(0, mid);
  const right = faqs.slice(mid);

  return (
    <section className="bg-white" style={{ padding: "var(--section-padding) 0" }}>
      <div className="site-container">
        <ScrollReveal className="text-center mb-12 md:mb-16">
          <p className="eyebrow-label">Common Questions</p>
          <h2>{heading}</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-0 max-w-5xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {left.map((f, idx) => (
              <AccordionItem key={`left-${idx}`} value={`left-${idx}`}>
                <AccordionTrigger className="text-left text-[1.0625rem]" style={{ fontWeight: 500, lineHeight: 1.4 }}>{f.q}</AccordionTrigger>
                <AccordionContent className="text-[0.9375rem]" style={{ fontWeight: 300, color: "var(--stone)", lineHeight: "1.75" }}>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <Accordion type="single" collapsible className="w-full">
            {right.map((f, idx) => (
              <AccordionItem key={`right-${idx}`} value={`right-${idx}`}>
                <AccordionTrigger className="text-left text-[1.0625rem]" style={{ fontWeight: 500, lineHeight: 1.4 }}>{f.q}</AccordionTrigger>
                <AccordionContent className="text-[0.9375rem]" style={{ fontWeight: 300, color: "var(--stone)", lineHeight: "1.75" }}>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
