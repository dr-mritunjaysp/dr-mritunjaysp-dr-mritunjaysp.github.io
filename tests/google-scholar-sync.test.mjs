import assert from "node:assert/strict";
import { mkdtemp, readFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  parseGoogleScholarProfileHtml,
  writeSnapshotIfChanged,
} from "../scripts/update-google-scholar.mjs";

const profileHtml = `
  <table id="gsc_rsb_st">
    <tr><td class="gsc_rsb_std">640</td><td class="gsc_rsb_std">620</td></tr>
    <tr><td class="gsc_rsb_std">14</td><td class="gsc_rsb_std">14</td></tr>
    <tr><td class="gsc_rsb_std">17</td><td class="gsc_rsb_std">17</td></tr>
  </table>
  <table><tbody>
    ${Array.from({ length: 10 }, (_, index) => `
      <tr class="gsc_a_tr">
        <td class="gsc_a_t"><a class="gsc_a_at" href="/citations?citation_for_view=MdGRPEIAAAAJ:id${index}">Paper ${index}</a></td>
        <td class="gsc_a_c"><a class="gsc_a_ac" href="https://scholar.google.com/scholar?cites=${index}">${81 - index}</a></td>
        <td class="gsc_a_y"><span>2026</span></td>
      </tr>`).join("")}
  </tbody></table>`;

test("parses aggregate and individual Google Scholar citations", () => {
  const snapshot = parseGoogleScholarProfileHtml(
    profileHtml,
    "2026-09-12T00:00:00.000Z",
  );

  assert.equal(snapshot.total_citations, 640);
  assert.equal(snapshot.h_index, 14);
  assert.equal(snapshot.i10_index, 17);
  assert.equal(snapshot.papers.length, 10);
  assert.equal(snapshot.papers[0].citations, 81);
  assert.match(snapshot.papers[0].scholar_url, /citation_for_view=MdGRPEIAAAAJ:id0/);
});

test("does not rewrite the snapshot when only the fetch time changes", async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), "scholar-sync-"));
  const output = path.join(directory, "google-scholar.json");
  const first = parseGoogleScholarProfileHtml(profileHtml, "2026-09-12T00:00:00.000Z");
  const second = { ...first, fetched_at: "2026-09-12T01:00:00.000Z" };

  assert.equal(await writeSnapshotIfChanged(first, output), true);
  assert.equal(await writeSnapshotIfChanged(second, output), false);
  assert.equal(JSON.parse(await readFile(output, "utf8")).fetched_at, first.fetched_at);
});

test("runs the Scholar updater hourly and serves the shared live snapshot", async () => {
  const [workflow, firebaseClient, snapshot] = await Promise.all([
    readFile(new URL("../.github/workflows/update-google-scholar.yml", import.meta.url), "utf8"),
    readFile(new URL("../app/firebase.ts", import.meta.url), "utf8"),
    readFile(new URL("../public/data/google-scholar.json", import.meta.url), "utf8").then(JSON.parse),
  ]);

  assert.match(workflow, /cron:\s*"17 \* \* \* \*"/);
  assert.match(workflow, /node scripts\/update-google-scholar\.mjs/);
  assert.match(firebaseClient, /raw\.githubusercontent\.com/);
  assert.match(firebaseClient, /SCHOLAR_REFRESH_INTERVAL_MS = 60 \* 60 \* 1000/);
  assert.equal(snapshot.total_citations, 640);
  assert.equal(snapshot.h_index, 14);
  assert.equal(snapshot.i10_index, 17);
  assert.ok(snapshot.papers.length >= 21);
});
