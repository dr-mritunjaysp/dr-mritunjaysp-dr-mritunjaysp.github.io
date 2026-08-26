// A latest-request-wins worker controller. Superseded expensive jobs are terminated.
export function outputLabel(filter, config) {
    if (config.preview && filter.live) return filter.name;
    return config.pipeline.some(stage => stage.enabled !== false) ? 'Pipeline result' : 'Original · no filter applied';
}
export function createProcessor({ WorkerClass = globalThis.Worker, onResult, onError, onBusy, delay = 160, timeout = 45000 }) {
    let worker = null, timer = null, deadline = null, revision = 0, disposed = false;
    const clear = () => { if (timer !== null)
        clearTimeout(timer); if (deadline !== null)
        clearTimeout(deadline); worker?.terminate(); worker = null; timer = null; deadline = null; };
    return {
        schedule(job) {
            if (disposed)
                return;
            const id = ++revision;
            clear();
            onBusy(true);
            timer = setTimeout(() => {
                try {
                    worker = new WorkerClass('/filterverse/worker.mjs?v=20260826-filterverse', { type: 'module' });
                    worker.onmessage = ({ data }) => { if (disposed || id !== revision || data.id !== id)
                        return; clear(); onBusy(false); if (data.error)
                        onError(data.error);
                    else
                        onResult(data.result); };
                    worker.onerror = () => { if (disposed || id !== revision)
                        return; clear(); onBusy(false); onError('The background processor could not run. Reload the page or try a smaller image.'); };
                    deadline = setTimeout(() => { if (id !== revision || disposed)
                        return; clear(); onBusy(false); onError('This operation exceeded 45 seconds. Use a smaller kernel or fewer pipeline stages.'); }, timeout);
                    worker.postMessage({ id, job });
                }
                catch {
                    clear();
                    onBusy(false);
                    onError('Background processing is unavailable in this browser. Use a current browser with Web Worker support.');
                }
            }, delay);
        },
        cancel() { revision++; clear(); onBusy(false); },
        dispose() { disposed = true; revision++; clear(); }
    };
}
export function addHistory(history, snapshot, limit = 24) {
    const previous = history.entries.slice(0, history.index + 1);
    if (JSON.stringify(previous.at(-1)) === JSON.stringify(snapshot))
        return history;
    const entries = [...previous, structuredClone(snapshot)].slice(-limit);
    return { entries, index: entries.length - 1 };
}
export function moveStage(stages, index, direction) { const target = index + direction; if (index < 0 || target < 0 || index >= stages.length || target >= stages.length)
    return stages; const next = [...stages]; [next[index], next[target]] = [next[target], next[index]]; return next; }
export function workingSize(width, height, limit = 640) { if (!Number.isFinite(width) || !Number.isFinite(height) || width < 1 || height < 1 || width * height > 16000000)
    throw new Error('Use an image up to 16 megapixels.'); const ratio = Math.min(1, limit / Math.max(width, height)); return { width: Math.max(1, Math.round(width * ratio)), height: Math.max(1, Math.round(height * ratio)) }; }
