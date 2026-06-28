import type { Hwb, Rgb } from './types.js';
import { hslToRgb, rgbToHsl } from './rgb.js';
import { clamp, wrapHue, clamp255 } from './utils.js';

export function hwbToRgb(hwb: Hwb): Rgb {
  const h = wrapHue(hwb.h);
  let w = clamp(hwb.w / 100);
  let b = clamp(hwb.b / 100);
  const total = w + b;
  if (total >= 1) {
    const grey = w / total;
    const v = clamp255(grey * 255);
    return { r: v, g: v, b: v };
  }
  const pure = hslToRgb({ h, s: 100, l: 50 });
  const c = 1 - w - b;
  return {
    r: clamp255(pure.r * c + 255 * w),
    g: clamp255(pure.g * c + 255 * w),
    b: clamp255(pure.b * c + 255 * w)
  };
}

export function rgbToHwb(rgb: Rgb): Hwb {
  const { h } = rgbToHsl(rgb);
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;
  const w = Math.min(r, g, b) * 100;
  const black = (1 - Math.max(r, g, b)) * 100;
  return { h, w, b: black };
}
