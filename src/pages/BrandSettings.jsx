import React from "react";
import { SiteSettings } from "@/entities/SiteSettings";
import { Asset } from "@/entities/Asset";
import AssetUploader from "../components/admin/AssetUploader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

export default function BrandSettings() {
  const [settings, setSettings] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [saving, setSaving] = React.useState(false);

  // Helper: normalize any CSS color to #RRGGBB
  const normalizeToHex = (val) => {
    if (!val) return "";
    let s = String(val).trim();

    // Already hex?
    const hex3 = /^#?([0-9a-f]{3})$/i;
    const hex6 = /^#?([0-9a-f]{6})$/i;
    if (hex6.test(s)) {
      // Ensure it starts with # and is uppercase
      const m = s.match(hex6)[1];
      return `#${m.toUpperCase()}`;
    }
    if (hex3.test(s)) {
      // Expand 3-digit hex to 6-digit hex
      const m = s.match(hex3)[1];
      const r = m[0] + m[0];
      const g = m[1] + m[1];
      const b = m[2] + m[2];
      return `#${(r + g + b).toUpperCase()}`;
    }

    // Use the browser to resolve named/rgb/hsl -> rgb(...)
    try {
      if (typeof document === 'undefined') {
        // If not in a browser environment (e.g., SSR), return original
        return s;
      }
      const el = document.createElement("div");
      el.style.color = s;
      document.body.appendChild(el);
      const rgb = getComputedStyle(el).color; // "rgb(r, g, b)" or "rgba(r, g, b, a)"
      document.body.removeChild(el);

      const m = rgb.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
      if (!m) return s; // Could not parse RGB, return original
      const r = parseInt(m[1], 10);
      const g = parseInt(m[2], 10);
      const b = parseInt(m[3], 10);
      const toHex = (n) => n.toString(16).padStart(2, "0").toUpperCase();
      return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    } catch {
      // Fallback if DOM manipulation fails or color is truly invalid
      return s;
    }
  };

  const colorKeys = ["color_hills","color_ink","color_bright_grey","color_sea_breeze","color_sand","color_stone"];

  const normalizeSettingsColors = (obj) => {
    const next = { ...obj };
    colorKeys.forEach((k) => {
      if (typeof next[k] === 'string' && next[k] !== '') { // Only normalize if it's a string and not empty
        next[k] = normalizeToHex(next[k]);
      }
    });
    return next;
  };

  React.useEffect(() => {
    (async () => {
      const list = await SiteSettings.list();
      const initial = list[0] || {
        site_name: "Compass Buyers Agency",
        heading_font_name: "",
        heading_font_url_woff2: "",
        body_font_name: "",
        body_font_url_woff2: "",
        hero_background_video_url: "",
        hero_background_image_url: "",
        logo_url: "",
        logo_inverted_url: "",
        favicon_url: "",
        color_hills: "#4B7371",
        color_ink: "#232323",
        color_bright_grey: "#ECEBEA",
        color_sea_breeze: "#D6EFFB",
        color_sand: "#F2ECCE",
        color_stone: "#AFADA4",
        button_height: 56, // Desktop default for existing button_height
        button_min_width: 220, // Desktop default for existing button_min_width
        button_radius: 15,

        // New responsive typography fields, initialized to null/undefined
        h1_desktop_size: null,
        h1_desktop_line_height: null,
        h1_desktop_margin_bottom: null,
        h1_desktop_max_width: null,
        h1_mobile_size: null,
        h1_mobile_line_height: null,
        h1_mobile_margin_bottom: null,
        h1_mobile_max_width: null,
        h2_desktop_size: null,
        h2_desktop_line_height: null,
        h2_desktop_margin_bottom: null,
        h2_mobile_size: null,
        h2_mobile_line_height: null,
        h2_mobile_margin_bottom: null,
        h3_desktop_size: null,
        h3_desktop_line_height: null,
        h3_desktop_margin_bottom: null,
        h3_mobile_size: null,
        h3_mobile_line_height: null,
        h3_mobile_margin_bottom: null,
        body_font_size: null,
        body_line_height_desktop: null,
        body_line_height_mobile: null,
        button_height_mobile: null,
        button_min_width_mobile: null,
      };
      // Normalize any non-hex colors to hex on load
      const normalized = normalizeSettingsColors(initial);
      setSettings(normalized);
      setLoading(false);
    })();
  }, []);

  const updateField = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const save = async () => {
    setSaving(true);
    // Normalize colors before saving to ensure consistency in DB
    const toSave = normalizeSettingsColors(settings || {});
    if (settings.id) {
      await SiteSettings.update(settings.id, toSave);
    } else {
      const created = await SiteSettings.create(toSave);
      setSettings(created); // Update state with the created object, which will have an ID
    }
    setSaving(false);
  };

  if (loading) {
    return <div className="max-w-5xl mx-auto p-6">Loading settings...</div>;
  }

  return (
    <div className="min-h-screen bg-[var(--bright-grey)] p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">Brand Settings</h1>
            <p className="text-gray-600">Update global brand styles used across the entire site.</p>
          </div>
          <Button onClick={save} className="bg-[var(--hills)] hover:bg-[var(--hills)]/90" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Editor (left) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Identity */}
            <Card>
              <CardHeader>
                <CardTitle>Identity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Site Name</Label>
                    <Input value={settings.site_name || ""} onChange={(e) => updateField("site_name", e.target.value)} />
                  </div>
                </div>

                <Separator />

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Logo (Primary)</Label>
                    <AssetUploader
                      label="Upload Logo (PNG/SVG)"
                      accept="image/png,image/svg+xml"
                      onUploaded={async ({ url, file }) => {
                        updateField("logo_url", url);
                        await Asset.create({ name: file.name, type: "image", url, mime_type: file.type, size: file.size });
                      }}
                    />
                    {settings.logo_url && <img src={settings.logo_url} alt="Logo preview" className="h-10 mt-2" />}
                  </div>
                  <div className="space-y-2">
                    <Label>Logo (Inverted/White)</Label>
                    <AssetUploader
                      label="Upload Inverted Logo (PNG/SVG)"
                      accept="image/png,image/svg+xml"
                      onUploaded={async ({ url, file }) => {
                        updateField("logo_inverted_url", url);
                        await Asset.create({ name: file.name, type: "image", url, mime_type: file.type, size: file.size });
                      }}
                    />
                    {settings.logo_inverted_url && (
                      <div className="bg-[var(--ink)] p-3 rounded-lg inline-block">
                        <img src={settings.logo_inverted_url} alt="Inverted logo preview" className="h-10" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Favicon</Label>
                  <AssetUploader
                    label="Upload Favicon (.ico or .png)"
                    accept="image/x-icon,image/png"
                    onUploaded={async ({ url, file }) => {
                      updateField("favicon_url", url);
                      await Asset.create({ name: file.name, type: "image", url, mime_type: file.type, size: file.size });
                    }}
                  />
                  {settings.favicon_url && <img src={settings.favicon_url} alt="Favicon preview" className="h-10 w-10 mt-2" />}
                </div>
              </CardContent>
            </Card>

            {/* Colors */}
            <Card>
              <CardHeader>
                <CardTitle>Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>Primary (Hills) — --hills</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <Input
                        type="color"
                        value={settings.color_hills || "#4B7371"}
                        onChange={(e) => updateField("color_hills", normalizeToHex(e.target.value))}
                        className="w-12 p-0 h-10"
                      />
                      <Input
                        placeholder="#4B7371"
                        value={settings.color_hills || ""}
                        onChange={(e) => updateField("color_hills", e.target.value)}
                        onBlur={(e) => updateField("color_hills", normalizeToHex(e.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Ink (Text) — --ink</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <Input
                        type="color"
                        value={settings.color_ink || "#232323"}
                        onChange={(e) => updateField("color_ink", normalizeToHex(e.target.value))}
                        className="w-12 p-0 h-10"
                      />
                      <Input
                        placeholder="#232323"
                        value={settings.color_ink || ""}
                        onChange={(e) => updateField("color_ink", e.target.value)}
                        onBlur={(e) => updateField("color_ink", normalizeToHex(e.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Bright Grey — --bright-grey</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <Input
                        type="color"
                        value={settings.color_bright_grey || "#ECEBEA"}
                        onChange={(e) => updateField("color_bright_grey", normalizeToHex(e.target.value))}
                        className="w-12 p-0 h-10"
                      />
                      <Input
                        placeholder="#ECEBEA"
                        value={settings.color_bright_grey || ""}
                        onChange={(e) => updateField("color_bright_grey", e.target.value)}
                        onBlur={(e) => updateField("color_bright_grey", normalizeToHex(e.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Sea Breeze — --sea-breeze</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <Input
                        type="color"
                        value={settings.color_sea_breeze || "#D6EFFB"}
                        onChange={(e) => updateField("color_sea_breeze", normalizeToHex(e.target.value))}
                        className="w-12 p-0 h-10"
                      />
                      <Input
                        placeholder="#D6EFFB"
                        value={settings.color_sea_breeze || ""}
                        onChange={(e) => updateField("color_sea_breeze", e.target.value)}
                        onBlur={(e) => updateField("color_sea_breeze", normalizeToHex(e.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Sand — --sand</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <Input
                        type="color"
                        value={settings.color_sand || "#F2ECCE"}
                        onChange={(e) => updateField("color_sand", normalizeToHex(e.target.value))}
                        className="w-12 p-0 h-10"
                      />
                      <Input
                        placeholder="#F2ECCE"
                        value={settings.color_sand || ""}
                        onChange={(e) => updateField("color_sand", e.target.value)}
                        onBlur={(e) => updateField("color_sand", normalizeToHex(e.target.value))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Stone — --stone</Label>
                    <div className="flex items-center gap-3 mt-1">
                      <Input
                        type="color"
                        value={settings.color_stone || "#AFADA4"}
                        onChange={(e) => updateField("color_stone", normalizeToHex(e.target.value))}
                        className="w-12 p-0 h-10"
                      />
                      <Input
                        placeholder="#AFADA4"
                        value={settings.color_stone || ""}
                        onChange={(e) => updateField("color_stone", e.target.value)}
                        onBlur={(e) => updateField("color_stone", normalizeToHex(e.target.value))}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Buttons (Global)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {/* button_height and button_min_width inputs moved to Typography section */}
                  <div>
                    <Label>Corner Radius (px) — --radius-lg</Label>
                    <Input type="number" min={0} max={32} value={settings.button_radius ?? 15} onChange={(e) => updateField("button_radius", Number(e.target.value))} className="mt-1" />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div className="text-sm text-gray-600">Live Preview</div>
                  <div className="flex flex-wrap gap-4 items-center">
                    <Button className="btn-cta bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white" type="button" style={{ fontFamily: 'var(--font-body)' }}>
                      Primary CTA
                    </Button>
                    <Button className="btn-cta btn-outline-brand" type="button" style={{ fontFamily: 'var(--font-body)' }}>
                      Secondary CTA
                    </Button>
                    <div className="p-4 rounded-xl" style={{ background: 'var(--ink)' }}>
                      <Button className="btn-cta btn-secondary-invert" type="button" style={{ fontFamily: 'var(--font-body)' }}>
                        Inverted CTA
                      </Button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">Edits here change all buttons site‑wide via CSS variables.</p>
                </div>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card>
              <CardHeader>
                <CardTitle>Typography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label>Heading Font Name</Label>
                    <Input placeholder="e.g., Minerva Modern" value={settings.heading_font_name || ""} onChange={(e) => updateField("heading_font_name", e.target.value)} />
                    <AssetUploader
                      label="Upload Heading Font (.woff2)"
                      accept=".woff2"
                      onUploaded={async ({ url, file }) => {
                        updateField("heading_font_url_woff2", url);
                        updateField("heading_font_name", settings.heading_font_name || file.name.replace(/\.(woff2|woff|ttf|otf)$/i, ""));
                        await Asset.create({ name: file.name, type: "font", url, mime_type: file.type || "font/woff2", size: file.size });
                      }}
                    />
                    {settings.heading_font_url_woff2 && <div className="text-sm text-gray-600 break-all">Current: {settings.heading_font_url_woff2}</div>}
                  </div>

                  <div className="space-y-3">
                    <Label>Body Font Name</Label>
                    <Input placeholder="e.g., Aeonik" value={settings.body_font_name || ""} onChange={(e) => updateField("body_font_name", e.target.value)} />
                    <AssetUploader
                      label="Upload Body Font (.woff2)"
                      accept=".woff2"
                      onUploaded={async ({ url, file }) => {
                        updateField("body_font_url_woff2", url);
                        updateField("body_font_name", settings.body_font_name || file.name.replace(/\.(woff2|woff|ttf|otf)$/i, ""));
                        await Asset.create({ name: file.name, type: "font", url, mime_type: file.type || "font/woff2", size: file.size });
                      }}
                    />
                    {settings.body_font_url_woff2 && <div className="text-sm text-gray-600 break-all">Current: {settings.body_font_url_woff2}</div>}
                  </div>
                </div>
                
                <Separator />

                {/* New typography settings */}
                <div className="space-y-6 mt-6">
                  <p className="text-gray-600">Adjust site-wide heading and body typography. Leave blank to use defaults.</p>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-base font-medium">H1 Desktop</h4>
                      <div className="grid grid-cols-3 gap-3 items-center">
                        <div>
                          <Label className="text-sm text-gray-600">Size (px)</Label>
                          <Input type="number" placeholder="48" value={settings.h1_desktop_size ?? ""} onChange={(e) => updateField("h1_desktop_size", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Line height (px)</Label>
                          <Input type="number" placeholder="54" value={settings.h1_desktop_line_height ?? ""} onChange={(e) => updateField("h1_desktop_line_height", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Margin bottom (px)</Label>
                          <Input type="number" placeholder="32" value={settings.h1_desktop_margin_bottom ?? ""} onChange={(e) => updateField("h1_desktop_margin_bottom", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm text-gray-600">Max width (%)</Label>
                          <Input type="number" placeholder="80" value={settings.h1_desktop_max_width ?? ""} onChange={(e) => updateField("h1_desktop_max_width", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-base font-medium">H1 Mobile</h4>
                      <div className="grid grid-cols-3 gap-3 items-center">
                        <div>
                          <Label className="text-sm text-gray-600">Size (px)</Label>
                          <Input type="number" placeholder="32" value={settings.h1_mobile_size ?? ""} onChange={(e) => updateField("h1_mobile_size", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Line height (px)</Label>
                          <Input type="number" placeholder="38" value={settings.h1_mobile_line_height ?? ""} onChange={(e) => updateField("h1_mobile_line_height", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Margin bottom (px)</Label>
                          <Input type="number" placeholder="24" value={settings.h1_mobile_margin_bottom ?? ""} onChange={(e) => updateField("h1_mobile_margin_bottom", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm text-gray-600">Max width (%)</Label>
                          <Input type="number" placeholder="85" value={settings.h1_mobile_max_width ?? ""} onChange={(e) => updateField("h1_mobile_max_width", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-base font-medium">H2</h4>
                      <div className="grid grid-cols-3 gap-3 items-center">
                        <div>
                          <Label className="text-sm text-gray-600">Desktop size</Label>
                          <Input type="number" placeholder="36" value={settings.h2_desktop_size ?? ""} onChange={(e) => updateField("h2_desktop_size", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Desktop LH</Label>
                          <Input type="number" placeholder="44" value={settings.h2_desktop_line_height ?? ""} onChange={(e) => updateField("h2_desktop_line_height", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Desktop MB</Label>
                          <Input type="number" placeholder="24" value={settings.h2_desktop_margin_bottom ?? ""} onChange={(e) => updateField("h2_desktop_margin_bottom", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 items-center">
                        <div>
                          <Label className="text-sm text-gray-600">Mobile size</Label>
                          <Input type="number" placeholder="26" value={settings.h2_mobile_size ?? ""} onChange={(e) => updateField("h2_mobile_size", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Mobile LH</Label>
                          <Input type="number" placeholder="32" value={settings.h2_mobile_line_height ?? ""} onChange={(e) => updateField("h2_mobile_line_height", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Mobile MB</Label>
                          <Input type="number" placeholder="16" value={settings.h2_mobile_margin_bottom ?? ""} onChange={(e) => updateField("h2_mobile_margin_bottom", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-base font-medium">H3</h4>
                      <div className="grid grid-cols-3 gap-3 items-center">
                        <div>
                          <Label className="text-sm text-gray-600">Desktop size</Label>
                          <Input type="number" placeholder="28" value={settings.h3_desktop_size ?? ""} onChange={(e) => updateField("h3_desktop_size", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Desktop LH</Label>
                          <Input type="number" placeholder="36" value={settings.h3_desktop_line_height ?? ""} onChange={(e) => updateField("h3_desktop_line_height", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Desktop MB</Label>
                          <Input type="number" placeholder="16" value={settings.h3_desktop_margin_bottom ?? ""} onChange={(e) => updateField("h3_desktop_margin_bottom", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-3 items-center">
                        <div>
                          <Label className="text-sm text-gray-600">Mobile size</Label>
                          <Input type="number" placeholder="22" value={settings.h3_mobile_size ?? ""} onChange={(e) => updateField("h3_mobile_size", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Mobile LH</Label>
                          <Input type="number" placeholder="28" value={settings.h3_mobile_line_height ?? ""} onChange={(e) => updateField("h3_mobile_line_height", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Mobile MB</Label>
                          <Input type="number" placeholder="12" value={settings.h3_mobile_margin_bottom ?? ""} onChange={(e) => updateField("h3_mobile_margin_bottom", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-base font-medium">Body & Buttons</h4>
                      <div className="grid grid-cols-3 gap-3 items-center">
                        <div>
                          <Label className="text-sm text-gray-600">Body size (px)</Label>
                          <Input type="number" placeholder="18" value={settings.body_font_size ?? ""} onChange={(e) => updateField("body_font_size", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Body LH (desktop)</Label>
                          <Input type="number" placeholder="28" value={settings.body_line_height_desktop ?? ""} onChange={(e) => updateField("body_line_height_desktop", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Body LH (mobile)</Label>
                          <Input type="number" placeholder="27" value={settings.body_line_height_mobile ?? ""} onChange={(e) => updateField("body_line_height_mobile", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 gap-3 items-center mt-3"> {/* Added mt-3 for spacing */}
                        <div>
                          <Label className="text-sm text-gray-600">Btn H (desk)</Label>
                          <Input type="number" placeholder="44" value={settings.button_height ?? ""} onChange={(e) => updateField("button_height", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Btn W (desk)</Label>
                          <Input type="number" placeholder="140" value={settings.button_min_width ?? ""} onChange={(e) => updateField("button_min_width", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Btn H (mob)</Label>
                          <Input type="number" placeholder="48" value={settings.button_height_mobile ?? ""} onChange={(e) => updateField("button_height_mobile", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                        <div>
                          <Label className="text-sm text-gray-600">Btn W (mob)</Label>
                          <Input type="number" placeholder="120" value={settings.button_min_width_mobile ?? ""} onChange={(e) => updateField("button_min_width_mobile", e.target.value ? Number(e.target.value) : undefined)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Media */}
            <Card>
              <CardHeader>
                <CardTitle>Media</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Hero Background Image</Label>
                  <AssetUploader
                    label="Upload Hero Image (JPG/PNG)"
                    accept="image/jpeg,image/png"
                    onUploaded={async ({ url, file }) => {
                      updateField("hero_background_image_url", url);
                      await Asset.create({ name: file.name, type: "image", url, mime_type: file.type || "image/jpeg", size: file.size });
                    }}
                    // images are typically small; keep default max
                  />
                  {settings.hero_background_image_url && <img src={settings.hero_background_image_url} alt="Hero image preview" className="rounded-lg border mt-2 w-full max-h-48 object-cover" />}
                </div>

                <div className="space-y-3">
                  <Label>Hero Background Video</Label>
                  <AssetUploader
                    label="Upload Video (MP4/WebM)"
                    accept="video/mp4,video/webm"
                    maxSizeMB={50}
                    onUploaded={async ({ url, file }) => {
                      updateField("hero_background_video_url", url);
                      await Asset.create({ name: file.name, type: "video", url, mime_type: file.type || "video/mp4", size: file.size });
                    }}
                  />
                  <div className="text-xs text-gray-500">
                    Tip: If your video exceeds the platform upload limit, host it elsewhere (e.g., CDN, S3, Vimeo direct file URL) and paste the URL below.
                  </div>

                  {/* New: External URL input */}
                  <div className="grid md:grid-cols-[1fr_auto] gap-3 items-end">
                    <div>
                      <Label className="text-[var(--ink)] font-medium">Or paste video URL</Label>
                      <Input
                        placeholder="https://your-cdn.com/path/to/video.mp4"
                        value={settings.hero_background_video_url || ""}
                        onChange={(e) => updateField("hero_background_video_url", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => updateField("hero_background_video_url", "")}
                      className="h-10"
                    >
                      Clear
                    </Button>
                  </div>

                  {settings.hero_background_video_url && (
                    <video className="w-full rounded-lg" src={settings.hero_background_video_url} controls muted />
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Live Preview (right) */}
          <div className="lg:col-span-5">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10">
                    <img
                      src={settings.logo_url || "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/eba70ebd2_10COMPASS_LOGO.png"}
                      alt="Logo"
                      className="h-10 w-auto"
                    />
                  </div>
                  <div className="text-xl font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                    {settings.site_name || "Compass Buyers Agency"}
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button className="btn-cta bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white" type="button" style={{ fontFamily: 'var(--font-body)' }}>
                    Primary CTA
                  </Button>
                  <Button className="btn-cta btn-outline-brand" type="button" style={{ fontFamily: 'var(--font-body)' }}>
                    Secondary CTA
                  </Button>
                </div>

                <div>
                  <div className="text-sm text-gray-500 mb-2">Brand Colors</div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { name: "--hills", val: settings.color_hills },
                      { name: "--ink", val: settings.color_ink },
                      { name: "--bright-grey", val: settings.color_bright_grey },
                      { name: "--sea-breeze", val: settings.color_sea_breeze },
                      { name: "--sand", val: settings.color_sand },
                      { name: "--stone", val: settings.color_stone }
                    ].map((c) => (
                      <div key={c.name} className="p-3 rounded-lg border flex items-center gap-3">
                        <div className="h-6 w-6 rounded" style={{ background: c.val || "transparent" }} />
                        <div className="text-sm">{c.name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm text-gray-500">Hero Background</div>
                  {settings.hero_background_image_url ? (
                    <img src={settings.hero_background_image_url} alt="Hero bg" className="rounded-lg border w-full max-h-40 object-cover" />
                  ) : settings.hero_background_video_url ? (
                    <video className="w-full rounded-lg" src={settings.hero_background_video_url} controls muted />
                  ) : (
                    <div className="h-32 rounded-lg border bg-[var(--bright-grey)] flex items-center justify-center text-gray-500 text-sm">
                      No hero media selected
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button onClick={save} className="bg-[var(--hills)] hover:bg-[var(--hills)]/90" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}
