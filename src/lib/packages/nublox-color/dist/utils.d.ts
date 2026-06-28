export declare const STEPS: readonly [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export declare function clamp(value: number, min?: number, max?: number): number;
export declare function clamp255(value: number): number;
export declare function lerp(a: number, b: number, t: number): number;
export declare function invLerp(a: number, b: number, value: number): number;
export declare function easeInOut(t: number): number;
export declare function wrapHue(h: number): number;
export declare function round(value: number, dp?: number): number;
