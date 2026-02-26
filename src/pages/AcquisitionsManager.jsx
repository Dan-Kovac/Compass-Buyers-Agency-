import React from "react";
import { Acquisition } from "@/entities/Acquisition";
import { Asset } from "@/entities/Asset";
import { TeamMember } from "@/entities/TeamMember";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Eye, EyeOff, Star } from "lucide-react";
import AssetUploader from "@/components/admin/AssetUploader";

const STATES = ["NSW", "QLD"];
const REGIONS = ["Byron Shire", "Tweed Shire", "Ballina Shire", "City of Gold Coast", "Other"];
const PROPERTY_TYPES = ["house", "apartment", "townhouse", "acreage", "duplex", "unit", "land", "villa", "other"];
const MARKET_VIS = ["on_market", "off_market"];

export default function AcquisitionsManager() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [teamMembers, setTeamMembers] = React.useState([]);

  const [form, setForm] = React.useState({
    title: "",
    main_image_url: "",
    agent_image: "",
    suburb: "",
    state: "NSW",
    lga: "Byron Shire",
    property_type: "house",
    beds: "",
    baths: "",
    cars: "",
    land_size: "",
    land_size_unit: "sqm",
    purchase_price: "",
    price_display: "",
    purchase_date: "",
    agent: "",
    team_member_id: "",
    market_visibility: "on_market",
    timeframe: "",
    excerpt: "",
    tags: [],
    slug: "",
    status: "published",
    featured: false
  });

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const load = React.useCallback(async () => {
    setLoading(true);
    const list = await Acquisition.list("-purchase_date", 200);
    setItems(list || []);
    setLoading(false);
  }, []);

  React.useEffect(() => { load(); }, [load]);

  // Load team members
  React.useEffect(() => {
    (async () => {
      const members = await TeamMember.list("-updated_date", 100);
      setTeamMembers((members || []).filter(m => m.active !== false));
    })();
  }, []);

  // When team member is selected, auto-fill agent name and image
  const handleTeamMemberChange = (memberId) => {
    update("team_member_id", memberId);
    if (memberId) {
      const member = teamMembers.find(m => m.id === memberId);
      if (member) {
        update("agent", member.name);
        if (member.photo && !form.agent_image) {
          update("agent_image", member.photo);
        }
      }
    } else {
      update("agent", "");
    }
  };

  // Get selected team member for display
  const selectedMember = teamMembers.find(m => m.id === form.team_member_id);

  const startCreate = () => {
    setEditing(null);
    setForm({
      title: "",
      main_image_url: "",
      agent_image: "",
      suburb: "",
      state: "NSW",
      lga: "Byron Shire",
      property_type: "house",
      beds: "",
      baths: "",
      cars: "",
      land_size: "",
      land_size_unit: "sqm",
      purchase_price: "",
      price_display: "",
      purchase_date: "",
      agent: "",
      team_member_id: "",
      market_visibility: "on_market",
      timeframe: "",
      excerpt: "",
      tags: [],
      slug: "",
      status: "published",
      featured: false
    });
    setOpen(true);
  };

  const startEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title || "",
      main_image_url: item.main_image_url || "",
      agent_image: item.agent_image || "",
      suburb: item.suburb || "",
      state: item.state || "NSW",
      lga: item.lga || "Byron Shire",
      property_type: item.property_type || "house",
      beds: item.beds ?? "",
      baths: item.baths ?? "",
      cars: item.cars ?? "",
      land_size: item.land_size ?? "",
      land_size_unit: item.land_size_unit || "sqm",
      purchase_price: item.purchase_price ?? "",
      price_display: item.price_display || "",
      purchase_date: item.purchase_date || "",
      agent: item.agent || "",
      team_member_id: item.team_member_id || "",
      market_visibility: item.market_visibility || "on_market",
      timeframe: item.timeframe || "",
      excerpt: item.excerpt || "",
      tags: Array.isArray(item.tags) ? item.tags : [],
      slug: item.slug || "",
      status: item.status || "published",
      featured: !!item.featured
    });
    setOpen(true);
  };

  const save = async () => {
    const payload = {
      ...form,
      beds: form.beds === "" ? undefined : Number(form.beds),
      baths: form.baths === "" ? undefined : Number(form.baths),
      cars: form.cars === "" ? undefined : Number(form.cars),
      land_size: form.land_size === "" ? undefined : Number(form.land_size),
      purchase_price: form.purchase_price === "" ? undefined : Number(form.purchase_price),
      tags: Array.isArray(form.tags) ? form.tags : String(form.tags || "").split(",").map(t => t.trim()).filter(Boolean)
    };
    if (editing) {
      await Acquisition.update(editing.id, payload);
    } else {
      await Acquisition.create(payload);
    }
    setOpen(false);
    setEditing(null);
    load();
  };

  const remove = async (item) => {
    if (!window.confirm(`Delete "${item.title}"? This cannot be undone.`)) return;
    await Acquisition.delete(item.id);
    load();
  };

  const togglePublish = async (item) => {
    const next = item.status === "published" ? "draft" : "published";
    await Acquisition.update(item.id, { status: next });
    load();
  };

  const toggleFeatured = async (item) => {
    await Acquisition.update(item.id, { featured: !item.featured });
    load();
  };

  const uploadMainImage = async ({ url, file }) => {
    update("main_image_url", url);
    await Asset.create({ name: file.name, type: "image", url, mime_type: file.type || "image/jpeg", size: file.size });
  };

  const uploadAgentImage = async ({ url, file }) => {
    update("agent_image", url);
    await Asset.create({ name: file.name, type: "image", url, mime_type: file.type || "image/jpeg", size: file.size });
  };

  const canSave = form.title && form.main_image_url && form.suburb && form.lga && form.property_type && form.team_member_id;

  const displayRegion = (a) => a?.lga || "-";
  const displayPrice = (a) => a?.price_display || (typeof a?.purchase_price === "number" ? Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 0 }).format(a.purchase_price) : "-");
  const displayDate = (a) => a?.purchase_date ? new Date(a.purchase_date).toLocaleDateString() : "-";

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--ink)]">Acquisitions Manager</h1>
            <p className="text-gray-600">Create, edit and publish acquisitions shown on the site.</p>
          </div>
          <Button onClick={startCreate} className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Acquisition
          </Button>
        </div>

        {loading ? (
          <Card className="border-[var(--border)] shadow-sm"><CardContent className="p-6">Loading acquisitions...</CardContent></Card>
        ) : (
          <Card className="border-[var(--border)] shadow-sm">
            <CardContent className="p-0 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-600 border-b border-[var(--border)]">
                    <th className="py-3 px-4">Title</th>
                    <th className="py-3 px-4">Region / Suburb</th>
                    <th className="py-3 px-4">Market</th>
                    <th className="py-3 px-4">Price</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((it) => (
                    <tr key={it.id} className="border-t border-[var(--border)]">
                      <td className="py-3 px-4">
                        <div className="font-medium text-[var(--ink)]">{it.title}</div>
                        <div className="text-gray-500 text-xs">{it.property_type || "-"}</div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-[var(--ink)]">{displayRegion(it)}</div>
                        <div className="text-gray-500 text-xs">{it.suburb || "-"}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center rounded-full bg-white px-2.5 py-0.5 text-xs border border-[var(--border)]">
                          {it.market_visibility === "off_market" ? "Off‑market" : "On‑market"}
                        </span>
                      </td>
                      <td className="py-3 px-4">{displayPrice(it)}</td>
                      <td className="py-3 px-4">{displayDate(it)}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs ${it.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                          {it.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm" onClick={() => toggleFeatured(it)} className="border-[var(--border)]">
                            <Star className={`w-4 h-4 ${it.featured ? "text-yellow-500" : "text-gray-500"}`} />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => togglePublish(it)} className="border-[var(--border)]">
                            {it.status === "published" ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => startEdit(it)} className="border-[var(--border)]">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="destructive" size="sm" onClick={() => remove(it)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {items.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-gray-500">No acquisitions yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-5xl max-h-[88vh] overflow-y-auto border-[var(--border)]">
            <DialogHeader>
              <DialogTitle className="text-[var(--ink)]">{editing ? "Edit Acquisition" : "New Acquisition"}</DialogTitle>
            </DialogHeader>

            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div>
                  <Label className="text-[var(--ink)]">Title</Label>
                  <Input value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g., 12 Palm Ave, beachside home" className="border-[var(--border)]" />
                </div>
                <div>
                  <Label className="text-[var(--ink)]">Excerpt</Label>
                  <Textarea rows={4} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} placeholder="Short blurb for cards and previews" className="border-[var(--border)]" />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-[var(--ink)]">Suburb</Label>
                    <Input value={form.suburb} onChange={(e) => update("suburb", e.target.value)} placeholder="e.g., Byron Bay" className="border-[var(--border)]" />
                  </div>
                  <div>
                    <Label className="text-[var(--ink)]">State</Label>
                    <Select value={form.state} onValueChange={(v) => update("state", v)}>
                      <SelectTrigger className="border-[var(--border)]"><SelectValue placeholder="Select state" /></SelectTrigger>
                      <SelectContent>
                        {STATES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-[var(--ink)]">Region</Label>
                    <Select value={form.lga} onValueChange={(v) => update("lga", v)}>
                      <SelectTrigger className="border-[var(--border)]"><SelectValue placeholder="Select region" /></SelectTrigger>
                      <SelectContent>
                        {REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-[var(--ink)]">Property Type</Label>
                    <Select value={form.property_type} onValueChange={(v) => update("property_type", v)}>
                      <SelectTrigger className="border-[var(--border)]"><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        {PROPERTY_TYPES.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-[var(--ink)]">Beds</Label>
                    <Input type="number" min="0" value={form.beds} onChange={(e) => update("beds", e.target.value)} className="border-[var(--border)]" />
                  </div>
                  <div>
                    <Label className="text-[var(--ink)]">Baths</Label>
                    <Input type="number" min="0" value={form.baths} onChange={(e) => update("baths", e.target.value)} className="border-[var(--border)]" />
                  </div>
                  <div>
                    <Label className="text-[var(--ink)]">Cars</Label>
                    <Input type="number" min="0" value={form.cars} onChange={(e) => update("cars", e.target.value)} className="border-[var(--border)]" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[var(--ink)]">Land Size</Label>
                    <Input type="number" min="0" step="0.01" value={form.land_size || ""} onChange={(e) => update("land_size", e.target.value)} className="border-[var(--border)]" />
                  </div>
                  <div>
                    <Label className="text-[var(--ink)]">Unit</Label>
                    <Select value={form.land_size_unit || "sqm"} onValueChange={(v) => update("land_size_unit", v)}>
                      <SelectTrigger className="border-[var(--border)]"><SelectValue placeholder="Select unit" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sqm">sqm</SelectItem>
                        <SelectItem value="acres">acres</SelectItem>
                        <SelectItem value="hectares">hectares</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-[var(--ink)]">Market Visibility</Label>
                    <Select value={form.market_visibility} onValueChange={(v) => update("market_visibility", v)}>
                      <SelectTrigger className="border-[var(--border)]"><SelectValue placeholder="Select" /></SelectTrigger>
                      <SelectContent>
                        {MARKET_VIS.map(v => <SelectItem key={v} value={v}>{v === "off_market" ? "Off‑market" : "On‑market"}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-[var(--ink)]">Purchase Date</Label>
                    <Input type="date" value={form.purchase_date || ""} onChange={(e) => update("purchase_date", e.target.value)} className="border-[var(--border)]" />
                  </div>
                  <div>
                    <Label className="text-[var(--ink)]">Timeline</Label>
                    <Input value={form.timeframe} onChange={(e) => update("timeframe", e.target.value)} placeholder="e.g., 4 weeks" className="border-[var(--border)]" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-[var(--ink)]">Purchase Price (AUD)</Label>
                    <Input type="number" min="0" step="1000" value={form.purchase_price} onChange={(e) => update("purchase_price", e.target.value)} placeholder="e.g., 1450000" className="border-[var(--border)]" />
                  </div>
                  <div>
                    <Label className="text-[var(--ink)]">Price Display</Label>
                    <Input value={form.price_display} onChange={(e) => update("price_display", e.target.value)} placeholder="e.g., Undisclosed" className="border-[var(--border)]" />
                  </div>
                </div>

                <div>
                  <Label className="text-[var(--ink)]">Agent</Label>
                  <Select value={form.team_member_id} onValueChange={handleTeamMemberChange}>
                    <SelectTrigger className="border-[var(--border)]"><SelectValue placeholder="Select agent" /></SelectTrigger>
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

                <div>
                  <Label className="text-[var(--ink)]">Tags (comma separated)</Label>
                  <Input value={(form.tags || []).join(", ")} onChange={(e) => update("tags", e.target.value.split(",").map(s => s.trim()).filter(Boolean))} placeholder="e.g., ocean views, cul-de-sac" className="border-[var(--border)]" />
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-[var(--ink)]">Main Image</Label>
                  {form.main_image_url ? (
                    <div className="space-y-2">
                      <img src={form.main_image_url} alt="Main" className="w-full rounded-[var(--radius-lg)] border border-[var(--border)] object-cover" />
                      <Button variant="outline" onClick={() => update("main_image_url", "")} className="border-[var(--border)]">Remove</Button>
                    </div>
                  ) : (
                    <AssetUploader label="Upload Image" accept="image/*" maxSizeMB={10} onUploaded={uploadMainImage} />
                  )}
                </div>
                
                <div>
                  <Label className="text-[var(--ink)]">Agent Profile Picture (Optional)</Label>
                  {form.agent_image ? (
                    <div className="space-y-2">
                      <div className="w-32 h-32 overflow-hidden rounded-full border border-[var(--border)] mx-auto">
                        <img src={form.agent_image} alt="Agent" className="w-full h-full object-cover" />
                      </div>
                      <Button variant="outline" onClick={() => update("agent_image", "")} className="border-[var(--border)]">Remove</Button>
                    </div>
                  ) : (
                    <AssetUploader label="Upload Custom Agent Image" accept="image/*" maxSizeMB={5} onUploaded={uploadAgentImage} />
                  )}
                  <p className="text-xs text-gray-500 mt-1">Defaults to team member photo if not provided.</p>
                </div>

                <div>
                  <Label className="text-[var(--ink)]">Slug</Label>
                  <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="optional-url-slug" className="border-[var(--border)]" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[var(--ink)]">Status</Label>
                    <Select value={form.status} onValueChange={(v) => update("status", v)}>
                      <SelectTrigger className="border-[var(--border)]"><SelectValue placeholder="Status" /></SelectTrigger>
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

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setOpen(false)} className="border-[var(--border)]">Cancel</Button>
                  <Button className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white" disabled={!canSave} onClick={save}>
                    {editing ? "Save Changes" : "Create Acquisition"}
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
