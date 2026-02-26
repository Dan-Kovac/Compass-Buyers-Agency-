import React from "react";
import { Asset } from "@/entities/Asset";
import { UploadFile } from "@/integrations/Core";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function EditAssetDialog({ open, onOpenChange, asset, onSaved }) {
  const [name, setName] = React.useState(asset?.name || "");
  const [notes, setNotes] = React.useState(asset?.notes || "");
  const [file, setFile] = React.useState(null);
  const [saving, setSaving] = React.useState(false);

  React.useEffect(() => {
    if (asset) {
      setName(asset.name || "");
      setNotes(asset.notes || "");
      setFile(null);
    }
  }, [asset]);

  const handleSave = async () => {
    if (!asset) return;
    setSaving(true);
    const updates = { name, notes };

    if (file) {
      const { file_url } = await UploadFile({ file });
      updates.url = file_url;
      updates.mime_type = file.type || "";
      updates.size = file.size || 0;
    }

    await Asset.update(asset.id, updates);
    setSaving(false);
    if (onSaved) onSaved();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit image</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-700">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm text-gray-700">Notes (optional)</label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
          </div>
          <div>
            <label className="text-sm text-gray-700">Replace file (optional)</label>
            <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
            {asset?.url && (
              <div className="mt-2">
                <img src={asset.url} alt={asset.name} className="w-24 h-24 object-cover rounded" />
              </div>
            )}
          </div>
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
