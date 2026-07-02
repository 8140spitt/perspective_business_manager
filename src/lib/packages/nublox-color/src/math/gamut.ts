import type { Oklch, Rgb } from '../types.js';
import { inSrgb } from './srgb.js';
import { oklchToRgb } from './oklab.js';
import { clamp } from './utils.js';
export interface GamutResult { oklch: Oklch; rgb: Rgb; compressed: boolean; steps: number }
export function fitOklchToSrgb(input: Oklch, maxSteps = 80): GamutResult {
  let c = Math.max(0, input.c);
  for (let i=0; i<=maxSteps; i++) {
    const candidate = { l: clamp(input.l), c, h: input.h };
    const rgb = oklchToRgb(candidate);
    if (inSrgb(rgb)) return { oklch: candidate, rgb, compressed: i>0, steps: i };
    c *= 0.94;
  }
  const fallback = { l: clamp(input.l), c: 0, h: input.h };
  return { oklch: fallback, rgb: oklchToRgb(fallback), compressed: true, steps: maxSteps };
}
