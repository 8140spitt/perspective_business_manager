import { oklchToOklab } from './oklab.js';
export function deltaEOK(a, b) {
    const x = oklchToOklab(a), y = oklchToOklab(b);
    const dl = x.l - y.l, da = x.a - y.a, db = x.b - y.b;
    return Math.sqrt(dl * dl + da * da + db * db) * 100;
}
