import { degNorm } from './utils.js';
import { rgbToLinear, linearToRgb } from './srgb.js';
export function linearRgbToOklab({ r, g, b }) {
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    const l_ = Math.cbrt(l), m_ = Math.cbrt(m), s_ = Math.cbrt(s);
    return {
        l: 0.2104542553 * l_ + 0.7936177850 * m_ - 0.0040720468 * s_,
        a: 1.9779984951 * l_ - 2.4285922050 * m_ + 0.4505937099 * s_,
        b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.8086757660 * s_
    };
}
export function oklabToLinearRgb({ l, a, b }) {
    const l_ = l + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = l - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = l - 0.0894841775 * a - 1.2914855480 * b;
    const l3 = l_ ** 3, m3 = m_ ** 3, s3 = s_ ** 3;
    return {
        r: +4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3,
        g: -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3,
        b: -0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3
    };
}
export function oklabToOklch({ l, a, b }) {
    return { l, c: Math.sqrt(a * a + b * b), h: degNorm(Math.atan2(b, a) * 180 / Math.PI) };
}
export function oklchToOklab({ l, c, h }) {
    const rad = h * Math.PI / 180;
    return { l, a: Math.cos(rad) * c, b: Math.sin(rad) * c };
}
export const rgbToOklch = (rgb) => oklabToOklch(linearRgbToOklab(rgbToLinear(rgb)));
export const oklchToRgb = (oklch) => linearToRgb(oklabToLinearRgb(oklchToOklab(oklch)));
