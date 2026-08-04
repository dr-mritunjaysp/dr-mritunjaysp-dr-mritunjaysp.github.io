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
  assert.match(portfolio, /Search and filter publications/);
  assert.match(styles, /\.bio\s*\{[^}]*text-align:\s*justify/s);
  assert.match(scrollControls, /Go to top/);
  assert.match(scrollControls, /Go to bottom/);
  assert.match(scrollControls, /is-down/);
  assert.match(scrollControls, /is-up/);
  assert.match(liveRefresh, /setInterval/);
  assert.match(liveRefresh, /visibilitychange/);
  assert.match(layout, /og\.png/);
  assert.doesNotMatch(combined, /al-folio|jekyll|liquid|react-loading-skeleton/i);
});
