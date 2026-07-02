export const clamp = (n: number, min = 0, max = 1): number => Math.min(max, Math.max(min, n));
export const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
export const round = (n: number, dp = 6): number => Number(n.toFixed(dp));
export const degNorm = (h: number): number => ((h % 360) + 360) % 360;
export function shortestHueDelta(a: number, b: number): number {
  const d = degNorm(a) - degNorm(b);
  return ((d + 540) % 360) - 180;
}
export function stopPosition(stop: number): number {
  const order = [50,100,200,300,400,500,600,700,800,900,950];
  return order.indexOf(stop) / (order.length - 1);
}
