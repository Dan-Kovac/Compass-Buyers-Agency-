import React from "react";
import { Phone, MessageCircle } from "lucide-react";
import { useLocation } from "react-router-dom";

const PHONE = "0403536390";
const PHONE_DISPLAY = "0403 536 390";

export default function StickyMobileCTA() {
  const location = useLocation();
  const [visible, setVisible] = React.useState(false);

  // Hide on contact page — the form is already there
  const isContactPage = location.pathname === "/contact";

  React.useEffect(() => {
    if (isContactPage) {
      setVisible(false);
      return;
    }

    const handleScroll = () => {
      // Show after scrolling past the hero area (~400px)
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isContactPage]);

  if (isContactPage || !visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      <div
        className="flex gap-2 px-4 py-3"
        style={{
          background: "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.95) 15%, #fff 100%)",
          paddingTop: "1.5rem",
        }}
      >
        <a
          href={`tel:${PHONE}`}
          className="flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors duration-300"
          style={{
            background: "var(--hills)",
            color: "#fff",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
          aria-label={`Call Compass on ${PHONE_DISPLAY}`}
        >
          <Phone className="w-4 h-4" />
          Call
        </a>
        <a
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-medium transition-colors duration-300"
          style={{
            background: "transparent",
            color: "var(--hills)",
            border: "1px solid var(--hills)",
            fontFamily: "var(--font-body)",
            fontWeight: 500,
            letterSpacing: "0.01em",
          }}
          aria-label="Enquire via contact form"
        >
          <MessageCircle className="w-4 h-4" />
          Enquire
        </a>
      </div>
    </div>
  );
}
