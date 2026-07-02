import type { Rgb } from '../types.js';
export declare function relativeLuminance(rgb: Rgb): number;
export declare function contrastRatio(a: Rgb, b: Rgb): number;
export declare function preferredText(rgb: Rgb): '#000000' | '#ffffff';
