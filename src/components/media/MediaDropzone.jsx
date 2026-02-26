import React from "react";
import { UploadFile } from "@/integrations/Core";
import { Asset } from "@/entities/Asset";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Fix: use input ref and click it from the button for reliable file dialog
export default function MediaDropzone({ accept = "image/*", onComplete }) {
  const [dragOver, setDragOver] = React.useState(false);
  const [uploading, setUploading] = React.useState(false);
  const [progress, setProgress] = React.useState({ done: 0, total: 0 });
  const [error, setError] = React.useState(null);
  const [failed, setFailed] = React.useState([]); // filenames that failed after retries
  const inputRef = React.useRef(null);

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const withRetry = async (fn, attempts = 3, baseDelay = 600) => {
    let lastErr;
    for (let i = 0; i < attempts; i++) {
      try {
        return await fn();
      } catch (e) {
        lastErr = e;
        if (i < attempts - 1) {
          await sleep(baseDelay * Math.pow(2, i)); // exponential backoff
        }
      }
    }
    throw lastErr;
  };

  const handleFiles = async (files) => {
    setError(null);
    setFailed([]);
    const arr = Array.from(files || []).filter(Boolean);
    if (!arr.length) return;
    setUploading(true);
    setProgress({ done: 0, total: arr.length });

    for (let i = 0; i < arr.length; i++) {
      const f = arr[i];
      try {
        const { file_url } = await withRetry(() => UploadFile({ file: f }), 3, 700);
        await withRetry(() =>
          Asset.create({
            name: f.name,
            type: "image",
            url: file_url,
            mime_type: f.type || "",
            size: f.size || 0,
          }), 3, 700
        );
      } catch (e) {
        setFailed((prev) => [...prev, f.name]);
        setError("Some uploads failed. You can retry the failed files.");
      } finally {
        setProgress({ done: i + 1, total: arr.length });
      }
    }

    setUploading(false);
    if (onComplete) onComplete();
    // Clear the input's value so that selecting the same file again triggers onChange
    if (inputRef.current) inputRef.current.value = "";
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    handleFiles(e.dataTransfer.files);
  };

  return (
    <div
      className={`border-2 border-dashed rounded-token p-6 text-center transition-colors ${
        dragOver ? "border-[var(--hills)] bg-[var(--sea-breeze)]/30" : "border-[var(--border)] bg-white"
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(true);
      }}
      onDragLeave={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOver(false);
      }}
      onDrop={onDrop}
    >
      <div className="mb-3 font-medium">Drag & drop images here</div>
      <div className="text-sm text-gray-600 mb-4">or click to select files</div>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple
        className="hidden"
        onChange={(e) => handleFiles(e.target.files)}
      />
      <Button
        type="button"
        variant="outline"
        onClick={() => inputRef.current && inputRef.current.click()}
        disabled={uploading}
      >
        Choose files
      </Button>

      {uploading && (
        <div className="mt-4 text-sm text-gray-700">
          Uploading {progress.done} of {progress.total}…
        </div>
      )}

      {error && (
        <Alert className="mt-4 text-left">
          <AlertTitle>Upload issues</AlertTitle>
          <AlertDescription>
            {error}
            {failed.length > 0 && (
              <div className="mt-2 text-xs text-gray-700">
                Failed: {failed.join(", ")}
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
