/**
 * Firebase visitor counter — mirrors the reference site (portfolio-6a1b9)
 * Tracks combined views + clicks against Firebase Realtime Database.
 * Also exposes Scholar metrics subscription.
 */

// ─── Firebase SDK (imported at module level so they can be tree-shaken) ─────

let firebaseInitialized = false;
let db: ReturnType<typeof import("firebase/database").getDatabase> | null = null;
let viewsRef: ReturnType<typeof import("firebase/database").ref> | null = null;
let clicksRef: ReturnType<typeof import("firebase/database").ref> | null = null;
let scholarRef: ReturnType<typeof import("firebase/database").ref> | null = null;

const firebaseConfig = {
  apiKey: "AIzaSyDaV2ARQU9EwLKo3mN02VoIiwm4w7jksOo",
  authDomain: "portfolio-6a1b9.firebaseapp.com",
  databaseURL: "https://portfolio-6a1b9-default-rtdb.firebaseio.com",
  projectId: "portfolio-6a1b9",
  appId: "1:604162259556:web:9388758fb2a3c61d977d71",
};

// Storage keys (matching reference site)
const PENDING_VIEWS_KEY = "visitor-counter:pending-views:site-total";
const PENDING_CLICKS_KEY = "visitor-counter:pending-clicks:site-total";

// ─── Helpers ────────────────────────────────────────────────────────────────

function parseCounterValue(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return Math.max(0, Math.floor(value));
  if (typeof value === "string") {
    const n = Number(value);
    if (Number.isFinite(n)) return Math.max(0, Math.floor(n));
  }
  if (value && typeof value === "object" && "count" in value) {
    return parseCounterValue((value as { count: unknown }).count);
  }
  return 0;
}

function getPending(key: string): number {
  try {
    return parseCounterValue(window.localStorage.getItem(key));
  } catch {
    return 0;
  }
}

function setPending(key: string, count: number) {
  try {
    const safe = parseCounterValue(count);
    if (safe <= 0) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, String(safe));
  } catch {
    // ignore
  }
}

// ─── Initializer ────────────────────────────────────────────────────────────

async function initFirebase() {
  if (firebaseInitialized) return;
  firebaseInitialized = true;

  try {
    const { getApps, getApp, initializeApp } = await import("firebase/app");
    const { getDatabase, ref } = await import("firebase/database");

    const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
    db = getDatabase(app);
    viewsRef = ref(db, "visitor-counter/site-total-views");
    clicksRef = ref(db, "visitor-counter/site-total-clicks");
    scholarRef = ref(db, "visitor-counter/scholar-metrics/current");
  } catch (e) {
    console.warn("Firebase init failed:", e);
  }
}

// ─── Public API ─────────────────────────────────────────────────────────────

export interface VisitorCounterCallbacks {
  onTotal: (total: number) => void;
}

export interface ScholarMetrics {
  total_citations?: number;
  h_index?: number;
  i10_index?: number;
}

let latestViews = 0;
let latestClicks = 0;
let lastRenderedTotal: number | null = null;
let hasQueuedView = false;
let flushingViews = false;
let flushingClicks = false;

function computeTotal() {
  return latestViews + latestClicks + getPending(PENDING_VIEWS_KEY) + getPending(PENDING_CLICKS_KEY);
}

