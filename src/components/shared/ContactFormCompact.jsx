import React, { useState } from "react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

/* ─── Scoped styles for ContactFormCompact ────────────────────────────────── */
const formStyles = `
  /* Form field labels */
  .cfc-label {
    font-family: var(--font-body);
    font-size: clamp(0.8125rem, 1vw, 0.875rem);
    font-weight: var(--font-body-medium);
    color: var(--ink);
    margin-bottom: 0.375rem;
    display: block;
  }

  /* Form heading */
  .cfc-heading {
    font-family: var(--font-heading);
    font-size: clamp(1.25rem, 2vw, 1.5rem);
    font-weight: 400;
    letter-spacing: -0.01em;
    line-height: 1.2;
    color: var(--ink);
    margin-bottom: clamp(0.75rem, 1.5vw, 1.25rem);
  }

  /* Trust line below heading */
  .cfc-trust-line {
    font-size: clamp(0.8125rem, 1vw, 0.875rem);
    font-weight: 300;
    color: var(--stone);
    margin-bottom: clamp(1.25rem, 2.5vw, 1.5rem);
    line-height: 1.6;
  }

  /* Input and textarea focus/error states */
  .cfc-input {
    min-height: clamp(2.75rem, 5vw, 3rem);
    font-family: var(--font-body);
    font-size: clamp(0.9375rem, 1.1vw, 1rem);
    font-weight: var(--font-body-regular);
    color: var(--ink);
    background: white;
    border: 1px solid var(--bright-grey);
    border-radius: var(--radius-button);
    padding: 0 clamp(0.75rem, 1.5vw, 1rem);
    transition: border-color 300ms var(--ease-out), box-shadow 300ms var(--ease-out);
    width: 100%;
  }

  .cfc-input::placeholder {
    color: rgba(118, 116, 112, 0.5);
    font-weight: 300;
  }

  .cfc-input:focus {
    border-color: var(--hills);
    box-shadow: 0 0 0 3px rgba(75,115,113,0.1);
    outline: none;
  }

  .cfc-input--error {
    border-color: #C53030;
    box-shadow: 0 0 0 3px rgba(197,48,48,0.08);
  }

  .cfc-textarea {
    min-height: clamp(5rem, 10vw, 6rem);
    resize: vertical;
    line-height: 1.6;
    padding-top: clamp(0.5rem, 1vw, 0.75rem);
    padding-bottom: clamp(0.5rem, 1vw, 0.75rem);
  }

  /* Submit button overrides */
  .cfc-submit {
    width: 100%;
    height: clamp(2.75rem, 5vw, 3.25rem);
    background: var(--hills);
    color: white;
    font-family: var(--font-body);
    font-size: clamp(0.9375rem, 1.1vw, 1rem);
    font-weight: var(--font-body-medium);
    letter-spacing: 0.02em;
    border-radius: var(--radius-button);
    border: none;
    cursor: pointer;
    transition: all 300ms var(--ease-out);
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .cfc-submit:hover:not(:disabled) {
    background: rgba(75,115,113,0.9);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(75,115,113,0.2);
  }

  .cfc-submit:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }

  /* Warm success state */
  .cfc-success {
    background: linear-gradient(135deg, rgba(242,236,206,0.4), rgba(242,236,206,0.2));
    border: 1px solid rgba(242,236,206,0.6);
    border-radius: var(--radius-button);
    padding: clamp(1rem, 2vw, 1.25rem) clamp(1.25rem, 2.5vw, 1.5rem);
    text-align: center;
    animation: cfcFadeIn 400ms ease forwards;
  }

  .cfc-success__heading {
    font-family: var(--font-heading);
    font-size: clamp(1.125rem, 1.5vw, 1.25rem);
    font-weight: 400;
    color: var(--ink);
    margin-bottom: 0.5rem;
  }

  .cfc-success__body {
    font-size: clamp(0.8125rem, 1vw, 0.875rem);
    font-weight: 300;
    color: var(--stone);
    line-height: 1.6;
  }

  .cfc-success__body a {
    color: var(--hills);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* Subtle error state */
  .cfc-error {
    background: rgba(197,48,48,0.04);
    border: 1px solid rgba(197,48,48,0.15);
    border-radius: var(--radius-button);
    padding: clamp(1rem, 2vw, 1.25rem) clamp(1.25rem, 2.5vw, 1.5rem);
    text-align: center;
    animation: cfcFadeIn 400ms ease forwards;
  }

  .cfc-error p {
    font-size: clamp(0.8125rem, 1vw, 0.875rem);
    font-weight: 300;
    color: #9B2C2C;
    line-height: 1.6;
    margin-bottom: 0;
  }

  .cfc-error a {
    color: var(--hills);
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  /* Idle helper text */
  .cfc-helper {
    font-size: clamp(0.75rem, 0.9vw, 0.8125rem);
    font-weight: 300;
    color: var(--stone);
    text-align: center;
    margin-top: 0.5rem;
  }

  /* Collapsible trigger */
  .cfc-collapsible-trigger {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: clamp(0.75rem, 1.5vw, 1rem) clamp(1rem, 2vw, 1.25rem);
    font-family: var(--font-body);
    font-size: clamp(0.8125rem, 1vw, 0.875rem);
    font-weight: var(--font-body-medium);
    color: var(--ink);
    background: none;
    border: none;
    cursor: pointer;
    border-radius: var(--radius-button);
    transition: background 200ms;
  }

  .cfc-collapsible-trigger:hover {
    background: rgba(236,235,234,0.3);
  }

  @keyframes cfcFadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }
`;

