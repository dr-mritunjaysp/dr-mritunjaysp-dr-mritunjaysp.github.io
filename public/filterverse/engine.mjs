// FilterVerse's deterministic, browser-local reference implementation.
// All spatial kernels use correlation; signed responses are explicitly mapped for display.
export const DEFAULTS = { size: 5, sigma: 1.4, sigmaY: 1.4, amount: 1.5, threshold: 128, lower: 40, upper: 100, percentile: 50, trim: 15, q: 1.5, color: 30, cutoff: .12, order: 2, band: .08, notchX: .18, notchY: .12, angle: 45, wavelength: 5, noise: 12, iterations: 8, kappa: 25, bias: 8, sauvola: .2, border: 'reflect', normalize: true, offset: 0 };
const clamp = (v, lo = 0, hi = 255) => Math.max(lo, Math.min(hi, Number.isFinite(v) ? v : 0));
export function image(width, height, data) { return { width, height, data: data ?? new Uint8ClampedArray(width * height * 4) }; }
export function validateImage(img) {
    if (!Number.isInteger(img?.width) || !Number.isInteger(img?.height) || img.width < 1 || img.height < 1 || img.width > 768 || img.height > 768 || img.data?.length !== img.width * img.height * 4)
        throw new Error('Use a valid RGBA working image up to 768 × 768 pixels.');
}
export function parameters(values = {}) {
    const p = { ...DEFAULTS, ...values };
    for (const key of Object.keys(DEFAULTS))
        if (typeof DEFAULTS[key] === 'number')
            p[key] = Number.isFinite(Number(p[key])) ? Number(p[key]) : DEFAULTS[key];
    p.size = clamp(Math.round(p.size / 2) * 2 - 1, 3, 9);
    p.sigma = clamp(p.sigma, .3, 5);
    p.sigmaY = clamp(p.sigmaY, .3, 5);
    p.iterations = Math.round(clamp(p.iterations, 1, 20));
    p.cutoff = clamp(p.cutoff, .01, .49);
    p.order = clamp(p.order, 1, 8);
    p.color = clamp(p.color, 1, 100);
    p.noise = clamp(p.noise, 0, 60);
    p.amount = clamp(p.amount, 0, 5);
    p.percentile = clamp(p.percentile, 0, 100);
    p.trim = clamp(p.trim, 0, 45);
    p.kappa = clamp(p.kappa, 1, 100);
    p.lower = clamp(p.lower);
    p.upper = Math.max(p.lower, clamp(p.upper));
    p.threshold = clamp(p.threshold);
    p.border = ['reflect', 'replicate', 'zero', 'wrap'].includes(p.border) ? p.border : 'reflect';
    return p;
}
export function borderIndex(i, n, mode = 'reflect') {
    if (i >= 0 && i < n)
        return i;
    if (mode === 'zero')
        return -1;
    if (mode === 'replicate')
        return clamp(i, 0, n - 1);
    if (mode === 'wrap')
        return ((i % n) + n) % n;
    if (n === 1)
        return 0;
    const period = 2 * n - 2, v = ((i % period) + period) % period;
    return v < n ? v : period - v;
}
function at(a, w, h, x, y, border = 'reflect') { const ix = borderIndex(x, w, border), iy = borderIndex(y, h, border); return ix < 0 || iy < 0 ? 0 : a[iy * w + ix]; }
export function luminance(img) { const out = new Float64Array(img.width * img.height); for (let i = 0; i < out.length; i++)
    out[i] = .299 * img.data[4 * i] + .587 * img.data[4 * i + 1] + .114 * img.data[4 * i + 2]; return out; }
