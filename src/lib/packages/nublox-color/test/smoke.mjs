import { generatePalette, paletteToCssVars, calculateStopFromColor } from '../dist/index.js';

const seeds = ['#9437ff', '#521b92', '#ff00f3', '#71717a', '#212121', '#f6f0fc', '#ef4444', '#eab308', '#22c55e', '#06b6d4', '#3b82f6'];
for (const seed of seeds) {
  const palette = generatePalette(seed);
  if (palette.length !== 11) throw new Error(`${seed}: expected 11 stops`);
  const anchor = calculateStopFromColor(seed);
  const anchorStop = palette.find((x) => x.step === anchor);
  if (!anchorStop) throw new Error(`${seed}: missing anchor ${anchor}`);
  if (anchorStop.hex.toLowerCase() !== seed.toLowerCase()) throw new Error(`${seed}: anchor not preserved; ${anchorStop.hex}`);
  for (const stop of palette) {
    if (!/^#[0-9a-f]{6}$/i.test(stop.hex)) throw new Error(`${seed}: invalid ${stop.hex}`);
  }
  paletteToCssVars('test', palette);
}
const manual = generatePalette('#ff00f3', { stopSelection: 'manual', anchor: 950 });
if (manual.find((s) => s.step === 950).hex.toLowerCase() !== '#ff00f3') throw new Error('manual 950 anchor not preserved');
console.log('smoke tests passed');
