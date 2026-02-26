import React from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Eye } from "lucide-react";
import { useEditMode } from "./EditModeContext";

export default function EditModeToggle({ enabled }) {
  const { editMode, setEditMode } = useEditMode();
  if (!enabled) return null;
  return (
    <div className="fixed bottom-6 right-24 z-[60]">
      <Button
        variant="ghost"
        className={`h-14 rounded-full px-4 backdrop-blur bg-white/60 hover:bg-white/70 text-[var(--ink)] border border-white/50 shadow-lg ${editMode ? "ring-1 ring-[var(--hills)]" : ""}`}
        onClick={() => setEditMode(!editMode)}
      >
        {editMode ? <Pencil className="w-4 h-4 mr-2" /> : <Eye className="w-4 h-4 mr-2" />}
        {editMode ? "Edit mode: On" : "Edit mode: Off"}
      </Button>
    </div>
  );
}
