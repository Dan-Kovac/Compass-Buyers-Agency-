import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Edit, Trash2, Eye, EyeOff, Star } from "lucide-react";
import { format } from "date-fns";

const STATUS_OPTIONS = ["all", "draft", "published"];
const CATEGORY_OPTIONS = ["all", "market-insights", "buying-tips", "local-knowledge", "case-studies", "industry-news"];

export default function BlogTable({ posts, onEdit, onDelete, onTogglePublish, onToggleFeatured, selectedIds = [], onToggleSelect, onToggleSelectAll }) {
  const [q, setQ] = React.useState("");
  const [status, setStatus] = React.useState("all");
  const [category, setCategory] = React.useState("all");

  const filtered = posts.filter((p) => {
    const matchesQ = !q || p.title?.toLowerCase().includes(q.toLowerCase()) || p.excerpt?.toLowerCase().includes(q.toLowerCase());
    const matchesS = status === "all" || p.status === status;
    const matchesC = category === "all" || p.category === category;
    return matchesQ && matchesS && matchesC;
  });

  return (
    <Card className="border-none shadow-lg">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-3 md:items-center md:justify-between mb-4">
          <div className="flex gap-3 flex-1">
            <Input placeholder="Search by title or excerpt..." value={q} onChange={(e) => setQ(e.target.value)} />
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                {STATUS_OPTIONS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-44">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORY_OPTIONS.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th className="py-2 pr-2 w-8">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.length === posts.length && posts.length > 0}
                    onChange={onToggleSelectAll}
                    className="cursor-pointer"
                  />
                </th>
                <th className="py-2 pr-4">Title</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4">Category</th>
                <th className="py-2 pr-4">Updated</th>
                <th className="py-2 pr-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="py-3 pr-2">
                    <input 
                      type="checkbox" 
                      checked={selectedIds.includes(p.id)}
                      onChange={() => onToggleSelect(p.id)}
                      className="cursor-pointer"
                    />
                  </td>
                  <td className="py-3 pr-4">
                    <div className="font-medium text-[var(--ink)]">{p.title}</div>
                    <div className="text-gray-500">{p.slug}</div>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-3">
                      <Badge className={p.status === "published" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}>
                        {p.status}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <Switch
                          checked={p.status === "published"}
                          onCheckedChange={() => onTogglePublish(p)}
                          aria-label={p.status === "published" ? "Unpublish post" : "Publish post"}
                        />
                        <span className="text-xs text-gray-500 hidden sm:inline">
                          {p.status === "published" ? "Published" : "Draft"}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">{p.category}</td>
                  <td className="py-3 pr-4 text-gray-500">{p.updated_date ? format(new Date(p.updated_date), "MMM d, yyyy") : "-"}</td>
                  <td className="py-3 pr-0">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => onToggleFeatured(p)} title={p.featured ? "Featured" : "Mark as featured"}>
                        <Star className={`w-4 h-4 ${p.featured ? "text-yellow-500" : "text-gray-500"}`} />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onEdit(p)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="destructive" size="sm" onClick={() => onDelete(p)}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">No posts found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
