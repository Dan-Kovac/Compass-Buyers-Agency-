import React from "react";
import { CaseStudy } from "@/entities/CaseStudy";
import { TemplateSettings } from "@/entities/TemplateSettings";
import { Button } from "@/components/ui/button";
import { createPageUrl } from "@/utils";
import { Link } from "react-router-dom";
import ShareBar from "@/components/detail/ShareBar"; // This import can remain, as it's not rendered
import MetaRow from "@/components/detail/MetaRow";
import RightRailList from "@/components/detail/RightRailList"; // This import can remain, as it's not rendered
import RelatedCaseStudies from "@/components/detail/RelatedCaseStudies";
import { Badge } from "@/components/ui/badge";
import KeyStatsTable from "@/components/detail/KeyStatsTable";

const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1523217582562-09d0def993a6?q=80&w=1600&auto=format&fit=crop";

export default function CaseStudyDetail() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const source = params.get("source");
  const [item, setItem] = React.useState(null);
  const [tpl, setTpl] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      const found = await CaseStudy.filter({ id }, "-updated_date", 1);
      const cs = found && found.length ? found[0] : null;
      setItem(cs);
      const settings = await TemplateSettings.filter({ template_type: "case_study" }, "-updated_date", 1);
      setTpl(settings && settings.length ? settings[0] : null);
      // Minimal per-item SEO
      if (cs?.meta_title) document.title = cs.meta_title;
      else if (cs?.title) document.title = cs.title;
    })();
  }, [id]);

  if (!item) {
    return (
      <div className="site-container py-16">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  const accent = tpl?.accent_color || "var(--hills)";
  const maxW = tpl?.content_max_width ? `${tpl.content_max_width}px` : "760px";
  const url = typeof window !== "undefined" ? window.location.href : "";

  return (
    <div className="bg-white">
      <section className="site-container py-8 md:py-10">
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500">Case Study</div>
          {source && (
            <Link to={createPageUrl("CMSManager?collection=case_studies")} className="text-sm text-[var(--hills)] hover:underline">
              Back to CMS
            </Link>
          )}
        </div>

        {/* Center content: replace 3-col grid with a centered max-width container */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-[var(--ink)] leading-[1.1] mb-2">
              {item?.title}
            </h1>

            {/* Excerpt under title */}
            {item?.excerpt && (
              <p className="text-gray-600 text-lg mb-4">
                {item.excerpt}
              </p>
            )}

            {/* REPLACE badges with minimal Key Stats table under the title */}
            <KeyStatsTable
              location={item.location}
              clientName={item.client_name}
              clientType={item.client_type}
              timeframe={item.timeframe}
              purchasePrice={item.purchase_price}
              propertyType={item.property_type}
            />

            {/* Meta row (date only) */}
            <div className="mt-3">
              <MetaRow
                type="case_study"
                createdDate={item.created_date}
                author={null}
                location={undefined}
                propertyType={undefined}
                clientType={undefined}
                accent={tpl?.accent_color}
              />
            </div>

            {/* Removed Share buttons per request */}
            {/* <ShareBar url={url} /> */}
            <div className="mt-2 mb-4" />

            {/* Hero image card with placeholder fallback */}
            <div className="surface overflow-hidden mb-6">
              <img
                src={item.featured_image || PLACEHOLDER_IMG}
                alt={item.title}
                className="w-full h-auto object-cover"
                onError={(e) => {
                  // Fixed typo: changed PLACEHELDER_IMG to PLACEHOLDER_IMG
                  if (e.currentTarget.src !== PLACEHOLDER_IMG) e.currentTarget.src = PLACEHOLDER_IMG;
                }}
              />
            </div>

            {/* Content */}
            <article
              className="prose-custom"
              style={{ maxWidth: maxW }}
              dangerouslySetInnerHTML={{ __html: item.content || "" }}
            />

            {/* Related case studies (3-card grid) */}
            <RelatedCaseStudies currentId={item.id} />
          </div>
        </div>

        {/* Removed 'Most viewed' per previous request */}
        {/* <div className="lg:col-span-1"><RightRailList ... /></div> */}
      </section>

      <style>{`
        .prose-custom h2 { font-size: 1.5rem; line-height: 1.3; margin: 1.25rem 0 .5rem; font-weight: 600; }
        .prose-custom h3 { font-size: 1.25rem; line-height: 1.35; margin: 1rem 0 .25rem; font-weight: 600; }
        .prose-custom p { color: #334155; margin-bottom: 1rem; }
        .prose-custom ul, .prose-custom ol { margin: .75rem 0 .75rem 1.25rem; color: #334155;}
        .prose-custom a { color: ${accent}; text-decoration: underline; }
        .prose-custom img { border-radius: 12px; margin: .75rem 0; }
        @media (min-width: 1024px) {
          .prose-custom { font-size: 1.0625rem; }
        }
      `}</style>
    </div>
  );
}
