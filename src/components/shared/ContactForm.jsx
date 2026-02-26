import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SendEmail } from "@/integrations/Core";
import { Check, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ContactForm({ title = "Get In Touch", showPropertyInterest = true }) {
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const emailBody = `
New enquiry from Compass Buyers Agency website:

Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
${showPropertyInterest ? `
Property Type: ${formData.propertyType}
Preferred Location: ${formData.location}
Budget Range: ${formData.budget}
Timeframe: ${formData.timeframe}
` : ''}
Message: ${formData.message}

---
Sent from Compass Buyers Agency contact form
      `;

      await SendEmail({
        to: "hello@compassbuyersagency.com.au",
        subject: `New Website Enquiry from ${formData.name}`,
        body: emailBody,
        from_name: "Compass Buyers Agency Website"
      });

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        propertyType: "",
        location: "",
        budget: "",
        timeframe: "",
        message: ""
      });

    } catch (err) {
      setError("Sorry, there was an error sending your message. Please try again or call us directly.");
      console.error("Error sending email:", err);
    }

    setIsSubmitting(false);
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--ink)] mb-2">Message Sent!</h3>
          <p className="text-gray-600 mb-4">
            Thank you for your enquiry. We'll get back to you within 24 hours.
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="border-[var(--hills)] text-[var(--hills)] hover:bg-[var(--hills)] hover:text-white"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-xl">
      <CardHeader className="text-center pb-2">
        <CardTitle className="text-2xl font-bold text-[var(--ink)]">{title}</CardTitle>
        <p className="text-gray-600">We'll respond within 24 hours</p>
      </CardHeader>
      <CardContent className="p-8">
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name" className="text-[var(--ink)] font-medium">Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                required
                className="mt-1 focus:border-[var(--hills)] focus:ring-[var(--hills)]"
              />
            </div>
            <div>
              <Label htmlFor="phone" className="text-[var(--ink)] font-medium">Phone *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
                className="mt-1 focus:border-[var(--hills)] focus:ring-[var(--hills)]"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-[var(--ink)] font-medium">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              required
              className="mt-1 focus:border-[var(--hills)] focus:ring-[var(--hills)]"
            />
          </div>

          {showPropertyInterest && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[var(--ink)] font-medium">Property Type</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => handleInputChange("propertyType", value)}>
                    <SelectTrigger className="mt-1 focus:border-[var(--hills)] focus:ring-[var(--hills)]">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="townhouse">Townhouse</SelectItem>
                      <SelectItem value="acreage">Acreage/Land</SelectItem>
                      <SelectItem value="investment">Investment Property</SelectItem>
                      <SelectItem value="not-sure">Not Sure Yet</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-[var(--ink)] font-medium">Preferred Location</Label>
                  <Select value={formData.location} onValueChange={(value) => handleInputChange("location", value)}>
                    <SelectTrigger className="mt-1 focus:border-[var(--hills)] focus:ring-[var(--hills)]">
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
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-[var(--ink)] font-medium">Budget Range</Label>
                  <Select value={formData.budget} onValueChange={(value) => handleInputChange("budget", value)}>
                    <SelectTrigger className="mt-1 focus:border-[var(--hills)] focus:ring-[var(--hills)]">
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
                  <Label className="text-[var(--ink)] font-medium">Timeframe</Label>
                  <Select value={formData.timeframe} onValueChange={(value) => handleInputChange("timeframe", value)}>
                    <SelectTrigger className="mt-1 focus:border-[var(--hills)] focus:ring-[var(--hills)]">
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
            </>
          )}

          <div>
            <Label htmlFor="message" className="text-[var(--ink)] font-medium">
              Message {showPropertyInterest ? "(Tell us about your property goals)" : "*"}
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => handleInputChange("message", e.target.value)}
              required={!showPropertyInterest}
              rows={4}
              className="mt-1 focus:border-[var(--hills)] focus:ring-[var(--hills)]"
              placeholder={showPropertyInterest ? "Tell us about what you're looking for, any specific requirements, or questions you have..." : "Your message..."}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[var(--hills)] hover:bg-[var(--hills)]/90 text-white py-3 text-lg font-semibold rounded-full transition-all duration-300 hover:shadow-lg"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
