import React from "react";
import { Image as ImageIcon } from "lucide-react";

export default function ImageThumb({ url, filename, selected, onToggle }) {
  const [errored, setErrored] = React.useState(false);

  return (
    <div className={`rounded-token border ${selected ? "border-[var(--hills)]" : "border-[var(--border)]"} overflow-hidden bg-white`}>
      <div className="aspect-square bg-gray-100 relative">
        {!errored ? (
          <img
            src={url}
            alt={filename}
            className="w-full h-full object-cover"
            loading="lazy"
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
            onError={() => setErrored(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-100">
            <div className="flex flex-col items-center gap-2">
              <ImageIcon className="w-5 h-5" />
              <span className="text-xs">Preview blocked by source</span>
            </div>
          </div>
        )}
        <button
          type="button"
          onClick={onToggle}
          className={`absolute top-2 left-2 text-xs rounded-full px-2 py-1 ${selected ? "bg-[var(--hills)] text-white" : "bg-white/90 text-[var(--ink)] border"}`}
          title={selected ? "Deselect" : "Select"}
        >
          {selected ? "Selected" : "Select"}
        </button>
      </div>
      <div className="p-2">
        <div className="text-xs truncate" title={filename}>{filename}</div>
        <a className="text-xs text-[var(--hills)] hover:underline" href={url} target="_blank" rel="noreferrer">Open source</a>
      </div>
    </div>
  );
}
