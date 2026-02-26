import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AssetUploader from "@/components/admin/AssetUploader";
import { base44 } from "@/api/base44Client";

export default function ImagePickerModal({ open, onOpenChange, onSelect }) {
  const [assets, setAssets] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const [pastedUrl, setPastedUrl] = React.useState("");

  React.useEffect(() => {
    if (!open) return;
    (async () => {
      const list = await base44.entities.Asset.list("-updated_date", 60);
      setAssets((list || []).filter(a => a.type === "image" && a.url));
    })();
  }, [open]);

  const filtered = assets.filter(a => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (a.name || "").toLowerCase().includes(q) || (a.url || "").toLowerCase().includes(q);
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Select or upload an image</DialogTitle>
          <DialogDescription>Choose from your media library, paste a URL, or upload a new image.</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="text-sm font-medium">Media library</div>
              <Input placeholder="Search by name or URL" value={query} onChange={(e) => setQuery(e.target.value)} />
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-72 overflow-auto">
                {filtered.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => { onSelect(a.url); onOpenChange(false); }}
                    className="relative group border rounded-md overflow-hidden hover:ring-2 hover:ring-[var(--hills)]"
                  >
                    <img src={a.url} alt={a.name || "Image"} className="w-full h-28 object-cover" loading="lazy" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-medium">Upload new</div>
              <AssetUploader label="Upload image" accept="image/*" onUploaded={({ url }) => { onSelect(url); onOpenChange(false); }} />

              <div className="text-sm font-medium mt-4">Paste image URL</div>
              <div className="flex gap-2">
                <Input placeholder="https://..." value={pastedUrl} onChange={(e) => setPastedUrl(e.target.value)} />
                <Button onClick={() => { if (pastedUrl) { onSelect(pastedUrl); onOpenChange(false); }}}>Use</Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