function planes(img) { return [0, 1, 2].map(c => Float64Array.from({ length: img.width * img.height }, (_, i) => img.data[4 * i + c])); }
function fromPlanes(img, values) { const out = image(img.width, img.height); for (let i = 0; i < img.width * img.height; i++) {
    for (let c = 0; c < 3; c++)
        out.data[i * 4 + c] = clamp(values[c % values.length][i]);
    out.data[i * 4 + 3] = img.data[i * 4 + 3];
} return out; }
export function correlate(a, w, h, k, border = 'reflect') {
    const n = Math.sqrt(k.length);
    if (!Number.isInteger(n) || n % 2 !== 1)
        throw new Error('A spatial kernel must be an odd square.');
    const r = n >> 1, out = new Float64Array(a.length);
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
            let s = 0;
            for (let j = 0; j < n; j++)
                for (let i = 0; i < n; i++)
                    s += at(a, w, h, x + i - r, y + j - r, border) * k[j * n + i];
            out[y * w + x] = s;
        }
    return out;
}
function separable(a, w, h, kx, ky = kx, border = 'reflect') {
    const r = kx.length >> 1, t = new Float64Array(a.length), out = new Float64Array(a.length);
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
            let s = 0;
            for (let i = 0; i < kx.length; i++)
                s += at(a, w, h, x + i - r, y, border) * kx[i];
            t[y * w + x] = s;
        }
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
            let s = 0;
            for (let i = 0; i < ky.length; i++)
                s += at(t, w, h, x, y + i - (ky.length >> 1), border) * ky[i];
            out[y * w + x] = s;
        }
    return out;
}
const normalized = a => { const s = a.reduce((x, y) => x + y, 0); return a.map(v => v / (s || 1)); };
function gauss1(n, sigma) { return normalized(Array.from({ length: n }, (_, i) => Math.exp(-((i - (n >> 1)) ** 2) / (2 * sigma * sigma)))); }
function outer(a, b = a) { return a.flatMap(y => b.map(x => x * y)); }
function blur(a, w, h, p) { return separable(a, w, h, gauss1(p.size, p.sigma), gauss1(p.size, p.sigmaY), p.border); }
const laplace = [0, 1, 0, 1, -4, 1, 0, 1, 0];
const edgeKernels = { sobel: [[-1, 0, 1, -2, 0, 2, -1, 0, 1], [-1, -2, -1, 0, 0, 0, 1, 2, 1]], prewitt: [[-1, 0, 1, -1, 0, 1, -1, 0, 1], [-1, -1, -1, 0, 0, 0, 1, 1, 1]], scharr: [[-3, 0, 3, -10, 0, 10, -3, 0, 3], [-3, -10, -3, 0, 0, 0, 3, 10, 3]] };
export function kernelFor(id, values = {}) {
    const p = parameters(values), n = p.size;
    if (['mean', 'box'].includes(id))
        return Array(n * n).fill(1 / (n * n));
    if (id === 'gaussian')
        return outer(gauss1(n, p.sigmaY), gauss1(n, p.sigma));
    if (id === 'weighted-mean')
        return outer(normalized(Array.from({ length: n }, (_, i) => (n >> 1) + 1 - Math.abs(i - (n >> 1)))));
    if (id === 'binomial') {
        let row = [1];
        for (let j = 1; j < n; j++)
            row = Array.from({ length: j + 1 }, (_, i) => (row[i - 1] || 0) + (row[i] || 0));
        return outer(normalized(row));
    }
    if (['laplacian', 'laplacian-sharpen'].includes(id))
        return laplace;
    if (id === 'high-pass')
        return [-1, -1, -1, -1, 8, -1, -1, -1, -1];
    if (edgeKernels[id])
        return edgeKernels[id][0];
    if (id === 'laws')
        return outer([1, 4, 6, 4, 1], [-1, -2, 0, 2, 1]).map(v => v / 48);
    if (id === 'gabor') {
        const theta = p.angle * Math.PI / 180, r = n >> 1, k = [];
        for (let y = -r; y <= r; y++)
            for (let x = -r; x <= r; x++) {
                const u = x * Math.cos(theta) + y * Math.sin(theta), v = -x * Math.sin(theta) + y * Math.cos(theta);
                k.push(Math.exp(-(u * u + .25 * v * v) / (2 * p.sigma ** 2)) * Math.cos(2 * Math.PI * u / p.wavelength));
            }
        const mean = k.reduce((s, v) => s + v, 0) / k.length, centered = k.map(v => v - mean), sum = centered.reduce((s, v) => s + Math.abs(v), 0);
        return centered.map(v => v / (sum || 1));
    }
    if (id === 'custom') {
        const k = Array.isArray(p.kernel) ? p.kernel.map(v => clamp(Number(v), -100, 100)) : [0, -1, 0, -1, 5, -1, 0, -1, 0];
        if (![9, 25, 49].includes(k.length))
            throw new Error('Custom kernels must be 3×3, 5×5 or 7×7.');
        const sum = k.reduce((s, v) => s + v, 0);
        return p.normalize && Math.abs(sum) > 1e-9 ? k.map(v => v / sum) : k;
    }
    return null;
}
function neighborhood(a, w, h, p, kind) {
    const out = new Float64Array(a.length), r = p.size >> 1;
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
            const v = [];
            for (let j = -r; j <= r; j++)
                for (let i = -r; i <= r; i++)
                    v.push(at(a, w, h, x + i, y + j, p.border));
            if (kind === 'weighted-median')
                for (let i = 0; i < 4; i++)
                    v.push(a[y * w + x]);
            let value = 0;
            if (['median', 'weighted-median', 'percentile', 'trimmed', 'min', 'max', 'midpoint'].includes(kind)) {
                v.sort((a, b) => a - b);
                const mid = v.length >> 1;
                if (kind === 'min')
                    value = v[0];
                else if (kind === 'max')
                    value = v.at(-1);
                else if (kind === 'midpoint')
                    value = (v[0] + v.at(-1)) / 2;
                else if (kind === 'percentile')
                    value = v[Math.round((v.length - 1) * p.percentile / 100)];
                else if (kind === 'trimmed') {
                    const d = Math.floor(v.length * p.trim / 100), s = v.slice(d, v.length - d);
                    value = s.reduce((s, x) => s + x, 0) / s.length;
                }
                else
                    value = v[mid];
            }
            else if (kind === 'geometric')
                value = v.some(x => x === 0) ? 0 : Math.exp(v.reduce((s, x) => s + Math.log(x), 0) / v.length);
            else if (kind === 'harmonic')
                value = v.some(x => x === 0) ? 0 : v.length / v.reduce((s, x) => s + 1 / x, 0);
            else if (kind === 'contra') {
                if (p.q < 0 && v.some(x => x === 0))
                    value = 0;
                else {
                    const a = v.reduce((s, x) => s + x ** (p.q + 1), 0), b = v.reduce((s, x) => s + x ** p.q, 0);
                    value = b ? a / b : 0;
                }
            }
            else if (kind === 'adaptive-median') {
                value = a[y * w + x];
                for (let rr = 1; rr <= r; rr++) {
                    const z = [];
                    for (let j = -rr; j <= rr; j++)
                        for (let i = -rr; i <= rr; i++)
                            z.push(at(a, w, h, x + i, y + j, p.border));
                    z.sort((a, b) => a - b);
                    const lo = z[0], hi = z.at(-1), med = z[z.length >> 1];
                    value = med;
                    if (med > lo && med < hi) {
                        const center = a[y * w + x];
                        value = center > lo && center < hi ? center : med;
                        break;
                    }
                }
            }
            else if (kind === 'entropy') {
                const bins = new Uint32Array(16);
                for (const z of v)
                    bins[Math.min(15, Math.floor(clamp(z) / 16))]++;
                for (const b of bins)
                    if (b) {
                        const f = b / v.length;
                        value -= f * Math.log2(f);
                    }
                value *= 255 / 4;
            }
            out[y * w + x] = value;
        }
    return out;
}
function gradient(a, w, h, id = 'sobel', border = 'reflect') {
    if (id === 'roberts') {
        const gx = new Float64Array(a.length), gy = new Float64Array(a.length);
        for (let y = 0; y < h; y++)
            for (let x = 0; x < w; x++) {
                const i = y * w + x;
                gx[i] = a[i] - at(a, w, h, x + 1, y + 1, border);
                gy[i] = at(a, w, h, x + 1, y, border) - at(a, w, h, x, y + 1, border);
            }
        return [gx, gy];
    }
    if (id === 'farid') {
        const s = [.037659, .249153, .426375, .249153, .037659], d = [-.109604, -.276691, 0, .276691, .109604];
        return [separable(a, w, h, d, s, border), separable(a, w, h, s, d, border)];
    }
    return edgeKernels[id].map(k => correlate(a, w, h, k, border));
}
export function hysteresis(a, w, h, lower, upper) {
    const out = new Float64Array(a.length), queue = [];
    for (let i = 0; i < a.length; i++)
        if (a[i] >= upper && a[i] > 0) {
            out[i] = 255;
            queue.push(i);
        }
    for (let q = 0; q < queue.length; q++) {
        const i = queue[q], x = i % w, y = Math.floor(i / w);
        for (let dy = -1; dy <= 1; dy++)
            for (let dx = -1; dx <= 1; dx++) {
                const xx = x + dx, yy = y + dy, j = yy * w + xx;
                if (xx >= 0 && yy >= 0 && xx < w && yy < h && !out[j] && a[j] >= lower && a[j] > 0) {
                    out[j] = 255;
                    queue.push(j);
                }
            }
    }
    return out;
}
function canny(a, w, h, p) {
    const [gx, gy] = gradient(blur(a, w, h, p), w, h, 'sobel', p.border), mag = Float64Array.from(gx, (v, i) => Math.hypot(v, gy[i])), nms = new Float64Array(a.length);
    for (let y = 1; y < h - 1; y++)
        for (let x = 1; x < w - 1; x++) {
            const i = y * w + x, deg = (Math.atan2(gy[i], gx[i]) * 180 / Math.PI + 180) % 180;
            let u, v;
            if (deg < 22.5 || deg >= 157.5) {
                u = i - 1;
                v = i + 1;
            }
            else if (deg < 67.5) {
                u = i - w - 1;
                v = i + w + 1;
            }
            else if (deg < 112.5) {
                u = i - w;
                v = i + w;
            }
            else {
                u = i - w + 1;
                v = i + w - 1;
            }
            if (mag[i] >= mag[u] && mag[i] >= mag[v])
                nms[i] = mag[i];
        }
    return hysteresis(nms, w, h, p.lower, p.upper);
}
export function otsuThreshold(hist) {
    const total = hist.reduce((s, v) => s + v, 0);
    let sum = 0;
    for (let i = 0; i < 256; i++)
        sum += i * hist[i];
    let weight = 0, s = 0, best = -1, t = 0;
    for (let i = 0; i < 256; i++) {
        weight += hist[i];
        s += i * hist[i];
        if (!weight || weight === total)
            continue;
        const delta = s / weight - (sum - s) / (total - weight), score = weight * (total - weight) * delta * delta;
        if (score > best) {
            best = score;
            t = i;
        }
    }
    return t;
}
function histogramPlane(a) { const hist = new Uint32Array(256); for (const v of a)
    hist[Math.round(clamp(v))]++; return hist; }
