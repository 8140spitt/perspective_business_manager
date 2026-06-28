import type { PaletteOptions, PaletteProfile, PaletteQuality, PaletteStep, PaletteStop } from './types.js';
export declare const PROFILE: Record<PaletteProfile, Required<Pick<PaletteOptions, 'tintStrength' | 'shadeStrength' | 'toneStrength' | 'vibrancy'>>>;
export declare function getPaletteProfile(profile?: PaletteProfile): {
    tintStrength: number;
    shadeStrength: number;
    toneStrength: number;
    vibrancy: number;
};
export declare function getBrightnessTargets(overrides?: Partial<Record<PaletteStep, number>>): Record<PaletteStep, number>;
export declare function calculateStopFromColor(seed: string, targets?: Record<PaletteStep, number>): PaletteStep;
export declare function generatePalette(seedHex: string, options?: PaletteOptions): PaletteStop[];
export declare function paletteToCssVars(name: string, palette: PaletteStop[]): string;
export declare function assessPaletteQuality(palette: PaletteStop[], options?: {
    seed?: string;
    anchor?: PaletteStep;
}): PaletteQuality;
export declare const validatePalette: typeof assessPaletteQuality;
