import { degNorm, shortestHueDelta } from '../math/utils.js';
export function hueForStop(base, targetL, profile) {
    const lift = targetL - base.l;
    const yellow = Math.max(0, 1 - Math.abs(shortestHueDelta(base.h, 100)) / 100);
    const blue = Math.max(0, 1 - Math.abs(shortestHueDelta(base.h, 260)) / 100);
    const red = Math.max(0, 1 - Math.abs(shortestHueDelta(base.h, 30)) / 100);
    // Intentional small correction, not forced hue locking. Profiles decide freedom.
    const adjustment = profile.hueFreedom * lift * (yellow * 10 - blue * 12 + red * 5);
    return { h: degNorm(base.h + adjustment), adjustment };
}
