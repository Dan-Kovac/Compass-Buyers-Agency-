import React from "react";
import { TemplateSettings } from "@/entities/TemplateSettings";
import { BlogPost } from "@/entities/BlogPost";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ArticlePreviewFrame from "@/components/detail/ArticlePreviewFrame";
import BlogCard from "@/components/blog/BlogCard";

export default function BlogLivePreview({ posts: externalPosts }) {
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
  const [posts, setPosts] = React.useState([]);
  const [selectedId, setSelectedId] = React.useState("");

  React.useEffect(() => {
    (async () => {
      try {
        const found = await TemplateSettings.filter({ template_type: "blog_post" }, "-updated_date", 1);
        if (found && found.length) setSettings((s) => ({ ...s, ...found[0] }));
      } catch {
        // ignore
      }
    })();
  }, []);

  React.useEffect(() => {
    if (externalPosts && externalPosts.length) {
      setPosts(externalPosts);
      setSelectedId(externalPosts[0]?.id || "");
      return;
    }
    (async () => {
      try {
        const list = await BlogPost.filter({ status: "published" }, "-created_date", 6);
        setPosts(list || []);
        setSelectedId(list?.[0]?.id || "");
      } catch {
        const list = await BlogPost.list("-created_date", 6);
        setPosts(list || []);
        setSelectedId(list?.[0]?.id || "");
      }
    })();
  }, [externalPosts]);

  const selected = React.useMemo(() => {
    if (!posts || !posts.length) {
      return {
        id: "preview",
        title: "Preview Blog Title",
        excerpt: "A short excerpt to show how summaries appear above the main content.",
        author: "Author Name",
        featured_image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
        category: "market-insights",
        tags: ["northern-rivers", "buying"],
        content: "<p>This is a live preview of your blog template. Add content in the editor to see how it will render here. Use the Template settings above to tweak layout and styles globally.</p>"
      };
    }
    return posts.find((p) => p.id === selectedId) || posts[0];
  }, [posts, selectedId]);

  const recentForPreview = React.useMemo(() => {
    const others = (posts || []).filter((p) => p.id !== selected.id);
    const need = settings.related_limit || 3;
    if (!others.length) return Array.from({ length: need }).map(() => null);
    return others.slice(0, need);
  }, [posts, selected, settings.related_limit]);

  return (
    <Card className="border border-[var(--border)]">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base md:text-lg">Live Blog Preview</CardTitle>
          <div className="flex items-center gap-2">
            <div className="text-sm text-gray-600">Preview post</div>
            <Select value={selectedId || ""} onValueChange={setSelectedId}>
              <SelectTrigger className="w-56">
                <SelectValue placeholder="Choose a post" />
              </SelectTrigger>
              <SelectContent>
                {(posts && posts.length ? posts : [{ id: "preview", title: "Preview Blog Title" }]).map((p) => (
                  <SelectItem key={p.id || "preview"} value={p.id || "preview"}>{p.title || "Untitled"}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">Edits in “Blog Template & Layout” apply universally to all blog posts.</p>
      </CardHeader>

      <CardContent>
        <style>{`
          .blog-preview { --accent-color: ${settings.accent_color || "var(--hills)"}; }
          .blog-preview .accent { color: var(--accent-color); }
          .blog-preview .badge-accent { background: var(--accent-color); color: #fff; }
          ${settings.custom_css || ""}
        `}</style>

        <div className="blog-preview">
          <ArticlePreviewFrame data={selected} settings={settings} type="blog" />
        </div>

        {/* Recent Articles preview (mirrors live page) */}
        {settings.show_related !== false && (
          <section className="pt-8">
            <div className="site-container">
              <h3 className="text-2xl md:text-3xl font-semibold mb-4">Recent Articles</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {(recentForPreview && recentForPreview.length
                  ? recentForPreview
                  : Array.from({ length: settings.related_limit || 3 }).map(() => null)
                ).map((it, i) => (
                  <BlogCard key={it?.id || `preview-${i}`} item={it} />
                ))}
              </div>
            </div>
          </section>
        )}
      </CardContent>
    </Card>
  );
}
