import React from "react";
import { fetchBlogPost } from "@/lib/sanityClient";
import ArticlePreviewFrame from "@/components/detail/ArticlePreviewFrame";
import RelatedBlogs from "@/components/detail/RelatedBlogs";
import CaseStudyStatsInline from "@/components/detail/CaseStudyStatsInline";
import CTASection from "@/components/shared/CTASection.jsx";
import ScrollReveal from "@/components/shared/ScrollReveal";
import { createPageUrl } from "@/utils";
import SEOHead from "../components/shared/SEOHead";

export default function BlogPostDetail() {
  const [post, setPost] = React.useState(null);
  const [copied, setCopied] = React.useState(false);
  const [settings] = React.useState({
    layout_variant: "classic",
    hero_aspect: "16:9",
    content_max_width: 820,
    show_badges: true,
    show_excerpt: true,
    show_gallery: false,
    show_related: true,
    related_limit: 3,
    show_meta: true,
    accent_color: "",
    custom_css: "",
  });

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const slug = urlParams.get("slug");

  React.useEffect(() => {
    (async () => {
      if (!id && !slug) return;
      const rec = await fetchBlogPost(id || slug);
      setPost(rec);
      /* SEOHead handles document.title via react-helmet-async */
    })();
  }, [id, slug]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      // ignore
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url: window.location.href, title: post?.title || "" });
      } catch {
        // ignore
      }
    } else {
      handleCopyLink();
    }
  };

  if (!post) {
    return (
      <div className="site-container" style={{ padding: "var(--section-standard) 0" }}>
        <div
          style={{
            background: "white",
            borderRadius: "var(--radius-card)",
            padding: "2rem",
            fontFamily: "var(--font-body)",
            color: "var(--stone)",
          }}
        >
          Loading...
        </div>
      </div>
    );
  }

  const tags = Array.isArray(post.tags) ? post.tags : [];
  const pageUrl = window.location.href;
  const mailtoHref = `mailto:?subject=${encodeURIComponent(post.title || "")}&body=${encodeURIComponent(pageUrl)}`;

  /* Shared button base style for article footer share buttons */
  const shareButtonStyle = {
    fontFamily: "var(--font-body)",
    fontSize: "0.8125rem",
    fontWeight: "var(--font-body-regular)",
    color: "var(--stone)",
    background: "transparent",
    border: "1px solid var(--bright-grey)",
    borderRadius: "var(--radius-button)",
    padding: "0.5rem 1rem",
    minHeight: "36px",
    display: "inline-flex",
    alignItems: "center",
    gap: "0.5rem",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
    textDecoration: "none",
  };

  return (
    <div className="bg-white">
      <SEOHead
        title={post.meta_title || post.title || "Blog | Compass Buyers Agency"}
        description={post.meta_description || post.excerpt || ""}
        ogImage={post.og_image || post.hero_image || undefined}
        ogType="article"
        canonicalPath={`/blog/${post.slug?.current || post.slug || post.id}`}
      />

      {/* Back to Blog nav */}
      <div
        style={{
          background: "white",
          padding: "var(--section-tight) 0",
        }}
      >
        <div className="site-container">
          <a
            href={createPageUrl("Blog")}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: "var(--font-body-regular)",
              color: "var(--stone)",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              textDecoration: "none",
              transition: "color 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--hills)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--stone)";
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="m12 19-7-7 7-7" />
            </svg>
            Back to Blog
          </a>
        </div>
      </div>

      {/* Article content */}
      <section className="bg-white">
        <ArticlePreviewFrame data={post} settings={settings} type="blog" />
      </section>

      {/* Inline stats row for migrated case studies */}
      {(post.property_type || post.location || post.timeframe || post.purchase_price) && (
        <CaseStudyStatsInline
          property_type={post.property_type}
          location={post.location}
          timeframe={post.timeframe}
          purchase_price={post.purchase_price}
        />
      )}

      {/* Article Footer: Tags + Share */}
      {(tags.length > 0 || true) && (
        <ScrollReveal>
          <div className="site-container">
            <div
              className="mx-auto"
              style={{
                maxWidth: "820px",
                padding: "2rem 0 0",
                borderTop: "1px solid var(--bright-grey)",
              }}
            >
              <div
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between"
                style={{ gap: "1rem" }}
              >
                {/* Tags (left) */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap" style={{ gap: "0.5rem" }}>
                    {tags.map((t, i) => (
                      <a
                        key={i}
                        href={createPageUrl(`Blog?tag=${encodeURIComponent(t)}`)}
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "0.75rem",
                          fontWeight: "var(--font-body-regular)",
                          color: "var(--stone)",
                          background: "transparent",
                          border: "1px solid var(--bright-grey)",
                          borderRadius: "var(--radius-badge)",
                          padding: "0.25rem 0.75rem",
                          textDecoration: "none",
                          transition: "all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "var(--bright-grey)";
                          e.currentTarget.style.color = "var(--ink)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "transparent";
                          e.currentTarget.style.color = "var(--stone)";
                        }}
                      >
                        {t}
                      </a>
                    ))}
                  </div>
                )}

                {/* Share buttons (right) */}
                <div className="flex items-center flex-wrap" style={{ gap: "0.5rem" }}>
                  <button
                    type="button"
                    onClick={handleShare}
                    style={shareButtonStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--ink)";
                      e.currentTarget.style.color = "var(--ink)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--bright-grey)";
                      e.currentTarget.style.color = "var(--stone)";
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    Share
                  </button>
                  <a
                    href={mailtoHref}
                    style={shareButtonStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--ink)";
                      e.currentTarget.style.color = "var(--ink)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--bright-grey)";
                      e.currentTarget.style.color = "var(--stone)";
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                    Email
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    style={shareButtonStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--ink)";
                      e.currentTarget.style.color = "var(--ink)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--bright-grey)";
                      e.currentTarget.style.color = "var(--stone)";
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                    </svg>
                    {copied ? "Copied" : "Copy link"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Related Articles */}
      {settings.show_related !== false && (
        <RelatedBlogs currentId={post.id} limit={settings.related_limit || 3} />
      )}

      {/* CTA */}
      <CTASection
        heading="Ready to talk to a local buyers agent?"
        buttonText="Book a Free Consultation"
        buttonHref={createPageUrl("Contact")}
        supportingText="We know these suburbs inside out. Let's talk about your goals."
        variant="dark"
      />

      {/* Article JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.meta_title || post.title,
            description: post.meta_description || post.excerpt || "",
            image: post.hero_image || post.og_image || "",
            author: {
              "@type": "Organization",
              name: "Compass Buyers Agency",
              url: "https://compassagency.com.au",
            },
            publisher: {
              "@type": "Organization",
              name: "Compass Buyers Agency",
              logo: {
                "@type": "ImageObject",
                url: "https://compassagency.com.au/logo.png",
              },
            },
            datePublished: post.published_date || post.created_date || "",
            dateModified: post.updated_date || post.published_date || "",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": pageUrl,
            },
          }),
        }}
      />
    </div>
  );
}
