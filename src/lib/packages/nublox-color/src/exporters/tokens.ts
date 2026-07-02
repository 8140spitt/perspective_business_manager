import type { Ramp } from '../types.js';
export function rampToTokens(name: string, ramp: Ramp): Record<string,string> {
  const out: Record<string,string> = {};
  for (const stop of Object.values(ramp)) {
    out[`color.${name}.${stop.stop}`] = stop.hex;
    out[`color.${name}.${stop.stop}.foreground`] = stop.metrics.preferredText;
  }
  return out;
}
