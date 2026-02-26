import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Home as HomeIcon,
  User as UserIcon,
  Briefcase,
  FolderOpen,
  BookOpen,
  Phone,
  Settings,
  Map,
  X,
  Menu,
  Database,
  Upload,
  Users
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { PageLink } from "@/entities/PageLink";

export default function AdminPageNavigator() {
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [dynamicPageLinks, setDynamicPageLinks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted) {
        setLoading(false);
      }
    }, 2000);

    (async () => {
      try {
        const me = await User.me();
        if (mounted) {
          setIsAdmin(me?.role === "admin");
          setLoading(false);
          clearTimeout(timeout);
        }
      } catch {
        if (mounted) {
          setIsAdmin(false);
          setLoading(false);
          clearTimeout(timeout);
        }
      }
    })();

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, []);

  React.useEffect(() => {
    if (!isAdmin) return;
    let mounted = true;
    const timeout = setTimeout(() => {
      if (mounted) {
        setDynamicPageLinks([]);
      }
    }, 2000);

    (async () => {
      try {
        const list = await PageLink.filter({ active: true }, "order", 200);
        if (mounted) {
          setDynamicPageLinks(list || []);
          clearTimeout(timeout);
        }
      } catch {
        if (mounted) {
          setDynamicPageLinks([]);
          clearTimeout(timeout);
        }
      }
    })();

    return () => {
      mounted = false;
      clearTimeout(timeout);
    };
  }, [isAdmin]);

  if (loading || !isAdmin) return null;

  const pageLinks = [
    { label: "Home", page: "Home", icon: HomeIcon },
    { label: "About", page: "About", icon: UserIcon },
    { label: "Who We Work With", page: "WhoWeWorkWith", icon: Users },
    { label: "Services", page: "Services", icon: Briefcase },
    { label: "Areas", page: "Areas", icon: Map },
    { label: "Acquisitions", page: "Acquisitions", icon: FolderOpen },
    { label: "Blog", page: "Blog", icon: BookOpen },
    { label: "Contact", page: "Contact", icon: Phone }
  ];

  const contentManagerLinks = [
    { label: "CMS Manager", page: "CMSManager", icon: Database },
    { label: "Content Importer", page: "ContentImporter", icon: Upload },
    { label: "Media Library", page: "MediaLibrary", icon: FolderOpen }
  ];

  const settingsLinks = [
    { label: "Brand Settings", page: "BrandSettings", icon: Settings },
    { label: "SEO Manager", page: "SEOManager", icon: Settings }
  ];

  const filteredDynamic = dynamicPageLinks.filter((l) => {
    const q = search.trim().toLowerCase();
    if (!q) return true;
    return (l.label || "").toLowerCase().includes(q) || (l.page_name || "").toLowerCase().includes(q);
  });

  return (
    <>
      {open && (
        <Card className="fixed bottom-24 right-6 w-[340px] z-[60] shadow-2xl border border-[var(--border)]">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Quick Page Navigator</CardTitle>
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)} className="h-8 w-8">
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-5">
              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Website Pages</div>
                <div className="mb-2">
                  <Input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search pages..."
                    className="h-9"
                  />
                </div>
                <div className="max-h-60 overflow-y-auto pr-1">
                  <div className="grid grid-cols-2 gap-2">
                    {(dynamicPageLinks.length ? filteredDynamic : pageLinks).map((item) => {
                      const label = item.label || item.title;
                      const page = item.page_name || item.page;
                      const Icon = item.icon || FolderOpen;
                      if (!page || !label) return null;
                      return (
                        <Link
                          key={page}
                          to={createPageUrl(page)}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-2 p-2 rounded-lg border hover:border-[var(--hills)] hover:bg-[var(--bright-grey)]/60 transition-colors"
                        >
                          <Icon className="h-4 w-4 text-[var(--hills)]" />
                          <span className="text-sm">{label}</span>
                        </Link>
                      );
                    })}
                  </div>
                  {dynamicPageLinks.length > 0 && filteredDynamic.length === 0 && (
                    <div className="text-xs text-gray-500 py-3 text-center">No pages match your search</div>
                  )}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Content Managers</div>
                <div className="grid grid-cols-2 gap-2">
                  {contentManagerLinks.map(({ label, page, icon: Icon }) => (
                    <Link
                      key={page}
                      to={createPageUrl(page)}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-lg border hover:border-[var(--hills)] hover:bg-[var(--bright-grey)]/60 transition-colors"
                    >
                      <Icon className="h-4 w-4 text-[var(--hills)]" />
                      <span className="text-sm">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs uppercase tracking-wide text-gray-500 mb-2">Settings</div>
                <div className="grid grid-cols-2 gap-2">
                  {settingsLinks.map(({ label, page, icon: Icon }) => (
                    <Link
                      key={page}
                      to={createPageUrl(page)}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-2 p-2 rounded-lg border hover:border-[var(--hills)] hover:bg-[var(--bright-grey)]/60 transition-colors"
                    >
                      <Icon className="h-4 w-4 text-[var(--hills)]" />
                      <span className="text-sm">{label}</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Button
        aria-label="Admin Page Navigator"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full z-[60] bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white shadow-xl"
      >
        <Menu className="h-6 w-6" />
      </Button>
    </>
  );
}
