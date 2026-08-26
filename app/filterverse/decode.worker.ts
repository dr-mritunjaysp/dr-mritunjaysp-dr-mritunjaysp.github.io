import UTIF from 'utif';
const scope = self as unknown as {
    onmessage: (event: MessageEvent<ArrayBuffer>) => void;
    postMessage: (data: unknown, transfer?: Transferable[]) => void;
};
scope.onmessage = ({ data }) => {
    try {
        if (data.byteLength > 20 * 1024 * 1024)
            throw new Error('Use a TIFF file smaller than 20 MB.');
        const pages = UTIF.decode(data), first = pages[0];
        if (!first)
            throw new Error('This TIFF has no decodable image page.');
        const width = first.t256?.[0] ?? first.width, height = first.t257?.[0] ?? first.height;
        if (!Number.isInteger(width) || !Number.isInteger(height) || width < 1 || height < 1 || width * height > 16000000)
            throw new Error('Use a TIFF image up to 16 megapixels.');
        UTIF.decodeImage(data, first);
        const pixels = UTIF.toRGBA8(first);
        if (pixels.length !== width * height * 4)
            throw new Error('This TIFF encoding could not be decoded safely.');
        scope.postMessage({ width, height, data: pixels, pages: pages.length }, [pixels.buffer]);
    }
    catch (error) {
        scope.postMessage({ error: error instanceof Error ? error.message : 'Unsupported TIFF image.' });
    }
};
