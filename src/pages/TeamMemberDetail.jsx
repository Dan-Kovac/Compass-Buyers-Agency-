import React from "react";
import { fetchTeamMember, client } from "@/lib/sanityClient";
import { createPageUrl } from "@/utils";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import AcquisitionCard from "@/components/acquisitions/AcquisitionCard";
import BlogCard from "@/components/blog/BlogCard";

// Placeholder testimonials - will be replaced with real data later
const PLACEHOLDER_TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah M.",
    location: "Byron Bay",
    quote: "Working with this team made our dream home a reality. Their expertise and local knowledge were invaluable throughout the entire process.",
    rating: 5
  },
  {
    id: 2,
    name: "Michael T.",
    location: "Kingscliff",
    quote: "Professional, responsive, and genuinely cared about finding the right property for us. Couldn't recommend them highly enough.",
    rating: 5
  },
  {
    id: 3,
    name: "Emma L.",
    location: "Ballina",
    quote: "Their negotiation skills saved us thousands. They fought hard for us and secured a fantastic deal in a competitive market.",
    rating: 5
  }
];

export default function TeamMemberDetail() {
  const [member, setMember] = React.useState(null);
  const [acquisitions, setAcquisitions] = React.useState([]);
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  React.useEffect(() => {
    (async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        // Load team member
        const memberData = await fetchTeamMember(id);
        setMember(memberData);

        if (memberData) {
          document.title = `${memberData.name} - Compass Buyers Agency`;

          // Load acquisitions by this agent
          const acqList = await client.fetch(
            `*[_type=="acquisition" && status=="published" && agent==$name]|order(purchase_date desc)[0..11]{"id":_id,title,"slug":slug.current,suburb,state,lga,property_type,beds,baths,cars,purchase_price,price_display,purchase_date,agent,market_visibility,timeframe,excerpt,main_image_url,tags,featured}`,
            { name: memberData.name }
          );
          setAcquisitions(acqList || []);

          // Load blog posts by this author
          const blogList = await client.fetch(
            `*[_type=="blogPost" && status=="published" && author==$name]|order(published_date desc)[0..5]{"id":_id,title,"slug":slug.current,status,category,tags,author,featured_image,excerpt,published_date,featured}`,
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
  }, [id]);

  if (loading) {
    return (
      <div className="site-container py-12">
        <div className="rounded-token border border-[var(--border)] bg-white p-8">
          Loading profile...
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="site-container py-12">
        <div className="rounded-token border border-[var(--border)] bg-white p-8">
          <h2 className="text-2xl font-semibold mb-4">Profile not found</h2>
          <p className="text-gray-600 mb-6">The team member you're looking for doesn't exist.</p>
          <a href={createPageUrl("About")} className="text-[var(--hills)] hover:underline">
            ← Back to team
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Back button bar */}
      <div className="border-b border-gray-200">
        <div className="site-container py-4">
          <a 
            href={createPageUrl("About")} 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[var(--hills)] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Team
          </a>
        </div>
      </div>

      {/* Hero section with profile */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-[var(--sea-breeze)]/40 to-white">
        <div className="site-container">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8 items-start">
              {/* Profile media (video when available) */}
              <div className="md:col-span-1">
                {member.intro_video_url ? (
                  (member.intro_video_url.includes("youtube.com") || member.intro_video_url.includes("youtu.be")) ? (
                    <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-lg">
                      <iframe
                        src={member.intro_video_url.replace("watch?v=", "embed/")}
                        title={`${member.name} introduction video`}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <video
                      src={member.intro_video_url}
                      poster={member.photo || undefined}
                      controls
                      className="w-full aspect-video rounded-2xl shadow-lg object-cover"
                    />
                  )
                ) : (
                  member.photo && (
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full aspect-square object-cover rounded-2xl shadow-lg"
                    />
                  )
                )}
              </div>

              {/* Profile info */}
              <div className="md:col-span-2">
                <h1 className="mb-2">{member.name}</h1>
                <div className="text-xl text-[var(--hills)] font-medium mb-6">
                  {member.position}
                </div>

                {/* Contact details */}
                <div className="space-y-3 mb-6">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-[var(--hills)] transition-colors"
                    >
                      <Mail className="w-5 h-5" />
                      <span>{member.email}</span>
                    </a>
                  )}
                  {member.phone && (
                    <a
                      href={`tel:${member.phone}`}
                      className="flex items-center gap-3 text-gray-700 hover:text-[var(--hills)] transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      <span>{member.phone}</span>
                    </a>
                  )}
                  
                </div>

                {/* Credentials */}
                {member.credentials && member.credentials.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Credentials
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {member.credentials.map((cred, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-white rounded-full text-sm border border-gray-200"
                        >
                          {cred}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Specialties */}
                {member.specialties && member.specialties.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Specialties
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((spec, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[var(--sea-breeze)] text-[var(--hills)] rounded-full text-sm font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio section */}
      <section className="py-12 border-b border-gray-200">
        <div className="site-container">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6">About {member.name.split(' ')[0]}</h2>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              {member.bio}
            </div>
          </div>
        </div>
      </section>

      {/* Acquisitions section */}
      {acquisitions.length > 0 && (
        <section className="py-12 bg-gradient-to-b from-white to-[var(--sea-breeze)]/15 border-b border-gray-200">
          <div className="site-container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-semibold mb-8">Recent Acquisitions</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {acquisitions.slice(0, 6).map((acq) => (
                  <AcquisitionCard key={acq.id} item={acq} />
                ))}
              </div>
              {acquisitions.length > 6 && (
                <div className="text-center mt-8">
                  <a href={createPageUrl("Acquisitions")}>
                    <Button variant="outline">View All Acquisitions</Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Blog posts section */}
      {blogs.length > 0 && (
        <section className="py-12 border-b border-gray-200">
          <div className="site-container">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-semibold mb-8">Latest Insights</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.slice(0, 6).map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
              {blogs.length > 6 && (
                <div className="text-center mt-8">
                  <a href={createPageUrl("Blog")}>
                    <Button variant="outline">View All Posts</Button>
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials section */}
      <section className="py-12 bg-gradient-to-b from-white to-[var(--sea-breeze)]/10">
        <div className="site-container">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-semibold mb-8 text-center">Client Testimonials</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {PLACEHOLDER_TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="surface p-6 rounded-token"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-4">"{testimonial.quote}"</p>
                  <div className="text-sm">
                    <div className="font-semibold text-[var(--ink)]">{testimonial.name}</div>
                    <div className="text-gray-500">{testimonial.location}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="py-16">
        <div className="site-container">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="mb-6">Ready to work with {member.name.split(' ')[0]}?</h2>
            <p className="text-gray-600 mb-8">
              Get in touch to discuss your property requirements and how we can help you achieve your goals.
            </p>
            <a href={createPageUrl("Contact")}>
              <Button className="bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white">
                Get in Touch
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
