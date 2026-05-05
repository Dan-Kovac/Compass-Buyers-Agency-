import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import ContactFormCompact from "../components/shared/ContactFormCompact";
import ScrollReveal from "@/components/shared/ScrollReveal";
import ImageBand from "@/components/shared/ImageBand";
import ReviewsBadge from "@/components/shared/ReviewsBadge";
import SEOHead from "../components/shared/SEOHead";

const contactStyles = `
  .contact-header {
    padding-top: clamp(5rem, 8vw, 6.5rem);
    padding-bottom: clamp(1.25rem, 2.5vw, 2rem);
    text-align: center;
    background: linear-gradient(165deg, #ffffff 0%, rgba(242,236,206,0.12) 50%, rgba(214,239,251,0.06) 100%);
  }

  .contact-header h1 {
    font-family: var(--font-heading);
    font-weight: 400;
    font-size: clamp(2rem, 4.5vw, 3.25rem);
    line-height: 1.1;
    color: var(--ink);
    margin: 0.5rem 0 1rem;
  }

  .contact-header__lead {
    font-size: clamp(0.9375rem, 1.15vw, 1.0625rem);
    font-weight: 300;
    color: #6b6965;
    line-height: 1.6;
    max-width: 38rem;
    margin: 0 auto clamp(1.25rem, 2.5vw, 1.75rem);
  }

  .contact-body {
    padding: clamp(2rem, 5vw, 3.5rem) 0 clamp(3rem, 6vw, 5rem);
    background: #fff;
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: clamp(2rem, 4vw, 3rem);
    align-items: start;
    max-width: 64rem;
    margin: 0 auto;
  }

  @media (min-width: 900px) {
    .contact-grid {
      grid-template-columns: minmax(0, 3fr) minmax(0, 5fr);
      gap: clamp(2.5rem, 5vw, 4rem);
    }
  }

  @media (max-width: 899px) {
    .contact-grid .contact-aside { order: 2; }
    .contact-grid .contact-form  { order: 1; }
  }

  /* Aside - compact contact details */
  .contact-aside__block {
    display: flex;
    align-items: flex-start;
    gap: 0.875rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(26,26,26,0.06);
  }

  .contact-aside__block:first-of-type { padding-top: 0; }
  .contact-aside__block:last-of-type  { border-bottom: none; }

  .contact-aside__icon {
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 999px;
    background: rgba(75,115,113,0.08);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  .contact-aside__icon svg {
    width: 1rem;
    height: 1rem;
    color: var(--hills);
    stroke-width: 1.6;
  }

  .contact-aside__label {
    font-family: var(--font-body);
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--stone);
    margin-bottom: 0.25rem;
  }

  .contact-aside__value {
    font-family: var(--font-body);
    font-size: clamp(0.9375rem, 1.1vw, 1rem);
    font-weight: var(--font-body-medium);
    color: var(--ink);
    line-height: 1.4;
    text-decoration: none;
    transition: color 200ms var(--ease-out);
  }

  a.contact-aside__value:hover { color: var(--hills); }

  .contact-aside__value--phone {
    font-size: clamp(1.125rem, 1.5vw, 1.375rem);
    color: var(--hills);
    letter-spacing: -0.01em;
  }

  .contact-aside__hours {
    font-size: 0.8125rem;
    font-weight: 300;
    color: var(--stone);
    margin-top: 0.25rem;
    line-height: 1.5;
  }

  /* Form card - clean white with subtle hills accent on top */
  .contact-form-card {
    background: #fff;
    border: 1px solid rgba(26,26,26,0.06);
    border-top: 3px solid var(--hills);
    border-radius: clamp(0.75rem, 1.5vw, 1rem);
    overflow: hidden;
  }
  @media (min-width: 768px) {
    .contact-form-card {
      box-shadow: 0 4px 24px rgba(26,26,26,0.04);
    }
  }

  .contact-form-card__header {
    padding: clamp(1.25rem, 2.5vw, 1.75rem) clamp(1.5rem, 3vw, 2rem) 0;
  }

  .contact-form-card__title {
    font-family: var(--font-heading);
    font-weight: 400;
    font-size: clamp(1.375rem, 2.2vw, 1.75rem);
    letter-spacing: -0.01em;
    line-height: 1.2;
    color: var(--ink);
    margin: 0 0 0.5rem;
  }

  .contact-form-card__sub {
    font-size: clamp(0.8125rem, 1vw, 0.9375rem);
    font-weight: 300;
    color: var(--stone);
    line-height: 1.6;
    margin: 0;
  }

  /* Strip the surface rounding inside the card since card already provides it */
  .contact-form-card .surface {
    background: transparent !important;
    box-shadow: none !important;
    border: none !important;
    border-radius: 0 !important;
  }

  .contact-form-card .surface > div[class*="p-"] {
    padding-top: clamp(1rem, 2vw, 1.25rem) !important;
  }
`;

