import React from "react";

export default function ReviewsCarousel({
  widgetId = "e65b2de0-61ef-4135-ba66-f00183331fd0",
  domain = "a8v.app.embedmyreviews.com"
}) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const t = document;
    const load = () => {
      if (!window.EMRPixel) {
        const s = t.createElement("script");
        s.defer = true;
        s.src = `https://cdn2.revw.me/js/pixel.js?t=${864e5 * Math.ceil(Date.now() / 864e5)}`;
        const first = t.getElementsByTagName("script")[0];
        if (first) first.parentNode.insertBefore(s, first);
        else (t.head || t.body || t.documentElement).appendChild(s);
        s.onload = () => { if (window.EMRPixel) { try { window.EMRPixel.init(domain, 3); } catch {} setReady(true); } };
      } else {
        try { window.EMRPixel.init(domain, 3); } catch {}
        setReady(true);
      }
    };
    if (t.readyState === "interactive" || t.readyState === "complete") load();
    else {
      t.addEventListener("DOMContentLoaded", load);
      return () => t.removeEventListener("DOMContentLoaded", load);
    }
  }, [domain]);

  // Ensure init if present already
  React.useEffect(() => {
    if (window.EMRPixel) {
      try { window.EMRPixel.init(domain, 3); } catch {}
      setReady(true);
    }
  }, [domain]);

  return (
    <div className="w-full">
      {!ready ? (
        <div className="h-28 w-full rounded-lg border border-[var(--bright-grey)] bg-gray-50 animate-pulse" />
      ) : (
        <emr-simple-carousel widget-id={widgetId}></emr-simple-carousel>
      )}
    </div>
  );
}
