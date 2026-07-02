import { generateRamp } from './ramp.js';
import { themeToCss } from './exporters/css.js';
import { rampToTokens } from './exporters/tokens.js';
export function createTheme(input, options = {}) {
    const ramps = {};
    for (const [name, hex] of Object.entries(input))
        if (hex)
            ramps[name] = generateRamp(hex, options);
    const tokens = {};
    for (const [name, ramp] of Object.entries(ramps))
        Object.assign(tokens, rampToTokens(name, ramp));
    const css = themeToCss({ ramps });
    return { ramps, tokens, css, json: JSON.stringify({ tokens, ramps }, null, 2) };
}
