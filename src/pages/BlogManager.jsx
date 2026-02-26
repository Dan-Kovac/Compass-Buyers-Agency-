import React from "react";
import { BlogPost } from "@/entities/BlogPost";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import BlogEditor from "@/components/blog/BlogEditor";
import BlogTable from "@/components/blog/BlogTable";
import BlogTemplateEditor from "@/components/blog/BlogTemplateEditor";
import BlogLivePreview from "@/components/blog/BlogLivePreview"; // Fixed path (removed .jsx)
import { Plus, ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function BlogManager() {
  const [posts, setPosts] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [showTemplatePanel, setShowTemplatePanel] = React.useState(false); // added

  React.useEffect(() => {
    loadPosts();
  }, []);

  // Auto-open create dialog when visiting BlogManager?new=1
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("new") === "1") {
      setEditing(null);
      setOpen(true);
      // Clean the URL so closing the modal doesn't instantly reopen it
      urlParams.delete("new");
      const qs = urlParams.toString();
      const newUrl = `${window.location.pathname}${qs ? `?${qs}` : ""}`;
      window.history.replaceState({}, "", newUrl);
    }
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    const list = await BlogPost.list("-updated_date", 100);
    setPosts(list || []);
    setLoading(false);
  };

  const handleCreate = () => {
    setEditing(null);
    setOpen(true);
  };

  const handleSave = async (data) => {
    if (editing) {
      await BlogPost.update(editing.id, data);
    } else {
      await BlogPost.create(data);
    }
    setOpen(false);
    setEditing(null);
    loadPosts();
  };

  const handleEdit = (post) => {
    setEditing(post);
    setOpen(true);
  };

  const handleDelete = async (post) => {
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`)) return;
    await BlogPost.delete(post.id);
    loadPosts();
  };

  const handleTogglePublish = async (post) => {
    const next = post.status === "published" ? "draft" : "published";
    await BlogPost.update(post.id, { status: next });
    loadPosts();
  };

  const handleToggleFeatured = async (post) => {
    await BlogPost.update(post.id, { featured: !post.featured });
    loadPosts();
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[var(--ink)]">Blog Manager</h1>
            <p className="text-gray-600">Create, edit, publish, and organize your blog posts.</p>
          </div>
          {/* Split button: primary = New Post, chevron opens menu */}
          <div className="flex gap-2">
            <Button onClick={handleCreate} className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  aria-label="More actions"
                  className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white px-2"
                >
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setShowTemplatePanel((v) => !v)}>
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  {showTemplatePanel ? "Hide Layout & Preview" : "Edit Layout & Preview"}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Collapsible Template Editor + Live Preview (hidden by default) */}
        {showTemplatePanel && (
          <div className="space-y-6">
            {/* Global Blog Template editor */}
            <BlogTemplateEditor />
            {/* Live preview of the blog template */}
            <BlogLivePreview posts={posts} />
          </div>
        )}

        {loading ? (
          <Card className="border-[var(--border)] shadow-sm">
            <CardContent className="p-6">Loading posts...</CardContent>
          </Card>
        ) : (
          <BlogTable
            posts={posts}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onTogglePublish={handleTogglePublish}
            onToggleFeatured={handleToggleFeatured}
          />
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-6xl p-0 overflow-hidden border-[var(--border)]">
            <DialogHeader className="px-6 pt-6 pb-2">
              <DialogTitle className="text-[var(--ink)]">{editing ? "Edit Post" : "Create Post"}</DialogTitle>
            </DialogHeader>
            <div className="max-h-[80vh] overflow-y-auto px-6 pb-6">
              <BlogEditor post={editing} onSave={handleSave} onCancel={() => setOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
