import type { Rgb } from '../types.js';
import { srgbChannelToLinear } from './srgb.js';
export function relativeLuminance(rgb: Rgb): number {
  const r = srgbChannelToLinear(rgb.r), g = srgbChannelToLinear(rgb.g), b = srgbChannelToLinear(rgb.b);
  return 0.2126*r + 0.7152*g + 0.0722*b;
}
export function contrastRatio(a: Rgb, b: Rgb): number {
  const l1 = relativeLuminance(a), l2 = relativeLuminance(b);
  const high = Math.max(l1,l2), low = Math.min(l1,l2);
  return (high + 0.05) / (low + 0.05);
}
export function preferredText(rgb: Rgb): '#000000' | '#ffffff' {
  return contrastRatio(rgb,{r:0,g:0,b:0}) >= contrastRatio(rgb,{r:255,g:255,b:255}) ? '#000000' : '#ffffff';
}