function threshold(a, w, h, p, id) {
    const hist = histogramPlane(a);
    let t = p.threshold;
    if (id === 'otsu')
        t = otsuThreshold(hist);
    if (id === 'isodata' || id === 'li') {
        t = a.reduce((s, v) => s + v, 0) / a.length;
        for (let iter = 0; iter < 80; iter++) {
            let n0 = 0, n1 = 0, s0 = 0, s1 = 0;
            for (let i = 0; i < 256; i++)
                if (i <= t) {
                    n0 += hist[i];
                    s0 += i * hist[i];
                }
                else {
                    n1 += hist[i];
                    s1 += i * hist[i];
                }
            if (!n0 || !n1)
                break;
            const m0 = s0 / n0, m1 = s1 / n1, next = id === 'li' ? (m0 > 0 ? (m0 - m1) / (Math.log(m0) - Math.log(m1)) : (m0 + m1) / 2) : (m0 + m1) / 2;
            if (Math.abs(next - t) < .5) {
                t = next;
                break;
            }
            t = next;
        }
    }
    if (id === 'multi-otsu') {
        const counts = [], sums = [];
        let c = 0, s = 0;
        for (let i = 0; i < 256; i++) {
            c += hist[i];
            s += i * hist[i];
            counts.push(c);
            sums.push(s);
        }
        let best = -1, t1 = 85, t2 = 170;
        for (let i = 0; i < 254; i++)
            for (let j = i + 1; j < 255; j++) {
                const a0 = counts[i], b = counts[j] - a0, cc = c - counts[j];
                if (!a0 || !b || !cc)
                    continue;
                const score = sums[i] ** 2 / a0 + (sums[j] - sums[i]) ** 2 / b + (s - sums[j]) ** 2 / cc;
                if (score > best) {
                    best = score;
                    t1 = i;
                    t2 = j;
                }
            }
        return Float64Array.from(a, v => v <= t1 ? 0 : v <= t2 ? 127 : 255);
    }
    if (id === 'triangle') {
        let lo = 0, hi = 255, peak = 0;
        while (!hist[lo] && lo < 255)
            lo++;
        while (!hist[hi] && hi > 0)
            hi--;
        for (let i = 0; i < 256; i++)
            if (hist[i] > hist[peak])
                peak = i;
        const end = peak - lo > hi - peak ? lo : hi, dx = end - peak, dy = hist[end] - hist[peak];
        let best = -1;
        t = peak;
        for (let i = Math.min(end, peak); i <= Math.max(end, peak); i++) {
            const distance = Math.abs(dy * (i - peak) - dx * (hist[i] - hist[peak])) / (Math.hypot(dx, dy) || 1);
            if (distance > best) {
                best = distance;
                t = i;
            }
        }
    }
    if (id === 'hysteresis')
        return hysteresis(a, w, h, p.lower, p.upper);
    if (['adaptive', 'local', 'niblack', 'sauvola'].includes(id)) {
        const k = Array(p.size).fill(1 / p.size), mean = separable(a, w, h, k, k, p.border), sq = separable(Float64Array.from(a, v => v * v), w, h, k, k, p.border);
        return Float64Array.from(a, (v, i) => { const sd = Math.sqrt(Math.max(0, sq[i] - mean[i] ** 2)), tt = id === 'niblack' ? mean[i] + p.sauvola * sd : id === 'sauvola' ? mean[i] * (1 + p.sauvola * (sd / 128 - 1)) : mean[i] - p.bias; return v > tt ? 255 : 0; });
    }
    return Float64Array.from(a, v => v > t ? 255 : 0);
}
function bilateral(a, w, h, p) { const out = new Float64Array(a.length), r = p.size >> 1; for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
        let s = 0, z = 0;
        for (let dy = -r; dy <= r; dy++)
            for (let dx = -r; dx <= r; dx++) {
                const v = at(a, w, h, x + dx, y + dy, p.border), weight = Math.exp(-(dx * dx + dy * dy) / (2 * p.sigma ** 2) - (v - a[y * w + x]) ** 2 / (2 * p.color ** 2));
                s += v * weight;
                z += weight;
            }
        out[y * w + x] = s / z;
    } return out; }
