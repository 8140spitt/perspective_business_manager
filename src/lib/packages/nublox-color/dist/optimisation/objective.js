import { deltaEOK } from '../math/delta.js';
import { shortestHueDelta } from '../math/utils.js';
export function objectiveScore(stop, base, profile, prev) {
    const hueError = Math.abs(shortestHueDelta(stop.h, base.h)) / 180;
    const chromaError = Math.abs(stop.c - base.c) / Math.max(base.c, .001);
    const brandError = deltaEOK(stop, base) / 100;
    const deltaError = prev ? Math.abs(deltaEOK(stop, prev.oklch) - 8) / 8 : 0;
    return profile.weights.hue * hueError + profile.weights.chroma * chromaError + profile.weights.brand * brandError + profile.weights.deltaE * deltaError;
}
