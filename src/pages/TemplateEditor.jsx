import React from "react";
import { TemplateSettings } from "@/entities/TemplateSettings";
import { CaseStudy } from "@/entities/CaseStudy";
import { BlogPost } from "@/entities/BlogPost";
import { Testimonial } from "@/entities/Testimonial";
import { TeamMember } from "@/entities/TeamMember";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { ArrowLeft, ExternalLink } from "lucide-react";

const DEFAULTS = {
  layout_variant: "classic",
  hero_aspect: "16:9",
  content_max_width: 0,
  show_badges: true,
  show_excerpt: true,
  show_gallery: false,
  show_related: true,
  related_limit: 3,
  show_meta: true,
  accent_color: ""
};

const TYPE_TO_COLLECTION = {
  case_study: "case_studies",
  blog_post: "blog_posts",
  testimonial: "testimonials",
  team_member: "team_members"
};

const TYPE_TO_DETAIL_PAGE = {
  case_study: "CaseStudyDetail",
  blog_post: "BlogPostDetail",
  testimonial: "TestimonialDetail",
  team_member: "TeamMemberDetail"
};

export default function TemplateEditor() {
  const params = new URLSearchParams(window.location.search);
  const initialTypeParam = params.get("type") || "case_study";
  const initialType = ["case_study", "blog_post", "testimonial", "team_member"].includes(initialTypeParam)
    ? initialTypeParam
    : "case_study";

  const [type, setType] = React.useState(initialType);
  const [record, setRecord] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);
  const [sampleId, setSampleId] = React.useState("");
  const [samples, setSamples] = React.useState([]);

  const loadSamples = React.useCallback(async (t) => {
    if (t === "case_study") {
      const list = await CaseStudy.list("-updated_date", 50);
      setSamples((list || []).map((i) => ({ id: i.id, label: i.title || "(untitled)" })));
      setSampleId((list && list[0]?.id) || "");
    } else if (t === "blog_post") {
      const list = await BlogPost.list("-updated_date", 50);
      setSamples((list || []).map((i) => ({ id: i.id, label: i.title || "(untitled)" })));
      setSampleId((list && list[0]?.id) || "");
    } else if (t === "testimonial") {
      const list = await Testimonial.list("-updated_date", 50);
      setSamples((list || []).map((i) => ({ id: i.id, label: i.name || "(unnamed)" })));
      setSampleId((list && list[0]?.id) || "");
    } else if (t === "team_member") {
      const list = await TeamMember.list("order", 50);
      setSamples((list || []).map((i) => ({ id: i.id, label: i.name || "(unnamed)" })));
      setSampleId((list && list[0]?.id) || "");
    }
  }, []);

  const loadSettings = React.useCallback(async (t) => {
    setLoading(true);
    const found = await TemplateSettings.filter({ template_type: t }, "-updated_date", 1);
    setRecord(found && found.length ? found[0] : { template_type: t, ...DEFAULTS });
    await loadSamples(t);
    setLoading(false);
  }, [loadSamples]);

  React.useEffect(() => {
    loadSettings(type);
  }, [type, loadSettings]);

  const update = (k, v) => setRecord((r) => ({ ...r, [k]: v }));

  const save = async () => {
    setSaving(true);
    if (record.id) {
      await TemplateSettings.update(record.id, record);
    } else {
      const created = await TemplateSettings.create(record);
      setRecord(created);
    }
    setSaving(false);
  };

  const backLink =
    type === "blog_post"
      ? createPageUrl("BlogManager")
      : createPageUrl(`CMSManager?collection=${TYPE_TO_COLLECTION[type]}`);

  const previewUrl = sampleId
    ? createPageUrl(`${TYPE_TO_DETAIL_PAGE[type]}?id=${sampleId}&source=template_editor`)
    : "";

  return (
    <div className="min-h-screen bg-[var(--bright-grey)]">
      <div className="site-container py-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link to={backLink} className="inline-flex items-center text-[var(--hills)] hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to CMS
            </Link>
            <span className="text-sm text-gray-500">Editing template for</span>
            <Select value={type} onValueChange={(v) => setType(v)}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Choose type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="case_study">Case Studies</SelectItem>
                <SelectItem value="blog_post">Blog Posts</SelectItem>
                <SelectItem value="testimonial">Testimonials</SelectItem>
                <SelectItem value="team_member">Team Members</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => loadSettings(type)}>Reload</Button>
            <Button onClick={save} disabled={saving}>
              {saving ? "Saving..." : "Save Template"}
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Settings panel */}
          <div className="lg:col-span-1 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Layout</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label>Variant</Label>
                  <Select value={record?.layout_variant || "classic"} onValueChange={(v) => update("layout_variant", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classic">Classic</SelectItem>
                      <SelectItem value="wide">Wide</SelectItem>
                      <SelectItem value="compact">Compact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Hero Aspect</Label>
                  <Select value={record?.hero_aspect || "16:9"} onValueChange={(v) => update("hero_aspect", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="21:9">21:9</SelectItem>
                      <SelectItem value="16:9">16:9</SelectItem>
                      <SelectItem value="3:2">3:2</SelectItem>
                      <SelectItem value="4:3">4:3</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Content Max Width (px)</Label>
                  <Input
                    type="number"
                    value={record?.content_max_width || 0}
                    onChange={(e) => update("content_max_width", Number(e.target.value))}
                    placeholder="0 = default"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <Label>Show Badges/Meta</Label>
                  <Switch checked={!!record?.show_badges} onCheckedChange={(v) => update("show_badges", v)} />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show Excerpt</Label>
                  <Switch checked={!!record?.show_excerpt} onCheckedChange={(v) => update("show_excerpt", v)} />
                </div>
                {type !== "testimonial" && type !== "team_member" && (
                  <div className="flex items-center justify-between">
                    <Label>Show Gallery</Label>
                    <Switch checked={!!record?.show_gallery} onCheckedChange={(v) => update("show_gallery", v)} />
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <Label>Show Related</Label>
                  <Switch checked={!!record?.show_related} onCheckedChange={(v) => update("show_related", v)} />
                </div>
                <div>
                  <Label>Related Limit</Label>
                  <Input
                    type="number"
                    value={record?.related_limit ?? 3}
                    onChange={(e) => update("related_limit", Number(e.target.value))}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <Label>Show Meta Row</Label>
                  <Switch checked={!!record?.show_meta} onCheckedChange={(v) => update("show_meta", v)} />
                </div>
                <div>
                  <Label>Accent Color (hex)</Label>
                  <Input
                    value={record?.accent_color || ""}
                    onChange={(e) => update("accent_color", e.target.value)}
                    placeholder="#4B7371"
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Preview Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <Label>Choose Sample</Label>
                  <Select value={sampleId} onValueChange={(v) => setSampleId(v)}>
                    <SelectTrigger><SelectValue placeholder="Select a sample" /></SelectTrigger>
                    <SelectContent>
                      {samples.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {previewUrl && (
                  <a href={previewUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-[var(--hills)] hover:underline">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Open preview in new tab
                  </a>
                )}
              </CardContent>
            </Card>

            <div className="flex gap-2">
              <Link to={backLink} className="flex-1">
                <Button variant="outline" className="w-full">Back</Button>
              </Link>
              <Button className="flex-1" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save"}</Button>
            </div>
          </div>

          {/* Visual preview panel */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardHeader>
                <CardTitle className="text-base">Live Visual Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {!previewUrl ? (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    No sample available to preview.
                  </div>
                ) : (
                  <div className="w-full border rounded-lg overflow-hidden">
                    <iframe
                      title="Template live preview"
                      src={previewUrl}
                      className="w-full h-[70vh] bg-white"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
