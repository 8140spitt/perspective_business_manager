export const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
export const lerp = (a, b, t) => a + (b - a) * t;
export const round = (n, dp = 6) => Number(n.toFixed(dp));
export const degNorm = (h) => ((h % 360) + 360) % 360;
export function shortestHueDelta(a, b) {
    const d = degNorm(a) - degNorm(b);
    return ((d + 540) % 360) - 180;
}
export function stopPosition(stop) {
    const order = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    return order.indexOf(stop) / (order.length - 1);
}
