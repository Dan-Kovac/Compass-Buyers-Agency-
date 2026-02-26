import React from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";

const SUBURB_NAMES = [
  // Byron Shire
  "Byron Bay", "Bangalow", "Brunswick Heads", "Mullumbimby", "Suffolk Park", "Ocean Shores",
  // Tweed Shire
  "Kingscliff", "Cabarita Beach", "Casuarina", "Pottsville", "Tweed Heads", "Murwillumbah",
  // Ballina Shire
  "Ballina", "Lennox Head", "Alstonville", "Wollongbar", "Cumbalum", "Skennars Head",
  // Gold Coast
  "Currumbin", "Palm Beach", "Tallebudgera", "Burleigh Heads", "Miami", "Mermaid Beach"
];

function matchesSuburbReport(post) {
  if (!post) return { matched: false };
  const title = String(post.title || "").toLowerCase();
  const slug = String(post.slug || "").toLowerCase();
  const tags = Array.isArray(post.tags) ? post.tags.map((t) => String(t || "").toLowerCase()) : [];

  const namesLC = SUBURB_NAMES.map((n) => n.toLowerCase());
  const byTitle = namesLC.find((n) => title.includes(n));
  const bySlug = namesLC.find((n) => slug.includes(n.replace(/\s+/g, "-")) || slug.includes(n));
  const byTag = namesLC.find((n) => tags.includes(n) || tags.some((t) => t.includes(n)));

  if (byTitle) return { matched: true, reason: `Title contains \"${byTitle}\"` };
  if (bySlug) return { matched: true, reason: `Slug contains \"${bySlug}\"` };
  if (byTag) return { matched: true, reason: `Tags include \"${byTag}\"` };
  return { matched: false };
}

export default function SuburbReportsMigrator() {
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [selected, setSelected] = React.useState({});
  const [updating, setUpdating] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const list = await base44.entities.BlogPost.list("-updated_date", 300);
      setPosts(Array.isArray(list) ? list : []);
      setLoading(false);
    })();
  }, []);

  const candidates = React.useMemo(() => {
    return posts
      .map((p) => ({ post: p, match: matchesSuburbReport(p) }))
      .filter((r) => r.match.matched || r.post.category === "suburb-profiles");
  }, [posts]);

  const toggle = (id) => setSelected((s) => ({ ...s, [id]: !s[id] }));
  const allChecked = candidates.length > 0 && candidates.every((r) => selected[r.post.id]);
  const toggleAll = () => {
    if (allChecked) {
      setSelected({});
    } else {
      const next = {};
      candidates.forEach((r) => (next[r.post.id] = true));
      setSelected(next);
    }
  };

  const toUpdate = candidates.filter((r) => selected[r.post.id] && r.post.category !== "suburb-profiles");

  const runUpdate = async () => {
    if (!toUpdate.length) return;
    setUpdating(true);
    for (const r of toUpdate) {
      await base44.entities.BlogPost.update(r.post.id, { category: "suburb-profiles" });
    }
    const fresh = await base44.entities.BlogPost.list("-updated_date", 300);
    setPosts(Array.isArray(fresh) ? fresh : []);
    setSelected({});
    setUpdating(false);
  };

  return (
    <div className="bg-white">
      <section className="py-10">
        <div className="site-container">
          <h1 className="mb-2">Suburb Reports Migrator</h1>
          <p className="text-gray-600 mb-6">Identify existing posts that look like suburb profiles and bulk-assign the “Suburb Profiles” category.</p>

          {loading ? (
            <div className="rounded-token border border-[var(--border)] bg-white p-6">Loading…</div>
          ) : (
            <div className="rounded-token border border-[var(--border)] bg-white overflow-hidden">
              <div className="p-4 flex items-center justify-between border-b border-[var(--border)]">
                <div className="text-sm text-gray-700">{candidates.length} candidates • {Object.values(selected).filter(Boolean).length} selected</div>
                <div className="flex gap-3">
                  <Button variant="outline" onClick={toggleAll}>{allChecked ? "Deselect all" : "Select all"}</Button>
                  <Button onClick={runUpdate} disabled={!toUpdate.length || updating} className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white">
                    {updating ? "Updating…" : `Assign category to ${toUpdate.length} post(s)`}
                  </Button>
                </div>
              </div>

              <div className="divide-y divide-[var(--border)]">
                {candidates.map(({ post, match }) => (
                  <label key={post.id} className="flex items-center gap-4 p-4 cursor-pointer">
                    <input
                      type="checkbox"
                      className="h-4 w-4"
                      checked={!!selected[post.id]}
                      onChange={() => toggle(post.id)}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium truncate">{post.title || "Untitled"}</div>
                        {post.category === "suburb-profiles" && (
                          <span className="text-xs bg-green-100 text-green-700 rounded-full px-2 py-0.5">Already categorised</span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 truncate">/{post.slug || "no-slug"}</div>
                      <div className="text-xs text-gray-600 mt-1">{match.matched ? match.reason : "Categorised as Suburb Profiles"}</div>
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">{post.status || "draft"}</div>
                  </label>
                ))}
                {candidates.length === 0 && (
                  <div className="p-6 text-center text-gray-600">No matching posts found.</div>
                )}
              </div>
            </div>
          )}

          <div className="mt-6 text-sm text-gray-600">
            If you have standalone pages (not Blog posts) that should become Suburb Profiles, share their URLs and I’ll migrate their content into Blog posts for you.
          </div>
        </div>
      </section>
    </div>
  );
}
