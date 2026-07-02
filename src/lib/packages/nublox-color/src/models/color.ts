import type { Hex, Oklch, Rgb } from '../types.js';
import { hexToRgb, rgbToHex } from '../math/srgb.js';
import { rgbToOklch } from '../math/oklab.js';
export class Color {
  readonly hex: Hex; readonly rgb: Rgb; readonly oklch: Oklch;
  constructor(hex: Hex) { this.hex = rgbToHex(hexToRgb(hex)); this.rgb = hexToRgb(this.hex); this.oklch = rgbToOklch(this.rgb); }
  static from(hex: Hex): Color { return new Color(hex); }
}