export default function ContactFormCompact({
  title = "Get In Touch",
  showHeaderImage = true,
  preferencesLabel = "Add preferences (optional)",
  defaultPreferencesOpen = false
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    propertyType: "",
    location: "",
    budget: "",
    timeframe: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [isOpen, setIsOpen] = useState(defaultPreferencesOpen);

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const emailBody = `
New enquiry from Compass Buyers Agency website:

Name: ${formData.name}
Email: ${formData.email}
Mobile: ${formData.phone}

Preferences:
- Property Type: ${formData.propertyType || "-"}
- Preferred Location: ${formData.location || "-"}
- Budget Range: ${formData.budget || "-"}
- Timeframe: ${formData.timeframe || "-"}

Message:
${formData.message || "-"}

---
Sent from Compact Contact Form
    `;

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: "hello@compassbuyersagency.com.au",
          subject: `New Website Enquiry from ${formData.name || "Unknown"}`,
          body: emailBody,
          from_name: "Compass Buyers Agency Website"
        }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      setFormData({ name: "", email: "", phone: "", propertyType: "", location: "", budget: "", timeframe: "", message: "" });
      setIsSubmitting(false);
      setSubmitStatus("success");
    } catch (err) {
      console.error("Email send failed:", err);
      setIsSubmitting(false);
      setSubmitStatus("error");
    }
  };

  return (
    <div className="surface max-w-3xl mx-auto overflow-hidden" style={{ borderRadius: "var(--radius-card)" }}>
      {/* Scoped styles */}
      <style>{formStyles}</style>

      {showHeaderImage && (
        <div className="relative h-36 md:h-40 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?q=80&w=1600&auto=format&fit=crop"
            alt="Compass team"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>
      )}

      <div className="p-6 md:p-8">
        <h3 className="cfc-heading">{title}</h3>

        {/* Trust line */}
        <p className="cfc-trust-line">
          No obligation. We'll get back to you within 24 hours.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <p id="required-note" className="sr-only">Fields marked with * are required</p>

          {/* Name + Mobile side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(0.75rem, 1.5vw, 1rem)" }}>
            <div>
              <Label htmlFor="contact-name" className="cfc-label">Name *</Label>
              <Input
                id="contact-name"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                required
                aria-required="true"
                className="mt-1.5 cfc-input"
              />
            </div>
            <div>
              <Label htmlFor="contact-phone" className="cfc-label">Mobile *</Label>
              <Input
                id="contact-phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleChange("phone", e.target.value)}
                required
                aria-required="true"
                className="mt-1.5 cfc-input"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="contact-email" className="cfc-label">Email *</Label>
            <Input
              id="contact-email"
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
              aria-required="true"
              className="mt-1.5 cfc-input"
            />
          </div>

          {/* Property details (collapsible) */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-[var(--bright-grey)]" style={{ borderRadius: "var(--radius-button)" }}>
            <CollapsibleTrigger asChild>
              <button type="button" className="cfc-collapsible-trigger">
                <span>{preferencesLabel}</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform`}
                  style={{
                    color: "var(--stone)",
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 200ms"
                  }}
                />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent style={{ padding: "0 clamp(1rem, 2vw, 1.25rem) clamp(1rem, 2vw, 1.25rem)" }}>
              <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: "clamp(0.75rem, 1.5vw, 1rem)" }}>
                <div>
                  <Label htmlFor="contact-property-type" className="cfc-label">Property Type</Label>
                  <Select value={formData.propertyType} onValueChange={(v) => handleChange("propertyType", v)}>
                    <SelectTrigger id="contact-property-type" className="mt-1.5 cfc-input">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="acreage">Acreage/Land</SelectItem>
                      <SelectItem value="investment">Investment</SelectItem>
                      <SelectItem value="not-sure">Not Sure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contact-location" className="cfc-label">Preferred Location</Label>
                  <Select value={formData.location} onValueChange={(v) => handleChange("location", v)}>
                    <SelectTrigger id="contact-location" className="mt-1.5 cfc-input">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="byron-bay">Byron Bay</SelectItem>
                      <SelectItem value="ballina">Ballina</SelectItem>
                      <SelectItem value="kingscliff">Kingscliff</SelectItem>
                      <SelectItem value="cabarita">Cabarita Beach</SelectItem>
                      <SelectItem value="tweed-heads">Tweed Heads</SelectItem>
                      <SelectItem value="mullumbimby">Mullumbimby</SelectItem>
                      <SelectItem value="lennox-head">Lennox Head</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contact-budget" className="cfc-label">Budget Range</Label>
                  <Select value={formData.budget} onValueChange={(v) => handleChange("budget", v)}>
                    <SelectTrigger id="contact-budget" className="mt-1.5 cfc-input">
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-500k">Under $500k</SelectItem>
                      <SelectItem value="500k-750k">$500k - $750k</SelectItem>
                      <SelectItem value="750k-1m">$750k - $1M</SelectItem>
                      <SelectItem value="1m-1.5m">$1M - $1.5M</SelectItem>
                      <SelectItem value="1.5m-2m">$1.5M - $2M</SelectItem>
                      <SelectItem value="over-2m">Over $2M</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="contact-timeframe" className="cfc-label">Timeframe</Label>
                  <Select value={formData.timeframe} onValueChange={(v) => handleChange("timeframe", v)}>
                    <SelectTrigger id="contact-timeframe" className="mt-1.5 cfc-input">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="asap">ASAP</SelectItem>
                      <SelectItem value="3-months">Within 3 months</SelectItem>
                      <SelectItem value="6-months">Within 6 months</SelectItem>
                      <SelectItem value="12-months">Within 12 months</SelectItem>
                      <SelectItem value="flexible">No rush</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="contact-message" className="cfc-label">Message (optional)</Label>
                <Textarea
                  id="contact-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="mt-1.5 cfc-input cfc-textarea"
                  placeholder="Share any specifics or questions..."
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="cfc-submit"
          >
            {isSubmitting ? "Sending..." : "Send enquiry"}
          </button>

          {/* Status messages */}
          {submitStatus === "success" && (
            <div className="cfc-success">
              <div className="cfc-success__heading">Thanks for reaching out</div>
              <p className="cfc-success__body">
                We've received your message and will be in touch within 24 hours.
                If it's urgent, call us on{" "}
                <a href="tel:0403536390">0403 536 390</a>.
              </p>
            </div>
          )}
          {submitStatus === "error" && (
            <div className="cfc-error">
              <p>
                Something went wrong. Please try again or call us on{" "}
                <a href="tel:0403536390">0403 536 390</a>.
              </p>
            </div>
          )}
          {!submitStatus && (
            <p className="cfc-helper">
              We usually reply within 24 hours.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
