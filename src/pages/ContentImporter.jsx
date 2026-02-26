import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Loader2, Check, ExternalLink, CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css'; // Import Quill's CSS
import { InvokeLLM } from "@/integrations/Core";
import { CaseStudy } from "@/entities/CaseStudy";
import { BlogPost } from "@/entities/BlogPost";
import { Testimonial } from "@/entities/Testimonial";

const PROPERTY_TYPES = ["house","apartment","townhouse","acreage","investment","commercial"];
const LOCATIONS = ["Byron Bay","Ballina","Kingscliff","Cabarita","Tweed Heads","Mullumbimby","Lennox Head","Other"];
const CLIENT_TYPES = ["first-home-buyer","upgrader","investor","interstate-relocator","international-buyer","downsizer"];
const BLOG_CATEGORIES = ["market-insights","buying-tips","local-knowledge","case-studies","industry-news"];

export default function ContentImporter() {
  const urlParams = new URLSearchParams(window.location.search);
  // Support case_study (default), blog_post, testimonial
  const typeParam = urlParams.get("type");
  const defaultType = typeParam === "blog_post" ? "blog_post" : (typeParam === "testimonial" ? "testimonial" : "case_study");

  const [sourceUrl, setSourceUrl] = React.useState("");
  const [targetType, setTargetType] = React.useState(defaultType);
  const [analyzing, setAnalyzing] = React.useState(false);
  const [creating, setCreating] = React.useState(false);
  const [error, setError] = React.useState("");

  // Parsed result fields (common for Case Study/Blog Post)
  const [title, setTitle] = React.useState("");
  const [excerpt, setExcerpt] = React.useState("");
  const [contentHtml, setContentHtml] = React.useState("");
  const [featuredImage, setFeaturedImage] = React.useState("");
  const [metaTitle, setMetaTitle] = React.useState("");
  const [metaDescription, setMetaDescription] = React.useState("");
  const [slug, setSlug] = React.useState("");
  const [strictArticleOnly, setStrictArticleOnly] = React.useState(defaultType === "blog_post");
  const [imageCandidates, setImageCandidates] = React.useState([]);
  const [publishedDate, setPublishedDate] = React.useState(""); // New state for published date
  const [publishNow, setPublishNow] = React.useState(false);

  // Case study specifics
  const [propertyType, setPropertyType] = React.useState(PROPERTY_TYPES[0]);
  const [location, setLocation] = React.useState(LOCATIONS[0]);
  const [clientType, setClientType] = React.useState(CLIENT_TYPES[0]);

  // Blog specifics
  const [category, setCategory] = React.useState(BLOG_CATEGORIES[0]);
  const [tags, setTags] = React.useState("");

  // Testimonial specifics
  const [tName, setTName] = React.useState("");
  const [tLocation, setTLocation] = React.useState("");
  const [tQuote, setTQuote] = React.useState("");
  const [tPhoto, setTPhoto] = React.useState("");
  const [tRating, setTRating] = React.useState(5);

  const resetParsed = () => {
    setTitle("");
    setExcerpt("");
    setContentHtml("");
    setFeaturedImage("");
    setMetaTitle("");
    setMetaDescription("");
    setSlug("");
    setPublishedDate(""); // Reset published date
    setPropertyType(PROPERTY_TYPES[0]);
    setLocation(LOCATIONS[0]);
    setClientType(CLIENT_TYPES[0]);
    setCategory(BLOG_CATEGORIES[0]);
    setTags("");
    setTName("");
    setTLocation("");
    setTQuote("");
    setTPhoto("");
    setTRating(5);
    setImageCandidates([]);
    setPublishNow(false);
  };

  // If user switches type to blog_post, default to strict article-only extraction
  React.useEffect(() => {
    setStrictArticleOnly(targetType === "blog_post");
  }, [targetType]);

  const analyze = async () => {
    setError("");
    resetParsed();
    if (!sourceUrl.trim()) {
      setError("Please paste a URL to import.");
      return;
    }
    setAnalyzing(true);

    const commonSchemaFields = {
      title: { type: "string" },
      excerpt: { type: "string" },
      content_html: { type: "string" },
      featured_image: { type: "string" },
      featured_image_candidates: { type: "array", items: { type: "string" } },
      meta_title: { type: "string" },
      meta_description: { type: "string" },
      slug: { type: "string" },
      published_date: { type: "string", format: "date" } // Added published_date
    };

    const schemaCaseStudy = {
      type: "object",
      properties: {
        ...commonSchemaFields,
        property_type: { type: "string", enum: PROPERTY_TYPES },
        location: { type: "string", enum: LOCATIONS },
        client_type: { type: "string", enum: CLIENT_TYPES }
      },
      required: ["title", "excerpt", "content_html"]
    };

    const schemaBlogPost = {
      type: "object",
      properties: {
        ...commonSchemaFields,
        category: { type: "string", enum: BLOG_CATEGORIES },
        tags: { type: "array", items: { type: "string" } }
      },
      required: ["title", "excerpt", "content_html", "category"]
    };

    const schemaTestimonial = {
      type: "object",
      properties: {
        name: { type: "string" },
        location: { type: "string" },
        quote: { type: "string" },
        photo_url: { type: "string" },
        rating: { type: "number", minimum: 0, maximum: 5 }
      },
      required: ["quote"]
    };

    let conditionalPrompt = "";
    if (targetType === "case_study") {
      conditionalPrompt = "- If possible, infer: property_type, location (from our enum), and client_type from context. Otherwise leave them empty.";
    } else if (targetType === "blog_post") {
      conditionalPrompt = "- Map to a suitable blog category from our enum. tags: 3–8 relevant keywords.";
    } else { // Testimonial
      conditionalPrompt = "- Extract testimonial name (person or company), a concise quote (1–3 sentences), location if present, photo_url if present (absolute URL), and rating if stated (0–5).";
    }
    
    const commonContentPrompt = `
- published_date: If available, extract the original publication date of the article/post in 'YYYY-MM-DD' format. Look for explicit date metadata or visible dates on the page.
`;

    const strict = strictArticleOnly
      ? `
STRICT ARTICLE-ONLY MODE: Only extract content contained in an article body. Use typical containers/selectors:
- article, main article, .post-content, .entry-content, .article__content, [itemtype="https://schema.org/Article"].
Exclude: site header/footer, navigation, sidebars, newsletter forms, related/recommended posts, comments, tags list, author box, share bars, cookie notices.
`
      : `
Exclude site header/footer, navigation, sidebars, newsletter forms, related posts sections, comments, and cookie notices.
`;

    const prompt = `
You are a precise web content extractor. Fetch ONLY the content at this exact URL and extract fields.
URL: ${sourceUrl}

Requirements:
${strict}
- Use the page's own title, meta description, Open Graph/Twitter metadata when present.
- content_html: clean HTML for the article body, preserving basic formatting (h2/h3, p, ul/ol, blockquote, strong/em, images with absolute URLs). Exclude unrelated blocks.
- featured_image: prefer og:image or the main hero/featured image; must be an absolute URL.
- featured_image_candidates: up to 8 absolute URLs of suitable in-article/hero images (no logos or tiny icons).
- excerpt: a concise 20–40 word summary suitable for previews (if applicable).
- slug: a URL-friendly version of the title (lowercase, hyphens, no trailing slashes) (if applicable).
${targetType === "case_study" || targetType === "blog_post" ? commonContentPrompt : ""}
${conditionalPrompt}

Important:
- Respond STRICTLY as JSON matching the provided schema.
- Output only the keys from the schema (no extra keys).
`;

    const res = await InvokeLLM({
      prompt,
      add_context_from_internet: true,
      response_json_schema:
        targetType === "case_study" ? schemaCaseStudy :
        targetType === "blog_post" ? schemaBlogPost :
        schemaTestimonial
    });

    // Populate state from response
    if (targetType === "case_study" || targetType === "blog_post") {
      setTitle(res.title || "");
      setExcerpt(res.excerpt || "");
      setContentHtml(res.content_html || "");
      setFeaturedImage(res.featured_image || "");
      setImageCandidates(Array.isArray(res.featured_image_candidates) ? res.featured_image_candidates : []);
      setMetaTitle(res.meta_title || "");
      setMetaDescription(res.meta_description || "");
      setSlug(res.slug || "");
      setPublishedDate(res.published_date || ""); // Populate published date
    }

    if (targetType === "case_study") {
      if (PROPERTY_TYPES.includes(res.property_type)) setPropertyType(res.property_type);
      if (LOCATIONS.includes(res.location)) setLocation(res.location);
      if (CLIENT_TYPES.includes(res.client_type)) setClientType(res.client_type);
    } else if (targetType === "blog_post") {
      if (BLOG_CATEGORIES.includes(res.category)) setCategory(res.category);
      if (Array.isArray(res.tags)) setTags(res.tags.join(", "));
    } else { // Testimonial
      setTName(res.name || "");
      setTLocation(res.location || "");
      setTQuote(res.quote || "");
      setTPhoto(res.photo_url || "");
      setTRating(typeof res.rating === "number" ? res.rating : 5);
    }

    setAnalyzing(false);
  };

  const createRecord = async () => {
    setCreating(true);
    setError("");
    try {
      if (targetType === "case_study") {
        const payload = {
          title,
          excerpt,
          content: contentHtml,
          featured_image: featuredImage,
          slug,
          meta_title: metaTitle,
          meta_description: metaDescription,
          property_type: propertyType,
          location,
          client_type: clientType,
          published_date: publishedDate || undefined, // Include published date
          status: publishNow ? "published" : "draft" // Use publishNow for status
        };
        await CaseStudy.create(payload);
      } else if (targetType === "blog_post") {
        const payload = {
          title,
          excerpt,
          content: contentHtml,
          featured_image: featuredImage,
          slug,
          meta_title: metaTitle,
          meta_description: metaDescription,
          author: "Imported",
          category,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          published_date: publishedDate || undefined, // Include published date
          status: publishNow ? "published" : "draft" // Use publishNow for status
        };
        await BlogPost.create(payload);
      } else { // Testimonial
        const payload = {
          name: tName || "Anonymous",
          location: tLocation || "",
          quote: tQuote || "",
          photo_url: tPhoto || "",
          rating: Number.isFinite(Number(tRating)) ? Number(tRating) : 5,
          status: publishNow ? "published" : "draft" // Use publishNow for status
        };
        await Testimonial.create(payload);
      }
      setCreating(false);
      alert("Imported and saved as draft successfully.");
    } catch (e) {
      setCreating(false);
      setError("Import save failed. Please adjust fields and try again.");
    }
  };

  // Field map status for clarity per type
  const fieldStatuses = React.useMemo(() => {
    if (targetType === "case_study") {
      return [
        { label: "title", ok: !!title },
        { label: "excerpt", ok: !!excerpt },
        { label: "content (HTML)", ok: !!contentHtml },
        { label: "featured_image", ok: !!featuredImage },
        { label: "meta_title", ok: !!metaTitle },
        { label: "meta_description", ok: !!metaDescription },
        { label: "slug", ok: !!slug },
        { label: "published_date", ok: !!publishedDate }, // Added published_date
        { label: "property_type", ok: !!propertyType },
        { label: "location", ok: !!location },
        { label: "client_type", ok: !!clientType }
      ];
    } else if (targetType === "blog_post") {
      return [
        { label: "title", ok: !!title },
        { label: "excerpt", ok: !!excerpt },
        { label: "content (HTML)", ok: !!contentHtml },
        { label: "featured_image", ok: !!featuredImage },
        { label: "meta_title", ok: !!metaTitle },
        { label: "meta_description", ok: !!metaDescription },
        { label: "slug", ok: !!slug },
        { label: "published_date", ok: !!publishedDate }, // Added published_date
        { label: "category", ok: !!category },
        { label: "tags", ok: !!tags }
      ];
    } else { // Testimonial
      return [
        { label: "name", ok: !!tName },
        { label: "location", ok: !!tLocation },
        { label: "quote", ok: !!tQuote },
        { label: "photo_url", ok: !!tPhoto },
        { label: "rating", ok: Number.isFinite(Number(tRating)) }
      ];
    }
  }, [targetType, title, excerpt, contentHtml, featuredImage, metaTitle, metaDescription, slug, publishedDate, propertyType, location, clientType, category, tags, tName, tLocation, tQuote, tPhoto, tRating]);

  const isParsed = targetType === "testimonial"
    ? (!!tQuote || !!tName) // For testimonials, quote is required by schema, name is also a good indicator
    : (!!title || !!contentHtml || !!featuredImage); // For articles, title, content, or image are good indicators

  return (
    <div className="min-h-screen bg-white">
      <section className="py-10">
        <div className="site-container">
          {/* Quick back link to CMS Case Studies */}
          <div className="flex items-center justify-between mb-4">
            <Link to={createPageUrl("CMSManager?collection=case_studies")}>
              <button className="inline-flex items-center text-[var(--hills)] hover:underline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to CMS (Case Studies)
              </button>
            </Link>
          </div>

          <div className="max-w-4xl mx-auto">
            <h1>Content Importer</h1>
            <p className="text-gray-600 mb-6">
              Paste a URL from your existing site. We’ll extract title, excerpt, featured image, SEO, and content, then save as a draft.
            </p>

            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Card className="mb-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">1) Source and Target</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Source URL</Label>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://example.com/your-article"
                      value={sourceUrl}
                      onChange={(e) => setSourceUrl(e.target.value)}
                    />
                    <a href={sourceUrl || "#"} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" disabled={!sourceUrl}>
                        <ExternalLink className="w-4 h-4 mr-2" /> Open
                      </Button>
                    </a>
                  </div>
                </div>
                <div>
                  <Label>Import as</Label>
                  <Select value={targetType} onValueChange={(v) => setTargetType(v)}>
                    <SelectTrigger className="w-60">
                      <SelectValue placeholder="Choose type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="case_study">Case Study</SelectItem>
                      <SelectItem value="blog_post">Blog Post</SelectItem>
                      <SelectItem value="testimonial">Testimonial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3">
                  <Switch id="strict-article" checked={strictArticleOnly} onCheckedChange={setStrictArticleOnly} />
                  <Label htmlFor="strict-article" className="cursor-pointer">
                    Article-only mode (ignore header, footer, related posts, etc.)
                  </Label>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <div className="text-sm text-gray-600">Publish after import</div>
                  <Switch checked={publishNow} onCheckedChange={setPublishNow} />
                  <div className="text-xs text-gray-500">
                    Toggle on to publish immediately. Toggle off to save as draft.
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button onClick={analyze} disabled={analyzing || !sourceUrl}>
                    {analyzing ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Analyzing…</>) : "Analyze URL"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg">2) Review & Tweak</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Case Study / Blog fields */}
                {(targetType === "case_study" || targetType === "blog_post") && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Title</Label>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                      </div>
                      <div>
                        <Label>Slug</Label>
                        <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
                      </div>
                    </div>
                    <div>
                      <Label>Excerpt</Label>
                      <Textarea rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Meta Title</Label>
                        <Input value={metaTitle} onChange={(e) => setMetaTitle(e.target.value)} />
                      </div>
                      <div>
                        <Label>Meta Description</Label>
                        <Textarea rows={3} value={metaDescription} onChange={(e) => setMetaDescription(e.target.value)} />
                      </div>
                    </div>
                    {/* New Published Date Input */}
                    <div>
                      <Label>Published Date</Label>
                      <Input
                        type="date"
                        value={publishedDate || ""}
                        onChange={(e) => setPublishedDate(e.target.value)}
                      />
                      <p className="text-xs text-gray-500 mt-1">We’ll use this date when publishing to match the original post.</p>
                    </div>
                    {/* End New Published Date Input */}
                    <div>
                      <Label>Featured Image URL</Label>
                      <Input value={featuredImage} onChange={(e) => setFeaturedImage(e.target.value)} placeholder="https://..." />
                      {featuredImage && (
                        <div className="mt-3 rounded-token overflow-hidden border">
                          <img src={featuredImage} alt="Featured" className="w-full h-64 object-cover" />
                        </div>
                      )}
                      {imageCandidates.length > 0 && (
                        <div className="mt-3">
                          <div className="text-sm text-gray-600 mb-2">Detected images (click to select):</div>
                          <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                            {imageCandidates.map((url, idx) => (
                              <button
                                type="button"
                                key={idx}
                                onClick={() => setFeaturedImage(url)}
                                className={`relative group aspect-[4/3] rounded-token overflow-hidden border ${featuredImage === url ? "ring-2 ring-[var(--hills)]" : "border-[var(--border)]"}`}
                              >
                                <img src={url} alt={`Candidate ${idx + 1}`} className="w-full h-full object-cover" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                    {targetType === "case_study" ? (
                      <div className="grid md:grid-cols-3 gap-4">
                        <div>
                          <Label>Property Type</Label>
                          <Select value={propertyType} onValueChange={setPropertyType}>
                            <SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger>
                            <SelectContent>
                              {PROPERTY_TYPES.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Location</Label>
                          <Select value={location} onValueChange={setLocation}>
                            <SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger>
                            <SelectContent>
                              {LOCATIONS.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Client Type</Label>
                          <Select value={clientType} onValueChange={setClientType}>
                            <SelectTrigger><SelectValue placeholder="Choose" /></SelectTrigger>
                            <SelectContent>
                              {CLIENT_TYPES.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ) : (
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>Blog Category</Label>
                          <Select value={category} onValueChange={setCategory}>
                            <SelectTrigger><SelectValue placeholder="Choose category" /></SelectTrigger>
                            <SelectContent>
                              {BLOG_CATEGORIES.map((v) => <SelectItem key={v} value={v}>{v}</SelectItem>)}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Tags (comma separated)</Label>
                          <Input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="e.g. auction, valuation, Byron Bay" />
                        </div>
                      </div>
                    )}
                    <div>
                      <Label>Content (HTML)</Label>
                      <div className="rounded-token border overflow-hidden">
                        <ReactQuill
                          theme="snow"
                          value={contentHtml}
                          onChange={setContentHtml}
                          placeholder="Write or edit your article content…"
                          modules={{
                            toolbar: [
                              [{ header: [2, 3, false] }],
                              ["bold", "italic", "underline", "blockquote"],
                              [{ list: "ordered" }, { list: "bullet" }],
                              ["link", "clean"]
                            ]
                          }}
                          className="bg-white"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Testimonial fields */}
                {targetType === "testimonial" && (
                  <>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Name</Label>
                        <Input value={tName} onChange={(e) => setTName(e.target.value)} placeholder="Client name or company" />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input value={tLocation} onChange={(e) => setTLocation(e.target.value)} placeholder="e.g. Byron Bay" />
                      </div>
                    </div>
                    <div>
                      <Label>Quote</Label>
                      <Textarea rows={4} value={tQuote} onChange={(e) => setTQuote(e.target.value)} placeholder="Client testimonial (1–3 sentences)" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>Photo URL</Label>
                        <Input value={tPhoto} onChange={(e) => setTPhoto(e.target.value)} placeholder="https://..." />
                      </div>
                      <div>
                        <Label>Rating (0–5)</Label>
                        <Input type="number" min="0" max="5" step="0.5" value={tRating} onChange={(e) => setTRating(parseFloat(e.target.value))} />
                      </div>
                    </div>
                    {tPhoto && (
                      <div className="mt-3 rounded-token overflow-hidden border w-48 h-48">
                        <img src={tPhoto} alt="Client" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </>
                )}
              </CardContent>
            </Card>

            {/* Field Map & Status */}
            <Card className="mb-8">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">3) Field Map & Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                  {fieldStatuses.map((f) => (
                    <div key={f.label} className="flex items-center gap-2 text-sm">
                      {f.ok ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-600" />
                      )}
                      <span className={f.ok ? "text-gray-700" : "text-gray-500"}>{f.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center gap-3">
              <Button onClick={createRecord} disabled={!isParsed || creating}>
                {creating ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Saving…</>) : (
                  <>Create {targetType === "case_study" ? "Case Study" : targetType === "blog_post" ? "Blog Post" : "Testimonial"} as {publishNow ? "Published" : "Draft"}</>
                )}
              </Button>
              {/* Quick jump to CMS Case Studies */}
              <Link to={createPageUrl("CMSManager?collection=case_studies")}>
                <Button variant="outline">Open CMS (Case Studies)</Button>
              </Link>
              {isParsed && !creating && <span className="text-green-700 text-sm flex items-center"><Check className="w-4 h-4 mr-1" /> Ready to save</span>}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
