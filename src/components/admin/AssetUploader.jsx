import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UploadFile } from "@/integrations/Core";
import { Loader2, Check, AlertCircle } from "lucide-react";

export default function AssetUploader({ label = "Upload File", accept = "", onUploaded, maxSizeMB = 20 }) {
  const [isUploading, setIsUploading] = React.useState(false);
  const [status, setStatus] = React.useState("idle"); // idle | success | error
  const [lastFileName, setLastFileName] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const fileRef = React.useRef(null);

  const openPicker = () => {
    if (fileRef.current && !isUploading) fileRef.current.click();
  };

  const readableBytes = (bytes) => `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLastFileName(file.name);
    setErrorMessage("");
    setStatus("idle");

    // Client-side size guard
    const maxBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxBytes) {
      setStatus("error");
      setErrorMessage(`File is too large (${readableBytes(file.size)}). Max allowed is ${maxSizeMB} MB.`);
      if (fileRef.current) fileRef.current.value = "";
      return;
    }

    setIsUploading(true);
    try {
      const { file_url } = await UploadFile({ file });
      setIsUploading(false);
      setStatus("success");
      if (onUploaded) onUploaded({ url: file_url, file });
      if (fileRef.current) fileRef.current.value = "";
      // Auto-clear success after a short delay
      setTimeout(() => setStatus("idle"), 2000);
    } catch (err) {
      setIsUploading(false);
      setStatus("error");
      const raw = (typeof err === "string" ? err : JSON.stringify(err || {})).toLowerCase();
      if (raw.includes("413") || raw.includes("payload too large") || raw.includes("exceeded the maximum")) {
        setErrorMessage("Upload failed: file exceeds the platform limit. Please compress the file or upload a smaller version.");
      } else {
        setErrorMessage("Upload failed. Please try again.");
      }
      if (fileRef.current) fileRef.current.value = "";
      // Keep the error visible until next interaction
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-[var(--ink)] font-medium">{label}</Label>
      <div className="flex items-center gap-3">
        {/* Hidden native input */}
        <Input
          ref={fileRef}
          type="file"
          accept={accept}
          onChange={handleUpload}
          className="hidden"
        />
        {/* Primary action button */}
        <Button type="button" onClick={openPicker} disabled={isUploading}>
          {isUploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Uploading...
            </>
          ) : (
            "Choose file"
          )}
        </Button>

        {/* Status indicator */}
        {status === "success" && (
          <span className="flex items-center text-green-600 text-sm">
            <Check className="w-4 h-4 mr-1" /> Uploaded{lastFileName ? `: ${lastFileName}` : ""}
          </span>
        )}
        {status === "error" && (
          <span className="flex items-center text-red-600 text-sm">
            <AlertCircle className="w-4 h-4 mr-1" /> {errorMessage || "Upload failed"}
          </span>
        )}
      </div>
      <div className="text-xs text-gray-500">
        Max size: {maxSizeMB} MB. Large files can take a while to upload. Once complete, a preview will appear below.
      </div>
    </div>
  );
}
