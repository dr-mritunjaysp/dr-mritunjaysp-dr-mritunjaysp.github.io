"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight, BookOpen, Code2, ExternalLink, Maximize2, Minus, Plus, StepForward } from 'lucide-react';
import { borderIndex, kernelFor, luminance, kernelSpectrum } from '../../public/filterverse/engine.mjs';
import { categories, filters, pythonCode, type Filter } from './catalog';
import 'katex/dist/katex.min.css';
export type Pixels = {
    width: number;
    height: number;
    data: Uint8ClampedArray;
};
export type Params = Record<string, number | string | boolean | number[]>;
export type ImageStats = {
    min: number;
    max: number;
    mean: number;
    std: number;
    hist: Uint32Array[];
    edge: number;
    residual: number;
    impulse: number;
};
export type Metrics = {
    mae: number;
    mse: number;
    rmse: number;
    psnr: number;
    ssim: number;
    changed: number;
};
export const number = (v: number, d = 2) => Number.isFinite(v) ? v.toFixed(d) : v === Infinity ? '∞' : '—';
export function CanvasImage({ pixels, label, style, className = '' }: {
    pixels: Pixels;
    label: string;
    style?: React.CSSProperties;
    className?: string;
}) {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => { const canvas = ref.current; if (!canvas)
        return; canvas.width = pixels.width; canvas.height = pixels.height; canvas.getContext('2d')?.putImageData(new ImageData(new Uint8ClampedArray(pixels.data), pixels.width, pixels.height), 0, 0); }, [pixels]);
    return <canvas ref={ref} width={pixels.width} height={pixels.height} aria-label={label} role="img" className={`fv-image ${className}`} style={style}/>;
}
export function Equation({ tex }: {
    tex: string;
}) {
    const [rendered, setRendered] = useState({ tex: '', html: '' });
    useEffect(() => { let active = true; import('katex').then(k => { if (active)
        setRendered({ tex, html: k.default.renderToString(tex, { throwOnError: false, displayMode: true, trust: false, strict: 'ignore' }) }); }).catch(() => { }); return () => { active = false; }; }, [tex]);
    return <div className="fv-equation">{rendered.tex === tex ? <span dangerouslySetInnerHTML={{ __html: rendered.html }}/> : <code>{tex}</code>}</div>;
}
export function Matrix({ values, editable = false, onChange }: {
    values: number[];
    editable?: boolean;
    onChange?: (i: number, n: number) => void;
}) {
    const n = Math.sqrt(values.length);
    return <div className={`fv-matrix ${editable ? 'editable' : ''}`} style={{ gridTemplateColumns: `repeat(${n},minmax(0,1fr))` }}>{values.map((v, i) => editable ? <input key={i} type="number" min={-100} max={100} step={.1} aria-label={`Kernel row ${Math.floor(i / n) + 1}, column ${i % n + 1}`} value={v} onChange={e => onChange?.(i, Number(e.target.value))}/> : <span key={i} title={String(v)}>{Number.isInteger(v) ? v : number(v, 3)}</span>)}</div>;
}
export function Histogram({ original, processed, channel = 0, overlay = true }: {
    original: ImageStats;
    processed: ImageStats;
    channel?: number;
    overlay?: boolean;
}) {
    const ref = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const ctx = ref.current?.getContext('2d');
        if (!ctx)
            return;
        const w = 640, h = 170;
        ctx.clearRect(0, 0, w, h);
        const a = original.hist[channel], b = processed.hist[channel], peak = Math.max(1, ...a, ...b);
        ctx.strokeStyle = '#a49ab430';
        ctx.lineWidth = 1;
        for (let y = 20; y < 145; y += 30) {
            ctx.beginPath();
            ctx.moveTo(20, y);
            ctx.lineTo(w - 10, y);
            ctx.stroke();
        }
        const draw = (values: Uint32Array, color: string, left: number, width: number) => { ctx.beginPath(); for (let i = 0; i < 256; i++) {
            const x = left + i / 255 * width, y = 145 - Math.log1p(values[i]) / Math.log1p(peak) * 120;
            if (i)
                ctx.lineTo(x, y);
            else
                ctx.moveTo(x, y);
        } ctx.strokeStyle = color; ctx.lineWidth = 2; ctx.stroke(); };
        draw(a, '#9c96ae', 20, overlay ? 610 : 285);
        draw(b, '#9370e0', overlay ? 20 : 335, overlay ? 610 : 295);
        ctx.fillStyle = '#8a8298';
        ctx.font = '10px system-ui';
        ctx.fillText('0', 20, 164);
        ctx.fillText('255', overlay ? 610 : 286, 164);
        if (!overlay) {
            ctx.fillText('0', 335, 164);
            ctx.fillText('255', 610, 164);
        }
        ctx.fillText('log pixel count', 20, 11);
    }, [original, processed, channel, overlay]);
    return <canvas ref={ref} width="640" height="170" className="fv-histogram" role="img" aria-label={`${['Luminance', 'Red', 'Green', 'Blue'][channel]} histogram: original gray, filtered purple; logarithmic counts`}/>;
}
export function MetricGrid({ metrics }: {
    metrics: Metrics;
}) {
    return <div className="fv-metrics">{[['Mean abs. change', metrics.mae, 'RGB average absolute difference, 0–255.'], ['MSE', metrics.mse, 'Mean squared RGB difference.'], ['RMSE', metrics.rmse, 'Square root of MSE, in intensity levels.'], ['PSNR · dB', metrics.psnr, '10 log10(255²/MSE). Infinity for identical RGB pixels.'], ['SSIM', metrics.ssim, 'Mean local SSIM: 7×7 uniform windows on luminance, population covariance, reflected borders.'], ['Changed · %', metrics.changed, 'Pixels with any nonzero RGB difference.']].map(([label, value, hint]) => <div key={String(label)} title={String(hint)}><span>{label}</span><strong>{number(Number(value), label === 'SSIM' ? 4 : 2)}</strong></div>)}</div>;
}
export function Knowledge({ filter, level, params, initialTab = 'Theory' }: {
    filter: Filter;
    level: string;
    params: Params;
    initialTab?: string;
}) {
    const [tab, setTab] = useState(initialTab), [language, setLanguage] = useState('OpenCV'), [copied, setCopied] = useState(false);
    const kernel = useMemo(() => kernelFor(filter.id, params), [filter.id, params]);
    const code = pythonCode(filter, params, language);
    return <section className="fv-card fv-knowledge"><div className="fv-card-heading"><div><span className="fv-overline">THE KNOWLEDGE STUDIO</span><h2>{filter.name}</h2></div><span className={`fv-chip ${filter.live ? '' : 'reference'}`}>{filter.live ? 'LIVE METHOD' : 'REFERENCE ONLY'}</span></div><div className="fv-tabs" role="group" aria-label="Filter knowledge topics">{['Theory', 'Mathematics', 'Code', 'Applications'].map(t => <button key={t} aria-pressed={tab === t} className={tab === t ? 'active' : ''} onClick={() => setTab(t)}>{t === 'Code' ? <Code2 size={13}/> : t === 'Theory' ? <BookOpen size={13}/> : null}{t}</button>)}</div>
 {tab === 'Theory' && <><p className="fv-lead">{filter.purpose}</p><div className="fv-taxonomy">{[filter.name, filter.category, 'Input neighborhood / image', 'Transformed response'].map((s, i) => <span key={s}>{i > 0 && <ArrowRight size={12}/>} {s}</span>)}</div><h3>How to think about it</h3><p>{filter.note || 'Choose a small neighborhood first. Compare the result with the original and inspect what happened at boundaries.'}</p><div className="fv-steps">{['Input image', 'Choose neighborhood', 'Compute operation', 'Map to 8-bit', 'Inspect result'].map((s, i) => <span key={s}><b>{i + 1}</b>{s}</span>)}</div><h3>History & origins</h3><p>{filter.history}</p><a className="fv-reference" href={filter.source} target="_blank" rel="noopener noreferrer">Primary documentation / research paper <ExternalLink size={12}/></a>{level !== 'Beginner' && <><h3>Implementation notes</h3><p>{filter.complexity} N denotes the number of working-image pixels.</p><p>Spatial border mode: <strong>{String(params.border)}</strong>. “Reflect” means reflection without repeating the edge pixel. Filter output is clipped to 0–255 and rounded for display; alpha is kept unchanged.</p></>}</>}
 {tab === 'Mathematics' && <><Equation tex={filter.formula}/><p>{filter.note || filter.purpose}</p>{kernel && <><h3>Current kernel · {Math.sqrt(kernel.length)} × {Math.sqrt(kernel.length)}</h3><Matrix values={kernel}/><p>Sum: {number(kernel.reduce((s: number, v: number) => s + v, 0), 5)}. Derivative examples show the X kernel or the Laplacian stencil; the live response follows the method described above.</p></>}<h3>Parameter notation</h3><p>f is the input, g the output, Ω a neighborhood, k its width, σ a Gaussian scale, K a kernel, and ⋆ denotes correlation here. D is radial spatial frequency in cycles/pixel. Each control describes its units.</p>{level === 'Advanced' && <><h3>Boundary and numerical behavior</h3><p>{filter.complexity} Work takes place on an 8-bit working copy. Intermediate operations use floating-point arrays; each completed stage is clipped and quantized. Sequential pipeline results therefore need not equal a single combined floating-point operation.</p><p>Frequency transforms operate on luminance with power-of-two padding. Spectra use a centered origin and logarithmic magnitude; masks are linearly scaled. They are visualizations, not raw intensity images.</p></>}</>}
 {tab === 'Code' && <><div className="fv-inline"><label>Reference library <select value={language} onChange={e => setLanguage(e.target.value)}>{['OpenCV', 'SciPy', 'NumPy'].map(v => <option key={v}>{v}</option>)}</select></label><button className="fv-button" onClick={async () => { try {
        await navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    }
    catch {
        setCopied(false);
    } }}>{copied ? 'Copied' : 'Copy code'}</button></div><pre className="fv-code"><code>{code}</code></pre><p>These examples follow the active parameters where supported. A missing library equivalent is explicitly marked, rather than replaced by another algorithm.</p></>}
 {tab === 'Applications' && <><h3>Applications & best use cases</h3><p>{filter.applications}</p><h3>Advantages</h3><p>{filter.advantages}</p><h3>Limitations & when to avoid</h3><p>{filter.limitations}</p><a className="fv-reference" href={filter.source} target="_blank" rel="noopener noreferrer">Read the reference <ExternalLink size={12}/></a></>}
 </section>;
}
export function KernelLesson({ source, filter, params }: {
    source: Pixels;
    filter: Filter;
    params: Params;
}) {
    const [position, setPosition] = useState(0), [animate, setAnimate] = useState(false);
    useEffect(() => { if (!animate)
        return; const id = setInterval(() => setPosition(v => (v + 1) % (source.width * source.height)), 650); return () => clearInterval(id); }, [animate, source.width, source.height]);
    const kernel = useMemo(() => kernelFor(filter.id, params), [filter.id, params]), gray = useMemo(() => luminance(source), [source]), n = kernel ? Math.sqrt(kernel.length) : 3, r = n >> 1, x = position % source.width, y = Math.floor(position / source.width) % source.height;
    const patch = Array.from({ length: n * n }, (_, i) => { const xx = borderIndex(x + i % n - r, source.width, String(params.border)), yy = borderIndex(y + Math.floor(i / n) - r, source.height, String(params.border)); return xx < 0 || yy < 0 ? 0 : gray[yy * source.width + xx]; });
    const products = kernel ? patch.map((v, i) => v * kernel[i]) : [], sum = products.reduce((s, v) => s + v, 0);
    const supportsOrder = ['median', 'min', 'max', 'midpoint', 'percentile'].includes(filter.id), sorted = [...patch].sort((a, b) => a - b), orderValue = filter.id === 'min' ? sorted[0] : filter.id === 'max' ? sorted.at(-1) : filter.id === 'midpoint' ? (sorted[0] + sorted.at(-1)!) / 2 : filter.id === 'percentile' ? sorted[Math.round((sorted.length - 1) * Number(params.percentile) / 100)] : sorted[sorted.length >> 1];
    return <section className="fv-card"><div className="fv-card-heading"><div><span className="fv-overline">ONE PIXEL AT A TIME</span><h2>The numerical playground</h2></div><span className="fv-chip">x {x} · y {y}</span></div><p className="fv-help">A luminance neighborhood from the original working image. This teaching example is independent of the pipeline. {supportsOrder ? 'The example uses a 3×3 neighborhood.' : ''}</p><div className="fv-numerical"><div><h3>{n}×{n} neighborhood</h3><Matrix values={patch.map(v => Math.round(v))}/></div>{kernel && <><b className="fv-operation">×</b><div><h3>Actual coefficients</h3><Matrix values={kernel}/></div><b className="fv-operation">=</b><div className="fv-pixel-result"><span>Raw weighted sum</span><strong>{number(sum)}</strong><small>Before offset, absolute value, or clipping</small></div></>}{supportsOrder && !kernel && <div className="fv-pixel-result"><span>{filter.name} of this patch</span><strong>{number(orderValue ?? 0)}</strong></div>}</div>{kernel && <details className="fv-calculation"><summary>Show complete calculation</summary><div className="fv-code">{products.map((v, i) => <div key={i}>{number(patch[i], 3)} × {number(kernel[i], 5)} = {number(v, 5)}</div>)}</div><p>Sum = {number(sum, 5)}. The chosen live filter then applies its documented display mapping. No intermediate rounding is used in the sum.</p></details>}{!kernel && !supportsOrder && <p className="fv-help">This method needs more than a single fixed-kernel multiplication. Use the Mathematics panel for its full-image or iterative equation; the neighborhood above illustrates the input only.</p>}<div className="fv-inline"><button className="fv-button" onClick={() => setPosition(v => (v + 1) % (source.width * source.height))}><StepForward size={14}/> Next pixel</button><button className="fv-button" aria-pressed={animate} onClick={() => setAnimate(v => !v)}>{animate ? 'Pause movement' : 'Animate neighborhood'}</button><button className="fv-button" onClick={() => setPosition(Math.floor(source.height / 2) * source.width + Math.floor(source.width / 2))}>Center pixel</button></div></section>;
}
export function MindMap({ onSelect }: {
    onSelect: (id: string) => void;
}) {
    const [zoom, setZoom] = useState(1), [expanded, setExpanded] = useState(false), ref = useRef<HTMLDivElement>(null), drag = useRef<{
        x: number;
        y: number;
        left: number;
        top: number;
    } | null>(null);
    const groups = { 'Spatial domain': categories.filter(c => ['Smoothing', 'Order statistics', 'Sharpening', 'Edges', 'Edge preserving', 'Morphology', 'Thresholding'].includes(c)), 'Frequency domain': ['Frequency'], 'Advanced filtering': ['Texture', 'Wavelets', 'Restoration', 'Diffusion', 'Ridges'], 'Modern AI': ['Modern AI'] };
    useEffect(() => { if (!expanded)
        return; const close = (e: KeyboardEvent) => { if (e.key === 'Escape')
        setExpanded(false); }; window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close); }, [expanded]);
    return <section className={`fv-card fv-mindmap ${expanded ? 'fv-expanded' : ''}`}><div className="fv-card-heading"><div><span className="fv-overline">FOLLOW YOUR CURIOSITY</span><h2>Image processing filter mind map</h2></div><div className="fv-inline"><button className="fv-icon" aria-label="Zoom out mind map" onClick={() => setZoom(v => Math.max(.6, v - .1))}><Minus size={16}/></button><span>{Math.round(zoom * 100)}%</span><button className="fv-icon" aria-label="Zoom in mind map" onClick={() => setZoom(v => Math.min(1.5, v + .1))}><Plus size={16}/></button><button className="fv-icon" aria-label={expanded ? 'Exit full-screen mind map' : 'Full-screen mind map'} onClick={() => setExpanded(v => !v)}><Maximize2 size={16}/></button></div></div><p className="fv-help">Expand a branch, then select a filter to open its lesson. Drag empty space to pan. Reference entries do not run a substitute algorithm.</p><div className="fv-map-scroll" ref={ref} onPointerDown={e => { if ((e.target as HTMLElement).closest('button,summary'))
        return; const box = ref.current!; drag.current = { x: e.clientX, y: e.clientY, left: box.scrollLeft, top: box.scrollTop }; box.setPointerCapture(e.pointerId); }} onPointerMove={e => { if (drag.current && ref.current) {
        ref.current.scrollLeft = drag.current.left - e.clientX + drag.current.x;
        ref.current.scrollTop = drag.current.top - e.clientY + drag.current.y;
    } }} onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}><div className="fv-map-tree" style={{ zoom }}><div className="fv-map-root"><FlaskLabel /></div><div className="fv-map-domains">{Object.entries(groups).map(([group, cats]) => <details key={group} open><summary>{group}</summary>{cats.map(category => <details className="fv-map-branch" key={category} open={category === 'Smoothing'}><summary>{category}</summary><div>{filters.filter(f => f.category === category).map(f => <button key={f.id} onClick={() => onSelect(f.id)}>{f.name}<span>{f.live ? 'Live' : 'Read'}</span></button>)}</div></details>)}</details>)}</div></div></div></section>;
}
function FlaskLabel() { return <><span>IMAGE PROCESSING</span><strong>One image. Many ways to see.</strong></>; }
export function KernelFrequency({ kernel }: {
    kernel: number[];
}) { const pixels = useMemo(() => kernelSpectrum(kernel), [kernel]); return <div className="fv-kernel-spectrum"><CanvasImage pixels={pixels} label="Custom kernel frequency response magnitude"/><p>Kernel frequency response: 64×64 samples, centered DC, linear magnitude normalized to the largest response. Bright values represent stronger transmission. The phase is not shown.</p></div>; }
export function FilterExplorer({ selected, onSelect }: {
    selected: string;
    onSelect: (id: string) => void;
}) {
    const [query, setQuery] = useState(''), [category, setCategory] = useState('All'), [onlyLive, setOnlyLive] = useState(false);
    const found = filters.filter(f => (category === 'All' || f.category === category) && (!onlyLive || f.live) && `${f.name} ${f.category} ${f.purpose} ${f.applications} ${f.note}`.toLowerCase().includes(query.toLowerCase()));
    return <section className="fv-card"><div className="fv-card-heading"><div><span className="fv-overline">THE FILTER LIBRARY</span><h2>Find a different perspective</h2></div><span className="fv-chip">{filters.filter(f => f.live).length} LIVE</span></div><div className="fv-search-row"><input type="search" placeholder="Search filter, purpose, noise, application…" aria-label="Search filter library" value={query} onChange={e => setQuery(e.target.value)}/><select aria-label="Filter category" value={category} onChange={e => setCategory(e.target.value)}><option>All</option>{categories.map(c => <option key={c}>{c}</option>)}</select></div><label className="fv-check"><input type="checkbox" checked={onlyLive} onChange={e => setOnlyLive(e.target.checked)}/> Show runnable filters only <span>{found.length} results</span></label><div className="fv-filter-grid">{found.map(f => <button key={f.id} className={selected === f.id ? 'selected' : ''} onClick={() => onSelect(f.id)}><div><small>{f.category}</small><span className={f.live ? 'fv-live-dot' : 'fv-reference-dot'}>{f.live ? 'Live' : 'Reference'}</span></div><h3>{f.name}</h3><p>{f.purpose}</p><span className="fv-explore-link">{f.live ? 'Open live experiment' : 'Read the method'} <ArrowRight size={13}/></span></button>)}</div>{!found.length && <p className="fv-help">No filters match. Try “noise”, “edge”, “document”, or another category.</p>}</section>;
}
