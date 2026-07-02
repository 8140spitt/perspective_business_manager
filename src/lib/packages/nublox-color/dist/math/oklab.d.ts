import type { LinearRgb, Oklab, Oklch, Rgb } from '../types.js';
export declare function linearRgbToOklab({ r, g, b }: LinearRgb): Oklab;
export declare function oklabToLinearRgb({ l, a, b }: Oklab): LinearRgb;
export declare function oklabToOklch({ l, a, b }: Oklab): Oklch;
export declare function oklchToOklab({ l, c, h }: Oklch): Oklab;
export declare const rgbToOklch: (rgb: Rgb) => Oklch;
export declare const oklchToRgb: (oklch: Oklch) => Rgb;
