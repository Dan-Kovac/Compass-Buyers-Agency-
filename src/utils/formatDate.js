/**
 * Format a date string for display.
 * @param {string} dateStr - ISO date string (e.g., "2026-01-12")
 * @param {"short"|"long"} format
 *   "short": "12 Jan 2026" (for cards)
 *   "long":  "12 January 2026" (for article detail)
 */
export function formatDate(dateStr, format = "short") {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return "";

  const options = {
    day: "numeric",
    month: format === "long" ? "long" : "short",
    year: "numeric",
  };

  return date.toLocaleDateString("en-AU", options);
}
