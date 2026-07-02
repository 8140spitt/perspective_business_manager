import { generateRamp, createTheme, contrast } from '../index.js';
function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}
const ramp = generateRamp('#7C3AED');
assert(Object.keys(ramp).length === 11, 'expected 11 stops');
assert(/^#[0-9a-f]{6}$/i.test(ramp[500].hex), 'expected hex output');
assert(ramp[50].oklch.l > ramp[950].oklch.l, 'expected lighter 50 than 950');
assert(contrast('#000000', '#ffffff') > 20, 'expected black/white contrast around 21');
const theme = createTheme({ primary: '#7C3AED' });
assert(theme.css.includes('--primary-500'), 'expected CSS primary token');
console.log('basic tests passed');
