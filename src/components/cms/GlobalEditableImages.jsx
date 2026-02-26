import React from "react";
import { base44 } from "@/api/base44Client";
import { useEditMode } from "./EditModeContext";
import ImagePickerModal from "./ImagePickerModal";

const hashString = (str = "") => {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return `img-${Math.abs(h)}`;
};

export default function GlobalEditableImages() {
  const { editMode } = useEditMode();
  const [open, setOpen] = React.useState(false);
  const imgRef = React.useRef(null);
  const keyRef = React.useRef("");
  const bindingsRef = React.useRef(new Map()); // key -> { id, url }

  // Load existing bindings once and subscribe to changes
  React.useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const rows = await base44.entities.MediaBinding.list("-updated_date", 500);
        if (!mounted) return;
        const map = new Map();
        (rows || []).forEach((r) => {
          if (r?.key && r?.url) map.set(r.key, { id: r.id, url: r.url });
        });
        bindingsRef.current = map;
        // Apply immediately to existing imgs
        applyBindingsToAllImgs();
      } catch {}
    })();

    const unsubscribe = base44.entities.MediaBinding?.subscribe?.((evt) => {
      const { type, data, id } = evt || {};
      if (!data?.key) return;
      const map = bindingsRef.current;
      if (type === "delete") {
        map.delete(data.key);
      } else {
        map.set(data.key, { id: id || data.id, url: data.url });
      }
      // Re-apply if something changed
      applyBindingsToAllImgs();
    });

    return () => {
      mounted = false;
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const computeKeyForImg = (imgEl) => {
    if (!imgEl) return "";
    const existing = imgEl.getAttribute("data-media-key");
    if (existing) return existing;

    // Preserve original src as a stable key seed; fall back to outerHTML hash
    let orig = imgEl.getAttribute("data-orig-src") || imgEl.currentSrc || imgEl.src || imgEl.getAttribute("src") || "";
    if (!orig) {
      const base = `${window.location.pathname}|${imgEl.outerHTML.slice(0, 120)}`;
      orig = `pending:${hashString(base)}`;
    }
    if (!imgEl.getAttribute("data-orig-src") && orig) imgEl.setAttribute("data-orig-src", orig);

    const key = `auto:${hashString(orig)}`;
    imgEl.setAttribute("data-media-key", key);
    return key;
  };

  const applyBindingsToAllImgs = () => {
    const map = bindingsRef.current;
    const imgs = document.querySelectorAll("img");
    imgs.forEach((img) => {
      const key = computeKeyForImg(img);
      const entry = map.get(key);
      if (entry?.url && img.src !== entry.url) {
        img.src = entry.url;
      }
    });
  };

  // Click handler in capture phase so we can prevent navigation
  React.useEffect(() => {
    const onClick = (e) => {
      if (!editMode) return;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // left-click only

      // Find nearest IMG (support older browsers without composedPath)
      const path = e.composedPath ? e.composedPath() : [];
      let imgEl = path.find((el) => el && el.tagName === "IMG");
      if (!imgEl) {
        let el = e.target;
        while (el && el !== document && el.tagName !== "IMG") el = el.parentElement;
        if (el && el.tagName === "IMG") imgEl = el;
      }
      if (!imgEl) return;

      // Prevent navigation if inside a link
      const anchor = path.find?.((el) => el && el.tagName === "A") || imgEl.closest("a");
      if (anchor) {
        e.preventDefault();
        e.stopPropagation();
      }

      // Open picker
      imgRef.current = imgEl;
      keyRef.current = computeKeyForImg(imgEl);
      setOpen(true);
    };

    if (editMode) {
      document.addEventListener("click", onClick, true);
    }
    return () => document.removeEventListener("click", onClick, true);
  }, [editMode]);

  // Also watch DOM changes and apply bindings to new images
  React.useEffect(() => {
    const mo = new MutationObserver(() => applyBindingsToAllImgs());
    mo.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });
    return () => mo.disconnect();
  }, []);

  const handleSelect = async (url) => {
    const img = imgRef.current;
    const key = keyRef.current;
    if (!img || !key) return;

    // Update DOM immediately and mark original once
    if (!img.getAttribute('data-orig-src')) {
      const orig = img.currentSrc || img.src || img.getAttribute('src') || '';
      if (orig) img.setAttribute('data-orig-src', orig);
    }
    img.src = url;

    // Upsert binding
    const existing = bindingsRef.current.get(key);
    if (existing?.id) {
      const updated = await base44.entities.MediaBinding.update(existing.id, { url });
      bindingsRef.current.set(key, { id: updated.id, url: updated.url });
    } else {
      const created = await base44.entities.MediaBinding.create({ key, url });
      bindingsRef.current.set(key, { id: created.id, url: created.url });
    }
  };

  return (
    <>
      {editMode && (
        <style>{`
          img { cursor: auto; }
          html.b44-edit-mode img { cursor: pointer !important; }
          html.b44-edit-mode img:hover { outline: 2px dashed var(--hills); outline-offset: 2px; }
        `}</style>
      )}
      <ImagePickerModal open={open} onOpenChange={setOpen} onSelect={handleSelect} />
    </>
  );
}
