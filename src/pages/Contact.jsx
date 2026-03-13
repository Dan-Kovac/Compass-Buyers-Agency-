import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactFormCompact from "../components/shared/ContactFormCompact";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ImageBand from "@/components/shared/ImageBand";
import SEOHead from "../components/shared/SEOHead";
import { fetchPage } from "@/lib/sanityClient";

/* ─── Scoped styles for Contact page ─────────────────────────────────────── */
const contactStyles = `
  .contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(2.5rem, 5vw, 4rem);
    align-items: start;
  }

  @media (min-width: 1024px) {
    .contact-grid {
      grid-template-columns: 1fr 1fr;
    }
  }

  /* Mobile: form first, contact details second */
  @media (max-width: 1023px) {
    .contact-grid .contact-details { order: 2; }
    .contact-grid .contact-form   { order: 1; }
  }

  /* Icon container with subtle hills-tinted background */
  .contact-icon-wrap {
    width: clamp(2.5rem, 4vw, 3rem);
    height: clamp(2.5rem, 4vw, 3rem);
    border-radius: var(--radius-button);
    background: linear-gradient(135deg, rgba(75,115,113,0.08), rgba(75,115,113,0.04));
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .contact-icon-wrap svg {
    width: clamp(1.125rem, 1.5vw, 1.25rem);
    height: clamp(1.125rem, 1.5vw, 1.25rem);
    color: var(--hills);
    stroke-width: 1.5;
  }

  /* Contact detail values */
  .contact-value {
    font-family: var(--font-body);
    font-size: clamp(1rem, 1.3vw, 1.125rem);
    font-weight: var(--font-body-medium);
    color: var(--ink);
    line-height: 1.4;
  }

  /* Elevated phone value */
  .contact-value--phone {
    font-size: clamp(1.125rem, 1.5vw, 1.25rem);
    font-weight: var(--font-body-medium);
    color: var(--hills);
    transition: opacity 300ms var(--ease-out);
  }

  .contact-value--phone:hover {
    opacity: 0.8;
    text-decoration: underline;
    text-underline-offset: 4px;
    text-decoration-color: rgba(75,115,113,0.4);
  }

  /* Email hover */
  .contact-value--email {
    transition: color 300ms var(--ease-out);
    word-break: break-all;
  }

  .contact-value--email:hover {
    color: var(--hills);
  }

  /* Availability note with sea-breeze wash */
  .contact-availability {
    background: linear-gradient(135deg, rgba(214,239,251,0.12), rgba(214,239,251,0.06));
    border-left: 3px solid var(--sea-breeze);
    padding: clamp(1rem, 2vw, 1.25rem) clamp(1rem, 2vw, 1.5rem);
    border-radius: 0 var(--radius-button) var(--radius-button) 0;
  }

  .contact-availability p {
    font-size: clamp(0.8125rem, 1vw, 0.9375rem);
    font-weight: 300;
    color: #6b6965;
    line-height: 1.6;
    margin-bottom: 0;
  }

  /* Social icon squares */
  .contact-social-link {
    width: clamp(2.5rem, 4vw, 2.75rem);
    height: clamp(2.5rem, 4vw, 2.75rem);
    min-width: 2.75rem;
    min-height: 2.75rem;
    border-radius: var(--radius-button);
    border: 1px solid var(--bright-grey);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--stone);
    transition: all 300ms var(--ease-out);
  }

  .contact-social-link svg {
    width: clamp(1rem, 1.2vw, 1.125rem);
    height: clamp(1rem, 1.2vw, 1.125rem);
    fill: currentColor;
  }

  .contact-social-link:hover {
    border-color: var(--hills);
    background: var(--hills);
    color: white;
    transform: translateY(-1px);
  }

  /* Form card — warmer, more generous */
  .contact-form-card {
    background:
      radial-gradient(ellipse at 20% 50%, rgba(242,236,206,0.15) 0%, transparent 70%),
      linear-gradient(180deg, rgba(242,236,206,0.08) 0%, rgba(242,236,206,0.18) 100%);
    border-radius: clamp(0.75rem, 1.5vw, 1rem);
    padding: clamp(1.5rem, 4vw, 2.5rem);
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    border: 1px solid rgba(242,236,206,0.3);
  }

  /* Section heading in left column */
  .contact-section-heading {
    font-family: var(--font-heading);
    font-weight: 400;
    font-size: clamp(1.75rem, 3.5vw, 2.75rem);
    line-height: 1.15;
    color: var(--ink);
    margin-bottom: clamp(1rem, 2vw, 1.5rem);
  }

  .contact-section-intro {
    font-size: clamp(0.9375rem, 1.1vw, 1.0625rem);
    font-weight: 300;
    color: #6b6965;
    margin-bottom: clamp(2rem, 4vw, 3rem);
    line-height: 1.65;
  }
`;

