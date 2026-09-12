import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

export const GOOGLE_SCHOLAR_USER_ID = "MdGRPEIAAAAJ";
export const GOOGLE_SCHOLAR_PROFILE_URL =
  `https://scholar.google.com/citations?user=${GOOGLE_SCHOLAR_USER_ID}&hl=en`;
export const FIREBASE_SCHOLAR_URL =
  "https://portfolio-6a1b9-default-rtdb.firebaseio.com/visitor-counter.json";

const DEFAULT_OUTPUT = fileURLToPath(
  new URL("../public/data/google-scholar.json", import.meta.url),
);

function decodeHtml(value) {
  const named = {
    amp: "&",
    apos: "'",
    gt: ">",
    lt: "<",
    nbsp: " ",
    quot: '"',
  };

  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (_, entity) => {
    if (entity.startsWith("#x")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(2), 16));
    }
    if (entity.startsWith("#")) {
      return String.fromCodePoint(Number.parseInt(entity.slice(1), 10));
    }
    return named[entity.toLowerCase()] ?? `&${entity};`;
  });
}

function textContent(html) {
  return decodeHtml(html.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function attribute(tagAttributes, name) {
  const match = tagAttributes.match(
    new RegExp(`\\b${name}=(?:"([^"]*)"|'([^']*)')`, "i"),
  );
  return decodeHtml(match?.[1] ?? match?.[2] ?? "");
}

function absoluteScholarUrl(url) {
  if (!url) return "";
  try {
    return new URL(url, GOOGLE_SCHOLAR_PROFILE_URL).toString();
  } catch {
    return "";
  }
}

function normalizeTitle(title) {
  return title
    .normalize("NFKD")
    .toLowerCase()
    .replace(/\(\s*ioe\s*\)/g, "")
    .replace(/[^a-z0-9]/g, "");
}

function parseMetricValues(html) {
  const table = html.match(
    /<table\b[^>]*\bid=["']gsc_rsb_st["'][^>]*>([\s\S]*?)<\/table>/i,
  )?.[1];
  if (!table) return [];

  return Array.from(
    table.matchAll(
      /<td\b[^>]*\bclass=["'][^"']*\bgsc_rsb_std\b[^"']*["'][^>]*>([\s\S]*?)<\/td>/gi,
    ),
    (match) => Number.parseInt(textContent(match[1]), 10),
  ).filter(Number.isFinite);
}

function parsePapers(html) {
  const papers = [];

  for (const rowMatch of html.matchAll(
    /<tr\b[^>]*\bclass=["'][^"']*\bgsc_a_tr\b[^"']*["'][^>]*>([\s\S]*?)<\/tr>/gi,
  )) {
    const row = rowMatch[1];
    const titleMatch = row.match(
      /<a\b([^>]*\bclass=["'][^"']*\bgsc_a_at\b[^"']*["'][^>]*)>([\s\S]*?)<\/a>/i,
    );
    if (!titleMatch) continue;

    const citationCell = row.match(
      /<td\b[^>]*\bclass=["'][^"']*\bgsc_a_c\b[^"']*["'][^>]*>([\s\S]*?)<\/td>/i,
    )?.[1] ?? "";
    const citedByMatch = citationCell.match(/<a\b([^>]*)>([\s\S]*?)<\/a>/i);
    const yearCell = row.match(
      /<td\b[^>]*\bclass=["'][^"']*\bgsc_a_y\b[^"']*["'][^>]*>([\s\S]*?)<\/td>/i,
    )?.[1] ?? "";

    papers.push({
      title: textContent(titleMatch[2]),
      citations: Math.max(
        0,
        Number.parseInt(textContent(citedByMatch?.[2] ?? "0"), 10) || 0,
      ),
      year: textContent(yearCell),
      scholar_url: absoluteScholarUrl(attribute(titleMatch[1], "href")),
      cited_by_url: absoluteScholarUrl(attribute(citedByMatch?.[1] ?? "", "href")),
    });
  }

  const bestByTitle = new Map();
  for (const paper of papers) {
    const normalized = normalizeTitle(paper.title);
    const previous = bestByTitle.get(normalized);
    if (!previous || paper.citations > previous.citations) {
      bestByTitle.set(normalized, paper);
    }
  }
  return Array.from(bestByTitle.values());
}

export function parseGoogleScholarProfileHtml(
  html,
  fetchedAt = new Date().toISOString(),
) {
  const metrics = parseMetricValues(html);
  const papers = parsePapers(html);
  if (metrics.length < 6 || papers.length < 10) {
    throw new Error("Google Scholar profile response was incomplete or blocked");
  }

  const snapshot = {
    total_citations: metrics[0],
    h_index: metrics[2],
    i10_index: metrics[4],
    papers,
    profile_url: GOOGLE_SCHOLAR_PROFILE_URL,
    fetched_at: fetchedAt,
    source: "google-scholar",
  };

  if (
    snapshot.total_citations < Math.max(...papers.map((paper) => paper.citations)) ||
    snapshot.h_index <= 0 ||
    snapshot.i10_index <= 0
  ) {
    throw new Error("Google Scholar metrics failed validation");
  }

  return snapshot;
}

function comparableSnapshot(snapshot) {
  return JSON.stringify({
    total_citations: snapshot?.total_citations,
    h_index: snapshot?.h_index,
    i10_index: snapshot?.i10_index,
    papers: snapshot?.papers,
    profile_url: snapshot?.profile_url,
  });
}

export async function writeSnapshotIfChanged(snapshot, outputPath = DEFAULT_OUTPUT) {
  let previous = null;
  try {
    previous = JSON.parse(await readFile(outputPath, "utf8"));
  } catch {
    // The first successful refresh creates the snapshot.
  }

  if (previous && comparableSnapshot(previous) === comparableSnapshot(snapshot)) {
    return false;
  }

  await mkdir(path.dirname(outputPath), { recursive: true });
  await writeFile(outputPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  return true;
}

export async function fetchGoogleScholarSnapshot(fetchImpl = fetch) {
  const response = await fetchImpl(`${GOOGLE_SCHOLAR_PROFILE_URL}&pagesize=100`, {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "en-US,en;q=0.9",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
        "(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
    },
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    throw new Error(`Google Scholar returned HTTP ${response.status}`);
  }
  return parseGoogleScholarProfileHtml(await response.text());
}

export function buildFirebaseScholarUpdate(snapshot) {
  return {
    "scholar-metrics": {
      current: {
        total_citations: snapshot.total_citations,
        h_index: snapshot.h_index,
        i10_index: snapshot.i10_index,
        profile_url: snapshot.profile_url,
        fetched_at: snapshot.fetched_at,
        source: snapshot.source,
      },
    },
    "publication-citations": snapshot.papers,
  };
}

export async function publishFirebaseScholarSnapshot(snapshot, fetchImpl = fetch) {
  const response = await fetchImpl(FIREBASE_SCHOLAR_URL, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(buildFirebaseScholarUpdate(snapshot)),
    signal: AbortSignal.timeout(20_000),
  });
  if (!response.ok) {
    throw new Error(`Firebase citation update returned HTTP ${response.status}`);
  }
}

async function main() {
  const outputArgumentIndex = process.argv.indexOf("--output");
  const outputPath = outputArgumentIndex >= 0
    ? path.resolve(process.argv[outputArgumentIndex + 1])
    : DEFAULT_OUTPUT;
  const inputArgumentIndex = process.argv.indexOf("--input");
  const snapshot = inputArgumentIndex >= 0
    ? JSON.parse(await readFile(path.resolve(process.argv[inputArgumentIndex + 1]), "utf8"))
    : await fetchGoogleScholarSnapshot();

  if (process.argv.includes("--stdout")) {
    process.stdout.write(`${JSON.stringify(snapshot, null, 2)}\n`);
    return;
  }

  const changed = await writeSnapshotIfChanged(snapshot, outputPath);
  if (process.argv.includes("--firebase")) {
    await publishFirebaseScholarSnapshot(snapshot);
  }
  console.log(
    changed
      ? `Updated Google Scholar snapshot: ${snapshot.total_citations} citations, h-index ${snapshot.h_index}, i10-index ${snapshot.i10_index}, ${snapshot.papers.length} papers.`
      : `Google Scholar snapshot is unchanged at ${snapshot.total_citations} citations.`,
  );
  if (process.argv.includes("--firebase")) {
    console.log("Published the Scholar profile and individual paper counts to Firebase.");
  }
}

const isMain = process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;
if (isMain) {
  await main();
}
