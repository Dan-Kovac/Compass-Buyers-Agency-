import React from "react";
import { useParams, Link } from "react-router-dom";
import { fetchTeamMember, client, resolveImageUrl, urlFor } from "@/lib/sanityClient";
import { createPageUrl } from "@/utils";
import { Mail, Phone, ArrowLeft, ArrowRight, Linkedin, MapPin, Calendar, Home as HomeIcon } from "lucide-react";
import AcquisitionCard from "@/components/acquisitions/AcquisitionCard";
import BlogCard from "@/components/blog/BlogCard";
import CTASection from "@/components/shared/CTASection.jsx";
import ScrollReveal, { StaggerGroup } from "@/components/shared/ScrollReveal";

export default function TeamMemberDetail() {
  const { slug } = useParams();
  const [member, setMember] = React.useState(null);
  const [acquisitions, setAcquisitions] = React.useState([]);
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  // Fallback: support legacy ?id= query param
  const urlParams = new URLSearchParams(window.location.search);
  const idFallback = urlParams.get("id");
  const lookupKey = slug || idFallback;

  React.useEffect(() => {
    if (!lookupKey) { setLoading(false); return; }

    (async () => {
      setLoading(true);
      try {
        const memberData = await fetchTeamMember(lookupKey);
        setMember(memberData);

        if (memberData) {
          document.title = `${memberData.name} | Compass Buyers Agency`;

          // Load acquisitions by this agent
          const acqList = await client.fetch(
            `*[_type=="acquisition" && status=="published" && agent==$name] | order(purchase_date desc) [0..11] {
              "id":_id, title, "slug":slug.current, suburb, state, lga, property_type,
              beds, baths, cars, land_size, purchase_price, price_display, purchase_date,
              agent, market_visibility, timeframe, excerpt, main_image, main_image_url, tags, featured
            }`,
            { name: memberData.name }
          );
          setAcquisitions(acqList || []);

          // Load blog posts by this author
          const blogList = await client.fetch(
            `*[_type=="blogPost" && status=="published" && author==$name] | order(published_date desc) [0..5] {
              "id":_id, title, "slug":slug.current, status, category, tags, author,
              image, featured_image, excerpt, published_date, featured
            }`,
            { name: memberData.name }
          );
          setBlogs(blogList || []);
        }
      } catch (err) {
        console.error("Failed to load profile:", err);
        setMember(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [lookupKey]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <section className="bg-warm-gradient" style={{ padding: "var(--section-padding) 0" }}>
          <div className="site-container">
            <div className="max-w-5xl mx-auto">
              <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start animate-pulse">
                <div className="md:col-span-2">
                  <div className="aspect-[4/5] rounded-lg bg-[var(--bright-grey)]" />
                </div>
                <div className="md:col-span-3 space-y-4 pt-4">
                  <div className="h-8 w-2/3 bg-[var(--bright-grey)] rounded" />
                  <div className="h-5 w-1/3 bg-[var(--bright-grey)] rounded" />
                  <div className="h-4 w-full bg-[var(--bright-grey)] rounded mt-8" />
                  <div className="h-4 w-5/6 bg-[var(--bright-grey)] rounded" />
                  <div className="h-4 w-4/6 bg-[var(--bright-grey)] rounded" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="bg-white min-h-screen">
        <section className="bg-warm-gradient" style={{ padding: "var(--section-padding) 0" }}>
          <div className="site-container">
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow-label">Team</p>
              <h1>Profile not found</h1>
              <p style={{ color: "var(--stone)" }}>The team member you're looking for doesn't exist.</p>
              <Link
                to="/about"
                className="mt-6 inline-flex items-center gap-2 text-sm text-[var(--hills)] hover:underline underline-offset-2"
                style={{ fontWeight: "var(--font-body-medium)" }}
              >
                <ArrowLeft className="w-4 h-4" /> Back to team
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  const photoUrl = member.photo?.asset
    ? urlFor(member.photo).width(800).height(1000).fit("crop").url()
    : typeof member.photo === "string"
      ? member.photo
      : null;

  const firstName = member.name.split(" ")[0];

  return (
    <div className="bg-white">
      {/* ── Hero: Portrait + Info ────────────────────────────────────────── */}
      <section className="bg-warm-gradient" style={{ padding: "var(--section-padding) 0" }}>
        <div className="site-container">
          {/* Back link */}
          <ScrollReveal>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm text-[var(--stone)] hover:text-[var(--hills)] transition-colors mb-8 md:mb-10"
              style={{ fontWeight: "var(--font-body-medium)" }}
            >
              <ArrowLeft className="w-4 h-4" /> Back to team
            </Link>
          </ScrollReveal>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-5 gap-8 lg:gap-12 items-start">
              {/* Portrait */}
              <ScrollReveal className="md:col-span-2">
                <div className="relative">
                  {member.intro_video_url ? (
                    (member.intro_video_url.includes("youtube.com") || member.intro_video_url.includes("youtu.be")) ? (
                      <div className="w-full aspect-video rounded-lg overflow-hidden ring-1 ring-black/[0.04]">
                        <iframe
                          src={member.intro_video_url.replace("watch?v=", "embed/")}
                          title={`${member.name} introduction`}
                          className="w-full h-full"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <video
                        src={member.intro_video_url}
                        poster={photoUrl || undefined}
                        controls
                        className="w-full aspect-video rounded-lg object-cover ring-1 ring-black/[0.04]"
                      />
                    )
                  ) : photoUrl ? (
                    <img
                      src={photoUrl}
                      alt={member.name}
                      className="w-full aspect-[4/5] object-cover rounded-lg ring-1 ring-black/[0.04]"
                      fetchPriority="high"
                    />
                  ) : (
                    <div className="w-full aspect-[4/5] rounded-lg bg-[var(--bright-grey)] flex items-center justify-center">
                      <span className="text-6xl text-[var(--stone)]/30" style={{ fontFamily: "var(--font-heading)" }}>
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </ScrollReveal>

              {/* Info */}
              <ScrollReveal className="md:col-span-3">
                <div className="md:pt-2">
                  <p className="eyebrow-label">{member.position}</p>
                  <h1 style={{ marginBottom: "1rem" }}>{member.name}</h1>

                  {/* Contact row */}
                  <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6">
                    {member.email && (
                      <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-2 text-sm text-[var(--stone)] hover:text-[var(--hills)] transition-colors"
                        style={{ fontWeight: "var(--font-body-regular)" }}
                      >
                        <Mail className="w-4 h-4" /> {member.email}
                      </a>
                    )}
                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        className="inline-flex items-center gap-2 text-sm text-[var(--stone)] hover:text-[var(--hills)] transition-colors"
                        style={{ fontWeight: "var(--font-body-regular)" }}
                      >
                        <Phone className="w-4 h-4" /> {member.phone}
                      </a>
                    )}
                    {member.linkedin_url && (
                      <a
                        href={member.linkedin_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-[var(--stone)] hover:text-[var(--hills)] transition-colors"
                        style={{ fontWeight: "var(--font-body-regular)" }}
                      >
                        <Linkedin className="w-4 h-4" /> LinkedIn
                      </a>
                    )}
                  </div>

                  {/* Bio */}
                  {member.bio && (
                    <div
                      className="leading-relaxed"
                      style={{ color: "var(--stone)", fontSize: "1.0625rem", lineHeight: 1.7, fontWeight: "var(--font-body-light)" }}
                    >
                      {member.bio.split("\n").map((para, i) => (
                        <p key={i} style={{ marginBottom: i < member.bio.split("\n").length - 1 ? "1em" : 0 }}>
                          {para}
                        </p>
                      ))}
                    </div>
                  )}

                  {/* Credentials + Specialties */}
                  {((member.credentials?.length > 0) || (member.specialties?.length > 0)) && (
                    <div className="mt-8 flex flex-col sm:flex-row gap-6">
                      {member.credentials?.length > 0 && (
                        <div>
                          <div
                            className="mb-2"
                            style={{ fontSize: "0.6875rem", fontWeight: "var(--font-body-medium)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--stone)" }}
                          >
                            Credentials
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {member.credentials.map((c, i) => (
                              <span key={i} className="text-xs px-2.5 py-1 rounded-full border border-[var(--bright-grey)] text-[var(--ink)]" style={{ fontWeight: "var(--font-body-regular)" }}>
                                {c}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      {member.specialties?.length > 0 && (
                        <div>
                          <div
                            className="mb-2"
                            style={{ fontSize: "0.6875rem", fontWeight: "var(--font-body-medium)", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--stone)" }}
                          >
                            Specialties
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {member.specialties.map((s, i) => (
                              <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-[var(--sea-breeze)] text-[var(--hills)]" style={{ fontWeight: "var(--font-body-medium)" }}>
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Acquisitions ─────────────────────────────────────────────────── */}
      {acquisitions.length > 0 && (
        <section className="bg-white" style={{ padding: "var(--section-padding) 0" }}>
          <div className="site-container">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <p className="eyebrow-label">Properties Secured</p>
                <h2 style={{ marginBottom: "2rem" }}>
                  {firstName}'s Recent Acquisitions
                </h2>
              </ScrollReveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <StaggerGroup stagger={100}>
                  {acquisitions.slice(0, 6).map((acq) => (
                    <ScrollReveal key={acq.id}>
                      <AcquisitionCard item={acq} />
                    </ScrollReveal>
                  ))}
                </StaggerGroup>
              </div>

              {acquisitions.length > 6 && (
                <ScrollReveal className="text-center mt-10">
                  <Link
                    to="/acquisitions"
                    className="inline-flex items-center gap-2 text-sm text-[var(--hills)] hover:underline underline-offset-2"
                    style={{ fontWeight: "var(--font-body-medium)" }}
                  >
                    View all acquisitions <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── Blog Posts ────────────────────────────────────────────────────── */}
      {blogs.length > 0 && (
        <section className="bg-[var(--sand)]" style={{ padding: "var(--section-padding) 0" }}>
          <div className="site-container">
            <div className="max-w-5xl mx-auto">
              <ScrollReveal>
                <p className="eyebrow-label">Insights</p>
                <h2 style={{ marginBottom: "2rem" }}>
                  Latest from {firstName}
                </h2>
              </ScrollReveal>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                <StaggerGroup stagger={100}>
                  {blogs.slice(0, 6).map((post) => (
                    <ScrollReveal key={post.id}>
                      <BlogCard item={post} />
                    </ScrollReveal>
                  ))}
                </StaggerGroup>
              </div>

              {blogs.length > 6 && (
                <ScrollReveal className="text-center mt-10">
                  <Link
                    to="/blog"
                    className="inline-flex items-center gap-2 text-sm text-[var(--hills)] hover:underline underline-offset-2"
                    style={{ fontWeight: "var(--font-body-medium)" }}
                  >
                    View all posts <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <CTASection
        heading={`Ready to work with ${firstName}?`}
        buttonText="Start a Conversation"
        buttonHref={createPageUrl("Contact")}
        supportingText="No sales pitch. Just honest advice from people who know these markets inside out."
        variant="dark"
      />

      {/* ── Person JSON-LD ─────────────────────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        name: member.name,
        jobTitle: member.position,
        description: member.bio || `${member.position} at Compass Buyers Agency`,
        image: photoUrl || undefined,
        email: member.email || undefined,
        telephone: member.phone || undefined,
        worksFor: {
          "@type": "Organization",
          name: "Compass Buyers Agency",
          url: "https://compassagency.com.au",
        },
        ...(member.specialties?.length > 0 && { knowsAbout: member.specialties }),
        ...(member.linkedin_url && { sameAs: [member.linkedin_url] }),
      }) }} />
    </div>
  );
}