export default function Contact() {
  const [page, setPage] = React.useState(null);

  React.useEffect(() => {
    fetchPage("contactPage").then(setPage).catch(() => {});
  }, []);

  const phone = page?.phone || "0403 536 390";
  const phoneRaw = phone.replace(/\s/g, "");
  const email = page?.email || "hello@compassbuyersagency.com.au";
  const address = page?.address || "32a Tweed Coast Road, Cabarita Beach NSW 2487";

  return (
    <div className="bg-white">
      <SEOHead
        title={page?.seo?.metaTitle || "Contact Us | Talk to a Buyers Agent | Compass"}
        description={page?.seo?.metaDescription || "Talk to a buyers agent today. Call 0403 536 390 or visit us at 32a Tweed Coast Road, Cabarita Beach. Free initial consultation."}
        canonicalPath="/contact"
      />
      {/* ContactPage JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Compass Buyers Agency",
            url: "https://compassagency.com.au/contact",
            description: "Get in touch with Compass Buyers Agency. Free consultation, no obligation. Phone, email or enquiry form.",
            mainEntity: {
              "@type": "RealEstateAgent",
              name: "Compass Buyers Agency",
              url: "https://compassagency.com.au",
              telephone: "+61403536390",
              email: "hello@compassbuyersagency.com.au",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Cabarita Beach",
                addressLocality: "Cabarita Beach",
                addressRegion: "NSW",
                postalCode: "2488",
                addressCountry: "AU",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: -28.3345,
                longitude: 153.5537,
              },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                opens: "08:00",
                closes: "17:00",
              },
              sameAs: [
                "https://www.instagram.com/compassbuyersagency",
                "https://www.facebook.com/compassbuyersagency",
              ],
            },
          }),
        }}
      />

      {/* Scoped styles */}
      <style>{contactStyles}</style>

      {/* Page header */}
      <section className="bg-warm-gradient page-header">
        <div className="site-container">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <p className="eyebrow-label">Get in Touch</p>
              <h1>
                {page?.heading || "Let\u2019s Talk"}
              </h1>
              <p>
                {page?.subtitle ||
                  "Whether you\u2019re ready to start searching or just exploring your options, we\u2019d love to hear from you."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact details + enquiry form */}
      <section className="bg-white" style={{ padding: "var(--section-padding) 0" }}>
        <div className="site-container">
          <div className="contact-grid max-w-5xl mx-auto">
            {/* Left column: contact info */}
            <ScrollReveal animation="fade-right" className="contact-details">
              <div>
                {/* Section heading */}
                <h2 className="contact-section-heading">Prefer to talk?</h2>
                <p className="contact-section-intro">
                  We're always happy to chat. No obligation, no pressure.
                </p>

                {/* Contact items */}
                <div style={{ display: "flex", flexDirection: "column", gap: "clamp(1.5rem, 3vw, 2rem)" }}>
                  {/* Phone */}
                  <a href={`tel:${phoneRaw}`} className="flex items-start group" style={{ gap: "clamp(0.75rem, 2vw, 1rem)" }}>
                    <div className="contact-icon-wrap">
                      <Phone />
                    </div>
                    <div>
                      <div className="eyebrow-label" style={{ marginBottom: "0.25rem" }}>Mobile</div>
                      <div className="contact-value contact-value--phone">
                        {phone}
                      </div>
                    </div>
                  </a>

                  {/* Email */}
                  <a href={`mailto:${email}`} className="flex items-start group" style={{ gap: "clamp(0.75rem, 2vw, 1rem)" }}>
                    <div className="contact-icon-wrap">
                      <Mail />
                    </div>
                    <div>
                      <div className="eyebrow-label" style={{ marginBottom: "0.25rem" }}>Email</div>
                      <div className="contact-value contact-value--email">
                        {email}
                      </div>
                    </div>
                  </a>

                  {/* Address */}
                  <div className="flex items-start" style={{ gap: "clamp(0.75rem, 2vw, 1rem)" }}>
                    <div className="contact-icon-wrap">
                      <MapPin />
                    </div>
                    <div>
                      <div className="eyebrow-label" style={{ marginBottom: "0.25rem" }}>Office</div>
                      <div className="contact-value">
                        {address}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <hr style={{ borderColor: "var(--bright-grey)", margin: "clamp(1.5rem, 3vw, 2rem) 0" }} />

                {/* Availability note */}
                <div className="contact-availability">
                  <p>
                    We're available Monday to Saturday. For urgent enquiries, give
                    us a call. Otherwise, fill out the form and we'll be in touch
                    within 24 hours.
                  </p>
                </div>

                {/* Social */}
                <div style={{ marginTop: "clamp(1.5rem, 3vw, 2rem)" }}>
                  <div className="eyebrow-label" style={{ marginBottom: "0.75rem" }}>Follow Us</div>
                  <div className="flex items-center" style={{ gap: "clamp(0.75rem, 1.5vw, 1rem)" }}>
                    <a
                      href="https://www.instagram.com/compassbuyersagency"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-link"
                      aria-label="Instagram"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    <a
                      href="https://www.facebook.com/compassbuyersagency"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-social-link"
                      aria-label="Facebook"
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right column: enquiry form in warm card */}
            <ScrollReveal animation="fade-left" delay={120} id="enquiry-form" className="contact-form">
              <div className="contact-form-card">
                <ContactFormCompact
                  title={page?.formTitle || "Send Us a Message"}
                  showHeaderImage={false}
                  defaultPreferencesOpen={false}
                  preferencesLabel="Property preferences (optional)"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Atmospheric image divider */}
      <ImageBand
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
        alt="Northern Rivers coastline"
        height="280px"
        mobileHeight="180px"
      />
    </div>
  );
}
