import React from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, User } from "lucide-react";

export default function ArticlePreviewFrame({ data = {}, settings = {}, type = "article" }) {
  const {
    title,
    content,
    excerpt,
    featured_image,
    property_images = [],
    author,
    created_date,
    published_date,
    category,
    tags = [],
    property_type,
    location,
    client_type,
  } = data;

  const feat = Array.isArray(property_images) && property_images.length
    ? property_images
    : featured_image
    ? [featured_image]
    : [];

  const hero = feat[0] || "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop";
  const gallery = feat.slice(1);

  const aspectMap = {
    "21:9": "aspect-[21/9]",
    "16:9": "aspect-[16/9]",
    "3:2": "aspect-[3/2]",
    "4:3": "aspect-[4/3]",
  };
  const heroAspect = aspectMap[settings.hero_aspect] || "aspect-[16/9]";

  const maxW = settings.content_max_width ? `${settings.content_max_width}px` : "820px";

  const displayDate = published_date || created_date;

  return (
    <article className="site-container py-8 md:py-12">
      <div className="mx-auto" style={{ maxWidth: maxW }}>
        {settings.show_badges !== false && (
          <div className="flex flex-wrap gap-2 mb-3">
            {category && <Badge variant="secondary">{category.replace("-", " ")}</Badge>}
            {property_type && <Badge className="badge-accent">{property_type}</Badge>}
            {location && <Badge variant="outline">{location}</Badge>}
            {client_type && <Badge variant="outline">{client_type.replace("-", " ")}</Badge>}
            {Array.isArray(tags) && tags.map((t, i) => <Badge key={i} variant="outline">{t}</Badge>)}
          </div>
        )}

        <h1 className="mb-3">{title || "Untitled"}</h1>

        {settings.show_meta !== false && (author || displayDate) && (
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
            {author && (
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                {author}
              </div>
            )}
            {displayDate && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(displayDate).toLocaleDateString("en-AU", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </div>
            )}
          </div>
        )}

        {settings.show_excerpt !== false && excerpt && (
          <p className="text-lg text-gray-700 leading-relaxed mb-6">{excerpt}</p>
        )}

        <div className={`${heroAspect} rounded-token overflow-hidden mb-8 border border-[var(--border)]`}>
          <img src={hero} alt={title || ""} className="w-full h-full object-cover" loading="lazy" />
        </div>

        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: content || "" }}
        />

        {settings.show_gallery !== false && gallery.length > 0 && (
          <div className="mt-10">
            <h3 className="mb-4">Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((img, i) => (
                <div key={i} className="aspect-square rounded-token overflow-hidden border border-[var(--border)]">
                  <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
