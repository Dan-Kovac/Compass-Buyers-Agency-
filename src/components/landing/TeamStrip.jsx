import React from "react";
import { Link } from "react-router-dom";
import { fetchTeamMembers, urlFor } from "@/lib/sanityClient";

/**
 * TeamStrip — compact row of circular team headshots.
 * Fetches active team members from Sanity and displays them
 * as a trust signal on landing pages.
 */
export default function TeamStrip() {
  const [members, setMembers] = React.useState([]);

  React.useEffect(() => {
    fetchTeamMembers()
      .then((data) => {
        // Filter out any members without photos, take first 6
        const withPhotos = (data || []).filter(
          (m) => m.photo?.asset || typeof m.photo === "string"
        );
        setMembers(withPhotos.slice(0, 6));
      })
      .catch(() => {});
  }, []);

  if (members.length === 0) return null;

  return (
    <section className="bg-sand-wash" style={{ padding: "var(--section-padding-compact) 0" }}>
      <div className="site-container">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: "2.5rem" }}>
          <p className="eyebrow-label">Your Local Team</p>
          <h2>The people behind Compass</h2>
        </div>

        {/* Photo row */}
        <div
          className="flex justify-center flex-wrap"
          style={{ gap: "clamp(1.5rem, 3vw, 2.5rem)" }}
        >
          {members.map((member) => {
            const photoUrl = member.photo?.asset
              ? urlFor(member.photo).width(200).height(200).fit("crop").url()
              : typeof member.photo === "string"
                ? member.photo
                : null;

            if (!photoUrl) return null;

            return (
              <Link
                key={member.id || member.slug}
                to={`/team/${member.slug}`}
                className="flex flex-col items-center group"
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    width: "clamp(72px, 10vw, 96px)",
                    height: "clamp(72px, 10vw, 96px)",
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "2px solid rgba(75, 115, 113, 0.15)",
                    transition: "transform 0.4s var(--ease-out)",
                  }}
                  className="group-hover:scale-105"
                >
                  <img
                    src={photoUrl}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                    }}
                  />
                </div>
                <span
                  style={{
                    fontSize: "0.8125rem",
                    fontWeight: 500,
                    color: "var(--ink)",
                    textAlign: "center",
                    marginTop: "0.5rem",
                  }}
                >
                  {member.name?.split(" ")[0]}
                </span>
                {member.position && (
                  <span
                    style={{
                      fontSize: "0.6875rem",
                      fontWeight: 400,
                      color: "var(--stone)",
                      textAlign: "center",
                      marginTop: "0.125rem",
                    }}
                  >
                    {member.position}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
