export declare function hijackImage(): (() => void) | undefined;
export declare const loadImageBase: (url: string, progress?: ((v: number) => void) | undefined) => Promise<HTMLImageElement>;
export declare const loadImage: (url: string, progress?: ((v: number) => void) | undefined) => Promise<HTMLImageElement>;
