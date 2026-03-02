import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactFormCompact from "../components/shared/ContactFormCompact";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ImageBand from "@/components/shared/ImageBand";
import { fetchPage } from "@/lib/sanityClient";

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
      {/* Editorial page header */}
      <section
        className="bg-warm-gradient"
        style={{ padding: "var(--section-breathing-lg) 0 var(--section-standard-lg)" }}
      >
        <div className="site-container">
          <ScrollReveal>
            <div className="max-w-2xl mx-auto text-center">
              <p className="eyebrow-label">Get in Touch</p>
              <h1 className="mb-4">
                {page?.heading || "Talk to a Buyers Agent"}
              </h1>
              <p
                style={{
                  fontWeight: "var(--font-body-light)",
                  fontSize: "1.125rem",
                  color: "var(--stone)",
                  lineHeight: "1.7",
                  maxWidth: "34rem",
                  margin: "0 auto",
                }}
              >
                {page?.subtitle ||
                  "Free consultation. No obligation. We'll answer your questions and outline how we can help you secure the right property."}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact details + enquiry form */}
      <section className="bg-cream" style={{ padding: "var(--section-standard-lg) 0" }}>
        <div className="site-container">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start max-w-6xl mx-auto">
            {/* Left column: contact info */}
            <ScrollReveal animation="fade-right" className="lg:col-span-2">
              <div className="space-y-7">
                {/* Phone */}
                <a href={`tel:${phoneRaw}`} className="flex items-start gap-4 group">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "var(--sea-breeze)" }}
                  >
                    <Phone className="w-[18px] h-[18px] text-[var(--hills)]" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: "var(--font-body-light)",
                        color: "var(--stone)",
                        fontSize: "0.8125rem",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        marginBottom: "2px",
                      }}
                    >
                      Mobile
                    </div>
                    <div
                      className="group-hover:text-[var(--hills)] transition-colors"
                      style={{ fontWeight: "var(--font-body-medium)", fontSize: "1.0625rem" }}
                    >
                      {phone}
                    </div>
                  </div>
                </a>

                {/* Email */}
                <a href={`mailto:${email}`} className="flex items-start gap-4 group">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "var(--sea-breeze)" }}
                  >
                    <Mail className="w-[18px] h-[18px] text-[var(--hills)]" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: "var(--font-body-light)",
                        color: "var(--stone)",
                        fontSize: "0.8125rem",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        marginBottom: "2px",
                      }}
                    >
                      Email
                    </div>
                    <div
                      className="group-hover:text-[var(--hills)] transition-colors break-all"
                      style={{ fontWeight: "var(--font-body-medium)", fontSize: "1.0625rem" }}
                    >
                      {email}
                    </div>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                    style={{ background: "var(--sea-breeze)" }}
                  >
                    <MapPin className="w-[18px] h-[18px] text-[var(--hills)]" />
                  </div>
                  <div>
                    <div
                      style={{
                        fontWeight: "var(--font-body-light)",
                        color: "var(--stone)",
                        fontSize: "0.8125rem",
                        letterSpacing: "0.04em",
                        textTransform: "uppercase",
                        marginBottom: "2px",
                      }}
                    >
                      Office
                    </div>
                    <div style={{ fontWeight: "var(--font-body-medium)", fontSize: "1.0625rem" }}>
                      {address}
                    </div>
                  </div>
                </div>

                {/* Divider */}
                <div className="section-divider" style={{ margin: "0" }} />

                {/* Availability note */}
                <p
                  style={{
                    fontWeight: "var(--font-body-light)",
                    color: "var(--stone)",
                    fontSize: "0.9375rem",
                    lineHeight: "1.65",
                    marginBottom: "0",
                  }}
                >
                  We're available Monday to Saturday. For urgent enquiries, give
                  us a call. Otherwise, fill out the form and we'll be in touch
                  within 24 hours.
                </p>

                {/* Social */}
                <div className="flex items-center gap-3">
                  <a
                    href="https://www.instagram.com/compassbuyersagency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--hills)] hover:border-[var(--hills)] hover:text-white text-[var(--stone)] transition-all"
                    aria-label="Instagram"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/compassbuyersagency"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center hover:bg-[var(--hills)] hover:border-[var(--hills)] hover:text-white text-[var(--stone)] transition-all"
                    aria-label="Facebook"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Right column: enquiry form */}
            <ScrollReveal animation="fade-left" delay={120} className="lg:col-span-3" id="enquiry-form">
              <ContactFormCompact
                title={page?.formTitle || "Send Us a Message"}
                showHeaderImage={false}
                defaultPreferencesOpen={false}
                preferencesLabel="Property preferences (optional)"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Atmospheric image divider */}
      <ImageBand
        src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2000&auto=format&fit=crop"
        alt="Northern Rivers coastline"
        height="300px"
        mobileHeight="180px"
      />
    </div>
  );
}
