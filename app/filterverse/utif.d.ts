declare module 'utif' {
    const UTIF: {
        decode(buffer: ArrayBuffer): Array<{
            width: number;
            height: number;
            t256?: number[];
            t257?: number[];
        }>;
        decodeImage(buffer: ArrayBuffer, ifd: unknown): void;
        toRGBA8(ifd: unknown): Uint8Array;
    };
    export default UTIF;
}
