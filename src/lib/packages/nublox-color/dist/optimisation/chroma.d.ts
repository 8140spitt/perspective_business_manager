import type { Oklch, RampProfile } from '../types.js';
export declare function chromaForStop(base: Oklch, targetL: number, profile: RampProfile): {
    c: number;
    scale: number;
};