function localRestore(a, w, h, p, id) {
    const k = Array(p.size).fill(1 / p.size), mean = separable(a, w, h, k, k, p.border), sq = separable(Float64Array.from(a, v => v * v), w, h, k, k, p.border), variance = Float64Array.from(sq, (v, i) => Math.max(0, v - mean[i] ** 2));
    if (id === 'wiener')
        return Float64Array.from(a, (v, i) => mean[i] + Math.max(0, variance[i] - p.noise ** 2) / Math.max(variance[i], 1e-9) * (v - mean[i]));
    const aa = Float64Array.from(variance, v => v / (v + p.color ** 2)), bb = Float64Array.from(mean, (v, i) => (1 - aa[i]) * v), ma = separable(aa, w, h, k, k, p.border), mb = separable(bb, w, h, k, k, p.border);
    return Float64Array.from(a, (v, i) => ma[i] * v + mb[i]);
}
function diffuse(a, w, h, p, id) { let u = Float64Array.from(a); for (let iter = 0; iter < p.iterations; iter++) {
    const next = new Float64Array(a.length);
    for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
            const i = y * w + x;
            let update = 0;
            for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
                const d = at(u, w, h, x + dx, y + dy, p.border) - u[i];
                update += d * (id === 'isotropic' ? 1 : Math.exp(-((d / p.kappa) ** 2)));
            }
            next[i] = u[i] + .2 * update;
        }
    u = next;
} return u; }
function haar(a, w, h, p) { const out = Float64Array.from(a), t = p.noise, soft = v => Math.sign(v) * Math.max(0, Math.abs(v) - t); for (let y = 0; y < h - 1; y += 2)
    for (let x = 0; x < w - 1; x += 2) {
        const a0 = a[y * w + x], b = a[y * w + x + 1], c = a[(y + 1) * w + x], d = a[(y + 1) * w + x + 1], ll = (a0 + b + c + d) / 2, lh = soft((a0 - b + c - d) / 2), hl = soft((a0 + b - c - d) / 2), hh = soft((a0 - b - c + d) / 2);
        out[y * w + x] = (ll + lh + hl + hh) / 2;
        out[y * w + x + 1] = (ll - lh + hl - hh) / 2;
        out[(y + 1) * w + x] = (ll + lh - hl - hh) / 2;
        out[(y + 1) * w + x + 1] = (ll - lh - hl + hh) / 2;
    } return out; }
