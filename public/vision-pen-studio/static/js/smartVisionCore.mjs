/** Geometry uses unmirrored, normalized camera coordinates throughout. */
export const FINGERS = ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky'];
export const CHAINS = [[0, 1, 2, 3, 4], [0, 5, 6, 7, 8], [5, 9, 10, 11, 12], [9, 13, 14, 15, 16], [13, 17, 18, 19, 20], [0, 17]];
const distance = (a, b) => Math.hypot(a.x - b.x, a.y - b.y, (a.z || 0) - (b.z || 0));
function angle(a, b, c) {
    const ab = [a.x - b.x, a.y - b.y, (a.z || 0) - (b.z || 0)];
    const cb = [c.x - b.x, c.y - b.y, (c.z || 0) - (b.z || 0)];
    const denominator = Math.hypot(...ab) * Math.hypot(...cb);
    return denominator ? Math.acos(Math.max(-1, Math.min(1, ab.reduce((n, v, i) => n + v * cb[i], 0) / denominator))) * 180 / Math.PI : 0;
}

export function analyzeHand(points, handedness = 'Unknown', score = null) {
    if (points?.length !== 21) return null;
    const palm = Math.max(distance(points[0], points[9]), 0.001);
    const raised = [
        angle(points[1], points[2], points[3]) > 145 && angle(points[2], points[3], points[4]) > 150 && distance(points[4], points[5]) > palm * 0.65,
        ...[5, 9, 13, 17].map((base) => angle(points[base], points[base + 1], points[base + 3]) > 155 && distance(points[base + 3], points[0]) > distance(points[base + 1], points[0]) * 1.12)
    ];
    const pinch = distance(points[4], points[8]) < palm * 0.32;
    // A touching thumb/index pair is bent, not two additional raised fingers.
    if (pinch) { raised[0] = false; raised[1] = false; }
    const names = FINGERS.filter((_, index) => raised[index]);
    const count = names.length;
    let gesture = count === 0 ? 'Closed Fist' : count === 5 ? 'Open Palm' : names.join(' + ');
    let emoji = count === 0 ? '✊' : count === 5 ? '✋' : '☝';
    if (pinch && raised.slice(2).every(Boolean)) { gesture = 'OK'; emoji = '👌'; }
    else if (count === 1 && raised[0]) {
        const dy = points[4].y - points[2].y;
        gesture = Math.abs(dy) > palm * 0.25 ? (dy < 0 ? 'Thumbs Up' : 'Thumbs Down') : 'Thumb';
        emoji = gesture === 'Thumbs Down' ? '👎' : '👍';
    } else if (count === 2 && raised[1] && raised[2]) { gesture = 'Victory'; emoji = '✌'; }
    else if (count === 3 && raised[0] && raised[1] && raised[4]) { gesture = 'I Love You'; emoji = '🤟'; }
    else if (count === 1 && raised[1]) gesture = 'Pointing';
    const xs = points.map((p) => p.x), ys = points.map((p) => p.y);
    const left = Math.max(0, Math.min(...xs) - 0.025), top = Math.max(0, Math.min(...ys) - 0.025);
    return { label: `${handedness} hand`, handedness, score, points, raised, names, count, gesture, emoji,
        bbox: [left, top, Math.min(1, Math.max(...xs) + 0.025) - left, Math.min(1, Math.max(...ys) + 0.025) - top] };
}

export function ageRange(age) {
    if (!Number.isFinite(age) || age < 0) return 'Unavailable';
    for (const [min, max] of [[0, 5], [6, 12], [13, 17], [18, 24], [25, 34], [35, 44], [45, 54], [55, 64]]) {
        if (Math.round(age) <= max) return `${min}–${max}`;
    }
    return '65+';
}

export function intersectionOverUnion(a, b) {
    const width = Math.max(0, Math.min(a[0] + a[2], b[0] + b[2]) - Math.max(a[0], b[0]));
    const height = Math.max(0, Math.min(a[1] + a[3], b[1] + b[3]) - Math.max(a[1], b[1]));
    const intersection = width * height;
    return intersection / (a[2] * a[3] + b[2] * b[3] - intersection || 1);
}

