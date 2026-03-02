import React from "react";

const RevealContext = React.createContext(null);

/**
 * ScrollReveal — lightweight scroll-triggered animation wrapper.
 *
 * Props:
 *   animation  "fade-up" | "fade-in" | "fade-left" | "fade-right"  (default: "fade-up")
 *   delay      number in ms (default: 0)
 *   duration   number in ms (default: 600)
 *   threshold  0-1 visibility ratio to trigger (default: 0.15)
 *   once       boolean — animate only once (default: true)
 *   stagger    number in ms — auto-delay for children inside StaggerGroup
 *   as         element type (default: "div")
 *   className  extra classes
 *   style      extra inline styles
 *   children
 */
export default function ScrollReveal({
  animation = "fade-up",
  delay = 0,
  duration = 1200,
  threshold = 0.15,
  once = true,
  as: Tag = "div",
  className = "",
  style = {},
  children,
  ...rest
}) {
  const ref = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const staggerDelay = React.useContext(RevealContext);

  const totalDelay = delay + (staggerDelay || 0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  return (
    <Tag
      ref={ref}
      className={`sr sr-${animation} ${visible ? "sr-visible" : ""} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${totalDelay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/**
 * StaggerGroup — wraps children and auto-assigns incremental delay.
 * Each direct ScrollReveal child receives stagger * index delay.
 */
export function StaggerGroup({ stagger = 150, children }) {
  return React.Children.map(children, (child, i) => (
    <RevealContext.Provider value={i * stagger}>
      {child}
    </RevealContext.Provider>
  ));
}
