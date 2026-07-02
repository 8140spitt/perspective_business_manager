import type { Oklch, RampProfile } from '../types.js';
import { shortestHueDelta } from '../math/utils.js';
function hueFactor(h: number): number {
  // High-chroma yellows and greens survive lighter stops better than blues/purples in sRGB.
  const yellow = Math.max(0, 1 - Math.abs(shortestHueDelta(h, 100)) / 90);
  const blue = Math.max(0, 1 - Math.abs(shortestHueDelta(h, 260)) / 90);
  return 1 + yellow * .22 - blue * .18;
}
export function chromaForStop(base: Oklch, targetL: number, profile: RampProfile): { c: number; scale: number } {
  const distanceFromMid = Math.abs(targetL - .58) / .58;
  const endCompression = Math.max(0, 1 - Math.pow(distanceFromMid, 1.45));
  const shadeBoost = targetL < base.l ? 1.0 - (base.l - targetL) * .18 : 1.0;
  const tintSoftening = targetL > base.l ? 1.0 - (targetL - base.l) * .40 : 1.0;
  const scale = Math.max(0, endCompression * shadeBoost * tintSoftening * hueFactor(base.h) * profile.chromaBias);
  return { c: base.c * scale, scale };
}
