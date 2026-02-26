import React from "react";
import { SiteSettings } from "@/entities/SiteSettings";
import { createPageUrl } from "@/utils";
import ReviewsBadge from "../shared/ReviewsBadge";

export default function LandingHero({ title, subtitle }) {
  const [brand, setBrand] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const list = await SiteSettings.list();
        setBrand(list[0] || null);
      } catch (err) {
        console.warn("Could not load site settings for landing hero");
        setBrand(null);
      }
    })();
  }, []);

  return (
    <section className="relative min-h-[60vh] md:min-h-[78vh] flex items-center overflow-hidden mx-3 sm:mx-4 md:mx-6 lg:mx-8 mt-2 md:mt-5" style={{ borderRadius: 'var(--radius-xl)' }}>
      {/* Background */}
      {brand?.hero_background_video_url ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={brand.hero_background_video_url}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${
              brand?.hero_background_image_url ||
              "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop"}')`
          }}
          aria-hidden="true"
        />
      )}

      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent" />
      </div>

      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
          <div className="max-w-3xl" style={{ "--h1-mb": "20px" }}>
            <div className="mb-3">
              <ReviewsBadge />
            </div>
            <h1 className="text-white leading-[1.03] drop-shadow-[0_3px_8px_rgba(0,0,0,0.6)] font-normal text-4xl sm:text-6xl md:text-7xl line-clamp-2">
              {title || "Property Acquisition Experts"}
            </h1>
            {subtitle && (
              <p className="text-white/90 text-base sm:text-lg md:text-lg mb-0 leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)] text-balance">
                {subtitle}
              </p>
            )}
            <div className="mt-4">
              <a href={createPageUrl("Contact")} className="inline-flex items-center text-white/95 hover:text-white underline underline-offset-4 decoration-white/50 hover:decoration-white">
                Book a Free Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
