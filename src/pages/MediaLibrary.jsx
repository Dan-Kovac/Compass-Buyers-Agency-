import React from "react";
import MediaDropzone from "@/components/media/MediaDropzone";
import { Asset } from "@/entities/Asset";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, Trash2, Download } from "lucide-react";
import EditAssetDialog from "@/components/media/EditAssetDialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function MediaLibrary() {
  const [items, setItems] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState({});
  const [editing, setEditing] = React.useState(null);
  const [error, setError] = React.useState(null);

  const load = React.useCallback(async () => {
    setLoading(true);
    setError(null); // Clear any previous error
    try {
      const list = await Asset.list("-updated_date", 200);
      const images = (list || []).filter((a) => a.type === "image");
      setItems(images);
    } catch (e) {
      console.error("Failed to load images:", e); // Log the error for debugging
      setError("Could not load images. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    load();
  }, [load]);

  const toggle = (id) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const clearSel = () => setSelected({});
  const selectAll = () => {
    const next = {};
    items.forEach((i) => (next[i.id] = true));
    setSelected(next);
  };
  const selectedIds = React.useMemo(() => Object.entries(selected).filter(([_, v]) => v).map(([k]) => k), [selected]);
  const selectedCount = selectedIds.length;

  const handleDeleteSelected = async () => {
    if (!selectedCount) return;
    const ok = window.confirm(`Delete ${selectedCount} selected image(s)? This cannot be undone.`);
    if (!ok) return;
    for (const id of selectedIds) {
      await Asset.delete(id);
    }
    clearSel();
    load();
  };

  const handleDownloadSelected = async () => {
    if (!selectedCount) return;
    const selectedItems = items.filter((i) => selected[i.id]);
    // Attempt client-side multiple downloads (may be blocked by popup blockers)
    let delay = 0;
    selectedItems.forEach((it) => {
      setTimeout(() => {
        const a = document.createElement("a");
        a.href = it.url;
        a.setAttribute("download", it.name || "image");
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }, delay);
      delay += 250;
    });
  };

  return (
    <div className="bg-white">
      <section className="py-10">
        <div className="site-container">
          <div style={{ "--h1-mw": "100%", "--h1-mb": "8px" }} className="flex items-center justify-between gap-3">
            <h1>Media Library</h1>
            {/* Removed Image Importer link */}
          </div>
          <p className="text-gray-600 max-w-2xl">
            Bulk upload all your images here so they’re available across blogs and case studies.
          </p>

          {error && (
            <Alert className="mt-4">
              <AlertTitle>Problem loading media</AlertTitle>
              <AlertDescription className="flex items-center justify-between gap-2">
                <span>{error}</span>
                <Button variant="outline" size="sm" onClick={load}>Retry</Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="mt-6">
            <MediaDropzone onComplete={load} />
          </div>

          {/* Bulk actions */}
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Button variant="outline" onClick={selectAll}>Select all</Button>
            <Button variant="outline" onClick={clearSel}>Clear</Button>
            <Button variant="destructive" disabled={!selectedCount} onClick={handleDeleteSelected}>
              <Trash2 className="w-4 h-4 mr-2" /> Delete selected ({selectedCount})
            </Button>
            <Button variant="outline" disabled={!selectedCount} onClick={handleDownloadSelected}>
              <Download className="w-4 h-4 mr-2" /> Download selected
            </Button>
          </div>

          <div className="mt-10">
            <h3 className="mb-3">Uploaded images</h3>
            {loading ? (
              <div className="text-gray-600">Loading…</div>
            ) : items.length === 0 ? (
              <div className="text-gray-600">No images uploaded yet.</div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {items.map((it) => (
                  <div key={it.id} className="rounded-token border border-[var(--border)] overflow-hidden bg-white relative">
                    {/* Select checkbox */}
                    <div className="absolute top-2 left-2 z-10 bg-white/80 rounded px-1.5 py-1">
                      <Checkbox checked={!!selected[it.id]} onCheckedChange={() => toggle(it.id)} />
                    </div>
                    {/* Edit button */}
                    <button
                      type="button"
                      onClick={() => setEditing(it)}
                      className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white rounded p-1 border"
                      title="Edit"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <div className="aspect-square bg-gray-100">
                      <img
                        src={it.url}
                        alt={it.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-2">
                      <div className="text-xs truncate" title={it.name}>{it.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Note about bulk download */}
          <div className="mt-6 text-xs text-gray-500">
            Tip: Browsers may block multiple downloads. If nothing happens, allow pop‑ups/downloads for this site and try again.
          </div>

          <div className="mt-10 p-4 rounded-token border border-[var(--border)] bg-[var(--sea-breeze)]/25">
            <h4 className="font-medium mb-1">Want to auto-import images from your old website?</h4>
            <p className="text-sm text-gray-700">
              Directly crawling a website and saving all images requires a small backend function (to avoid browser
              CORS limits and to follow links). If you enable backend functions in Settings, I can wire up a one‑click
              importer: enter your old site URL, we&apos;ll crawl, download and store the images here automatically.
            </p>
          </div>

          {/* Edit dialog */}
          <EditAssetDialog
            open={!!editing}
            onOpenChange={(v) => !v && setEditing(null)}
            asset={editing}
            onSaved={load}
          />
        </div>
      </section>
    </div>
  );
}
