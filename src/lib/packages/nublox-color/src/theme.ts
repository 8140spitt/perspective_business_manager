import type { Hex, RampOptions, Theme, ThemeInput } from './types.js';
import { generateRamp } from './ramp.js';
import { themeToCss } from './exporters/css.js';
import { rampToTokens } from './exporters/tokens.js';
export function createTheme(input: ThemeInput, options: RampOptions = {}): Theme {
  const ramps: Record<string, ReturnType<typeof generateRamp>> = {};
  for (const [name, hex] of Object.entries(input) as [string, Hex][]) if (hex) ramps[name] = generateRamp(hex, options);
  const tokens: Record<string,string> = {};
  for (const [name,ramp] of Object.entries(ramps)) Object.assign(tokens, rampToTokens(name, ramp));
  const css = themeToCss({ramps});
  return { ramps, tokens, css, json: JSON.stringify({ tokens, ramps }, null, 2) };
}