function richardsonLucy(a, w, h, p) { let estimate = Float64Array.from(a, v => Math.max(1, v)); for (let n = 0; n < p.iterations; n++) {
    const projected = blur(estimate, w, h, p), ratio = Float64Array.from(a, (v, i) => v / Math.max(projected[i], 1e-8)), correction = blur(ratio, w, h, p);
    estimate = Float64Array.from(estimate, (v, i) => clamp(v * correction[i], 0, 2048));
} return estimate; }
function vessel(a, w, h, p) { const g = blur(a, w, h, p), out = new Float64Array(a.length); for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
        const i = y * w + x, xx = (at(g, w, h, x - 1, y, p.border) - 2 * g[i] + at(g, w, h, x + 1, y, p.border)) * p.sigma ** 2, yy = (at(g, w, h, x, y - 1, p.border) - 2 * g[i] + at(g, w, h, x, y + 1, p.border)) * p.sigma ** 2, xy = (at(g, w, h, x + 1, y + 1, p.border) - at(g, w, h, x + 1, y - 1, p.border) - at(g, w, h, x - 1, y + 1, p.border) + at(g, w, h, x - 1, y - 1, p.border)) / 4 * p.sigma ** 2;
        let l1 = (xx + yy + Math.hypot(xx - yy, 2 * xy)) / 2, l2 = (xx + yy - Math.hypot(xx - yy, 2 * xy)) / 2;
        if (Math.abs(l1) > Math.abs(l2))
            [l1, l2] = [l2, l1];
        out[i] = l2 < 0 ? 255 * Math.exp(-((l1 / (l2 || 1e-9)) ** 2) / (2 * .5 ** 2)) * (1 - Math.exp(-(l1 * l1 + l2 * l2) / (2 * p.color ** 2))) : 0;
    } return out; }
export function fft(real, imag, inverse = false) {
    const n = real.length;
    if (n < 1 || (n & (n - 1)))
        throw new Error('FFT length must be a power of two.');
    for (let i = 1, j = 0; i < n; i++) {
        let bit = n >> 1;
        for (; j & bit; bit >>= 1)
            j ^= bit;
        j ^= bit;
        if (i < j) {
            [real[i], real[j]] = [real[j], real[i]];
            [imag[i], imag[j]] = [imag[j], imag[i]];
        }
    }
    for (let len = 2; len <= n; len <<= 1) {
        const angle = (inverse ? 2 : -2) * Math.PI / len, wr = Math.cos(angle), wi = Math.sin(angle);
        for (let i = 0; i < n; i += len) {
            let ur = 1, ui = 0;
            for (let j = 0; j < len / 2; j++) {
                const a = i + j, b = a + len / 2, vr = real[b] * ur - imag[b] * ui, vi = real[b] * ui + imag[b] * ur;
                real[b] = real[a] - vr;
                imag[b] = imag[a] - vi;
                real[a] += vr;
                imag[a] += vi;
                const tmp = ur;
                ur = ur * wr - ui * wi;
                ui = tmp * wi + ui * wr;
            }
        }
    }
    if (inverse)
        for (let i = 0; i < n; i++) {
            real[i] /= n;
            imag[i] /= n;
        }
}
function fft2(real, imag, w, h, inverse = false) { for (let y = 0; y < h; y++)
    fft(real.subarray(y * w, (y + 1) * w), imag.subarray(y * w, (y + 1) * w), inverse); const r = new Float64Array(h), im = new Float64Array(h); for (let x = 0; x < w; x++) {
    for (let y = 0; y < h; y++) {
        r[y] = real[y * w + x];
        im[y] = imag[y * w + x];
    }
    fft(r, im, inverse);
    for (let y = 0; y < h; y++) {
        real[y * w + x] = r[y];
        imag[y * w + x] = im[y];
    }
} }
export function kernelSpectrum(kernel) { const n = Math.sqrt(kernel.length); if (![3, 5, 7, 9].includes(n))
    throw new Error('Unsupported kernel dimensions.'); const real = new Float64Array(4096), imag = new Float64Array(4096); for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++)
        real[y * 64 + x] = kernel[y * n + x]; fft2(real, imag, 64, 64); return spectrumImage(Float64Array.from(real, (v, i) => Math.hypot(v, imag[i])), 64, 64, false); }
export function transferValue(id, fx, fy, values = {}) {
    const p = values, cut = p.cutoff ?? .12, order = p.order ?? 2, d = Math.hypot(fx, fy);
    let low = id.startsWith('ideal') ? (d <= cut ? 1 : 0) : id.startsWith('butter') ? 1 / (1 + (d / cut) ** (2 * order)) : Math.exp(-d * d / (2 * cut * cut));
    if (id.includes('notch')) {
        const a = Math.hypot(fx - p.notchX, fy - p.notchY), b = Math.hypot(fx + p.notchX, fy + p.notchY), r = Math.max(.005, (p.band ?? .08) / 2);
        let reject;
        if (id === 'butter-notch')
            reject = 1 / (1 + (r / Math.max(a, 1e-10)) ** (2 * order)) * 1 / (1 + (r / Math.max(b, 1e-10)) ** (2 * order));
        else if (id === 'gaussian-notch')
            reject = (1 - Math.exp(-a * a / (2 * r * r))) * (1 - Math.exp(-b * b / (2 * r * r)));
        else
            reject = a > r && b > r ? 1 : 0;
        return id === 'notch-pass' ? 1 - reject : reject;
    }
    if (id.startsWith('band')) {
        const band = Math.max(.005, p.band ?? .08), keep = d >= Math.max(0, cut - band / 2) && d <= cut + band / 2;
        return id === 'band-pass' ? Number(keep) : Number(!keep);
    }
    return id.endsWith('hpf') ? 1 - low : low;
}
function spectrumImage(values, w, h, log = true) { const side = Math.min(256, Math.max(w, h)), out = image(side, side); let max = 0; for (const v of values)
    max = Math.max(max, log ? Math.log1p(v) : v); for (let y = 0; y < side; y++)
    for (let x = 0; x < side; x++) {
        const ix = (Math.floor(x * w / side) + Math.floor(w / 2)) % w, iy = (Math.floor(y * h / side) + Math.floor(h / 2)) % h, v = values[iy * w + ix], n = 255 * (log ? Math.log1p(v) : v) / (max || 1), i = (y * side + x) * 4;
        out.data.set([n, n, n, 255], i);
    } return out; }
