import React from "react";

export default function ReviewsBadge({
  widgetId = "043fb842-b0c8-4f83-9e10-2d153e3ab265",
  domain = "a8v.app.embedmyreviews.com",
}) {
  const containerRef = React.useRef(null);
  React.useEffect(() => {
    const t = document;
    const load = () => {
      if (window.EMRPixel) return; // already loaded
      const s = t.createElement("script");
      s.defer = true;
      s.src = `https://cdn2.revw.me/js/pixel.js?t=${864e5 * Math.ceil(Date.now() / 864e5)}`;
      const first = t.getElementsByTagName("script")[0];
      if (first) first.parentNode.insertBefore(s, first);
      else (t.head || t.body || t.documentElement).appendChild(s);
      s.onload = () => {
        if (window.EMRPixel) {
          try { window.EMRPixel.init(domain, 3); } catch {}
        }
      };
    };

    if (t.readyState === "interactive" || t.readyState === "complete") load();
    else {
      t.addEventListener("DOMContentLoaded", load);
      return () => t.removeEventListener("DOMContentLoaded", load);
    }
  }, [domain]);

  React.useEffect(() => {
    if (window.EMRPixel) {
      try { window.EMRPixel.init(domain, 3); } catch {}
    }
  }, [domain]);

  // Force transparent background and white text inside the badge (including shadow DOM when possible)
  React.useEffect(() => {
    const applyStyles = () => {
      const root = containerRef.current;
      if (!root) return;
      const el = root.querySelector('emr-simple-badge');
      if (!el) return;
      try {
        el.style.background = 'transparent';
        el.style.setProperty('background-color', 'transparent', 'important');
        el.style.boxShadow = 'none';
        el.style.color = '#fff';
        if (el.shadowRoot) {
          let style = el.shadowRoot.querySelector('style[data-inject="emr-override"]');
          if (!style) {
            style = document.createElement('style');
            style.setAttribute('data-inject', 'emr-override');
            el.shadowRoot.appendChild(style);
          }
          style.textContent = `
            :host { background: transparent !important; background-color: transparent !important; box-shadow: none !important; }
            /* Make all inner wrappers transparent by default */
            *, .emr-root, .emr-wrapper, .emr-container, .emr-badge, .emr-card {
              background: transparent !important;
              background-color: transparent !important;
              box-shadow: none !important;
            }
            /* Text and numbers to white */
            .emr-stars, .emr-rating, .emr-count, span, p, div { color: #fff !important; }
            /* Stars only to white (avoid recoloring provider logos) */
            .emr-stars svg, .emr-stars path, .emr-stars polygon { fill: #fff !important; color: #fff !important; }
            /* Re-apply white only to Google provider icon container */
            [aria-label*="Google"], img[alt*="Google"], [title*="Google"] {
              background: #fff !important;
              background-color: #fff !important;
              border-radius: 9999px !important;
            }
            [aria-label*="Google"] circle, [title*="Google"] circle { fill: #fff !important; }
          `;
          // Make only the Google icon container white (keep badge transparent)
          try {
            const iconCandidates = el.shadowRoot.querySelectorAll('img[alt*="Google"], [aria-label*="Google"] img, svg[aria-label*="Google"]');
            iconCandidates.forEach((node) => {
              const target = node.closest('[class*="icon"], [class*="logo"]') || node;
              target.style.background = '#fff';
              target.style.borderRadius = '9999px';
              target.style.boxShadow = 'none';
            });
          } catch {}

        }
      } catch {}
    };
    applyStyles();
    const id = setInterval(applyStyles, 800);
    return () => clearInterval(id);
  }, []);

  return (
    <div ref={containerRef} className="inline-block text-white">
      <emr-simple-badge
        widget-id={widgetId}
        style={{
          display: "inline-block",
          background: "transparent",
          backgroundColor: "transparent",
          boxShadow: "none",
          color: "#fff"
        }}
      ></emr-simple-badge>
    </div>
  );
}
