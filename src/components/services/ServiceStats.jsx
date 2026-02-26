import React from "react";
import { TrendingUp, Clock, Award } from "lucide-react";

export default function ServiceStats({
  items = [
    { icon: TrendingUp, value: "30+ Yrs", label: "Combined Experience" },
    { icon: Clock, value: "50% Faster", label: "Average Time to Secure" },
    { icon: Award, value: "100%", label: "Independent Representation" },
  ],
}) {
  return (
    <section className="py-10 md:py-12 bg-white">
      <div className="site-container">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {items.map(({ icon: Icon, value, label }, i) => (
            <div key={i} className="surface rounded-token p-6 border border-[var(--border)] bg-white flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[var(--sea-breeze)]/60 flex items-center justify-center shrink-0">
                <Icon className="w-6 h-6 text-[var(--hills)]" />
              </div>
              <div>
                <div className="text-2xl font-semibold">{value}</div>
                <div className="text-gray-600">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
