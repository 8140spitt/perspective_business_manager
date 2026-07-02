import { clamp } from './utils.js';
export function hexToRgb(hex) {
    const clean = hex.trim().replace('#', '');
    const full = clean.length === 3 ? clean.split('').map(x => x + x).join('') : clean;
    if (!/^[0-9a-fA-F]{6}$/.test(full))
        throw new Error(`Invalid hex colour: ${hex}`);
    return { r: parseInt(full.slice(0, 2), 16), g: parseInt(full.slice(2, 4), 16), b: parseInt(full.slice(4, 6), 16) };
}
export function rgbToHex({ r, g, b }) {
    const to = (v) => Math.round(clamp(v, 0, 255)).toString(16).padStart(2, '0');
    return (`#${to(r)}${to(g)}${to(b)}`);
}
export function srgbChannelToLinear(c255) {
    const c = c255 / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}
export function linearChannelToSrgb(c) {
    const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    return clamp(v) * 255;
}
export function rgbToLinear(rgb) {
    return { r: srgbChannelToLinear(rgb.r), g: srgbChannelToLinear(rgb.g), b: srgbChannelToLinear(rgb.b) };
}
export function linearToRgb(rgb) {
    return { r: linearChannelToSrgb(rgb.r), g: linearChannelToSrgb(rgb.g), b: linearChannelToSrgb(rgb.b) };
}
export function inSrgb(rgb) {
    return rgb.r >= 0 && rgb.r <= 255 && rgb.g >= 0 && rgb.g <= 255 && rgb.b >= 0 && rgb.b <= 255;
}
