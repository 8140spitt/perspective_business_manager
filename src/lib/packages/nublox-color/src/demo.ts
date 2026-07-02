import { createTheme, generateRamp } from './index.js';
const ramp = generateRamp('#7C3AED', { profile: 'ui' });
console.table(Object.values(ramp).map(s => ({ stop: s.stop, hex: s.hex, text: s.metrics.preferredText, dE: s.metrics.deltaEFromPrevious?.toFixed(2), cW: s.metrics.contrastOnWhite.toFixed(2), cB: s.metrics.contrastOnBlack.toFixed(2), gamut: s.metrics.gamutCompressed })));
const theme = createTheme({ primary: '#7C3AED', success: '#16A34A', warning: '#F59E0B', danger: '#DC2626' });
console.log(theme.css);
