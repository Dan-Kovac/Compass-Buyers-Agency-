import React from "react";
import { BlogPost } from "@/entities/BlogPost";
import { TemplateSettings } from "@/entities/TemplateSettings";
import ArticlePreviewFrame from "@/components/detail/ArticlePreviewFrame";
import RelatedBlogs from "@/components/detail/RelatedBlogs";
import CaseStudyStatsInline from "@/components/detail/CaseStudyStatsInline";

export default function BlogPostDetail() {
  const [post, setPost] = React.useState(null);
  const [settings, setSettings] = React.useState({
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
    custom_css: ""
  });

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const slug = urlParams.get("slug");

  React.useEffect(() => {
    (async () => {
      const found = await TemplateSettings.filter({ template_type: "blog_post" }, "-updated_date", 1);
      if (found && found.length) setSettings({ ...settings, ...found[0] });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    (async () => {
      if (!id && !slug) return;
      let list = [];
      if (id) {
        list = await BlogPost.filter({ id }, "-updated_date", 1);
      } else if (slug) {
        list = await BlogPost.filter({ slug }, "-updated_date", 1);
      }
      const rec = list && list.length ? list[0] : null;
      setPost(rec);
      if (rec?.meta_title || rec?.title) {
        document.title = rec.meta_title || rec.title;
      }
    })();
  }, [id, slug]);

  if (!post) {
    return (
      <div className="site-container py-12">
        <div className="rounded-token border border-[var(--border)] bg-white p-8">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <style>{`
        .blog-preview { --accent-color: ${settings.accent_color || "var(--hills)"}; }
        .blog-preview .accent { color: var(--accent-color); }
        .blog-preview .badge-accent { background: var(--accent-color); color: #fff; }
        ${settings.custom_css || ""}
      `}</style>

      {/* Centered article content, no right rail */}
      <section className="py-8 md:py-12 bg-white">
        <div className="blog-preview">
          <ArticlePreviewFrame data={post} settings={settings} type="blog" />
        </div>
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

      {/* Recent Articles underneath */}
      {settings.show_related !== false && (
        <RelatedBlogs currentId={post.id} limit={settings.related_limit || 3} title="Recent Articles" />
      )}

      {/* Article JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        headline: post.meta_title || post.title,
        description: post.meta_description || post.excerpt || "",
        image: post.hero_image || post.og_image || "",
        author: {
          "@type": "Organization",
          name: "Compass Buyers Agency",
          url: "https://compassagency.com.au"
        },
        publisher: {
          "@type": "Organization",
          name: "Compass Buyers Agency",
          logo: { "@type": "ImageObject", url: "https://compassagency.com.au/logo.png" }
        },
        datePublished: post.published_date || post.created_date || "",
        dateModified: post.updated_date || post.published_date || "",
        mainEntityOfPage: { "@type": "WebPage", "@id": window.location.href }
      }) }} />
    </div>
  );
}
