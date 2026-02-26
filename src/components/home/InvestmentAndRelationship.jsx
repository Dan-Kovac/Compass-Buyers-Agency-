import React from "react";
import { CheckCircle } from "lucide-react";

export default function InvestmentAndRelationship() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="site-container">
        {/* Single row: Image left, copy right */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Northern Rivers image */}
          <div className="aspect-[4/3] rounded-[20px] overflow-hidden surface">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8be7777cb_ChrisCompass.jpg"
              alt="Chris from Compass Buyers Agency speaking with a client"
              className="w-full h-full object-cover object-center"
              loading="lazy" />

          </div>

          {/* Relationship-first copy (no emoji/icon) */}
          <div>
            <h3 className="bg-slate-50 mb-3 text-2xl">A Relationship‑First Approach</h3>
            <p className="text-gray-700 mb-4">Your partners for the full journey - not just the transaction. Expect transparent advice, streamlined communication and support from initial consult to settlement.


            </p>
            <ul className="text-gray-700 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[var(--hills)] mt-[2px]" />
                Tailored guidance for first‑home buyers and investors
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[var(--hills)] mt-[2px]" />
                Clear, timely updates you can rely on
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-[var(--hills)] mt-[2px]" />
                End‑to‑end coordination with trusted local partners
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>);

}
