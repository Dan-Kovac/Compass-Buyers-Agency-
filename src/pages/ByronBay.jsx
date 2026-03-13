import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Legacy /byron-bay route — redirects to the canonical landing page.
 * Kept as a component so the route registration in pages.config.js
 * continues to catch any inbound traffic (bookmarks, cached links, etc).
 */
export default function ByronBay() {
  return <Navigate to="/byron-bay-buyers-agent" replace />;
}
