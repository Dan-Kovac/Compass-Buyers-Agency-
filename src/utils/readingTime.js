/**
 * Estimate reading time from HTML content string.
 * Assumes 200 words per minute average.
 * Returns integer minutes (minimum 1).
 */
export function estimateReadingTime(htmlContent) {
  if (!htmlContent) return 1;
  const text = htmlContent.replace(/<[^>]*>/g, '').trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
