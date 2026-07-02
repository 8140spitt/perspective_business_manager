import type { Ramp, Theme } from '../types.js';
export declare function rampToCssVars(name: string, ramp: Ramp): string;
export declare function themeToCss(theme: Pick<Theme, 'ramps'>, selector?: string): string;
