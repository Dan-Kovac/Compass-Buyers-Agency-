import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

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
    <div className="surface max-w-3xl mx-auto overflow-hidden" style={{ borderRadius: "12px" }}>
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
        <h3
          className="mb-5"
          style={{
            fontFamily: "var(--font-heading)",
            fontWeight: 400,
            fontSize: "1.5rem",
            letterSpacing: "-0.01em",
            lineHeight: 1.2,
          }}
        >
          {title}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          <p id="required-note" className="sr-only">Fields marked with * are required</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="contact-name" className="text-[var(--ink)]" style={{ fontWeight: "var(--font-body-medium)", fontSize: "0.875rem" }}>Name *</Label>
              <Input id="contact-name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} required aria-required="true" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="contact-phone" className="text-[var(--ink)]" style={{ fontWeight: "var(--font-body-medium)", fontSize: "0.875rem" }}>Mobile *</Label>
              <Input id="contact-phone" type="tel" value={formData.phone} onChange={(e) => handleChange("phone", e.target.value)} required aria-required="true" className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label htmlFor="contact-email" className="text-[var(--ink)]" style={{ fontWeight: "var(--font-body-medium)", fontSize: "0.875rem" }}>Email *</Label>
            <Input id="contact-email" type="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)} required aria-required="true" className="mt-1.5" />
          </div>

          {/* Property details (collapsible) */}
          <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border border-[var(--border)] rounded-token">
            <CollapsibleTrigger asChild>
              <button type="button" className="w-full flex items-center justify-between px-4 py-3 text-[var(--ink)] hover:bg-[var(--bright-grey)]/50 rounded-token transition-colors">
                <span style={{ fontWeight: "var(--font-body-medium)", fontSize: "0.875rem" }}>{preferencesLabel}</span>
                <ChevronDown className={`w-4 h-4 text-[var(--stone)] transition-transform ${isOpen ? "rotate-180" : ""}`} />
              </button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="contact-property-type" className="text-[var(--ink)]" style={{ fontWeight: "var(--font-body-medium)", fontSize: "0.875rem" }}>Property Type</Label>
                  <Select value={formData.propertyType} onValueChange={(v) => handleChange("propertyType", v)}>
                    <SelectTrigger id="contact-property-type" className="mt-1.5">
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
                  <Label htmlFor="contact-location" className="text-[var(--ink)]" style={{ fontWeight: "var(--font-body-medium)", fontSize: "0.875rem" }}>Preferred Location</Label>
                  <Select value={formData.location} onValueChange={(v) => handleChange("location", v)}>
                    <SelectTrigger id="contact-location" className="mt-1.5">
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
                  <Label htmlFor="contact-budget" className="text-[var(--ink)]" style={{ fontWeight: "var(--font-body-medium)", fontSize: "0.875rem" }}>Budget Range</Label>
                  <Select value={formData.budget} onValueChange={(v) => handleChange("budget", v)}>
                    <SelectTrigger id="contact-budget" className="mt-1.5">
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
                  <Label htmlFor="contact-timeframe" className="text-[var(--ink)]" style={{ fontWeight: "var(--font-body-medium)", fontSize: "0.875rem" }}>Timeframe</Label>
                  <Select value={formData.timeframe} onValueChange={(v) => handleChange("timeframe", v)}>
                    <SelectTrigger id="contact-timeframe" className="mt-1.5">
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
                <Label htmlFor="contact-message" className="text-[var(--ink)]" style={{ fontWeight: "var(--font-body-medium)", fontSize: "0.875rem" }}>Message (optional)</Label>
                <Textarea
                  id="contact-message"
                  rows={3}
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  className="mt-1.5"
                  placeholder="Share any specifics or questions..."
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Submit */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full btn-cta bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white"
          >
            {isSubmitting ? "Sending..." : "Send enquiry"}
          </Button>

          {submitStatus === "success" && (
            <div className="text-center text-green-700 bg-green-50 border border-green-200 rounded-token p-3" style={{ fontSize: "0.875rem" }}>
              Thanks! We've received your message and will be in touch shortly.
            </div>
          )}
          {submitStatus === "error" && (
            <div className="text-center text-red-700 bg-red-50 border border-red-200 rounded-token p-3" style={{ fontSize: "0.875rem" }}>
              Something went wrong. Please try again or call us on 0403 536 390.
            </div>
          )}
          {!submitStatus && (
            <div className="text-center text-xs mt-1" style={{ color: "var(--stone)" }}>
              We usually reply within 24 hours.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
