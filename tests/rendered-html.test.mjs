import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished academic portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Dr\. Mritunjay Shall Peelam/);
  assert.match(html, /Assistant Professor \(Selection Grade\)/);
  assert.match(html, /Publications/);
  assert.match(html, /Teaching/);
  assert.equal((html.match(/class="publication-card compact"/g) ?? []).length, 21);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);

  // Home page has no desktop header brand, but has mobile centered brand
  assert.doesNotMatch(html, /class="desktop-page-brand"/);
  assert.match(html, /class="mobile-page-brand"[^>]*>\s*<strong>Dr\. Mritunjay<\/strong>/);

  // Subpage header menu has desktop-page-brand and mobile-page-brand
  const blogResponse = await render("/blog");
  const blogHtml = await blogResponse.text();
  assert.match(blogHtml, /class="desktop-page-brand"[^>]*>\s*<strong>Dr\. Mritunjay<\/strong>/);
  assert.match(blogHtml, /class="mobile-page-brand"[^>]*>\s*<strong>Dr\. Mritunjay<\/strong>/);
});

test("keeps the implementation independent from the retired theme", async () => {
  const [page, layout, portfolio, styles, scrollControls, liveRefresh, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/PortfolioApp.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../app/ScrollJumpButton.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/LiveUpdateRefresh.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  const combined = `${page}\n${layout}\n${portfolio}\n${scrollControls}\n${liveRefresh}\n${packageJson}`;
  assert.match(combined, /PortfolioApp/);
  assert.doesNotMatch(portfolio, /publications\.slice\(0,\s*5\)/);
  assert.doesNotMatch(portfolio, /Search and filter publications/);
  assert.match(styles, /\.bio\s*\{[^}]*text-align:\s*justify/s);
  assert.match(scrollControls, /Go to top/);
  assert.match(scrollControls, /Go to bottom/);
  assert.match(scrollControls, /is-down/);
  assert.match(scrollControls, /is-up/);
  assert.match(liveRefresh, /setInterval/);
  assert.match(liveRefresh, /visibilitychange/);
  assert.match(layout, /og\.png/);
  assert.match(portfolio, /href="\/vision-pen"[\s\S]*Vision Pen[\s\S]*href="\/resumebuilder"/);
  assert.doesNotMatch(combined, /al-folio|jekyll|liquid|react-loading-skeleton/i);
});

test("renders Vision Pen inside the portfolio header and footer", async () => {
  const response = await render("/vision-pen");
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(html, /class="site-header"/);
  assert.match(html, /title="Vision Pen air-writing studio"/);
  assert.match(html, /src="\/vision-pen-studio\/index\.html\?v=20260813-compact-dock"/);
  assert.match(html, /class="site-footer"/);
});

test("redirects the previous Vision Pen URL to the integrated page", async () => {
  const response = await render("/vision-pen/index.html");

  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "http://localhost/vision-pen");
});

test("packages the responsive Vision Pen browser app", async () => {
  const [html, appScript, handTracker, styles] = await Promise.all([
    readFile(new URL("../dist/vision-pen-studio/index.html", import.meta.url), "utf8"),
    readFile(new URL("../dist/vision-pen-studio/static/js/app.js", import.meta.url), "utf8"),
    readFile(new URL("../dist/vision-pen-studio/static/js/handTracker.js", import.meta.url), "utf8"),
    readFile(new URL("../dist/vision-pen-studio/static/css/style.css", import.meta.url), "utf8"),
  ]);

  assert.match(html, /VisionPen/);
  assert.match(html, /\.\/static\/css\/style\.css\?v=20260813-compact-dock/);
  assert.match(html, /\.\/static\/js\/app\.js/);
  assert.match(appScript, /yolo_enabled: false/);
  assert.match(handTracker, /\.\/static\/vendor\/mediapipe-hands/);
  assert.match(styles, /@media \(max-width: 768px\)/);
  assert.match(styles, /\.control-dock\s*\{[^}]*overflow:\s*hidden/s);
  assert.match(styles, /grid-template-areas:\s*"tools colours"\s*"stroke options"/s);
  assert.match(styles, /\.tool-btn i\s*\{[^}]*font-size:\s*0\.7rem/s);
});