function frequency(a, width, height, p, id) { const w = 2 ** Math.ceil(Math.log2(width)), h = 2 ** Math.ceil(Math.log2(height)), real = new Float64Array(w * h), imag = new Float64Array(w * h); for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++)
        real[y * w + x] = at(a, width, height, x, y, p.border); fft2(real, imag, w, h); const before = Float64Array.from(real, (v, i) => Math.hypot(v, imag[i])), mask = new Float64Array(w * h); for (let y = 0; y < h; y++)
    for (let x = 0; x < w; x++) {
        const i = y * w + x, fx = (x <= w / 2 ? x : x - w) / w, fy = (y <= h / 2 ? y : y - h) / h;
        mask[i] = id === 'spectrum' ? 1 : transferValue(id, fx, fy, p);
        real[i] *= mask[i];
        imag[i] *= mask[i];
    } const after = Float64Array.from(real, (v, i) => Math.hypot(v, imag[i])); fft2(real, imag, w, h, true); const high = id.endsWith('hpf') || id === 'band-pass' || id === 'notch-pass'; const out = Float64Array.from(a, (_, i) => { const v = real[Math.floor(i / width) * w + i % width]; return high ? Math.abs(v) * p.amount : v; }); return { plane: out, spectra: [spectrumImage(before, w, h), spectrumImage(mask, w, h, false), spectrumImage(after, w, h)] }; }
