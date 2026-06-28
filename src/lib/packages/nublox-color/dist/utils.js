export const STEPS = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
export function clamp(value, min = 0, max = 1) {
    if (!Number.isFinite(value))
        return min;
    return Math.min(max, Math.max(min, value));
}
export function clamp255(value) {
    return Math.round(clamp(value, 0, 255));
}
export function lerp(a, b, t) {
    return a + (b - a) * t;
}
export function invLerp(a, b, value) {
    if (a === b)
        return 0;
    return (value - a) / (b - a);
}
export function easeInOut(t) {
    t = clamp(t);
    return t * t * (3 - 2 * t);
}
export function wrapHue(h) {
    const x = h % 360;
    return x < 0 ? x + 360 : x;
}
export function round(value, dp = 4) {
    const p = 10 ** dp;
    return Math.round(value * p) / p;
}
