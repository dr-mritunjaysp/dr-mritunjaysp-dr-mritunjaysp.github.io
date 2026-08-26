"use client";
import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BarChart3, BookOpen, Download, FlaskConical, GitBranch, Grid2X2, Home, ImagePlus, Layers, Moon, Plus, RotateCcw, ShieldCheck, SlidersHorizontal, Sparkles, Sun, Undo2, Redo2, Upload, X } from 'lucide-react';
import { DEFAULTS, createDemo, kernelFor } from '../../public/filterverse/engine.mjs';
import { addHistory, createProcessor, workingSize, outputLabel } from '../../public/filterverse/client.mjs';
import { byId, controlInfo, filters } from './catalog';
import { Equation, FilterExplorer, KernelLesson, KernelFrequency, Knowledge, Matrix, MindMap, number, type Pixels, type Params } from './views';
import { Analysis, Comparison, CompareFilters, Histograms, Pipeline, Recommendations, type Config, type Meta, type Result } from './workspace';
import './filterverse.css';
const initial = (): Config => ({ filter: 'gaussian', params: { ...DEFAULTS, direction: 'magnitude', kernel: [0, -1, 0, -1, 5, -1, 0, -1, 0] }, pipeline: [], preview: true });
const menu = [['home', 'Overview', Home], ['upload', 'Upload image', Upload], ['explore', 'Filter explorer', Layers], ['lab', 'Live filter lab', SlidersHorizontal], ['compare', 'Compare filters', Grid2X2], ['map', 'Filter mind map', GitBranch], ['math', 'Mathematics', FlaskConical], ['numerical', 'Numerical examples', BookOpen], ['custom', 'Custom kernel', Plus], ['pipeline', 'Filter pipeline', GitBranch], ['analysis', 'Image analysis', BarChart3], ['learn', 'Learning mode', BookOpen]] as const;
export function FilterVersePage() {
    const [view, setView] = useState('lab'), [theme, setTheme] = useState('light'), [level, setLevel] = useState('Beginner');
    const [source, setSource] = useState<Pixels>(() => createDemo()), [config, setConfig] = useState<Config>(initial), [result, setResult] = useState<Result | null>(null), [busy, setBusy] = useState(true), [error, setError] = useState(''), [notice, setNotice] = useState('');
    const [meta, setMeta] = useState<Meta>({ name: 'Landscape study · synthetic sample', width: 480, height: 320, bytes: 0, format: 'Generated RGB chart', note: 'A deterministic test chart with gradients, boundaries, stripes, and fine structure.' });
    const [history, setHistory] = useState<{
        entries: Config[];
        index: number;
    }>(() => ({ entries: [initial()], index: 0 })), historySkip = useRef(false);
    const processor = useRef<ReturnType<typeof createProcessor> | null>(null), uploadInput = useRef<HTMLInputElement>(null), decoder = useRef<Worker | null>(null), uploadVersion = useRef(0);
    const [draggingFile, setDraggingFile] = useState(false), [compareIds, setCompareIds] = useState(['mean', 'gaussian', 'median', 'bilateral']);
    const filter = byId[config.filter], liveCount = filters.filter(f => f.live).length;
    const kernel = useMemo(() => kernelFor(config.filter, config.params), [config.filter, config.params]);
    useEffect(() => { const frame = requestAnimationFrame(() => { try {
        setTheme(localStorage.getItem('filterverse-theme') || document.documentElement.dataset.theme || 'light');
    }
    catch { } }); return () => cancelAnimationFrame(frame); }, []);
    useEffect(() => { const requests = uploadVersion; processor.current = createProcessor({ onResult: (r: Result) => { setResult(r); setError(''); }, onError: (message: string) => { setError(message); setResult(null); }, onBusy: (value: boolean) => { setBusy(value); if (value)
            setError(''); } }); return () => { processor.current?.dispose(); decoder.current?.terminate(); requests.current++; }; }, []);
    useEffect(() => { processor.current?.schedule({ source, selected: config.preview && filter.live ? config.filter : null, params: config.params, pipeline: config.pipeline, compare: view === 'compare' ? compareIds : [], spectrum: view === 'analysis' }); }, [source, config, filter.live, view, compareIds]);
    useEffect(() => { if (historySkip.current) {
        historySkip.current = false;
        return;
    } const id = setTimeout(() => setHistory(h => addHistory(h, config)), 400); return () => clearTimeout(id); }, [config]);
    function selectFilter(id: string, nextView?: string) { setConfig(c => ({ ...c, filter: id, preview: true, params: { ...initial().params, border: c.params.border } })); if (nextView)
        setView(nextView);
    else if (!byId[id].live)
        setView('learn');
    else if (id === 'custom')
        setView('custom');
    else if (view === 'custom')
        setView('lab'); }
    function changeParam(key: string, value: Params[string]) { setConfig(c => { const params = { ...c.params, [key]: value }; if (key === 'lower' && Number(value) > Number(params.upper))
        params.upper = value; if (key === 'upper' && Number(value) < Number(params.lower))
        params.lower = value; return { ...c, params, preview: true }; }); }
    function navigate(id: string) { if (id === 'upload') {
        uploadInput.current?.click();
        return;
    } if (id === 'custom')
        selectFilter('custom'); setView(id); }
    function addStage() { if (!filter.live || !config.preview || config.pipeline.length >= 8)
        return; setConfig(c => ({ ...c, pipeline: [...c.pipeline, { id: c.filter, key: crypto.randomUUID(), params: structuredClone(c.params), enabled: true }], preview: false })); setNotice(`${filter.name} added. Select a filter to preview the next stage.`); }
    function restore(index: number) { if (index < 0 || index >= history.entries.length)
        return; historySkip.current = true; setConfig(structuredClone(history.entries[index])); setHistory(h => ({ ...h, index })); }
    function resetImage(img: Pixels, metadata: Meta) { processor.current?.cancel(); setSource(img); setMeta(metadata); setResult(null); const next = initial(); setConfig(next); setHistory({ entries: [next], index: 0 }); setError(''); setView('lab'); }
    function sample(kind: string) { uploadVersion.current++; decoder.current?.terminate(); decoder.current = null; resetImage(createDemo(kind), { name: kind === 'impulse' ? 'Impulse noise study · synthetic' : kind === 'noise' ? 'Additive noise study · synthetic' : 'Landscape study · synthetic', width: 480, height: 320, bytes: 0, format: 'Generated RGB chart', note: kind === 'noise' ? 'Bounded synthetic additive noise, not an exact Gaussian distribution.' : kind === 'impulse' ? 'Synthetic black and white impulses on a test chart.' : 'Synthetic test chart; no photograph or personal data.' }); setNotice('Sample loaded. Measurements are computed from these pixels.'); }
    async function upload(file?: File) {
        if (!file)
            return;
        const version = ++uploadVersion.current;
        decoder.current?.terminate();
        decoder.current = null;
        if (file.size > 20 * 1024 * 1024) {
            setError('Choose an image smaller than 20 MB.');
            return;
        }
        if (!/\.(jpe?g|png|bmp|tiff?|webp)$/i.test(file.name)) {
            setError('Choose a JPG, PNG, BMP, TIFF, or WebP image.');
            return;
        }
        setNotice('Decoding your image locally…');
        setError('');
        let bitmap: ImageBitmap | null = null;
        try {
            let drawable: CanvasImageSource, width: number, height: number, tiffPages = 0;
            if (/\.tiff?$/i.test(file.name)) {
                const bytes = await file.arrayBuffer();
                if (version !== uploadVersion.current)
                    return;
                const pixels = await new Promise<Pixels & {
                    pages: number;
                }>((resolve, reject) => {
                    const worker = new Worker(new URL('./decode.worker.ts', import.meta.url), { type: 'module' });
                    decoder.current = worker;
                    const timeout = setTimeout(() => { worker.terminate(); reject(new Error('TIFF decoding timed out. Try a smaller image.')); }, 30000);
                    worker.onmessage = ({ data }) => { clearTimeout(timeout); worker.terminate(); decoder.current = null; if (data.error)
                        reject(new Error(data.error));
                    else
                        resolve({ ...data, data: new Uint8ClampedArray(data.data) }); };
                    worker.onerror = () => { clearTimeout(timeout); worker.terminate(); reject(new Error('The TIFF decoder could not read this image.')); };
                    worker.postMessage(bytes, [bytes]);
                });
                width = pixels.width;
                height = pixels.height;
                tiffPages = pixels.pages;
                const c = document.createElement('canvas');
                c.width = width;
                c.height = height;
                c.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(pixels.data), width, height), 0, 0);
                drawable = c;
            }
            else {
                bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
                width = bitmap.width;
                height = bitmap.height;
                drawable = bitmap;
            }
            if (version !== uploadVersion.current)
                return;
            const size = workingSize(width, height), canvas = document.createElement('canvas');
            canvas.width = size.width;
            canvas.height = size.height;
            const ctx = canvas.getContext('2d', { willReadFrequently: true })!;
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(drawable, 0, 0, canvas.width, canvas.height);
            const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
            resetImage({ width: canvas.width, height: canvas.height, data: img.data }, { name: file.name, width, height, bytes: file.size, format: file.name.split('.').at(-1)!.toUpperCase(), note: `Decoded to 8-bit sRGB on white.${tiffPages > 1 ? ` First page of ${tiffPages} TIFF pages.` : ''}` });
            setNotice(width > 640 || height > 640 ? 'Image loaded. Working copy capped at 640 pixels on its longest side; PNG exports use this size.' : 'Image loaded. Ready to experiment.');
        }
        catch (e) {
            if (version === uploadVersion.current) {
                setError(e instanceof Error ? e.message : 'Could not decode this image. Try PNG.');
                setNotice('');
            }
        }
        finally {
            bitmap?.close();
        }
    }
    function download() { if (!result || busy)
        return; const pixels = result.processed, canvas = document.createElement('canvas'); canvas.width = pixels.width; canvas.height = pixels.height; canvas.getContext('2d')!.putImageData(new ImageData(new Uint8ClampedArray(pixels.data), pixels.width, pixels.height), 0, 0); canvas.toBlob(blob => { if (!blob) {
        setError('PNG export failed.');
        return;
    } const url = URL.createObjectURL(blob), a = document.createElement('a'); a.href = url; a.download = 'filterverse-result.png'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000); }, 'image/png'); }
    const comparison = <Comparison key={`${source.width}-${source.height}-${meta.name}`} source={source} result={result} busy={busy} title={outputLabel(filter, config)}/>;
    return <section className="fv-app" data-fv-theme={theme}>
 <header className="fv-topbar"><Link className="fv-brand" href="/filterverse"><FlaskConical /><strong>Filter<span>Verse</span></strong><small>THE IMAGE LAB</small></Link><div className="fv-top-actions"><span className="fv-private-tag"><ShieldCheck size={13}/> Private by design</span><Link href="/vision-pen">Vision Pen <ArrowRight size={14}/></Link><button className="fv-icon" aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`} onClick={() => { const next = theme === 'light' ? 'dark' : 'light'; setTheme(next); try {
        localStorage.setItem('filterverse-theme', next);
    }
    catch { } }}>{theme === 'light' ? <Moon size={16}/> : <Sun size={16}/>}</button></div></header>
 <input type="file" ref={uploadInput} accept=".jpg,.jpeg,.png,.bmp,.tif,.tiff,.webp" hidden onChange={e => { void upload(e.target.files?.[0]); e.target.value = ''; }}/>
 <div className="fv-shell"><aside className="fv-sidebar"><span className="fv-overline">YOUR LABORATORY</span>{menu.map(([id, label, Icon]) => <button key={id} className={view === id ? 'active' : ''} aria-current={view === id ? 'page' : undefined} onClick={() => navigate(id)}><Icon size={16}/>{label}{id === 'lab' && <span className="fv-nav-dot"/>}</button>)}<div className="fv-private"><ShieldCheck size={20}/><strong>Your images stay yours.</strong><p>No server uploads. Processing runs in a cancellable background worker.</p><span>{liveCount} live filters · {filters.length - liveCount} reference entries</span></div></aside>
 <main className="fv-main"><div className="fv-hero"><div><span className="fv-overline">A LITTLE CURIOSITY. A WHOLE NEW PERSPECTIVE.</span><h1>Image Processing<br /><em>Filter Laboratory.</em></h1><p>Learn · Apply · Visualize · Compare · Analyze</p></div><div className="fv-hero-kernel" aria-label="Example binomial kernel">{[1, 2, 1, 2, 4, 2, 1, 2, 1].map((v, i) => <span key={i} style={{ opacity: v === 4 ? 1 : .65 }}>{v}</span>)}</div></div>
 <section className={`fv-upload-strip ${draggingFile ? 'dragging' : ''}`} onDragOver={e => { e.preventDefault(); setDraggingFile(true); }} onDragLeave={() => setDraggingFile(false)} onDrop={e => { e.preventDefault(); setDraggingFile(false); void upload(e.dataTransfer.files[0]); }}><div className="fv-file-icon"><ImagePlus size={22}/></div><div><strong title={meta.name}>{meta.name}</strong><span>{source.width} × {source.height} working pixels · {meta.format} · drop a new image here</span></div><button className="fv-button" onClick={() => uploadInput.current?.click()}><Upload size={13}/> Upload image</button><select aria-label="Load a sample image" value="" onChange={e => { if (e.target.value)
        sample(e.target.value); }}><option value="">Try a sample</option><option value="landscape">Landscape test chart</option><option value="impulse">Salt & pepper study</option><option value="noise">Additive noise study</option></select></section>
 <div className="fv-session-toolbar"><div className="fv-inline"><span className="fv-dot"/><strong>{config.pipeline.length ? `${config.pipeline.length} pipeline stages` : 'Single-filter experiment'}</strong><span>· {source.width} × {source.height}</span></div><div className="fv-inline"><button className="fv-icon" disabled={history.index === 0} aria-label="Undo experiment change" onClick={() => restore(history.index - 1)}><Undo2 size={15}/></button><button className="fv-icon" disabled={history.index >= history.entries.length - 1} aria-label="Redo experiment change" onClick={() => restore(history.index + 1)}><Redo2 size={15}/></button><button className="fv-button" onClick={() => setConfig({ ...initial(), preview: false })}><RotateCcw size={13}/> Reset</button><button className="fv-button primary" disabled={!result || busy || Boolean(error)} onClick={download}><Download size={13}/> Export PNG</button></div></div>
 {(error || notice) && <div className={`fv-notice ${error ? 'error' : ''}`} role={error ? 'alert' : 'status'}>{error || notice}<button className="fv-icon" aria-label="Dismiss message" onClick={() => { setError(''); setNotice(''); }}><X size={13}/></button></div>}
 <div className="fv-workbench"><div className="fv-center">
 {view === 'home' && <section className="fv-card fv-overview"><span className="fv-overline">WELCOME TO FILTERVERSE</span><h2>Turn an image into an experiment.</h2><p>Try a filter, change one parameter, and look closely at what moved.</p><div className="fv-home-grid">{menu.filter(([id]) => !['home', 'upload'].includes(id)).map(([id, label, Icon]) => <button key={id} onClick={() => navigate(id)}><Icon size={22}/><strong>{label}</strong><ArrowRight size={13}/></button>)}</div></section>}
 {(view === 'lab' || view === 'home') && <>{comparison}{result && <><Histograms result={result}/><Recommendations result={result} onSelect={id => selectFilter(id, 'lab')}/></>}</>}
 {view === 'explore' && <FilterExplorer selected={config.filter} onSelect={id => selectFilter(id, byId[id].live ? 'lab' : 'learn')}/>}
 {view === 'map' && <MindMap onSelect={id => selectFilter(id, 'learn')}/>}
 {(view === 'learn' || view === 'math') && <><div className="fv-levels" role="group" aria-label="Educational detail level">{['Beginner', 'Intermediate', 'Advanced'].map(v => <button key={v} aria-pressed={level === v} className={level === v ? 'active' : ''} onClick={() => setLevel(v)}>{v}</button>)}</div><Knowledge key={`${view}-${filter.id}`} filter={filter} level={view === 'math' ? 'Advanced' : level} initialTab={view === 'math' ? 'Mathematics' : 'Theory'} params={config.params}/>{filter.live && <KernelLesson source={source} filter={filter} params={config.params}/>}</>}
 {view === 'numerical' && <><KernelLesson source={source} filter={filter} params={config.params}/><Knowledge filter={filter} level="Intermediate" params={config.params}/></>}
 {view === 'custom' && <><section className="fv-card"><div className="fv-card-heading"><div><span className="fv-overline">MAKE SOMETHING OF YOUR OWN</span><h2>Custom kernel playground</h2></div><select aria-label="Custom kernel dimensions" value={Math.sqrt((config.params.kernel as number[]).length)} onChange={e => { const n = Number(e.target.value), k = Array(n * n).fill(0); k[Math.floor(n * n / 2)] = 1; changeParam('kernel', k); }}>{[3, 5, 7].map(v => <option key={v} value={v}>{v} × {v}</option>)}</select></div><Matrix editable values={config.params.kernel as number[]} onChange={(i, n) => { const k = [...(config.params.kernel as number[])]; k[i] = Math.max(-100, Math.min(100, n)); changeParam('kernel', k); }}/><label className="fv-check"><input type="checkbox" checked={Boolean(config.params.normalize)} onChange={e => changeParam('normalize', e.target.checked)}/> Normalize by sum when nonzero</label><p>Raw sum: <strong>{number((config.params.kernel as number[]).reduce((s, v) => s + v, 0), 3)}</strong>. Zero sum removes a constant component. Positive averaging coefficients tend to smooth; negative weights can emphasize differences. Test the output rather than judging only by the sum.</p>{kernel && <KernelFrequency kernel={kernel}/>}</section>{comparison}<KernelLesson source={source} filter={filter} params={config.params}/></>}
 {view === 'pipeline' && <><Pipeline config={config} setConfig={setConfig} addStage={addStage} history={history} restore={restore}/>{comparison}</>}
 {view === 'compare' && <CompareFilters source={source} result={result} busy={busy} ids={compareIds} setIds={setCompareIds}/>}
 {view === 'analysis' && result && <><Analysis source={source} result={result} meta={meta} frequencyActive={filter.category === 'Frequency' && config.preview}/><Recommendations result={result} onSelect={id => selectFilter(id, 'lab')}/></>}
 </div><aside className="fv-inspector"><section className="fv-card"><div className="fv-card-heading"><div><span className="fv-overline">YOUR ACTIVE FILTER</span><h2>Experiment controls</h2></div><SlidersHorizontal size={17}/></div><label className="fv-field">Select a filter<select value={config.filter} onChange={e => selectFilter(e.target.value)}>{filters.map(f => <option key={f.id} value={f.id}>{f.name}{!f.live ? ' · reference' : ''}</option>)}</select></label><div className="fv-selected-info"><span className={`fv-chip ${filter.live ? '' : 'reference'}`}>{filter.category}</span><h3>{filter.name}</h3><p>{filter.purpose}</p></div>{filter.live ? <><div className="fv-parameters">{filter.controls.map(key => key === 'direction' ? <label className="fv-field" key={key}>Gradient response<select value={String(config.params.direction)} onChange={e => changeParam(key, e.target.value)}><option value="magnitude">Magnitude √(Gx²+Gy²)</option><option value="x">Absolute Gx</option><option value="y">Absolute Gy</option></select></label> : controlInfo[key] ? <label className="fv-slider" key={key}><span>{controlInfo[key].label}<output>{key === 'size' ? `${config.params[key]} × ${config.params[key]}` : String(config.params[key])}</output></span><input type="range" min={controlInfo[key].min} max={controlInfo[key].max} step={controlInfo[key].step} value={Number(config.params[key])} onChange={e => changeParam(key, Number(e.target.value))}/><small>{controlInfo[key].hint}</small></label> : null)}</div><label className="fv-field">Border handling<select value={String(config.params.border)} onChange={e => changeParam('border', e.target.value)}><option value="reflect">Reflect (exclude edge)</option><option value="replicate">Replicate edge</option><option value="zero">Constant zero</option><option value="wrap">Wrap</option></select></label><p className="fv-help">Updates automatically. Transforms without spatial sampling do not use this border setting.</p><button className="fv-button primary fv-full" disabled={!config.preview || config.pipeline.length >= 8} onClick={addStage}><Plus size={14}/>{config.preview ? 'Add to pipeline' : 'Added to pipeline'}</button>{!config.preview && <button className="fv-button fv-full" onClick={() => setConfig(c => ({ ...c, preview: true }))}>Preview another stage</button>}</> : <div className="fv-reference-notice"><BookOpen size={22}/><strong>Learn this method</strong><p>Reference material only. This algorithm is not installed; no substitute is applied.</p><button className="fv-button" onClick={() => setView('learn')}>Open lesson <ArrowRight size={13}/></button></div>}</section><section className="fv-card fv-quick-math"><span className="fv-overline">THE IDEA BEHIND THE IMAGE</span><Equation tex={filter.formula}/><p>{filter.note || 'Explore the learning studio for theory and examples.'}</p>{kernel && Math.sqrt(kernel.length) <= 5 && <Matrix values={kernel}/>}<button className="fv-text-button" onClick={() => setView('learn')}>Explore the mathematics <ArrowRight size={13}/></button></section><div className="fv-tip"><Sparkles size={18}/><p><strong>Change one thing at a time.</strong> Keep a baseline and compare the details that matter to your task.</p></div></aside></div>
 <footer className="fv-footer">Designed and developed by <Link href="/">Dr. Mritunjay Shall Peelam</Link><span>FILTERVERSE · A LABORATORY FOR CURIOUS MINDS</span></footer></main></div></section>;
}