export const LIVE_FILTERS = ['mean', 'box', 'weighted-mean', 'gaussian', 'binomial', 'median', 'weighted-median', 'adaptive-median', 'min', 'max', 'midpoint', 'percentile', 'trimmed', 'geometric', 'harmonic', 'contra', 'laplacian', 'high-pass', 'unsharp', 'high-boost', 'laplacian-sharpen', 'roberts', 'prewitt', 'sobel', 'scharr', 'farid', 'log', 'dog', 'canny', 'marr', 'bilateral', 'guided', 'ideal-lpf', 'ideal-hpf', 'butter-lpf', 'butter-hpf', 'gaussian-lpf', 'gaussian-hpf', 'band-pass', 'band-reject', 'notch-pass', 'notch-reject', 'butter-notch', 'gaussian-notch', 'erosion', 'dilation', 'opening', 'closing', 'morph-gradient', 'top-hat', 'black-hat', 'gabor', 'laws', 'entropy', 'haar', 'wavelet-threshold', 'wiener', 'richardson-lucy', 'isotropic', 'anisotropic', 'perona-malik', 'frangi', 'hessian', 'global', 'adaptive', 'local', 'otsu', 'multi-otsu', 'niblack', 'sauvola', 'li', 'triangle', 'isodata', 'hysteresis', 'custom'];
export function applyFilter(img, id, values = {}) {
    validateImage(img);
    if (!LIVE_FILTERS.includes(id))
        throw new Error(`${id} is a reference-only method, not an installed browser filter.`);
    const p = parameters(values), w = img.width, h = img.height, src = planes(img), gray = luminance(img), kernel = kernelFor(id, p);
    let out, spectra;
    if (/^(ideal-|butter-|gaussian-|band-|notch-)/.test(id)) {
        const result = frequency(gray, w, h, p, id);
        out = [result.plane];
        spectra = result.spectra;
    }
    else if (['gaussian', 'mean', 'box', 'binomial', 'weighted-mean', 'custom'].includes(id))
        out = src.map(a => id === 'gaussian' ? blur(a, w, h, p) : Float64Array.from(correlate(a, w, h, kernel, p.border), v => v + (id === 'custom' ? p.offset : 0)));
    else if (['median', 'weighted-median', 'adaptive-median', 'min', 'max', 'midpoint', 'percentile', 'trimmed', 'geometric', 'harmonic', 'contra'].includes(id))
        out = src.map(a => neighborhood(a, w, h, p, id));
    else if (['laplacian', 'high-pass', 'laplacian-sharpen'].includes(id))
        out = src.map(a => Float64Array.from(correlate(a, w, h, kernel, p.border), (v, i) => id === 'laplacian-sharpen' ? a[i] - p.amount * v : Math.abs(v)));
    else if (['unsharp', 'high-boost', 'dog', 'log', 'marr'].includes(id))
        out = (['marr', 'log', 'dog'].includes(id) ? [gray] : src).map(a => {
            const g = blur(a, w, h, p);
            if (id === 'log' || id === 'marr') {
                const l = correlate(g, w, h, laplace, p.border);
                if (id === 'log')
                    return Float64Array.from(l, v => Math.abs(v));
                return Float64Array.from(l, (v, i) => { const x = i % w, y = Math.floor(i / w); return [[1, 0], [0, 1], [-1, 0], [0, -1]].some(([dx, dy]) => { const n = at(l, w, h, x + dx, y + dy, p.border); return v * n < 0 && Math.abs(v - n) > p.threshold / 10; }) ? 255 : 0; });
            }
            if (id === 'dog') {
                const g2 = blur(a, w, h, { ...p, sigma: p.sigma * 1.6, sigmaY: p.sigmaY * 1.6 });
                return Float64Array.from(g, (v, i) => Math.abs(v - g2[i]) * p.amount);
            }
            return Float64Array.from(a, (v, i) => id === 'high-boost' ? (1 + p.amount) * v - g[i] : v + p.amount * (v - g[i]));
        });
    else if (['sobel', 'scharr', 'prewitt', 'roberts', 'farid'].includes(id)) {
        const [gx, gy] = gradient(gray, w, h, id, p.border);
        out = [Float64Array.from(gx, (v, i) => p.direction === 'x' ? Math.abs(v) : p.direction === 'y' ? Math.abs(gy[i]) : Math.hypot(v, gy[i]))];
    }
    else if (id === 'canny')
        out = [canny(gray, w, h, p)];
    else if (id === 'bilateral')
        out = src.map(a => bilateral(a, w, h, p));
    else if (id === 'guided' || id === 'wiener')
        out = src.map(a => localRestore(a, w, h, p, id));
    else if (['erosion', 'dilation', 'opening', 'closing', 'morph-gradient', 'top-hat', 'black-hat'].includes(id))
        out = src.map(a => { const er = x => neighborhood(x, w, h, p, 'min'), di = x => neighborhood(x, w, h, p, 'max'); if (id === 'erosion')
            return er(a); if (id === 'dilation')
            return di(a); if (id === 'opening')
            return di(er(a)); if (id === 'closing')
            return er(di(a)); if (id === 'morph-gradient') {
            const d = di(a), e = er(a);
            return Float64Array.from(d, (v, i) => v - e[i]);
        } const b = id === 'top-hat' ? di(er(a)) : er(di(a)); return Float64Array.from(a, (v, i) => id === 'top-hat' ? v - b[i] : b[i] - v); });
    else if (id === 'gabor' || id === 'laws')
        out = [Float64Array.from(correlate(gray, w, h, kernel, p.border), v => Math.abs(v) * p.amount)];
    else if (id === 'entropy')
        out = [neighborhood(gray, w, h, p, id)];
    else if (id === 'haar' || id === 'wavelet-threshold')
        out = src.map(a => haar(a, w, h, p));
    else if (id === 'richardson-lucy')
        out = src.map(a => richardsonLucy(a, w, h, p));
    else if (['isotropic', 'anisotropic', 'perona-malik'].includes(id))
        out = src.map(a => diffuse(a, w, h, p, id));
    else if (id === 'frangi')
        out = [vessel(gray, w, h, p)];
    else if (id === 'hessian')
        out = [Float64Array.from(correlate(blur(gray, w, h, p), w, h, laplace, p.border), v => Math.abs(v))];
    else
        out = [threshold(gray, w, h, p, id)];
    return { ...fromPlanes(img, out), ...(spectra ? { spectra } : {}) };
}
export function statistics(img) {
    const a = luminance(img), hist = [0, 1, 2, 3].map(() => new Uint32Array(256));
    let min = 255, max = 0, sum = 0, sum2 = 0, edge = 0, impulse = 0;
    const residual = [];
    for (let i = 0; i < a.length; i++) {
        const v = a[i], x = i % img.width, y = Math.floor(i / img.width);
        min = Math.min(min, v);
        max = Math.max(max, v);
        sum += v;
        sum2 += v * v;
        hist[0][Math.round(clamp(v))]++;
        for (let c = 0; c < 3; c++)
            hist[c + 1][img.data[4 * i + c]]++;
        if (x > 0)
            edge += Math.abs(v - a[i - 1]);
        if (y > 0)
            edge += Math.abs(v - a[i - img.width]);
        if (x > 0 && y > 0 && x < img.width - 1 && y < img.height - 1) {
            const v9 = [];
            for (let yy = -1; yy <= 1; yy++)
                for (let xx = -1; xx <= 1; xx++)
                    v9.push(a[i + yy * img.width + xx]);
            v9.sort((a, b) => a - b);
            const d = Math.abs(v - v9[4]);
            residual.push(d);
            if ((v < 3 || v > 252) && d > 40)
                impulse++;
        }
    }
    residual.sort((a, b) => a - b);
    return { min, max, mean: sum / a.length, std: Math.sqrt(Math.max(0, sum2 / a.length - (sum / a.length) ** 2)), hist, edge: edge / Math.max(1, 2 * a.length - img.width - img.height), residual: residual[Math.floor(residual.length / 2)] || 0, impulse: 100 * impulse / Math.max(1, residual.length) };
}
export function compareImages(original, processed) {
    validateImage(original);
    validateImage(processed);
    if (original.width !== processed.width || original.height !== processed.height)
        throw new Error('Comparison images must have identical dimensions.');
    const n = original.width * original.height;
    let mae = 0, mse = 0, changed = 0;
    const difference = image(original.width, original.height), heatmap = image(original.width, original.height);
    for (let i = 0; i < n; i++) {
        let any = false, peak = 0;
        for (let c = 0; c < 3; c++) {
            const d = Math.abs(original.data[i * 4 + c] - processed.data[i * 4 + c]);
            difference.data[i * 4 + c] = d;
            mae += d;
            mse += d * d;
            peak = Math.max(peak, d);
            if (d > 0)
                any = true;
        }
        if (any)
            changed++;
        difference.data[i * 4 + 3] = 255;
        const t = clamp(peak * 4) / 255;
        heatmap.data.set([255 * Math.min(1, 2 * t), 255 * Math.max(0, 1 - Math.abs(2 * t - 1)), 255 * (1 - t), 255], i * 4);
    }
    mae /= 3 * n;
    mse /= 3 * n;
    const a = luminance(original), b = luminance(processed), w = original.width, h = original.height, k = Array(7).fill(1 / 7), avg = x => separable(x, w, h, k), ma = avg(a), mb = avg(b), aa = avg(Float64Array.from(a, v => v * v)), bb = avg(Float64Array.from(b, v => v * v)), ab = avg(Float64Array.from(a, (v, i) => v * b[i]));
    let ssim = 0;
    for (let i = 0; i < n; i++) {
        const va = Math.max(0, aa[i] - ma[i] ** 2), vb = Math.max(0, bb[i] - mb[i] ** 2), cov = ab[i] - ma[i] * mb[i];
        ssim += ((2 * ma[i] * mb[i] + 6.5025) * (2 * cov + 58.5225)) / ((ma[i] ** 2 + mb[i] ** 2 + 6.5025) * (va + vb + 58.5225));
    }
    return { mae, mse, rmse: Math.sqrt(mse), psnr: mse === 0 ? Infinity : 10 * Math.log10(255 ** 2 / mse), ssim: ssim / n, changed: 100 * changed / n, difference, heatmap };
}
export function recommend(stats) { const list = []; if (stats.impulse > .1)
    list.push({ id: 'median', reason: `${stats.impulse.toFixed(2)}% of interior pixels are extreme outliers relative to their neighborhoods. Median filtering is worth testing.`, evidence: 'Impulse heuristic' }); if (stats.residual > 3)
    list.push({ id: 'bilateral', reason: `Median absolute neighborhood residual is ${stats.residual.toFixed(1)} levels. Texture can also cause this; compare a gentle bilateral filter.`, evidence: 'Residual heuristic' }); if (stats.std < 32)
    list.push({ id: 'sauvola', reason: `Luminance standard deviation is ${stats.std.toFixed(1)}. For document binarization, compare a local threshold; low contrast is not necessarily a defect.`, evidence: 'Contrast heuristic' }); list.push({ id: 'gaussian', reason: 'A small Gaussian kernel is a useful smoothing baseline. Compare it against your own task and image details.', evidence: 'Baseline, not a diagnosis' }, { id: 'sobel', reason: 'Inspect intensity boundaries before deciding whether to smooth or sharpen.', evidence: 'Exploration' }); return list.slice(0, 3); }
