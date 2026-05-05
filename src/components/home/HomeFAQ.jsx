import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ScrollReveal from "@/components/shared/ScrollReveal";

const DEFAULT_FAQS = [
  {
    q: "What does a buyers agent actually do?",
    a: "We work exclusively for you, the buyer, and never for the seller. That means we search across both on and off-market channels, assess what a property is genuinely worth, negotiate on your behalf, and manage the process all the way through to settlement and beyond. In markets like Byron Bay, the Tweed and the Gold Coast, where 76% of our acquisitions happen off-market and quality homes attract multiple bidders, having someone independent on your side of the table changes what you pay and what you ultimately secure.",
  },
  {
    q: "How much does it cost?",
    a: "Our fees are tailored to the service and the complexity of the brief. There's a modest engagement fee to begin the work, then a success fee on settlement. We're upfront about every cost from the very first conversation. In our experience, most clients find the fee more than pays for itself through a sharper negotiated price, access to a property that was never publicly listed, or catching a costly issue during due diligence.",
  },
  {
    q: "Do you have access to off-market properties?",
    a: "Around 76% of the properties we secure for clients are off-market or pre-market. We've spent decades building relationships with selling agents and local property professionals across Byron Bay, Ballina, the Tweed and the Gold Coast, and our team carries more than 80 years of combined experience between them. In tight markets, that depth of access is often the difference between securing the right home and missing out altogether.",
  },
  {
    q: "Can you help with investment properties?",
    a: "Yes. For investors, we layer rental yields, vacancy data, council zoning and longer-term growth indicators into a strategy built around your goals. We work across the full price spectrum, from sub-$1M entry points in Ballina through to $3M+ prestige homes in Byron Bay. Many of our investor clients are based in Sydney or Melbourne and rely on us as their on-the-ground team in the region.",
  },
  {
    q: "What's the typical process and timeline?",
    a: "It begins with an obligation-free conversation, where we listen carefully to understand exactly what you're looking for and why. From there, we build a tailored shortlist, arrange and attend inspections in person, and provide independent appraisals on each property. Once you find the right home, we negotiate or bid on your behalf and manage every detail through to settlement. Our average engagement runs around 38 days from first call to keys.",
  },
  {
    q: "Can you help if I'm buying from interstate or overseas?",
    a: "Absolutely. A meaningful portion of our work is with buyers relocating from Sydney, Melbourne and overseas. We act as your local eyes and ears, conducting inspections in person, hosting detailed video walkthroughs, coordinating with solicitors and brokers, and managing the entire process remotely. Several recent clients have settled in Byron Bay and Kingscliff without setting foot on the property until after exchange.",
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
