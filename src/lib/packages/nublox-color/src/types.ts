export type Hex = `#${string}`;
export type Stop = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
export const STOPS = [50,100,200,300,400,500,600,700,800,900,950] as const;

export interface Rgb { r: number; g: number; b: number }
export interface LinearRgb { r: number; g: number; b: number }
export interface Oklab { l: number; a: number; b: number }
export interface Oklch { l: number; c: number; h: number }

export type RampProfileName = 'ui' | 'paint' | 'accessibility' | 'display';

export interface RampOptions {
  profile?: RampProfileName | RampProfile;
  referenceStop?: Stop;
  outputGamut?: 'srgb';
  explain?: boolean;
  maxIterations?: number;
}

export interface RampProfile {
  name: RampProfileName | string;
  lightness: Record<Stop, number>;
  weights: ObjectiveWeights;
  chromaBias: number;
  hueFreedom: number;
  contrastPriority: number;
  description: string;
}

export interface ObjectiveWeights {
  deltaE: number;
  hue: number;
  chroma: number;
  smoothness: number;
  gamut: number;
  contrast: number;
  brand: number;
}

export interface StopMetrics {
  luminance: number;
  contrastOnWhite: number;
  contrastOnBlack: number;
  preferredText: '#000000' | '#ffffff';
  deltaEFromPrevious: number | null;
  deltaEFromBase: number;
  targetLightness: number;
  actualLightness: number;
  chromaScale: number;
  hueAdjustment: number;
  gamutCompressed: boolean;
  gamutCompressionSteps: number;
  objectiveScore: number;
  notes: string[];
}

export interface ColorStop {
  stop: Stop;
  hex: Hex;
  rgb: Rgb;
  oklch: Oklch;
  metrics: StopMetrics;
}

export type Ramp = Record<Stop, ColorStop>;

export interface ThemeInput {
  primary: Hex;
  secondary?: Hex;
  accent?: Hex;
  success?: Hex;
  warning?: Hex;
  danger?: Hex;
  info?: Hex;
  neutral?: Hex;
}

export interface Theme {
  ramps: Record<string, Ramp>;
  tokens: Record<string, string>;
  css: string;
  json: string;
}
