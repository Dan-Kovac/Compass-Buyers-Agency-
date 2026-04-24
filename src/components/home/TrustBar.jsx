import React from "react";

const STATS = [
  { end: 80, suffix: "+", label: "Years Combined Experience" },
  { end: 3.6, prefix: "$", suffix: "B", label: "Transacted", decimals: 1 },
  { end: 74, suffix: "%", label: "Off Market Transactions" },
  { static: true, value: "#1 in 2025", label: "Agency in Northern NSW & Gold Coast" },
];

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
            const raw = eased * end;
            setCount(decimals > 0 ? parseFloat(raw.toFixed(decimals)) : Math.round(raw));
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
  const { count, ref } = useCountUp(stat.end || 0, 2000, stat.decimals || 0);

  const displayValue = stat.static
    ? stat.value
    : `${stat.prefix || ""}${stat.decimals ? count.toFixed(stat.decimals) : count}${stat.suffix || ""}`;

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center py-8 md:py-10 ${
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
        }}
      >
        {displayValue}
      </span>
      <span
        className="block text-center"
        style={{
          fontFamily: "var(--font-body)",
          fontWeight: 300,
          fontSize: "0.8125rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "rgba(255, 255, 255, 0.55)",
          maxWidth: "14ch",
        }}
      >
        {stat.label}
      </span>
    </div>
  );
}

export default function TrustBar({ stats }) {
  const data = stats || STATS;
  return (
    <section style={{ backgroundColor: "var(--ink)" }}>
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
