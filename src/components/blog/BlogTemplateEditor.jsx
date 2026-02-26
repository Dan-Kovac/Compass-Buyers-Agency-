import React from "react";
import { TemplateSettings } from "@/entities/TemplateSettings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"; // Added

const DEFAULTS = {
  template_type: "blog_post",
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
  custom_css: "" // Added
};

export default function BlogTemplateEditor() {
  const [loading, setLoading] = React.useState(true);
  const [existing, setExisting] = React.useState(null);
  const [form, setForm] = React.useState(DEFAULTS);
  const [saving, setSaving] = React.useState(false);

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  React.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const found = await TemplateSettings.filter({ template_type: "blog_post" }, "-updated_date", 1);
        const record = found && found.length ? found[0] : null;
        setExisting(record);
        if (record) {
          // Merge with defaults to ensure new keys appear
          setForm({ ...DEFAULTS, ...record });
        } else {
          setForm(DEFAULTS);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    const payload = {
      template_type: "blog_post",
      layout_variant: form.layout_variant,
      hero_aspect: form.hero_aspect,
      content_max_width: Number(form.content_max_width) || undefined,
      show_badges: !!form.show_badges,
      show_excerpt: !!form.show_excerpt,
      show_gallery: !!form.show_gallery,
      show_related: !!form.show_related,
      related_limit: Number(form.related_limit) || 0,
      show_meta: !!form.show_meta,
      accent_color: form.accent_color || "",
      custom_css: form.custom_css || "" // Added
    };
    if (existing) {
      await TemplateSettings.update(existing.id, payload);
    } else {
      const created = await TemplateSettings.create(payload);
      setExisting(created);
    }
    setSaving(false);
  };

  const handleReset = () => setForm(DEFAULTS);

  return (
    <Card className="border border-[var(--border)]">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base md:text-lg">Blog Template & Layout</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleReset} disabled={loading || saving}>Reset</Button>
            <Button className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white" onClick={handleSave} disabled={loading || saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Changes here are applied universally to every blog post page.
        </p>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-3">
          <Label>Layout Variant</Label>
          <Select value={form.layout_variant} onValueChange={(v) => update("layout_variant", v)}>
            <SelectTrigger><SelectValue placeholder="Pick a layout" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="classic">Classic</SelectItem>
              <SelectItem value="wide">Wide</SelectItem>
              <SelectItem value="compact">Compact</SelectItem>
            </SelectContent>
          </Select>

          <Label className="mt-4 block">Hero Aspect</Label>
          <Select value={form.hero_aspect} onValueChange={(v) => update("hero_aspect", v)}>
            <SelectTrigger><SelectValue placeholder="Hero aspect" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="21:9">21:9</SelectItem>
              <SelectItem value="16:9">16:9</SelectItem>
              <SelectItem value="3:2">3:2</SelectItem>
              <SelectItem value="4:3">4:3</SelectItem>
            </SelectContent>
          </Select>

          <Label className="mt-4 block">Content Max Width (px)</Label>
          <Input
            type="number"
            value={form.content_max_width ?? ""}
            onChange={(e) => update("content_max_width", e.target.value)}
            placeholder="e.g., 820"
          />

          <Label className="mt-4 block">Accent Color (hex)</Label>
          <Input
            type="text"
            value={form.accent_color || ""}
            onChange={(e) => update("accent_color", e.target.value)}
            placeholder="#4B7371"
          />
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <Label>Show Badges</Label>
              <div className="text-xs text-gray-500">e.g., category, tags</div>
            </div>
            <Switch checked={!!form.show_badges} onCheckedChange={(v) => update("show_badges", v)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Show Excerpt</Label>
              <div className="text-xs text-gray-500">Short summary above the content</div>
            </div>
            <Switch checked={!!form.show_excerpt} onCheckedChange={(v) => update("show_excerpt", v)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Show Author/Meta</Label>
              <div className="text-xs text-gray-500">Author and date row</div>
            </div>
            <Switch checked={!!form.show_meta} onCheckedChange={(v) => update("show_meta", v)} />
          </div>
        </div>

        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <Label>Show Gallery</Label>
              <div className="text-xs text-gray-500">Display gallery when images exist</div>
            </div>
            <Switch checked={!!form.show_gallery} onCheckedChange={(v) => update("show_gallery", v)} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Show Related Posts</Label>
              <div className="text-xs text-gray-500">Display related blog posts</div>
            </div>
            <Switch checked={!!form.show_related} onCheckedChange={(v) => update("show_related", v)} />
          </div>

          <div className="space-y-2">
            <Label>Related Posts Limit</Label>
            <Input
              type="number"
              min={0}
              value={form.related_limit ?? 0}
              onChange={(e) => update("related_limit", e.target.value)}
            />
          </div>
        </div>
      </CardContent>

      {/* Advanced CSS Overrides */}
      <div className="px-6 pb-6">
        <div className="space-y-2">
          <Label>Advanced CSS Overrides</Label>
          <p className="text-xs text-gray-500">
            Optional. Paste small CSS snippets to fine-tune the blog post template. These styles apply to all blog posts.
          </p>
          <Textarea
            rows={8}
            value={form.custom_css || ""}
            onChange={(e) => setForm((f) => ({ ...f, custom_css: e.target.value }))}
            className="font-mono text-sm"
            placeholder={`/* Example: accent headings */
.blog-preview h1, .blog-preview h2 { color: var(--accent-color); }`}
          />
        </div>
      </div>
    </Card>
  );
}