export function subscribeVisitorCounter(cb: VisitorCounterCallbacks): () => void {
  if (typeof window === "undefined") return () => {};

  let unsubViews: (() => void) | undefined;
  let unsubClicks: (() => void) | undefined;
  let destroyed = false;

  const render = () => {
    const total = computeTotal();
    if (lastRenderedTotal === null || total !== lastRenderedTotal) {
      lastRenderedTotal = total;
      cb.onTotal(total);
    }
  };

  const flushViews = async () => {
    if (flushingViews || !viewsRef) return;
    const delta = getPending(PENDING_VIEWS_KEY);
    if (delta <= 0) return;
    flushingViews = true;
    try {
      const { runTransaction } = await import("firebase/database");
      const result = await runTransaction(viewsRef, (cur) => ({
        count: parseCounterValue(cur) + delta,
        updated_at: new Date().toISOString(),
      }));
      latestViews = parseCounterValue(result.snapshot.exists() ? result.snapshot.val() : 0);
      setPending(PENDING_VIEWS_KEY, Math.max(0, getPending(PENDING_VIEWS_KEY) - delta));
      render();
    } catch {
      // keep pending for next sync
    } finally {
      flushingViews = false;
      if (getPending(PENDING_VIEWS_KEY) > 0) setTimeout(flushViews, 800);
    }
  };

  const flushClicks = async () => {
    if (flushingClicks || !clicksRef) return;
    const delta = getPending(PENDING_CLICKS_KEY);
    if (delta <= 0) return;
    flushingClicks = true;
    try {
      const { runTransaction } = await import("firebase/database");
      const result = await runTransaction(clicksRef, (cur) => ({
        count: parseCounterValue(cur) + delta,
        updated_at: new Date().toISOString(),
      }));
      latestClicks = parseCounterValue(result.snapshot.exists() ? result.snapshot.val() : 0);
      setPending(PENDING_CLICKS_KEY, Math.max(0, getPending(PENDING_CLICKS_KEY) - delta));
      render();
    } catch {
      // keep pending for next sync
    } finally {
      flushingClicks = false;
      if (getPending(PENDING_CLICKS_KEY) > 0) setTimeout(flushClicks, 800);
    }
  };

  const queueView = () => {
    if (hasQueuedView) return;
    hasQueuedView = true;
    setPending(PENDING_VIEWS_KEY, getPending(PENDING_VIEWS_KEY) + 1);
    render();
    void flushViews();
  };

  const queueClick = (e: MouseEvent) => {
    if (!e.isTrusted) return;
    setPending(PENDING_CLICKS_KEY, getPending(PENDING_CLICKS_KEY) + 1);
    render();
    void flushClicks();
  };

  const onVisibility = () => {
    if (document.visibilityState !== "visible") return;
    if (getPending(PENDING_VIEWS_KEY) > 0) void flushViews();
    if (getPending(PENDING_CLICKS_KEY) > 0) void flushClicks();
  };

  const onOnline = () => {
    if (getPending(PENDING_VIEWS_KEY) > 0) void flushViews();
    if (getPending(PENDING_CLICKS_KEY) > 0) void flushClicks();
  };

  // Flush any leftover pending counts from previous sessions
  if (getPending(PENDING_VIEWS_KEY) > 0) void flushViews();
  if (getPending(PENDING_CLICKS_KEY) > 0) void flushClicks();

  // Render initial estimate immediately (pending + any cached Firebase total)
  render();

  // Start Firebase
  initFirebase().then(async () => {
    if (destroyed) return;
    if (!viewsRef || !clicksRef) return;

    try {
      const { onValue } = await import("firebase/database");

      unsubViews = onValue(
        viewsRef,
        (snap) => {
          latestViews = parseCounterValue(snap.exists() ? snap.val() : 0);
          render();
        },
        () => { latestViews = 0; render(); }
      );

      unsubClicks = onValue(
        clicksRef,
        (snap) => {
          latestClicks = parseCounterValue(snap.exists() ? snap.val() : 0);
          render();
        },
        () => { latestClicks = 0; render(); }
      );

      queueView();
    } catch (e) {
      console.warn("Firebase subscribe error:", e);
    }
  });

  document.addEventListener("click", queueClick, { passive: true, capture: true });
  document.addEventListener("visibilitychange", onVisibility);
  window.addEventListener("online", onOnline);

  return () => {
    destroyed = true;
    unsubViews?.();
    unsubClicks?.();
    document.removeEventListener("click", queueClick, true);
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("online", onOnline);
  };
}

export function subscribeScholarMetrics(cb: (m: ScholarMetrics) => void): () => void {
  if (typeof window === "undefined") return () => {};

  let unsub: (() => void) | undefined;
  let destroyed = false;

  initFirebase().then(async () => {
    if (destroyed || !scholarRef) return;
    try {
      const { onValue } = await import("firebase/database");
      unsub = onValue(
        scholarRef,
        (snap) => {
          if (!snap.exists()) return;
          const d = snap.val() || {};
          const src = d.author_metrics || d;
          cb({
            total_citations: parseCounterValue(src.total_citations ?? src.citations ?? src.citation_count),
            h_index: parseCounterValue(src.h_index ?? src.hindex),
            i10_index: parseCounterValue(src.i10_index ?? src.i10index),
          });
        },
        () => {}
      );
    } catch {}
  });

  return () => {
    destroyed = true;
    unsub?.();
  };
}
