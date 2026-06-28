import { generatePalette, assessPaletteQuality } from '../dist/index.js';

let failures = 0;
function hex(n) { return '#' + n.toString(16).padStart(6, '0'); }
for (let i = 0; i < 2000; i++) {
  const seed = hex(Math.floor(Math.random() * 0xffffff));
  const palette = generatePalette(seed);
  const q = assessPaletteQuality(palette, { seed });
  if (!q.pass) failures++;
}
if (failures > 0) throw new Error(`${failures} random palettes failed`);
console.log('2000 validation palettes passed');
