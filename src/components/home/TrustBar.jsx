import React from "react";

const STATS = [
  { end: 80, suffix: "", label: "Years Team Experience" },
  { end: 3.6, prefix: "$", suffix: "B", decimals: 1, label: "In Transactions" },
  { end: 76, suffix: "%", label: "Off-Market Purchases" },
  { text: "#1", label: "Buyers Agency, Byron to Gold Coast" },
];

/**
 * useCountUp — animates a number from 0 to `end` when visible.
 * Starts counting once the element enters the viewport.
 */
function useCountUp(end, duration = 2000, decimals = 0) {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const hasAnimated = React.useRef(false);

  React.useEffect(() => {
    if (!ref.current || hasAnimated.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();

          function tick(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const factor = Math.pow(10, decimals);
            setCount(Math.round(eased * end * factor) / factor);
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration, decimals]);

  return { count, ref };
}

function StatItem({ stat, isLast }) {
  const { count, ref } = useCountUp(stat.end ?? 0, 2000, stat.decimals ?? 0);
  const display = stat.text ?? `${stat.prefix || ""}${stat.decimals ? count.toFixed(stat.decimals) : count}${stat.suffix || ""}`;

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center py-8 md:py-10 px-3 ${
        !isLast ? "md:border-r md:border-white/10" : ""
      }`}
    >
      <span
        className="block mb-1"
        style={{
          fontFamily: "var(--font-heading)",
          fontWeight: 400,
          fontSize: "clamp(2rem, 3.5vw, 3rem)",
          letterSpacing: "-0.03em",
          color: "white",
          lineHeight: 1,
          textAlign: "center",
        }}
      >
        {display}
      </span>
      <span
        className="block"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "0.8125rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255, 255, 255, 0.55)",
          textAlign: "center",
        }}
      >
        {stat.label}
      </span>
    </div>
  );
}

/**
 * TrustBar — dark stats bar with count-up animation.
 * Sits between the hero and the editorial content.
 */
export default function TrustBar({ stats }) {
  const data = stats || STATS;
  return (
    <section id="trust" style={{ backgroundColor: "var(--ink)" }}>
      <div className="site-container">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {data.map((stat, i) => (
            <StatItem key={i} stat={stat} isLast={i === data.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
