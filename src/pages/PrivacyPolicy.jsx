import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="bg-white">
      <section className="section-padding">
        <div className="site-container">
          <div className="max-w-3xl mx-auto">
          <h1 className="mb-6">Privacy Policy</h1>

          <div className="prose prose-gray max-w-none space-y-6 text-[var(--ink)]/70 leading-relaxed">
            <p>
              Compass Buyers Agency ABN [ABN] (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to
              protecting your personal information in accordance with the Australian Privacy
              Principles under the <em>Privacy Act 1988</em> (Cth).
            </p>

            <h2>Information We Collect</h2>
            <p>
              We may collect personal information including your name, email address, phone
              number, property preferences, budget range and purchase timeframe when you
              enquire through our website or engage our services.
            </p>

            <h2>How We Use Your Information</h2>
            <ul className="list-disc ml-5 space-y-1">
              <li>Respond to your enquiries and provide property buying services</li>
              <li>Send you relevant property opportunities and market updates</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Improve our website and services</li>
            </ul>

            <h2>Disclosure</h2>
            <p>
              We do not sell or rent your personal information. We may share information
              with third parties only where necessary to deliver our services (e.g.
              conveyancers, building inspectors) or where required by law.
            </p>

            <h2>Data Security</h2>
            <p>
              We take reasonable steps to protect your personal information from misuse,
              interference, loss and unauthorised access. Information is stored securely
              and access is restricted to authorised personnel.
            </p>

            <h2>Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal
              information at any time by contacting us at{" "}
              <a href="mailto:hello@compassbuyersagency.com.au" className="text-[var(--hills)] underline">
                hello@compassbuyersagency.com.au
              </a>{" "}
              or calling{" "}
              <a href="tel:0403536390" className="text-[var(--hills)] underline">
                0403 536 390
              </a>.
            </p>

            <h2>Cookies</h2>
            <p>
              Our website may use cookies and similar technologies to improve your
              browsing experience. You can manage cookie preferences through your
              browser settings.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Any changes will be posted
              on this page with an updated effective date.
            </p>

            <p className="text-sm text-[var(--ink)]/50 pt-4 border-t border-[var(--border)]">
              Last updated: February 2026
            </p>
          </div>
          </div>
        </div>
      </section>
    </div>
  );
}
