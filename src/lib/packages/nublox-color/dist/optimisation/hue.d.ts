import type { Oklch, RampProfile } from '../types.js';
export declare function hueForStop(base: Oklch, targetL: number, profile: RampProfile): {
    h: number;
    adjustment: number;
};
