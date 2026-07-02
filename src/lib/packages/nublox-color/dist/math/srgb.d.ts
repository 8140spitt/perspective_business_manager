import type { Hex, Rgb, LinearRgb } from '../types.js';
export declare function hexToRgb(hex: string): Rgb;
export declare function rgbToHex({ r, g, b }: Rgb): Hex;
export declare function srgbChannelToLinear(c255: number): number;
export declare function linearChannelToSrgb(c: number): number;
export declare function rgbToLinear(rgb: Rgb): LinearRgb;
export declare function linearToRgb(rgb: LinearRgb): Rgb;
export declare function inSrgb(rgb: Rgb): boolean;
