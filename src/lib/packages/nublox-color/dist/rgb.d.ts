import type { Hex, Rgb, Rgb01, Hsl } from './types.js';
export declare function parseHex(hex: string): Rgb;
export declare function rgbToHex(rgb: Rgb): Hex;
export declare function rgbTo01(rgb: Rgb): Rgb01;
export declare function rgbFrom01(rgb: Rgb01): Rgb;
export declare function srgbToLinearChannel(x: number): number;
export declare function linearToSrgbChannel(x: number): number;
export declare function relativeLuminance(hexOrRgb: string | Rgb): number;
/** HSP brightness. This matches screen/eye brightness better for palette ordering than OKLCH L alone. */
export declare function visualBrightness(hexOrRgb: string | Rgb): number;
export declare function contrastRatio(fg: string | Rgb, bg: string | Rgb): number;
export declare function bestTextColour(bg: string | Rgb): '#111111' | '#ffffff';
export declare function rgbToHsl(rgb: Rgb): Hsl;
export declare function hslToRgb(hsl: Hsl): Rgb;
