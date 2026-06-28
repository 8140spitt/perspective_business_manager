import { rgbTo01, rgbFrom01, srgbToLinearChannel, linearToSrgbChannel } from './rgb.js';
import { wrapHue } from './utils.js';
export function rgbToOklab(rgb) {
    const srgb = rgbTo01(rgb);
    const r = srgbToLinearChannel(srgb.r);
    const g = srgbToLinearChannel(srgb.g);
    const b = srgbToLinearChannel(srgb.b);
    const l = 0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b;
    const m = 0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b;
    const s = 0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b;
    const l_ = Math.cbrt(l);
    const m_ = Math.cbrt(m);
    const s_ = Math.cbrt(s);
    return {
        L: 0.2104542553 * l_ + 0.793617785 * m_ - 0.0040720468 * s_,
        a: 1.9779984951 * l_ - 2.428592205 * m_ + 0.4505937099 * s_,
        b: 0.0259040371 * l_ + 0.7827717662 * m_ - 0.808675766 * s_
    };
}
export function oklabToRgb(lab) {
    const l_ = lab.L + 0.3963377774 * lab.a + 0.2158037573 * lab.b;
    const m_ = lab.L - 0.1055613458 * lab.a - 0.0638541728 * lab.b;
    const s_ = lab.L - 0.0894841775 * lab.a - 1.291485548 * lab.b;
    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;
    const r = +4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const b = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
    return rgbFrom01({
        r: linearToSrgbChannel(r),
        g: linearToSrgbChannel(g),
        b: linearToSrgbChannel(b)
    });
}
export function oklabToOklch(lab) {
    const C = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
    const h = C < 0.00001 ? null : wrapHue((Math.atan2(lab.b, lab.a) * 180) / Math.PI);
    return { L: lab.L, C, h };
}
export function oklchToOklab(lch) {
    const h = (lch.h ?? 0) * Math.PI / 180;
    return { L: lch.L, a: lch.C * Math.cos(h), b: lch.C * Math.sin(h) };
}
export function rgbToOklch(rgb) {
    return oklabToOklch(rgbToOklab(rgb));
}
export function deltaOklab(a, b) {
    const x = rgbToOklab(a);
    const y = rgbToOklab(b);
    return Math.sqrt((x.L - y.L) ** 2 + (x.a - y.a) ** 2 + (x.b - y.b) ** 2);
}
