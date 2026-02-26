import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { PageSEO } from "@/entities/PageSEO";
import { PageLink } from "@/entities/PageLink";
import { RedirectRule } from "@/entities/RedirectRule";
import { createPageUrl } from "@/utils";

export default function SEOManager() {
  const [pages, setPages] = React.useState([]);
  const [selectedPage, setSelectedPage] = React.useState("");
  const [seo, setSeo] = React.useState({
    page_name: "",
    page_title: "",
    meta_title: "",
    meta_description: "",
    canonical_url: "",
    index: true,
    nofollow: false,
    og_title: "",
    og_description: "",
    og_image_url: ""
  });

  const [redirects, setRedirects] = React.useState([]);
  const [newRedirect, setNewRedirect] = React.useState({
    old_path: "",
    new_url: "",
    code: "301",
    active: true,
    notes: ""
  });

  React.useEffect(() => {
    (async () => {
      try {
        const list = await PageLink.filter({ active: true }, "order", 200);
        const staticFallback = [
          { label: "Home", page_name: "Home" },
          { label: "About", page_name: "About" },
          { label: "Services", page_name: "Services" },
          { label: "Case Studies", page_name: "CaseStudies" },
          { label: "Blog", page_name: "Blog" },
          { label: "Contact", page_name: "Contact" },
          { label: "Northern Rivers", page_name: "RegionNorthernRivers" },
          { label: "Byron Bay", page_name: "RegionByronBay" },
          { label: "Southern Gold Coast", page_name: "RegionSouthernGoldCoast" }
        ];
        const normalized = (list && list.length ? list.map(p => ({ label: p.label || p.title || p.page_name, page_name: p.page_name })) : staticFallback);
        setPages(normalized);
        if (normalized.length && !selectedPage) setSelectedPage(normalized[0].page_name);
      } catch {
        // fallback handled above
      }
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (!selectedPage) return;
      const res = await PageSEO.filter({ page_name: selectedPage }, "-updated_date", 1);
      const data = res && res.length ? res[0] : { page_name: selectedPage, index: true, nofollow: false };
      setSeo({
        page_name: selectedPage,
        page_title: data.page_title || "",
        meta_title: data.meta_title || "",
        meta_description: data.meta_description || "",
        canonical_url: data.canonical_url || "",
        index: data.index !== false,
        nofollow: !!data.nofollow,
        og_title: data.og_title || "",
        og_description: data.og_description || "",
        og_image_url: data.og_image_url || "",
        id: data.id
      });
    })();
  }, [selectedPage]);

  const loadRedirects = React.useCallback(async () => {
    const list = await RedirectRule.list("-updated_date", 200);
    setRedirects(list || []);
  }, []);

  React.useEffect(() => {
    loadRedirects();
  }, [loadRedirects]);

  const saveSEO = async () => {
    const payload = { ...seo };
    delete payload.id;
    if (seo.id) {
      const updated = await PageSEO.update(seo.id, payload);
      setSeo({ ...updated, id: updated.id });
    } else {
      const created = await PageSEO.create(payload);
      setSeo({ ...created, id: created.id });
    }
    alert("SEO settings saved");
  };

  const addRedirect = async () => {
    if (!newRedirect.old_path.startsWith("/")) {
      alert("Old path should start with / (e.g., /blog/old-post)");
      return;
    }
    const created = await RedirectRule.create(newRedirect);
    setNewRedirect({ old_path: "", new_url: "", code: "301", active: true, notes: "" });
    setRedirects([created, ...redirects]);
  };

  const toggleRedirect = async (r) => {
    const updated = await RedirectRule.update(r.id, { active: !r.active });
    setRedirects(redirects.map(x => (x.id === r.id ? updated : x)));
  };

  const deleteRedirect = async (r) => {
    await RedirectRule.delete(r.id);
    setRedirects(redirects.filter(x => x.id !== r.id));
  };

  const selectedUrl = selectedPage ? `${window.location.origin}${createPageUrl(selectedPage)}` : "";

  return (
    <div className="min-h-screen bg-[var(--bright-grey)] p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="text-3xl font-bold">SEO Manager</h1>
          <p className="text-gray-600">Edit per-page SEO and manage redirects for your WordPress migration.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Page SEO */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Page SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid md:grid-cols-[240px_1fr] gap-4 items-end">
                <div>
                  <Label>Select Page</Label>
                  <Select value={selectedPage} onValueChange={setSelectedPage}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a page" />
                    </SelectTrigger>
                    <SelectContent>
                      {pages.map(p => (
                        <SelectItem key={p.page_name} value={p.page_name}>{p.label || p.page_name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>URL</Label>
                  <Input readOnly value={selectedUrl} />
                </div>
              </div>

              <div>
                <Label>Page Title (optional)</Label>
                <Input value={seo.page_title || ""} onChange={(e) => setSeo({ ...seo, page_title: e.target.value })} />
              </div>

              <div>
                <Label>Meta Title</Label>
                <Input value={seo.meta_title || ""} onChange={(e) => setSeo({ ...seo, meta_title: e.target.value })} />
              </div>

              <div>
                <Label>Meta Description</Label>
                <Textarea rows={4} value={seo.meta_description || ""} onChange={(e) => setSeo({ ...seo, meta_description: e.target.value })} />
              </div>

              <div>
                <Label>Canonical URL</Label>
                <Input placeholder="https://yourdomain.com/path" value={seo.canonical_url || ""} onChange={(e) => setSeo({ ...seo, canonical_url: e.target.value })} />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <div>
                    <Label className="block">Index</Label>
                    <div className="text-xs text-gray-500">Allow search engines to index</div>
                  </div>
                  <Switch checked={seo.index !== false} onCheckedChange={(v) => setSeo({ ...seo, index: v })} />
                </div>
                <div className="flex items-center justify-between border rounded-lg p-3">
                  <div>
                    <Label className="block">Nofollow</Label>
                    <div className="text-xs text-gray-500">Disallow following links</div>
                  </div>
                  <Switch checked={!!seo.nofollow} onCheckedChange={(v) => setSeo({ ...seo, nofollow: v })} />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>OG Title</Label>
                  <Input value={seo.og_title || ""} onChange={(e) => setSeo({ ...seo, og_title: e.target.value })} />
                </div>
                <div>
                  <Label>OG Image URL</Label>
                  <Input value={seo.og_image_url || ""} onChange={(e) => setSeo({ ...seo, og_image_url: e.target.value })} />
                </div>
              </div>
              <div>
                <Label>OG Description</Label>
                <Textarea rows={3} value={seo.og_description || ""} onChange={(e) => setSeo({ ...seo, og_description: e.target.value })} />
              </div>

              <div className="flex justify-end">
                <Button onClick={saveSEO} className="bg-[var(--hills)] hover:bg-[var(--hills)]/90">Save SEO</Button>
              </div>
            </CardContent>
          </Card>

          {/* Redirects */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Redirects (WordPress → New Site)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Old Path (WP)</Label>
                  <Input placeholder="/category/old-post" value={newRedirect.old_path} onChange={(e) => setNewRedirect({ ...newRedirect, old_path: e.target.value })} />
                </div>
                <div>
                  <Label>New URL</Label>
                  <Input placeholder="/blog/new-post or https://domain.com/new" value={newRedirect.new_url} onChange={(e) => setNewRedirect({ ...newRedirect, new_url: e.target.value })} />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4 items-end">
                <div>
                  <Label>Code</Label>
                  <Select value={newRedirect.code} onValueChange={(v) => setNewRedirect({ ...newRedirect, code: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="301">301 (Permanent)</SelectItem>
                      <SelectItem value="302">302 (Temporary)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3">
                  <Switch checked={newRedirect.active} onCheckedChange={(v) => setNewRedirect({ ...newRedirect, active: v })} />
                  <Label>Active</Label>
                </div>
                <div className="text-right">
                  <Button onClick={addRedirect} className="bg-[var(--hills)] hover:bg-[var(--hills)]/90">Add Redirect</Button>
                </div>
              </div>
              <div>
                <Label>Notes</Label>
                <Input placeholder="Optional notes" value={newRedirect.notes} onChange={(e) => setNewRedirect({ ...newRedirect, notes: e.target.value })} />
              </div>

              <div className="border rounded-lg divide-y">
                {redirects.length === 0 ? (
                  <div className="p-4 text-sm text-gray-500">No redirects yet.</div>
                ) : (
                  redirects.map((r) => (
                    <div key={r.id} className="p-4 flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                      <div className="flex-1">
                        <div className="text-sm">
                          <span className="font-semibold">{r.code}</span> • <span className="text-gray-600">{r.old_path}</span>
                        </div>
                        <div className="text-xs text-gray-500 break-all">{r.new_url}</div>
                        {r.notes && <div className="text-xs text-gray-400 mt-1">{r.notes}</div>}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          <Switch checked={r.active} onCheckedChange={() => toggleRedirect(r)} />
                          <span className="text-sm">{r.active ? "Active" : "Inactive"}</span>
                        </div>
                        <Button variant="outline" onClick={() => deleteRedirect(r)}>Delete</Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
