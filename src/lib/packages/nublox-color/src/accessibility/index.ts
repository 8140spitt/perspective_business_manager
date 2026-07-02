import type { Hex } from '../types.js';
import { hexToRgb } from '../math/srgb.js';
import { contrastRatio } from '../math/contrast.js';
export function isWcagAA(foreground: Hex, background: Hex, largeText = false): boolean {
  return contrastRatio(hexToRgb(foreground), hexToRgb(background)) >= (largeText ? 3 : 4.5);
}
export function contrast(foreground: Hex, background: Hex): number {
  return contrastRatio(hexToRgb(foreground), hexToRgb(background));
}
