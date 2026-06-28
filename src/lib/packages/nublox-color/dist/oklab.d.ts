import type { Oklab, Oklch, Rgb } from './types.js';
export declare function rgbToOklab(rgb: Rgb): Oklab;
export declare function oklabToRgb(lab: Oklab): Rgb;
export declare function oklabToOklch(lab: Oklab): Oklch;
export declare function oklchToOklab(lch: Oklch): Oklab;
export declare function rgbToOklch(rgb: Rgb): Oklch;
export declare function deltaOklab(a: Rgb, b: Rgb): number;
