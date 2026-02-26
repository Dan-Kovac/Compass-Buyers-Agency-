import React from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function TagsInput({ value = [], onChange, placeholder = "Add tag and press Enter" }) {
  const [input, setInput] = React.useState("");

  const addTag = (tag) => {
    const t = tag.trim();
    if (!t) return;
    if (value.includes(t)) return;
    onChange?.([...value, t]);
    setInput("");
  };

  const removeTag = (tag) => {
    onChange?.(value.filter((v) => v !== tag));
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && !input && value.length) {
      removeTag(value[value.length - 1]);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <Badge key={tag} variant="secondary" className="flex items-center gap-1">
            {tag}
            <button type="button" onClick={() => removeTag(tag)} className="hover:opacity-80">
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
      <Input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
      />
    </div>
  );
}
