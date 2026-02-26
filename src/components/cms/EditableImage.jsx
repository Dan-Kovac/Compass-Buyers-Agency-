import React from "react";
import { Pencil } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useEditMode } from "./EditModeContext";
import ImagePickerModal from "./ImagePickerModal";

export default function EditableImage({
  src,
  alt = "",
  mediaKey,
  entityName,
  entityId,
  fieldName,
  className = "",
  onChange,
  ...imgProps
}) {
  const { editMode } = useEditMode();
  const [open, setOpen] = React.useState(false);
  const [displaySrc, setDisplaySrc] = React.useState(src);
  const [bindingId, setBindingId] = React.useState(null);

  // Resolve binding override by mediaKey
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      if (mediaKey) {
        const rows = await base44.entities.MediaBinding.filter({ key: mediaKey }, "-updated_date", 1);
        if (!cancelled && rows && rows[0]) {
          setDisplaySrc(rows[0].url || src);
          setBindingId(rows[0].id);
        } else if (!cancelled) {
          setDisplaySrc(src);
        }
      } else {
        setDisplaySrc(src);
      }
    })();
    return () => { cancelled = true; };
  }, [mediaKey, src]);

  const handlePick = async (url) => {
    // Update entity field if provided, otherwise upsert MediaBinding
    if (entityName && entityId && fieldName) {
      const svc = base44.entities[entityName];
      await svc.update(entityId, { [fieldName]: url });
    } else if (mediaKey) {
      if (bindingId) {
        await base44.entities.MediaBinding.update(bindingId, { url });
      } else {
        const created = await base44.entities.MediaBinding.create({ key: mediaKey, url });
        setBindingId(created?.id || null);
      }
    }
    setDisplaySrc(url);
    if (onChange) onChange(url);
  };

  const openIfEditable = (e) => {
    if (!editMode) return;
    e.preventDefault();
    setOpen(true);
  };

  return (
    <div className="relative group">
      <img
        src={displaySrc}
        alt={alt}
        className={className}
        onClick={openIfEditable}
        onContextMenu={openIfEditable}
        {...imgProps}
      />

      {editMode && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="absolute top-2 right-2 z-10 inline-flex items-center gap-1 bg-black/60 text-white text-xs px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition"
          title="Edit image"
        >
          <Pencil className="w-3.5 h-3.5" /> Edit
        </button>
      )}

      <ImagePickerModal open={open} onOpenChange={setOpen} onSelect={handlePick} />
    </div>
  );
}