export function createDemo(kind = 'landscape', width = 480, height = 320) { const out = image(width, height); let seed = 48391; const rand = () => { seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0; return seed / 4294967296; }; for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
        const xx = x / width, yy = y / height;
        let rgb = [205 - yy * 95, 212 - yy * 68, 235 - yy * 38];
        if (Math.hypot(xx - .72, yy - .27) < .115)
            rgb = [247, 179 + yy * 35, 106];
        if (yy > .67 - .15 * Math.sin(xx * 7))
            rgb = [116 + xx * 35, 116 + xx * 15, 169 + xx * 25];
        if (yy > .77 + .08 * Math.sin(xx * 9 + 1))
            rgb = [69 + xx * 22, 86 + xx * 20, 130 + xx * 25];
        if (yy > .86 - .05 * Math.sin(xx * 12))
            rgb = [41 + xx * 25, 62 + xx * 20, 99 + xx * 25];
        if (xx > .06 && xx < .25 && yy > .1 && yy < .3) {
            const stripe = Math.floor(xx * width / 4) % 2;
            rgb = stripe ? [247, 240, 229] : [72, 72, 104];
        }
        if (yy > .91 && xx > .08 && xx < .42)
            rgb = [255 * (xx - .08) / .34, 255 * (xx - .08) / .34, 255 * (xx - .08) / .34];
        if (kind === 'impulse' && rand() < .08) {
            const n = rand() < .5 ? 0 : 255;
            rgb = [n, n, n];
        }
        if (kind === 'noise') {
            const n = (rand() + rand() + rand() - 1.5) * 32;
            rgb = rgb.map(v => v + n);
        }
        out.data.set([...rgb.map(v => clamp(v)), 255], (y * width + x) * 4);
    } return out; }
export function runExperiment({ source, selected, params, pipeline = [], compare = [], spectrum = false }) {
    validateImage(source);
    if (pipeline.length > 8 || compare.length > 4)
        throw new Error('Use at most 8 pipeline stages and 4 comparison filters.');
    let current = source;
    const stages = [];
    const start = performance.now();
    for (const stage of pipeline)
        if (stage.enabled !== false) {
            const time = performance.now();
            current = applyFilter(current, stage.id, stage.params);
            stages.push({ id: stage.id, ms: performance.now() - time });
        }
    const processed = selected ? applyFilter(current, selected, params) : current;
    const ms = performance.now() - start, originalStats = statistics(source), processedStats = statistics(processed), metrics = compareImages(source, processed);
    const comparisons = compare.map(id => { const start = performance.now(), result = applyFilter(source, id, params), ms = performance.now() - start, comparison = compareImages(source, result), stats = statistics(result); const { difference, heatmap, ...numbers } = comparison; return { id, result, ms, metrics: numbers, edge: stats.edge, residual: stats.residual }; });
    const spectra = processed.spectra ?? (spectrum ? frequency(luminance(source), source.width, source.height, parameters(params), 'spectrum').spectra : undefined);
    return { processed, ms, stages, originalStats, processedStats, metrics, recommendations: recommend(originalStats), comparisons, spectra, spectrumKind: processed.spectra ? 'filter' : 'identity' };
}
