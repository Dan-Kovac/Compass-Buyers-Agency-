#!/usr/bin/env node
/**
 * capture.mjs — Headless Playwright screenshot & video capture
 *
 * Usage:
 *   node scripts/capture.mjs                        # screenshots of all pages (mobile + desktop)
 *   node scripts/capture.mjs --pages / /about       # specific pages only
 *   node scripts/capture.mjs --mobile-only           # mobile viewport only
 *   node scripts/capture.mjs --desktop-only          # desktop viewport only
 *   node scripts/capture.mjs --full-page             # full-page scrolling screenshots
 *   node scripts/capture.mjs --video /               # record 8s scroll-through video of a page
 *   node scripts/capture.mjs --video / --duration 12 # custom video duration (seconds)
 *
 * Output goes to ./captures/ directory
 */

import { chromium } from "playwright";
import { mkdirSync, existsSync } from "fs";
import { resolve } from "path";

const BASE = "http://localhost:5173";
const OUT = resolve(process.cwd(), "captures");

const DEFAULT_PAGES = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/areas",
  "/who-we-work-with",
  "/blog",
  "/acquisitions",
];

const VIEWPORTS = {
  mobile:  { width: 375, height: 812, label: "mobile" },
  tablet:  { width: 768, height: 1024, label: "tablet" },
  desktop: { width: 1440, height: 900, label: "desktop" },
};

// Parse CLI args
const args = process.argv.slice(2);
const flagIdx = (f) => args.indexOf(f);
const hasFlag = (f) => args.includes(f);

const mobileOnly = hasFlag("--mobile-only");
const desktopOnly = hasFlag("--desktop-only");
const fullPage = hasFlag("--full-page");
const doVideo = hasFlag("--video");
const durationArg = flagIdx("--duration") !== -1 ? Number(args[flagIdx("--duration") + 1]) : 8;

let pages = DEFAULT_PAGES;
const pagesIdx = flagIdx("--pages");
if (pagesIdx !== -1) {
  pages = [];
  for (let i = pagesIdx + 1; i < args.length; i++) {
    if (args[i].startsWith("--")) break;
    pages.push(args[i]);
  }
}
// For --video, grab the page path right after the flag
let videoPage = "/";
if (doVideo) {
  const vi = flagIdx("--video");
  if (vi + 1 < args.length && !args[vi + 1].startsWith("--")) {
    videoPage = args[vi + 1];
  }
}

if (!existsSync(OUT)) mkdirSync(OUT, { recursive: true });

const viewportKeys = mobileOnly
  ? ["mobile"]
  : desktopOnly
  ? ["desktop"]
  : ["mobile", "desktop"];

function slugify(path) {
  return path === "/" ? "home" : path.replace(/^\//, "").replace(/\//g, "-");
}

async function captureScreenshots() {
  const browser = await chromium.launch();

  for (const vpKey of viewportKeys) {
    const vp = VIEWPORTS[vpKey];
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      deviceScaleFactor: vpKey === "mobile" ? 2 : 1,
    });
    const page = await context.newPage();

    for (const route of pages) {
      const url = `${BASE}${route}`;
      console.log(`📸 ${vp.label} ${route}`);
      try {
        await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
        await page.waitForTimeout(500); // let animations settle

        const filename = `${slugify(route)}-${vp.label}.png`;
        await page.screenshot({
          path: resolve(OUT, filename),
          fullPage,
        });
        console.log(`   ✓ ${filename}`);
      } catch (err) {
        console.error(`   ✗ Failed: ${err.message}`);
      }
    }

    await context.close();
  }

  await browser.close();
  console.log(`\n✅ Screenshots saved to ${OUT}`);
}

async function captureVideo() {
  const vp = VIEWPORTS.mobile;
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
    recordVideo: {
      dir: OUT,
      size: { width: vp.width * 2, height: vp.height * 2 },
    },
  });

  const page = await context.newPage();
  const url = `${BASE}${videoPage}`;
  console.log(`🎥 Recording ${url} for ${durationArg}s...`);

  await page.goto(url, { waitUntil: "networkidle", timeout: 15000 });
  await page.waitForTimeout(1000);

  // Smooth scroll down the page
  const scrollDuration = (durationArg - 2) * 1000; // reserve 2s for load + end
  await page.evaluate(async (ms) => {
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const steps = 60;
    const stepDelay = ms / steps;
    for (let i = 1; i <= steps; i++) {
      window.scrollTo({ top: (totalHeight * i) / steps, behavior: "instant" });
      await new Promise((r) => setTimeout(r, stepDelay));
    }
  }, scrollDuration);

  await page.waitForTimeout(1000);
  await context.close();

  // Rename the video file
  const { readdirSync, renameSync } = await import("fs");
  const videos = readdirSync(OUT).filter((f) => f.endsWith(".webm"));
  if (videos.length > 0) {
    const latest = videos.sort().pop();
    const newName = `${slugify(videoPage)}-mobile-scroll.webm`;
    renameSync(resolve(OUT, latest), resolve(OUT, newName));
    console.log(`✅ Video saved: ${OUT}/${newName}`);
  }

  await browser.close();
}

// Run
try {
  if (doVideo) {
    await captureVideo();
  } else {
    await captureScreenshots();
  }
} catch (err) {
  console.error("Fatal error:", err.message);
  process.exit(1);
}
