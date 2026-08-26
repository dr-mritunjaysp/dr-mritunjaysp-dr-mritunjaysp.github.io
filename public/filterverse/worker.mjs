import { runExperiment } from './engine.mjs?v=20260826-filterverse';
self.onmessage = ({ data }) => {
    try {
        self.postMessage({ id: data.id, result: runExperiment(data.job) });
    }
    catch (error) {
        self.postMessage({ id: data.id, error: error instanceof Error ? error.message : 'Image processing failed.' });
    }
};
