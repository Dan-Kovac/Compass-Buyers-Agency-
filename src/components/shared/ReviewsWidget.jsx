import React from "react";

export default function ReviewsWidget({
  widgetId = "b67ca6e7-8523-4a85-8919-37723f9a74c6",
  domain = "a8v.app.embedmyreviews.com",
}) {
  React.useEffect(() => {
    const t = document;
    const load = () => {
      if (window.EMRPixel) return; // already loaded elsewhere
      const s = t.createElement("script");
      s.defer = true;
      s.src = `https://cdn2.revw.me/js/pixel.js?t=${864e5 * Math.ceil(Date.now() / 864e5)}`;
      const first = t.getElementsByTagName("script")[0];
      if (first) {
        first.parentNode.insertBefore(s, first);
      } else {
        (t.head || t.body || t.documentElement).appendChild(s);
      }
      s.onload = () => {
        if (window.EMRPixel) {
          try { window.EMRPixel.init(domain, 3); } catch {}
        }
      };
    };

    if (t.readyState === "interactive" || t.readyState === "complete") {
      load();
    } else {
      t.addEventListener("DOMContentLoaded", load);
      return () => t.removeEventListener("DOMContentLoaded", load);
    }
  }, [domain]);

  // If pixel already present, ensure it's initialized
  React.useEffect(() => {
    if (window.EMRPixel) {
      try { window.EMRPixel.init(domain, 3); } catch {}
    }
  }, [domain]);

  return (
    <div className="w-full">
      {/* EmbedMyReviews slider */}
      <emr-simple-slider widget-id={widgetId}></emr-simple-slider>
    </div>
  );
}
