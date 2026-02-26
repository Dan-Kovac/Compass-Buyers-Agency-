import React from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import TagsInput from "./TagsInput";
import AssetUploader from "@/components/admin/AssetUploader";
import { Asset } from "@/entities/Asset";
import { UploadFile } from "@/integrations/Core";
import { TeamMember } from "@/entities/TeamMember";
import { User } from "@/entities/User";
import ReactQuill from "react-quill";

const CATEGORIES = [
  { value: "market-insights", label: "Market Insights" },
  { value: "buying-tips", label: "Buying Tips" },
  { value: "local-knowledge", label: "Local Knowledge" },
  { value: "case-studies", label: "Case Studies" },
  { value: "industry-news", label: "Industry News" }
];

function slugify(str) {
  return (str || "")
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\W-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function BlogEditor({ post, onSave, onCancel }) {
  const [form, setForm] = React.useState(() => ({
    title: post?.title || "",
    content: post?.content || "",
    excerpt: post?.excerpt || "",
    featured_image: post?.featured_image || "",
    slug: post?.slug || "",
    author: post?.author || "",
    team_member_id: post?.team_member_id || "",
    category: post?.category || CATEGORIES[0].value,
    tags: post?.tags || [],
    status: post?.status || "draft",
    featured: post?.featured || false,
    meta_title: post?.meta_title || "",
    meta_description: post?.meta_description || "",
    published_date: post?.published_date || ""
  }));
  
  const [teamMembers, setTeamMembers] = React.useState([]);
  const quillRef = React.useRef(null);
  const [featuredUrlInput, setFeaturedUrlInput] = React.useState("");

  const update = (field, value) => setForm((f) => ({ ...f, [field]: value }));

  // Load team members for dropdown
  React.useEffect(() => {
    (async () => {
      const members = await TeamMember.list("-updated_date", 100);
      setTeamMembers((members || []).filter(m => m.active !== false));
    })();
  }, []);

  React.useEffect(() => {
    if (!post && form.title && !form.slug) {
      setForm((f) => ({ ...f, slug: slugify(f.title) }));
    }
  }, [post, form.title, form.slug]);

  const handleTeamMemberChange = (memberId) => {
    update("team_member_id", memberId);
    if (memberId) {
      const member = teamMembers.find(m => m.id === memberId);
      if (member) {
        update("author", member.name);
      }
    } else {
      update("author", "");
    }
  };

  const selectedMember = teamMembers.find(m => m.id === form.team_member_id);

  const handleInsertImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const { file_url } = await UploadFile({ file });
        await Asset.create({
          name: file.name,
          type: "image",
          url: file_url,
          mime_type: file.type || "image/jpeg",
          size: file.size
        });
        const editor = quillRef.current?.getEditor();
        const range = editor?.getSelection(true);
        const index = range ? range.index : editor?.getLength() || 0;
        editor?.insertEmbed(index, "image", file_url, "user");
        editor?.setSelection(index + 1, 0);
      } catch (err) {
        const url = window.prompt("Uploading failed. Paste an image URL to insert:");
        if (url && /^https?:\/\/.+/i.test(url)) {
          const editor = quillRef.current?.getEditor();
          const range = editor?.getSelection(true);
          const index = range ? range.index : editor?.getLength() || 0;
          editor?.insertEmbed(index, "image", url, "user");
          editor?.setSelection(index + 1, 0);
        } else {
          window.alert("Could not insert image. Please try again later or paste a valid image URL.");
        }
      }
    };
    input.click();
  };

  const quillModules = React.useMemo(() => ({
    toolbar: {
      container: [
        [{ header: [1, 2, 3, false] }],
        ["bold", "italic", "underline", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        [{ align: [] }],
        ["clean"]
      ],
      handlers: {
        image: handleInsertImage
      }
    },
    clipboard: {
      matchVisual: false
    }
  }), []);

  const stripHtml = (html) =>
    (html || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const makeExcerpt = (text) => {
    const t = (text || "").trim();
    if (!t) return "";
    return t.length > 180 ? `${t.slice(0, 180)}…` : t;
  };

  const canSave = !!(form.title && form.content && form.team_member_id);

  const handleUploadFeatured = async ({ url, file }) => {
    update("featured_image", url);
    await Asset.create({
      name: file.name,
      type: "image",
      url,
      mime_type: file.type || "image/jpeg",
      size: file.size
    });
  };

  return (
    <div className="space-y-6">
      <style>{`
        .ql-editor {
          line-height: var(--body-lh);
        }
        .ql-editor p {
          margin: 0 0 var(--body-mb);
        }
        .ql-editor h1, .ql-editor h2, .ql-editor h3, .ql-editor h4, .ql-editor h5, .ql-editor h6 {
          margin: 0 0 0.6em;
          line-height: 1.25;
        }
        .ql-editor h1 + p,
        .ql-editor h2 + p,
        .ql-editor h3 + p,
        .ql-editor h4 + p,
        .ql-editor h5 + p,
        .ql-editor h6 + p {
          margin-top: 0.5em;
        }
        .ql-editor ul, .ql-editor ol {
          margin: 0 0 var(--body-mb);
          padding-left: 1.25em;
        }
        .ql-editor li + li { margin-top: 0.25em; }
        .ql-editor blockquote {
          margin: var(--body-mb) 0;
          padding-left: 1rem;
          border-left: 3px solid var(--border);
          color: #4b5563;
        }
        .ql-editor img, .ql-editor figure {
          display: block;
          margin: calc(var(--body-mb) * 1.25) 0;
        }
        .ql-editor hr {
          margin: calc(var(--body-mb) * 1.5) 0;
          border-color: var(--border);
        }
        .ql-editor table {
          width: 100%;
          border-collapse: collapse;
          margin: calc(var(--body-mb) * 1.5) 0;
        }
        .ql-editor table td,
        .ql-editor table th {
          border: 1px solid #E8E7E5;
          padding: 12px 16px;
          text-align: left;
        }
        .ql-editor table th {
          background: #ECEBEA;
          font-weight: 600;
          color: var(--ink);
        }
        .ql-editor table tbody tr:nth-child(even) td {
          background: rgba(236, 235, 234, 0.3);
        }
      `}</style>

      {/* Featured Image */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardContent className="p-6 space-y-4">
          <Label className="text-[var(--ink)]">Featured Image</Label>
          {form.featured_image ? (
            <div className="relative">
              <div className="aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-lg)] border border-[var(--border)]">
                <img src={form.featured_image} alt="Featured" className="w-full h-full object-cover" />
              </div>
              <div className="mt-3 flex gap-2">
                <Button type="button" variant="outline" className="border-[var(--border)]" onClick={() => update("featured_image", "")}>
                  Remove
                </Button>
              </div>
            </div>
          ) : (
            <AssetUploader
              label="Upload Featured Image"
              accept="image/*"
              maxSizeMB={8}
              onUploaded={handleUploadFeatured}
            />
          )}
          <div className="mt-2">
            <Label className="text-sm text-gray-600">Or paste image URL</Label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder="https://example.com/image.jpg"
                value={featuredUrlInput}
                onChange={(e) => setFeaturedUrlInput(e.target.value)}
                className="border-[var(--border)]"
              />
              <Button
                type="button"
                variant="outline"
                className="border-[var(--border)]"
                onClick={() => {
                  const url = (featuredUrlInput || "").trim();
                  if (!url) return;
                  if (!/^https?:\/\/.+/i.test(url)) {
                    window.alert("Please paste a valid http(s) image URL.");
                    return;
                  }
                  update("featured_image", url);
                  setFeaturedUrlInput("");
                }}
              >
                Use URL
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main content area */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-[var(--ink)]">Title</Label>
          </div>
          <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="Enter post title" className="border-[var(--border)]" />
          <div>
            <Label className="text-[var(--ink)]">Excerpt</Label>
            <Textarea rows={3} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} placeholder="Short summary shown in lists" className="border-[var(--border)]" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-[var(--ink)]">Content</Label>
              <Button variant="outline" type="button" onClick={handleInsertImage} className="border-[var(--border)]">
                Insert Image
              </Button>
            </div>

            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={form.content}
              onChange={(v) => update("content", v)}
              modules={quillModules}
              className="h-[480px]"
            />
          </div>
        </CardContent>
      </Card>

      {/* Metadata */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[var(--ink)]">Slug</Label>
              <Input value={form.slug} onChange={(e) => update("slug", slugify(e.target.value))} placeholder="auto-generated-from-title" className="border-[var(--border)]" />
            </div>
            <div>
              <Label className="text-[var(--ink)]">Author</Label>
              <Select value={form.team_member_id} onValueChange={handleTeamMemberChange}>
                <SelectTrigger className="border-[var(--border)]">
                  <SelectValue placeholder="Select author" />
                </SelectTrigger>
                <SelectContent>
                  {teamMembers.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      <div className="flex items-center gap-2">
                        {m.photo && (
                          <img src={m.photo} alt={m.name} className="w-6 h-6 rounded-full object-cover" />
                        )}
                        <span>{m.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedMember && (
                <div className="mt-3 flex items-center gap-3 p-3 bg-[var(--bright-grey)] rounded-[var(--radius-lg)] border border-[var(--border)]">
                  {selectedMember.photo && (
                    <img src={selectedMember.photo} alt={selectedMember.name} className="w-10 h-10 rounded-full object-cover" />
                  )}
                  <div>
                    <div className="font-medium text-[var(--ink)]">{selectedMember.name}</div>
                    {selectedMember.position && (
                      <div className="text-sm text-gray-600">{selectedMember.position}</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label className="text-[var(--ink)]">Category</Label>
              <Select value={form.category} onValueChange={(v) => update("category", v)}>
                <SelectTrigger className="border-[var(--border)]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-[var(--ink)]">Status</Label>
              <Select value={form.status} onValueChange={(v) => update("status", v)}>
                <SelectTrigger className="border-[var(--border)]">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end gap-3">
              <div className="space-y-1">
                <Label className="text-[var(--ink)]">Featured</Label>
                <div className="flex items-center gap-2 h-10">
                  <Switch checked={!!form.featured} onCheckedChange={(v) => update("featured", v)} />
                  <span className="text-sm text-gray-600">{form.featured ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label className="text-[var(--ink)]">Published Date</Label>
              <Input
                type="date"
                value={form.published_date || ""}
                onChange={(e) => update("published_date", e.target.value)}
                placeholder="YYYY-MM-DD"
                className="border-[var(--border)]"
              />
              <p className="text-xs text-gray-500 mt-1">
                Used for display and sorting. Set this to the article's original publish date.
              </p>
            </div>
          </div>

          <div>
            <Label className="text-[var(--ink)]">Tags</Label>
            <TagsInput value={form.tags} onChange={(tags) => update("tags", tags)} />
          </div>
        </CardContent>
      </Card>

      {/* SEO Settings */}
      <Card className="border-[var(--border)] shadow-sm">
        <CardContent className="p-6 space-y-4">
          <div className="font-medium text-[var(--ink)]">SEO Settings</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label className="text-[var(--ink)]">SEO Title</Label>
              <Input value={form.meta_title} onChange={(e) => update("meta_title", e.target.value)} placeholder="Optional SEO title" className="border-[var(--border)]" />
            </div>
            <div>
              <Label className="text-[var(--ink)]">SEO Description</Label>
              <Textarea rows={3} value={form.meta_description} onChange={(e) => update("meta_description", e.target.value)} placeholder="Optional SEO description" className="border-[var(--border)]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action bar */}
      <div className="sticky bottom-0 bg-white border-t border-[var(--border)] mt-2 p-4 flex justify-end gap-3 rounded-[var(--radius-lg)]">
        <Button variant="outline" type="button" onClick={onCancel} className="border-[var(--border)]">Cancel</Button>
        <Button
          type="button"
          className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white"
          disabled={!canSave}
          onClick={() => {
            const prepared = { ...form };
            if (!prepared.excerpt) {
              const text = stripHtml(prepared.content || "");
              prepared.excerpt = makeExcerpt(text || prepared.title || "");
            }
            if (!prepared.slug) prepared.slug = slugify(prepared.title || "");
            onSave(prepared);
          }}
        >
          {post ? "Save Changes" : "Create Post"}
        </Button>
      </div>
    </div>
  );
}
