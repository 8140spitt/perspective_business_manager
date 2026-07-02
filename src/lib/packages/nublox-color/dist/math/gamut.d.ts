import type { Oklch, Rgb } from '../types.js';
export interface GamutResult {
    oklch: Oklch;
    rgb: Rgb;
    compressed: boolean;
    steps: number;
}
export declare function fitOklchToSrgb(input: Oklch, maxSteps?: number): GamutResult;
