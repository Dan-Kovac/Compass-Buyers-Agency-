import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
} 


export const isIframe = window.self !== window.top;

/**
 * Split a string into sentences for line-broken display.
 * Each new sentence starts on its own line so wrapped copy never reads as
 * "...word.\nNew sentence starts mid-line".
 */
export function splitSentences(text) {
  if (!text) return [];
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z$0-9"'(])/)
    .map((s) => s.trim())
    .filter(Boolean);
}
