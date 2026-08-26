"use client";
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUp, ArrowRight, Check, GitBranch, Maximize2, Plus, RotateCcw, Sparkles, Trash2, X } from 'lucide-react';
import { moveStage } from '../../public/filterverse/client.mjs';
import { byId, controlInfo, filters } from './catalog';
import { CanvasImage, Histogram, MetricGrid, number, type Pixels, type Params, type ImageStats, type Metrics } from './views';
export type Stage = {
    id: string;
    key: string;
    params: Params;
    enabled: boolean;
};
export type Config = {
    filter: string;
    params: Params;
    pipeline: Stage[];
    preview: boolean;
};
export type Result = {
    processed: Pixels;
    ms: number;
    stages: {
        id: string;
        ms: number;
    }[];
    originalStats: ImageStats;
    processedStats: ImageStats;
    metrics: Metrics & {
        difference: Pixels;
        heatmap: Pixels;
    };
    recommendations: {
        id: string;
        reason: string;
        evidence: string;
    }[];
    comparisons: {
        id: string;
        result: Pixels;
        ms: number;
        metrics: Metrics;
        edge: number;
        residual: number;
    }[];
    spectra?: Pixels[];
    spectrumKind?: string;
};
export type Meta = {
    name: string;
    width: number;
    height: number;
    bytes: number;
    format: string;
    note: string;
};
export function Comparison({ source, result, busy, title }: {
    source: Pixels;
    result: Result | null;
    busy: boolean;
    title: string;
}) {
    const [mode, setMode] = useState('side'), [heat, setHeat] = useState(false), [reveal, setReveal] = useState(50), [zoom, setZoom] = useState(1), [pan, setPan] = useState({ x: 0, y: 0 }), [expanded, setExpanded] = useState(false);
    const ref = useRef<HTMLDivElement>(null), drag = useRef<{
        x: number;
        y: number;
        pan: {
            x: number;
            y: number;
        };
        w: number;
        h: number;
    } | null>(null);
    useEffect(() => { const changed = () => setExpanded(Boolean(document.fullscreenElement)); const escape = (e: KeyboardEvent) => { if (e.key === 'Escape')
        setExpanded(false); }; document.addEventListener('fullscreenchange', changed); window.addEventListener('keydown', escape); return () => { document.removeEventListener('fullscreenchange', changed); window.removeEventListener('keydown', escape); }; }, []);
    async function maximize() { if (document.fullscreenElement) {
        await document.exitFullscreen();
        setExpanded(false);
        return;
    } if (expanded) {
        setExpanded(false);
        return;
    } try {
        if (ref.current?.requestFullscreen)
            await ref.current.requestFullscreen();
        else
            setExpanded(true);
    }
    catch {
        setExpanded(true);
    } }
    const transform = { transform: `translate(${pan.x}%,${pan.y}%) scale(${zoom})` };
    const pointer = { onPointerDown: (e: React.PointerEvent<HTMLDivElement>) => { if (zoom <= 1)
            return; const r = e.currentTarget.getBoundingClientRect(); drag.current = { x: e.clientX, y: e.clientY, pan, w: r.width, h: r.height }; e.currentTarget.setPointerCapture(e.pointerId); }, onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => { const d = drag.current; if (d)
            setPan({ x: Math.max(-100, Math.min(100, d.pan.x + 100 * (e.clientX - d.x) / d.w)), y: Math.max(-100, Math.min(100, d.pan.y + 100 * (e.clientY - d.y) / d.h)) }); }, onPointerUp: () => { drag.current = null; }, onPointerCancel: () => { drag.current = null; }, onDoubleClick: () => { setZoom(1); setPan({ x: 0, y: 0 }); } };
    const panel = (name: string, pixels: Pixels | null, color = '') => <figure><figcaption><span className={`fv-dot ${color}`}/>{name}</figcaption><div className="fv-viewport" {...pointer} style={{ touchAction: zoom > 1 ? 'none' : 'pan-y' }}>{pixels ? <CanvasImage pixels={pixels} label={name} style={transform}/> : <div className="fv-processing-state">{busy ? 'Computing the first result…' : 'Result unavailable'}</div>}</div></figure>;
    return <div ref={ref} className={`fv-card fv-comparison ${expanded ? 'fv-expanded' : ''}`}><div className="fv-card-heading"><div><span className="fv-overline">LIVE IMPACT</span><h2>Same image. A new perspective.</h2></div><span className={`fv-chip ${busy ? 'processing' : ''}`} role="status">{busy ? 'PROCESSING…' : result ? `${number(result.ms, 0)} ms` : 'READY'}</span></div><div className="fv-comparison-toolbar"><div className="fv-tabs" role="group" aria-label="Image comparison mode">{[['side', 'Side by side'], ['split', 'Before / after'], ['overlay', 'Overlay'], ['difference', 'Difference']].map(([v, label]) => <button key={v} className={mode === v ? 'active' : ''} aria-pressed={mode === v} onClick={() => setMode(v)}>{label}</button>)}</div><button className="fv-icon" onClick={() => void maximize()} aria-label={expanded ? 'Exit full-screen comparison' : 'Full-screen comparison'}>{expanded ? <X size={16}/> : <Maximize2 size={16}/>}</button></div>
 {['side', 'difference'].includes(mode) ? <div className={`fv-images ${mode === 'difference' ? 'three' : ''}`}>{panel('Original', source, 'gray')}{panel(busy ? 'Previous result · updating' : title, result?.processed ?? null)}{mode === 'difference' && panel(heat ? 'Difference ×4 heatmap' : 'Absolute difference', result ? (heat ? result.metrics.heatmap : result.metrics.difference) : null, 'amber')}</div> : <div className="fv-split-viewport" {...pointer} style={{ aspectRatio: `${source.width}/${source.height}`, touchAction: zoom > 1 ? 'none' : 'pan-y' }}><CanvasImage pixels={source} label="Original comparison layer" style={transform}/>{result && <div className="fv-filtered-layer" style={mode === 'split' ? { clipPath: `inset(0 ${100 - reveal}% 0 0)` } : { opacity: reveal / 100 }}><CanvasImage pixels={result.processed} label="Filtered comparison layer" style={transform}/></div>}{mode === 'split' && <span className="fv-wipe-line" style={{ left: `${reveal}%` }}/>}<span className="fv-image-label left">Filtered</span><span className="fv-image-label right">Original</span></div>}
 {['split', 'overlay'].includes(mode) && <label className="fv-wide-range">{mode === 'split' ? 'Before/after position' : 'Filtered layer opacity'}<input aria-label="Comparison reveal" type="range" min={0} max={100} value={reveal} onChange={e => setReveal(Number(e.target.value))}/><output>{reveal}%</output></label>}
 <div className="fv-image-tools"><label>Zoom <input aria-label="Image zoom" type="range" min={1} max={4} step={.25} value={zoom} onChange={e => { setZoom(Number(e.target.value)); if (Number(e.target.value) === 1)
        setPan({ x: 0, y: 0 }); }}/><output>{zoom}×</output></label><span>Drag to pan when zoomed · double-click to reset</span>{mode === 'difference' && <label className="fv-check"><input type="checkbox" checked={heat} onChange={e => setHeat(e.target.checked)}/> Heatmap ×4</label>}</div>
 {result && <><MetricGrid metrics={result.metrics}/><p className="fv-metric-note">Change and similarity to the input do not prove the filtered image is better. SSIM uses local 7×7 luminance windows. {busy ? 'Metrics describe the previous completed result.' : ''}</p></>}</div>;
}
export function Histograms({ result }: {
    result: Result;
}) {
    const [channel, setChannel] = useState(0), [overlay, setOverlay] = useState(true);
    return <section className="fv-card"><div className="fv-card-heading"><div><span className="fv-overline">LOOK BENEATH THE SURFACE</span><h2>Intensity distribution</h2></div><select aria-label="Histogram channel" value={channel} onChange={e => setChannel(Number(e.target.value))}>{['Luminance', 'Red', 'Green', 'Blue'].map((s, i) => <option key={s} value={i}>{s}</option>)}</select></div><div className="fv-hist-legend"><span><i className="fv-dot gray"/> Original</span><span><i className="fv-dot"/> Filtered</span><label className="fv-check"><input type="checkbox" checked={overlay} onChange={e => setOverlay(e.target.checked)}/> Overlay</label></div><Histogram original={result.originalStats} processed={result.processedStats} channel={channel} overlay={overlay}/><p className="fv-help">Luminance mean: {number(result.originalStats.mean)} → {number(result.processedStats.mean)}. Standard deviation: {number(result.originalStats.std)} → {number(result.processedStats.std)}. Counts use a logarithmic axis.</p></section>;
}
export function Recommendations({ result, onSelect }: {
    result: Result;
    onSelect: (id: string) => void;
}) { return <section className="fv-card fv-recommend"><div className="fv-card-heading"><div><span className="fv-overline">NOT SURE WHERE TO START?</span><h2><Sparkles size={17}/> Which filter should I use?</h2></div><span className="fv-chip reference">HEURISTICS</span></div><p className="fv-help">Suggestions use measured statistics. Texture and edges can resemble noise; this is not automatic noise diagnosis.</p>{result.recommendations.map((r, i) => <div key={r.id} className="fv-suggestion"><b>{i + 1}</b><div><strong>{byId[r.id].name}</strong><small>{r.evidence}</small><p>{r.reason}</p></div><button className="fv-icon" aria-label={`Apply recommended ${byId[r.id].name}`} onClick={() => onSelect(r.id)}><ArrowRight size={16}/></button></div>)}</section>; }
export function Pipeline({ config, setConfig, addStage, history, restore }: {
    config: Config;
    setConfig: React.Dispatch<React.SetStateAction<Config>>;
    addStage: () => void;
    history: {
        entries: Config[];
        index: number;
    };
    restore: (n: number) => void;
}) {
    return <><section className="fv-card"><div className="fv-card-heading"><div><span className="fv-overline">BETTER TOGETHER</span><h2>Build a processing pipeline</h2></div><span className="fv-chip">{config.pipeline.length} / 8 STAGES</span></div><p className="fv-help">Enabled stages run in sequence. The current filter is a preview until added. Each completed stage is quantized to 8-bit, and order matters.</p><div className="fv-pipeline-source">Original image <ArrowDown size={14}/></div>{config.pipeline.map((stage, index) => <div className="fv-pipeline-stage" key={stage.key}><label className="fv-check"><input aria-label={`Enable stage ${index + 1}: ${byId[stage.id].name}`} type="checkbox" checked={stage.enabled} onChange={e => setConfig(c => ({ ...c, pipeline: c.pipeline.map(s => s.key === stage.key ? { ...s, enabled: e.target.checked } : s) }))}/><span>{index + 1}</span></label><div><strong>{byId[stage.id].name}</strong><small>{byId[stage.id].controls.map(k => `${controlInfo[k]?.label ?? k}: ${String(stage.params[k])}`).join(' · ') || 'Automatic / fixed stencil'}</small></div><button className="fv-icon" disabled={index === 0} aria-label={`Move stage ${index + 1} up`} onClick={() => setConfig(c => ({ ...c, pipeline: moveStage(c.pipeline, index, -1) }))}><ArrowUp size={13}/></button><button className="fv-icon" disabled={index === config.pipeline.length - 1} aria-label={`Move stage ${index + 1} down`} onClick={() => setConfig(c => ({ ...c, pipeline: moveStage(c.pipeline, index, 1) }))}><ArrowDown size={13}/></button><button className="fv-icon" aria-label={`Remove stage ${index + 1}`} onClick={() => setConfig(c => ({ ...c, pipeline: c.pipeline.filter(s => s.key !== stage.key) }))}><Trash2 size={13}/></button></div>)}{!config.pipeline.length && <div className="fv-pipeline-empty"><GitBranch size={24}/><p>No committed stages. Choose a filter, adjust it, then add it.</p></div>}{config.preview && byId[config.filter].live && <div className="fv-pipeline-preview">Preview next: <strong>{byId[config.filter].name}</strong><button className="fv-button primary" disabled={config.pipeline.length >= 8} onClick={addStage}><Plus size={13}/> Add stage</button></div>}<button className="fv-button" disabled={!config.pipeline.length} onClick={() => setConfig(c => ({ ...c, pipeline: [], preview: false }))}><RotateCcw size={13}/> Reset pipeline</button></section><section className="fv-card"><h2>Session history</h2><p className="fv-help">Up to 24 configurations for this image. Loading a different image clears the history.</p><div className="fv-history">{history.entries.map((entry, i) => <button key={i} className={history.index === i ? 'active' : ''} onClick={() => restore(i)}><span>{i + 1}</span><strong>{byId[entry.filter].name}</strong><small>{entry.pipeline.length} stages · kernel {String(entry.params.size)} · σ {String(entry.params.sigma)}</small>{history.index === i && <Check size={14}/>}</button>)}</div></section></>;
}
export function CompareFilters({ source, result, busy, ids, setIds }: {
    source: Pixels;
    result: Result | null;
    busy: boolean;
    ids: string[];
    setIds: React.Dispatch<React.SetStateAction<string[]>>;
}) { return <section className="fv-card"><div className="fv-card-heading"><div><span className="fv-overline">ONE INPUT, SEVERAL APPROACHES</span><h2>Compare filters</h2></div><span className="fv-chip">UP TO FOUR</span></div><p className="fv-help">Filters run independently on the original with the current parameters where relevant. The pipeline is not used here.</p><div className="fv-compare-picker">{ids.map(id => <button key={id} className="fv-button" onClick={() => setIds(a => a.filter(x => x !== id))}>{byId[id].name}<X size={12}/></button>)}<select aria-label="Add comparison filter" disabled={ids.length >= 4} value="" onChange={e => { if (e.target.value)
    setIds(a => [...a, e.target.value]); }}><option value="">Add a filter…</option>{filters.filter(f => f.live && !ids.includes(f.id)).map(f => <option key={f.id} value={f.id}>{f.name}</option>)}</select></div><div className="fv-comparison-grid"><article><h3>Original</h3><CanvasImage pixels={source} label="Comparison baseline"/><p>{source.width} × {source.height} working pixels</p></article>{result?.comparisons.map(c => <article key={c.id}><h3>{byId[c.id].name}<small>{number(c.ms, 0)} ms</small></h3><CanvasImage pixels={c.result} label={`${byId[c.id].name} comparison`}/><dl>{[['MSE', number(c.metrics.mse)], ['PSNR', `${number(c.metrics.psnr)} dB`], ['SSIM', number(c.metrics.ssim, 4)], ['Edge-strength ratio', result.originalStats.edge ? number(c.edge / result.originalStats.edge) : '—'], ['Local residual', number(c.residual)]].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl></article>)}</div><p className="fv-metric-note">Edge-strength ratio measures adjacent luminance differences, not proven edge preservation. Local residual is median deviation from a 3×3 median; a smaller value can also mean lost texture. {busy ? 'Updating…' : ''}</p></section>; }
export function Analysis({ source, result, meta }: {
    source: Pixels;
    result: Result;
    meta: Meta;
    frequencyActive: boolean;
}) { return <><section className="fv-card"><span className="fv-overline">KNOW YOUR IMAGE</span><h2>Image properties & measurements</h2><dl className="fv-properties">{[['File', meta.name], ['Format', meta.format], ['File size', meta.bytes ? `${number(meta.bytes / 1024, 1)} KB` : 'Generated in browser'], ['Decoded dimensions', `${meta.width} × ${meta.height}`], ['Working resolution', `${source.width} × ${source.height} (${number(source.width * source.height / 1e6, 3)} MP)`], ['Working channels / color', '3 RGB + opaque alpha · 8-bit sRGB'], ['Min / max luminance', `${number(result.originalStats.min)} / ${number(result.originalStats.max)}`], ['Mean / standard deviation', `${number(result.originalStats.mean)} / ${number(result.originalStats.std)}`]].map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl><p className="fv-help">{meta.note} Statistics describe the working copy, not the original encoded color space or full-resolution file.</p><MetricGrid metrics={result.metrics}/></section><Histograms result={result}/>{result.spectra && <section className="fv-card"><span className="fv-overline">A DIFFERENT DOMAIN</span><h2>Fourier spectrum</h2><p className="fv-help">Centered log-magnitude luminance spectra; linearly scaled mask. {result.spectrumKind === 'filter' ? 'The mask represents the active frequency filter.' : 'Identity mask on the original. Select a Frequency filter to alter it.'}</p><div className="fv-spectrum-grid">{result.spectra.map((s, i) => <figure key={i}><CanvasImage pixels={s} label={['Original Fourier spectrum', 'Transfer mask', 'Masked Fourier spectrum'][i]}/><figcaption>{['Original FFT', 'Transfer mask', 'Filtered FFT'][i]}</figcaption></figure>)}</div></section>}</>; }
