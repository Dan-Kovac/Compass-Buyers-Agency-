import React from "react";
import { Acquisition } from "@/entities/Acquisition";
import { TeamMember } from "@/entities/TeamMember";
import { Home, Bed, Bath, Car } from "lucide-react";
import { createPageUrl } from "@/utils";

export default function AcquisitionDetail() {
  const [item, setItem] = React.useState(null);
  const [agent, setAgent] = React.useState(null);
  const [similarByArea, setSimilarByArea] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  React.useEffect(() => {
    (async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);

      let rec = null;
      try {
        const list = await Acquisition.filter({ id }, "-updated_date", 1);
        rec = list && list.length ? list[0] : null;
        setItem(rec);
      } catch (err) {
        console.error("Failed to load acquisition:", err);
        setItem(null);
      }
      
      if (rec) {
        document.title = rec.title || "Acquisition Details";
        
        // Fetch similar by area (with error handling)
        if (rec.suburb) {
          const byArea = await Acquisition.filter(
            { suburb: rec.suburb, status: "published" },
            "-purchase_date",
            4
          );
          setSimilarByArea((byArea || []).filter((a) => a.id !== rec.id).slice(0, 3));
        }
        
        // Try to match agent with TeamMember (with error handling)
        if (rec.agent) {
          const teamMembers = await TeamMember.list("-updated_date", 50);
          const match = (teamMembers || []).find(
            (tm) => tm.active !== false && (
              tm.name.toLowerCase().includes(rec.agent.toLowerCase()) || 
              rec.agent.toLowerCase().includes(tm.name.toLowerCase())
            )
          );
          setAgent(match || null);
        }
      }
      
      setLoading(false);
    })();
  }, [id]);

  if (loading) {
    return (
      <div className="site-container py-12">
        <div className="rounded-token border border-[var(--border)] bg-white p-8">
          Loading...
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="site-container py-12">
        <div className="rounded-token border border-[var(--border)] bg-white p-8">
          <h2 className="text-2xl font-semibold mb-4">Acquisition not found</h2>
          <p className="text-gray-600 mb-6">The property you're looking for doesn't exist or has been removed.</p>
          <a href={createPageUrl("Acquisitions")} className="text-[var(--hills)] hover:underline">
            ← Back to all acquisitions
          </a>
        </div>
      </div>
    );
  }

  const priceDisplay = item.price_display || (
    typeof item.purchase_price === "number" 
      ? `$${item.purchase_price.toLocaleString()}` 
      : "Contact for price"
  );

  return (
    <div className="bg-white min-h-screen">
      {/* Simple header bar */}
      <div className="border-b border-gray-200">
        <div className="site-container py-4">
          <a 
            href={createPageUrl("Acquisitions")} 
            className="text-xs uppercase tracking-wider text-gray-500 hover:text-[var(--hills)] transition-colors"
          >
            ← Back to Acquisitions
          </a>
        </div>
      </div>

      {/* Main content */}
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="max-w-6xl mx-auto">
            {/* Two column layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              {/* Left column: specs and info */}
              <div className="space-y-8">
                {/* Title */}
                <h1 className="mb-0">{item.title}</h1>

                {/* Price */}
                <div className="text-3xl font-semibold text-[var(--ink)]">
                  {priceDisplay}
                </div>

                {/* Property specs with icons */}
                <div className="flex flex-wrap gap-6 pb-6 border-b border-gray-200">
                  {typeof item.beds === "number" && (
                    <div className="flex items-center gap-2">
                      <Bed className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{item.beds}</span>
                    </div>
                  )}
                  {typeof item.baths === "number" && (
                    <div className="flex items-center gap-2">
                      <Bath className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{item.baths}</span>
                    </div>
                  )}
                  {typeof item.cars === "number" && (
                    <div className="flex items-center gap-2">
                      <Car className="w-5 h-5 text-gray-400" />
                      <span className="text-gray-700">{item.cars}</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                {item.excerpt && (
                  <div className="text-gray-700 leading-relaxed">
                    {item.excerpt}
                  </div>
                )}

                {/* Realestate.com link */}
                {item.realestate_link && (
                  <div className="pt-6 border-t border-gray-200">
                    <a
                      href={item.realestate_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-[var(--hills)] hover:text-[var(--hills)]/80 transition-colors font-medium"
                    >
                      View on Realestate.com.au
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  </div>
                )}

                {/* Agent info */}
                {item.agent && (
                  <div className="pt-6 border-t border-gray-200">
                    <div className="uppercase text-xs tracking-wider text-gray-500 mb-4">
                      Bought by {item.agent}
                    </div>
                    {agent ? (
                      <div className="flex items-start gap-4">
                        {agent.photo && (
                          <img
                            src={agent.photo}
                            alt={agent.name}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                        )}
                        <div>
                          <div className="font-semibold text-[var(--ink)] mb-1">
                            {agent.name}
                          </div>
                          {agent.phone && (
                            <div className="text-sm text-gray-600 mb-0.5">
                              {agent.phone}
                            </div>
                          )}
                          {agent.email && (
                            <a 
                              href={`mailto:${agent.email}`}
                              className="text-sm text-gray-600 hover:text-[var(--hills)] transition-colors"
                            >
                              {agent.email}
                            </a>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-gray-600">{item.agent}</div>
                    )}
                  </div>
                )}
              </div>

              {/* Right column: image */}
              <div className="lg:sticky lg:top-24">
                {item.main_image_url && (
                  <div className="aspect-[4/3] rounded-[20px] overflow-hidden surface p-0">
                    <img
                      src={item.main_image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar acquisitions by area */}
      {similarByArea.length > 0 && (
        <section className="py-12 border-t border-gray-200">
          <div className="site-container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-xl font-semibold mb-8">
                More of our acquisitions in {item.suburb}
              </h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarByArea.map((acq) => (
                  <a
                    key={acq.id}
                    href={createPageUrl(`AcquisitionDetail?id=${acq.id}`)}
                    className="surface overflow-hidden rounded-token group"
                  >
                    <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                      {acq.main_image_url && (
                        <img
                          src={acq.main_image_url}
                          alt={acq.title}
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="p-4">
                      <div className="text-sm text-gray-500 mb-1">{acq.suburb}</div>
                      <h3 className="text-lg font-semibold truncate group-hover:text-[var(--hills)] transition-colors">
                        {acq.title}
                      </h3>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
