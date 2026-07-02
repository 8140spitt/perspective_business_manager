import type { Ramp, Theme } from '../types.js';

export function rampToCssVars(name: string, ramp: Ramp): string {
  return Object.values(ramp).map(s => `  --${name}-${s.stop}: ${s.hex};`).join('\n');
}

export function themeToCss(theme: Pick<Theme,'ramps'>, selector=':root'): string {
  const body = Object.entries(theme.ramps).map(([name,ramp]) => rampToCssVars(name,ramp)).join('\n');
  return `${selector} {\n${body}\n}`;
}
