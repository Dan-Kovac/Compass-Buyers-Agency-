import React from "react";
import { InvokeLLM } from "@/integrations/Core";
import { Asset } from "@/entities/Asset";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Globe, Image as ImageIcon, CheckCircle2 } from "lucide-react";
import ImageThumb from "@/components/media/ImageThumb";

function filenameFromUrl(u) {
  try {
    const url = new URL(u);
    const pathname = url.pathname.split("/").filter(Boolean).pop() || "image";
    return decodeURIComponent(pathname);
  } catch {
    return "image";
  }
}

function isImageUrl(u) {
  return /\.(png|jpe?g|webp|gif|svg|bmp|tiff?)($|\?)/i.test(u);
}

export default function ImageImporter() {
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [found, setFound] = React.useState([]);
  const [selected, setSelected] = React.useState({});
  const [importing, setImporting] = React.useState(false);
  const [importedCount, setImportedCount] = React.useState(0);

  const toggle = (u) => {
    setSelected((s) => ({ ...s, [u]: !s[u] }));
  };

  const selectAll = () => {
    const next = {};
    for (const u of found) next[u] = true;
    setSelected(next);
  };

  const clearAll = () => setSelected({});

  const fetchImages = async () => {
    if (!url) return;
    setLoading(true);
    setFound([]);
    setSelected({});
    setImportedCount(0);

    const schema = {
      type: "object",
      properties: {
        image_urls: { type: "array", items: { type: "string" } },
        page_title: { type: "string" }
      }
    };

    const prompt = `
You are a precise extractor. Given a website URL, return a deduplicated list of image URLs present on that page. Include:
- <img src> values
- The largest candidate from srcset (if present)
- og:image, twitter:image and link rel="image_src" if present

Rules:
- Return ABSOLUTE URLs only.
- Return real image files only (png, jpg, jpeg, webp, gif, svg).
- Cap at 150 items max.
Target URL: ${url}
`;

    const res = await InvokeLLM({
      prompt,
      add_context_from_internet: true,
      response_json_schema: schema
    });

    const raw = Array.isArray(res?.image_urls) ? res.image_urls : [];
    const cleaned = Array.from(
      new Set(raw.filter(Boolean).map((u) => u.trim()))
    ).filter(isImageUrl);

    setFound(cleaned);
    // pre-select all
    const nextSel = {};
    cleaned.forEach((u) => (nextSel[u] = true));
    setSelected(nextSel);
    setLoading(false);
  };

  const createExternalAssets = async () => {
    const chosen = found.filter((u) => selected[u]);
    if (!chosen.length) return;
    setImporting(true);
    let count = 0;
    for (const u of chosen) {
      await Asset.create({
        name: filenameFromUrl(u),
        type: "image",
        url: u, // Note: external link. To copy into storage, enable backend functions.
        mime_type: "",
        size: 0
      });
      count += 1;
      setImportedCount(count);
    }
    setImporting(false);
  };

  return (
    <div className="bg-white">
      <section className="py-10">
        <div className="site-container">
          <div style={{ "--h1-mw": "100%", "--h1-mb": "8px" }}>
            <h1>Image Importer (beta)</h1>
          </div>
          <p className="text-gray-600 max-w-2xl">
            Paste a page URL from your old site to list images. You can save them as external assets now.
            For a full crawl and direct upload into your media storage, please enable backend functions and I&apos;ll wire up the server-side crawler.
          </p>

          <Alert className="mt-4">
            <AlertTitle>Heads up</AlertTitle>
            <AlertDescription>
              This tool discovers image URLs and can create Asset records that reference those URLs. It does not copy files into your storage without backend functions.
            </AlertDescription>
          </Alert>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-[var(--hills)]" />
                Source URL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-col sm:flex-row">
                <Input
                  placeholder="https://example.com/page"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button onClick={fetchImages} disabled={!url || loading}>
                  {loading ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Finding images...</> : "Find images"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {found.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-[var(--hills)]" />
                  <div className="font-medium">Found {found.length} images</div>
                  <Badge variant="secondary">{Object.values(selected).filter(Boolean).length} selected</Badge>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={selectAll}>Select all</Button>
                  <Button variant="outline" size="sm" onClick={clearAll}>Clear</Button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {found.map((u) => {
                  const isSel = !!selected[u];
                  return (
                    <ImageThumb
                      key={u}
                      url={u}
                      filename={filenameFromUrl(u)}
                      selected={isSel}
                      onToggle={() => toggle(u)}
                    />
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Button onClick={createExternalAssets} disabled={importing || Object.values(selected).filter(Boolean).length === 0}>
                  {importing ? <><Loader2 className="w-4 h-4 animate-spin mr-2" /> Saving…</> : "Save selected as external links"}
                </Button>

                <Button
                  variant="outline"
                  disabled
                  title="Enable backend functions in Dashboard → Settings to copy files into your Media Library"
                >
                  Deep import to Media Library (copies files)
                </Button>

                {importedCount > 0 && (
                  <div className="flex items-center gap-1 text-green-700">
                    <CheckCircle2 className="w-4 h-4" /> Saved {importedCount}
                  </div>
                )}
              </div>

              <Alert className="mt-4">
                <AlertTitle>Want true one‑click import into storage?</AlertTitle>
                <AlertDescription>
                  Enable backend functions in Dashboard → Settings. I can then add a server-side crawler that downloads images and uploads them directly to your Media Library so your blogs and case studies can reuse them reliably.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
