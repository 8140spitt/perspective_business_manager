import type { Hex, Oklch, Rgb } from '../types.js';
export declare class Color {
    readonly hex: Hex;
    readonly rgb: Rgb;
    readonly oklch: Oklch;
    constructor(hex: Hex);
    static from(hex: Hex): Color;
}
