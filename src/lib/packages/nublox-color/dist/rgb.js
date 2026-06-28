import { clamp, clamp255, wrapHue } from './utils.js';
export function parseHex(hex) {
    let clean = hex.trim().replace(/^#/, '');
    if (/^[0-9a-fA-F]{3}$/.test(clean))
        clean = clean.split('').map((x) => x + x).join('');
    if (!/^[0-9a-fA-F]{6}$/.test(clean))
        throw new Error(`Invalid hex colour: ${hex}`);
    return {
        r: Number.parseInt(clean.slice(0, 2), 16),
        g: Number.parseInt(clean.slice(2, 4), 16),
        b: Number.parseInt(clean.slice(4, 6), 16)
    };
}
export function rgbToHex(rgb) {
    const to = (x) => clamp255(x).toString(16).padStart(2, '0');
    return `#${to(rgb.r)}${to(rgb.g)}${to(rgb.b)}`;
}
export function rgbTo01(rgb) {
    return { r: rgb.r / 255, g: rgb.g / 255, b: rgb.b / 255 };
}
export function rgbFrom01(rgb) {
    return { r: clamp255(rgb.r * 255), g: clamp255(rgb.g * 255), b: clamp255(rgb.b * 255) };
}
export function srgbToLinearChannel(x) {
    x = clamp(x);
    return x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}
export function linearToSrgbChannel(x) {
    x = clamp(x);
    return x <= 0.0031308 ? 12.92 * x : 1.055 * x ** (1 / 2.4) - 0.055;
}
export function relativeLuminance(hexOrRgb) {
    const rgb = typeof hexOrRgb === 'string' ? parseHex(hexOrRgb) : hexOrRgb;
    const { r, g, b } = rgbTo01(rgb);
    const rl = srgbToLinearChannel(r);
    const gl = srgbToLinearChannel(g);
    const bl = srgbToLinearChannel(b);
    return 0.2126 * rl + 0.7152 * gl + 0.0722 * bl;
}
/** HSP brightness. This matches screen/eye brightness better for palette ordering than OKLCH L alone. */
export function visualBrightness(hexOrRgb) {
    const rgb = typeof hexOrRgb === 'string' ? parseHex(hexOrRgb) : hexOrRgb;
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    return Math.sqrt(0.299 * r * r + 0.587 * g * g + 0.114 * b * b);
}
export function contrastRatio(fg, bg) {
    const a = relativeLuminance(fg);
    const b = relativeLuminance(bg);
    const L1 = Math.max(a, b);
    const L2 = Math.min(a, b);
    return (L1 + 0.05) / (L2 + 0.05);
}
export function bestTextColour(bg) {
    const black = contrastRatio('#111111', bg);
    const white = contrastRatio('#ffffff', bg);
    return black >= white ? '#111111' : '#ffffff';
}
export function rgbToHsl(rgb) {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const l = (max + min) / 2;
    const d = max - min;
    let h = 0;
    let s = 0;
    if (d !== 0) {
        s = d / (1 - Math.abs(2 * l - 1));
        switch (max) {
            case r:
                h = 60 * (((g - b) / d) % 6);
                break;
            case g:
                h = 60 * ((b - r) / d + 2);
                break;
            case b:
                h = 60 * ((r - g) / d + 4);
                break;
        }
    }
    return { h: wrapHue(h), s: s * 100, l: l * 100 };
}
export function hslToRgb(hsl) {
    const h = wrapHue(hsl.h);
    const s = clamp(hsl.s / 100);
    const l = clamp(hsl.l / 100);
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;
    if (h < 60)
        [r, g, b] = [c, x, 0];
    else if (h < 120)
        [r, g, b] = [x, c, 0];
    else if (h < 180)
        [r, g, b] = [0, c, x];
    else if (h < 240)
        [r, g, b] = [0, x, c];
    else if (h < 300)
        [r, g, b] = [x, 0, c];
    else
        [r, g, b] = [c, 0, x];
    return { r: clamp255((r + m) * 255), g: clamp255((g + m) * 255), b: clamp255((b + m) * 255) };
}
