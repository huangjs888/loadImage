export declare function hijackImage(): (() => void) | undefined;
export declare const loadImageBase: (url: string, progress?: ((v: number) => void) | undefined) => Promise<HTMLImageElement>;
export default function (url: string, progress?: (v: number) => void): Promise<HTMLImageElement>;
