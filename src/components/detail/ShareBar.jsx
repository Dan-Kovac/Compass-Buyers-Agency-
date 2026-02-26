import React from "react";
import { Button } from "@/components/ui/button";
import { Share2, Copy, Link as LinkIcon, Mail } from "lucide-react";

export default function ShareBar({ url }) {
  const [copied, setCopied] = React.useState(false);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) {
      // ignore
    }
  };

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ url });
      } catch {
        // ignore
      }
    } else {
      copyLink();
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button variant="outline" size="sm" onClick={shareNative}>
        <Share2 className="w-4 h-4 mr-2" />
        Share
      </Button>
      <a href={`mailto:?subject=${encodeURIComponent(document.title)}&body=${encodeURIComponent(url)}`}>
        <Button variant="outline" size="sm">
          <Mail className="w-4 h-4 mr-2" />
          Email
        </Button>
      </a>
      <Button variant="outline" size="sm" onClick={copyLink}>
        {copied ? <Copy className="w-4 h-4 mr-2 text-green-600" /> : <LinkIcon className="w-4 h-4 mr-2" />}
        {copied ? "Copied" : "Copy link"}
      </Button>
    </div>
  );
}
