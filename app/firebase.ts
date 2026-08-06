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

  const extractMetrics = (d: any) => {
    if (!d) return;
    const src = d.author_metrics || d;
    const total_citations = parseCounterValue(src.total_citations ?? src.citations ?? src.citation_count);
    const h_index = parseCounterValue(src.h_index ?? src.hindex);
    const i10_index = parseCounterValue(src.i10_index ?? src.i10index);
    if (total_citations > 0 || h_index > 0 || i10_index > 0) {
      cb({ total_citations, h_index, i10_index });
    }
  };

  // Immediate REST fetch for instantaneous live rendering
  fetch("https://portfolio-6a1b9-default-rtdb.firebaseio.com/visitor-counter/scholar-metrics/current.json")
    .then((res) => res.json())
    .then((d) => {
      if (!destroyed) extractMetrics(d);
    })
    .catch(() => {});

  initFirebase().then(async () => {
    if (destroyed || !scholarRef) return;
    try {
      const { onValue } = await import("firebase/database");
      unsub = onValue(
        scholarRef,
        (snap) => {
          if (!snap.exists()) return;
          extractMetrics(snap.val());
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

const DEFAULT_PUBLICATION_CITATIONS: Record<string, number> = {
  "Quantum computing applications for Internet of Things": 79,
  "QIoTChain: Quantum IoT-blockchain fusion for advanced data protection in Industry 4.0": 63,
  "A review on emergency vehicle management for intelligent transportation systems": 54,
  "Metaverse for education: Developments, challenges, and future direction": 62,
  "Unlocking the potential of interconnected blockchains: A comprehensive study of Cosmos blockchain interoperability": 50,
  "Explorative implementation of quantum key distribution algorithms for secure consumer electronics networks": 38,
  "Future of connectivity: A comprehensive review of innovations and challenges in 7G smart networks": 45,
  "Enhancing security using quantum blockchain in consumer IoT networks": 36,
  "DemocracyGuard: Blockchain-based secure voting framework for digital democracy": 36,
  "A comprehensive survey on data converters for IoT applications: Scope, issues and future directions": 26,
  "V-Track: Blockchain-enabled IoT system for reliable vehicle location verification": 20,
  "Blockchain-enabled vehicle lifecycle management with predictive maintenance using federated learning": 17,
  "Decentralized trust: NFT and blockchain-enabled evidence system using fog computing": 15,
  "Blockchain-enabled intrusion detection systems for real-time vehicle monitoring": 12,
  "Enhancing security using quantum computing (ESUQC)": 11,
  "Blockchain-Based Game Theoretical Framework for V2V and V2G Energy Trading in Carbon-Intelligent Internet of Vehicles": 10,
  "Machine Learning Techniques for Wi-Fi CSI-based Recognition and Sensing: A Comprehensive Review": 8,
  "Blockchain-Enabled Secure V2V and V2G Energy Trading for Carbon-Aware Internet of Energy Networks": 2,
  "Enhancing Quantum-Resistant Data Privacy in Vehicular Cloud Networks Using NIST-Qualified FALCON Algorithm": 1,
  "Blockchain-based framework for global IMEI blacklist management and mobile device theft prevention": 1,
  "Enhancing Vehicle Lifecycle Management Through Blockchain-Driven Predictive Maintenance and Federated Learning": 1,
};

function sanitizeFirebaseKey(key: string): string {
  return key.replace(/[.#$\[\]\/]/g, "_");
}

const SANITIZED_DEFAULT_CITATIONS: Record<string, number> = {};
Object.entries(DEFAULT_PUBLICATION_CITATIONS).forEach(([k, v]) => {
  SANITIZED_DEFAULT_CITATIONS[sanitizeFirebaseKey(k)] = v;
});

export function subscribePublicationCitations(cb: (m: Record<string, number>) => void): () => void {
  if (typeof window === "undefined") return () => {};

  let unsub: (() => void) | undefined;
  let destroyed = false;

  const handlePubData = (d: any) => {
    if (!d || typeof d !== "object") return;
    const map: Record<string, number> = {};
    const items = d.publications || d.articles || d;
    if (Array.isArray(items)) {
      items.forEach((item: any) => {
        if (item.title && (item.citations !== undefined || item.num_citations !== undefined)) {
          map[item.title] = parseCounterValue(item.citations ?? item.num_citations);
        }
      });
    } else if (typeof items === "object") {
      Object.entries(items).forEach(([key, val]) => {
        if (typeof val === "number") {
          map[key] = val;
          Object.keys(DEFAULT_PUBLICATION_CITATIONS).forEach((origTitle) => {
            if (sanitizeFirebaseKey(origTitle) === key) {
              map[origTitle] = val;
            }
          });
        } else if (val && typeof val === "object" && "citations" in val) {
          const parsed = parseCounterValue((val as any).citations);
          map[key] = parsed;
          Object.keys(DEFAULT_PUBLICATION_CITATIONS).forEach((origTitle) => {
            if (sanitizeFirebaseKey(origTitle) === key) {
              map[origTitle] = parsed;
            }
          });
        }
      });
    }
    if (Object.keys(map).length > 0) {
      cb({ ...DEFAULT_PUBLICATION_CITATIONS, ...map });
    }
  };

  // Immediate initial callback with defaults
  cb(DEFAULT_PUBLICATION_CITATIONS);

  // Fetch from Firebase RTDB
  fetch("https://portfolio-6a1b9-default-rtdb.firebaseio.com/visitor-counter/publication-citations.json")
    .then((res) => res.json())
    .then((d) => {
      if (!destroyed && d) handlePubData(d);
    })
    .catch(() => {});

  initFirebase().then(async () => {
    if (destroyed || !db) return;
    try {
      const { ref, onValue, set } = await import("firebase/database");
      const pubRef = ref(db, "visitor-counter/publication-citations");

      unsub = onValue(
        pubRef,
        (snap) => {
          try {
            if (!snap.exists()) {
              // Seed default citations into Firebase RTDB using sanitized keys
              void set(pubRef, SANITIZED_DEFAULT_CITATIONS).catch(() => {});
              cb(DEFAULT_PUBLICATION_CITATIONS);
              return;
            }
            handlePubData(snap.val());
          } catch (e) {
            console.warn("Error processing publication citations:", e);
          }
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

export async function updatePublicationCitation(title: string, count: number): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    await initFirebase();
    if (!db) return;
    const { ref, update } = await import("firebase/database");
    const pubRef = ref(db, "visitor-counter/publication-citations");
    const safeKey = sanitizeFirebaseKey(title);
    await update(pubRef, { [safeKey]: count });
  } catch (e) {
    console.warn("Failed to update publication citation:", e);
  }
}
