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

  .cfc-input:focus-visible {
    border-color: var(--hills);
    outline: 2px solid var(--hills);
    outline-offset: 2px;
    box-shadow: 0 0 0 3px rgba(75,115,113,0.15);
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
  hideHeader = false,
  trustLine = "No obligation. We'll get back to you within 24 hours.",
  submitLabel = "Send enquiry"
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    enquiryType: "",
    propertyType: "",
    location: "",
    budget: "",
    timeframe: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [prefsOpen, setPrefsOpen] = useState(false);

  const handleChange = (field, value) => setFormData(prev => ({ ...prev, [field]: value }));

  const isBuyer = formData.enquiryType === "buyer-advocacy";

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData._gotcha) return;

    setIsSubmitting(true);

    const endpoint = import.meta.env.VITE_GHL_WEBHOOK_URL || import.meta.env.VITE_FORMSPREE_ENDPOINT;
    if (!endpoint) {
      console.error("Form endpoint env var is not set (VITE_GHL_WEBHOOK_URL or VITE_FORMSPREE_ENDPOINT)");
      setIsSubmitting(false);
      setSubmitStatus("error");
      return;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          enquiryType: formData.enquiryType || "-",
          propertyType: formData.propertyType || "-",
          location: formData.location || "-",
          budget: formData.budget || "-",
          timeframe: formData.timeframe || "-",
          message: formData.message || "-",
          _subject: `New Website Enquiry from ${formData.name || "Unknown"}`,
        }),
      });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);

      setFormData({ name: "", email: "", phone: "", enquiryType: "", propertyType: "", location: "", budget: "", timeframe: "", message: "" });
      setIsSubmitting(false);
      setSubmitStatus("success");
    } catch (err) {
      console.error("Form submission failed:", err);
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
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
        </div>
      )}

      <div className="p-6 md:p-8">
        {!hideHeader && (
          <>
            <h3 className="cfc-heading">{title}</h3>
            {trustLine && <p className="cfc-trust-line">{trustLine}</p>}
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <p id="required-note" className="sr-only">Fields marked with * are required</p>

          {/* Honeypot — hidden from humans, bots fill it and we drop the submission */}
          <input
            type="text"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
            value={formData._gotcha || ""}
            onChange={(e) => handleChange("_gotcha", e.target.value)}
            style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }}
            aria-hidden="true"
          />

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

          {/* Enquiry Type */}
          <div>
            <Label htmlFor="contact-enquiry-type" className="cfc-label">Enquiry Type *</Label>
            <Select value={formData.enquiryType} onValueChange={(v) => handleChange("enquiryType", v)} required>
              <SelectTrigger id="contact-enquiry-type" className="mt-1.5 cfc-input" aria-required="true">
                <SelectValue placeholder="Select enquiry type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="buyer-advocacy">Buyer Advocacy</SelectItem>
                <SelectItem value="selling-advisory">Selling Advisory</SelectItem>
                <SelectItem value="b2b">B2B Enquiry</SelectItem>
                <SelectItem value="careers">Careers</SelectItem>
                <SelectItem value="general">General Enquiry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Buyer-only preferences (optional) */}
          {isBuyer && (
            <Collapsible open={prefsOpen} onOpenChange={setPrefsOpen} className="border border-[var(--bright-grey)]" style={{ borderRadius: "var(--radius-button)" }}>
              <CollapsibleTrigger asChild>
                <button type="button" className="cfc-collapsible-trigger">
                  <span>Property preferences (optional)</span>
                  <ChevronDown
                    className="w-4 h-4"
                    style={{
                      color: "var(--stone)",
                      transform: prefsOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 200ms",
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
                    <Input
                      id="contact-location"
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleChange("location", e.target.value)}
                      className="mt-1.5 cfc-input"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contact-budget" className="cfc-label">Budget</Label>
                    <Input
                      id="contact-budget"
                      type="text"
                      value={formData.budget}
                      onChange={(e) => handleChange("budget", e.target.value)}
                      className="mt-1.5 cfc-input"
                    />
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
              </CollapsibleContent>
            </Collapsible>
          )}

          {/* Message */}
          <div>
            <Label htmlFor="contact-message" className="cfc-label">Message (optional)</Label>
            <Textarea
              id="contact-message"
              rows={3}
              value={formData.message}
              onChange={(e) => handleChange("message", e.target.value)}
              className="mt-1.5 cfc-input cfc-textarea"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="cfc-submit"
          >
            {isSubmitting ? "Sending..." : submitLabel}
          </button>

          {/* Status messages */}
          {submitStatus === "success" && (
            <div className="cfc-success">
              <div className="cfc-success__heading">Thanks for reaching out</div>
              <p className="cfc-success__body">
                We've received your message and will be in touch within 24 hours.
                If it's urgent, call us on{" "}
                <a href="tel:0467634565">Chris on 0467 634 565</a>.
              </p>
            </div>
          )}
          {submitStatus === "error" && (
            <div className="cfc-error">
              <p>
                Something went wrong. Please try again or call us on{" "}
                <a href="tel:0467634565">Chris on 0467 634 565</a>.
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
