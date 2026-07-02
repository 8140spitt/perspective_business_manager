import type { ColorStop, Oklch, RampProfile } from '../types.js';
export declare function objectiveScore(stop: Oklch, base: Oklch, profile: RampProfile, prev?: ColorStop): number;
