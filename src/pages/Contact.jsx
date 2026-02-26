import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import ContactFormCompact from "../components/shared/ContactFormCompact";

export default function Contact() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="bg-white">
      <section className="py-12 md:py-16">
        <div className="site-container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            {/* Left: Premium info card */}
            <div className="surface p-6 md:p-8 rounded-token">
              <h1 className="mb-2">Talk to a Buyers Agent</h1>
              <p className="text-gray-600 mb-6">
                Free consultation. No obligation. We&apos;ll answer your questions and outline how we can help.
              </p>

              {/* Cells */}
              <div className="space-y-3 mb-6">
                <a href="tel:0403536390" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-full bg-[var(--sea-breeze)] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 text-[var(--hills)]" />
                  </div>
                  <div className="text-[var(--ink)]">
                    <span className="text-gray-600 mr-2">M:</span>
                    <span className="font-medium group-hover:underline">0403 536 390</span>
                  </div>
                </a>

                <a href="mailto:hello@compassbuyersagency.com.au" className="flex items-center gap-3 group">
                  <div className="w-9 h-9 rounded-full bg-[var(--sea-breeze)] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 text-[var(--hills)]" />
                  </div>
                  <div className="text-[var(--ink)]">
                    <span className="text-gray-600 mr-2">E:</span>
                    <span className="font-medium group-hover:underline break-all">
                      hello@compassbuyersagency.com.au
                    </span>
                  </div>
                </a>

                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[var(--sea-breeze)] flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-[var(--hills)]" />
                  </div>
                  <div className="text-[var(--ink)]">
                    <span className="text-gray-600 mr-2">A:</span>
                    <span className="font-medium">
                      32a Tweed Coast Road Cabarita Beach, NSW 2487
                    </span>
                  </div>
                </div>
              </div>

              {/* CTAs open slide-out form */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="h-11 border-[var(--border)]"
                  style={{ borderRadius: 'var(--radius-lg)' }}
                  onClick={() => setOpen(true)}
                >
                  Book a call
                </Button>
                <Button
                  variant="outline"
                  className="h-11 border-[var(--border)]"
                  style={{ borderRadius: 'var(--radius-lg)' }}
                  onClick={() => setOpen(true)}
                >
                  Send an email
                </Button>
              </div>
            </div>

            {/* Right: Image matching the screenshot */}
            <div className="overflow-hidden surface p-0 rounded-token">
              <div className="aspect-square">
                <img
                  src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/689ff2310196c0788d148d78/f4d8d6980_Screenshot2025-10-01at75412am.png"
                  alt="Compass office exterior"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Slide-out detailed form */}
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Tell Us About Your Property</SheetTitle>
            <SheetDescription>Share a few details and we&apos;ll be in touch within 24 hours.</SheetDescription>
          </SheetHeader>
          <div className="mt-4">
            <ContactFormCompact
              title="Tell Us About Your Property"
              showHeaderImage={false}
              defaultPreferencesOpen={true}
              preferencesLabel="Property Details (optional)"
            />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
