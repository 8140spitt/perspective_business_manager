import { hexToRgb, rgbToHex } from '../math/srgb.js';
import { rgbToOklch } from '../math/oklab.js';
export class Color {
    hex;
    rgb;
    oklch;
    constructor(hex) { this.hex = rgbToHex(hexToRgb(hex)); this.rgb = hexToRgb(this.hex); this.oklch = rgbToOklch(this.rgb); }
    static from(hex) { return new Color(hex); }
}