export default function Contact() {
  const phone = "0467 634 565";
  const phoneRaw = phone.replace(/\s/g, "");
  const email = "hello@compassbuyersagency.com.au";
  const address = "32a Tweed Coast Road, Cabarita Beach NSW 2487";

  return (
    <div className="bg-white">
      <SEOHead
        title="Contact Us | Talk to a Buyers Agent | Compass"
        description="Talk to a buyers agent today. Call Chris on 0467 634 565 or visit us at 32a Tweed Coast Road, Cabarita Beach. Free initial consultation."
        canonicalPath="/contact"
      />
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
              telephone: "+61467634565",
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

      <style>{contactStyles}</style>

      {/* Compact header */}
      <section className="contact-header">
        <div className="site-container">
          <ScrollReveal>
            <p className="eyebrow-label">Get in Touch</p>
            <h1>Talk to a Buyers Agent</h1>
            <p className="contact-header__lead">
              Free consultation. No obligation. We'll answer your questions and outline how we can help.
            </p>
            <ReviewsBadge variant="light" />
          </ScrollReveal>
        </div>
      </section>

      {/* Form + contact details */}
      <section className="contact-body">
        <div className="site-container">
          <div className="contact-grid">
            {/* Left: compact contact details */}
            <ScrollReveal animation="fade-right" className="contact-aside">
              <div>
                <div className="contact-aside__block">
                  <div className="contact-aside__icon"><Phone /></div>
                  <div>
                    <div className="contact-aside__label">Call Chris</div>
                    <a href={`tel:${phoneRaw}`} className="contact-aside__value contact-aside__value--phone">
                      {phone}
                    </a>
                    <div className="contact-aside__hours">Monday to Saturday, 8am–5pm</div>
                  </div>
                </div>

                <div className="contact-aside__block">
                  <div className="contact-aside__icon"><Mail /></div>
                  <div>
                    <div className="contact-aside__label">Email</div>
                    <a href={`mailto:${email}`} className="contact-aside__value" style={{ wordBreak: "break-all" }}>
                      {email}
                    </a>
                  </div>
                </div>

                <div className="contact-aside__block">
                  <div className="contact-aside__icon"><MapPin /></div>
                  <div>
                    <div className="contact-aside__label">Visit</div>
                    <div className="contact-aside__value">{address}</div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: form */}
            <ScrollReveal animation="fade-left" delay={120} id="enquiry-form" className="contact-form">
              <div className="contact-form-card">
                <div className="contact-form-card__header">
                  <h2 className="contact-form-card__title">
                    Book Your Free Consultation
                  </h2>
                  <p className="contact-form-card__sub">
                    Share a few details and we'll be in touch within 24 hours.
                  </p>
                </div>
                <ContactFormCompact
                  showHeaderImage={false}
                  hideHeader={true}
                  submitLabel="Book My Free Consult"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <ImageBand
        src="/images/contact/july-02.webp"
        alt="Aerial view of Northern Rivers coastline"
        height="340px"
        mobileHeight="220px"
        parallax={true}
      />
    </div>
  );
}
