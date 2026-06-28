export type Hex = `#${string}`;
export type PaletteStep = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export type StopSelection = 'auto' | 'manual';
export type PaletteProfile = 'balanced' | 'vivid' | 'soft' | 'ink';
export type SeedKind = 'neutral' | 'near-neutral' | 'chromatic';
export interface Rgb {
    r: number;
    g: number;
    b: number;
}
export interface Rgb01 {
    r: number;
    g: number;
    b: number;
}
export interface Hwb {
    h: number;
    w: number;
    b: number;
}
export interface Hsl {
    h: number;
    s: number;
    l: number;
}
export interface Oklab {
    L: number;
    a: number;
    b: number;
}
export interface Oklch {
    L: number;
    C: number;
    h: number | null;
}
export interface PaletteOptions {
    stopSelection?: StopSelection;
    anchor?: PaletteStep;
    profile?: PaletteProfile;
    /** 0.5..1.5, higher makes light stops move closer to white. */
    tintStrength?: number;
    /** 0.5..1.5, higher makes dark stops move closer to black. */
    shadeStrength?: number;
    /** 0..2, adds a tiny opposite mix to avoid chalk/crush. */
    toneStrength?: number;
    /** 0.5..1.5, controls how much colour survives away from the anchor. */
    vibrancy?: number;
    /** Optional manual target brightness map, values 0..1. */
    brightnessTargets?: Partial<Record<PaletteStep, number>>;
}
export interface PaletteStop {
    step: PaletteStep;
    hex: Hex;
    rgb: Rgb;
    hsl: Hsl;
    hwb: Hwb;
    oklab: Oklab;
    oklch: Oklch;
    brightness: number;
    targetBrightness: number;
    mix: {
        white: number;
        black: number;
        colour: number;
    };
    colourStrength: number;
    text: '#111111' | '#ffffff';
    contrast: {
        white: number;
        black: number;
    };
    deltaE: number | null;
    anchor: boolean;
    seedKind?: SeedKind;
}
export interface PaletteQualityCheck {
    label: string;
    status: 'pass' | 'warn' | 'fail';
    message: string;
}
export interface PaletteQuality {
    pass: boolean;
    score: number;
    anchor: PaletteStep;
    checks: PaletteQualityCheck[];
    issues: string[];
    warnings: string[];
}