export class ObjectTracker {
    constructor(prefix = '', ttl = 1500) { this.prefix = prefix; this.ttl = ttl; this.reset(); }
    reset() { this.tracks = []; this.nextId = 1; }
    update(detections, now) {
        this.tracks = this.tracks.filter((item) => now - item.lastSeen <= this.ttl);
        const candidates = [];
        detections.forEach((detection, di) => this.tracks.forEach((track, ti) => {
            if (detection.label !== track.label) return;
            const a = track.bbox, b = detection.bbox;
            const overlap = intersectionOverUnion(a, b);
            const shift = Math.hypot(a[0] + a[2] / 2 - b[0] - b[2] / 2, a[1] + a[3] / 2 - b[1] - b[3] / 2);
            const scale = Math.max(a[2], a[3], b[2], b[3], 0.05);
            if (overlap > 0.12 || shift < scale * 0.55) candidates.push({ di, ti, cost: 1 - overlap + shift / scale });
        }));
        const assigned = new Map(), used = new Set();
        candidates.sort((a, b) => a.cost - b.cost).forEach(({ di, ti }) => {
            if (!assigned.has(di) && !used.has(ti)) { assigned.set(di, ti); used.add(ti); }
        });
        return detections.map((detection, index) => {
            const previous = assigned.has(index) ? this.tracks[assigned.get(index)] : null;
            const result = { ...detection, id: previous?.id || `${this.prefix}${String(this.nextId++).padStart(2, '0')}`, lastSeen: now };
            if (Number.isFinite(detection.age) && Number.isFinite(previous?.age)) result.age = previous.age * 0.75 + detection.age * 0.25;
            if (previous) Object.assign(previous, result);
            else this.tracks.push(result);
            return result;
        });
    }
}

/** Only infer displayed content when its box is substantially inside a screen. */
export function sceneSource(item, objects, mode = 'auto') {
    if (mode === 'displayed') return 'Displayed/Printed Image Detection · user selected';
    if (mode === 'live') return 'Live Scene Detection · user selected';
    const area = item.bbox[2] * item.bbox[3];
    const contained = objects.some((screen) => {
        if (screen === item || !['tv', 'laptop', 'cell phone'].includes(screen.label)) return false;
        const a = item.bbox, b = screen.bbox;
        const intersection = Math.max(0, Math.min(a[0] + a[2], b[0] + b[2]) - Math.max(a[0], b[0])) * Math.max(0, Math.min(a[1] + a[3], b[1] + b[3]) - Math.max(a[1], b[1]));
        return area > 0 && intersection / area > 0.85 && area < b[2] * b[3] * 0.75;
    });
    return contained ? 'Displayed Image Detection · possible screen content' : 'Live Scene Detection · source unverified';
}

/** Debounce gesture changes; a held gesture emits only once. */
export class StableValue {
    constructor(holdMs = 180) { this.holdMs = holdMs; this.reset(); }
    reset() { this.value = undefined; this.candidate = undefined; this.since = 0; }
    update(value, now) {
        if (value !== this.candidate) { this.candidate = value; this.since = now; }
        if (value !== this.value && now - this.since >= this.holdMs) { this.value = value; return true; }
        return false;
    }
}

export function cameraError(error, secure = true) {
    if (!secure) return 'Camera access requires HTTPS or localhost.';
    if (['NotAllowedError', 'SecurityError'].includes(error.name)) return 'Camera permission was blocked. Allow camera access in your browser, then select Start AI Camera.';
    if (['NotFoundError', 'DevicesNotFoundError'].includes(error.name)) return 'No camera was found. Connect a camera and try again.';
    if (['NotReadableError', 'TrackStartError'].includes(error.name)) return 'Your camera is busy. Close other camera apps and try again.';
    if (error.name === 'OverconstrainedError') return 'That camera is unavailable. Choose another camera or try again.';
    return 'The camera could not start. Check your device and browser permissions, then try again.';
}
