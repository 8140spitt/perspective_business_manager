import type { ColorStop, Hex, Ramp, RampOptions, Stop } from './types.js';
import { STOPS } from './types.js';
import { Color } from './models/color.js';
import { resolveProfile } from './profiles/index.js';
import { chromaForStop } from './optimisation/chroma.js';
import { hueForStop } from './optimisation/hue.js';
import { fitOklchToSrgb } from './math/gamut.js';
import { rgbToHex } from './math/srgb.js';
import { contrastRatio, preferredText, relativeLuminance } from './math/contrast.js';
import { deltaEOK } from './math/delta.js';
import { objectiveScore } from './optimisation/objective.js';

const black = {r:0,g:0,b:0}; const white = {r:255,g:255,b:255};

export function generateRamp(hex: Hex, options: RampOptions = {}): Ramp {
  const profile = resolveProfile(options.profile);
  const referenceStop = options.referenceStop ?? 500;
  const base = Color.from(hex);
  const baseL = base.oklch.l;
  const profileRefL = profile.lightness[referenceStop];
  const lightnessShift = baseL - profileRefL;
  const ramp = {} as Ramp;
  let prev: ColorStop | undefined;
  for (const stop of STOPS) {
    const targetL = Math.max(.02, Math.min(.985, profile.lightness[stop] + lightnessShift));
    const chroma = chromaForStop(base.oklch, targetL, profile);
    const hue = hueForStop(base.oklch, targetL, profile);
    const candidate = { l: targetL, c: chroma.c, h: hue.h };
    const fitted = fitOklchToSrgb(candidate);
    const hexOut = rgbToHex(fitted.rgb);
    const dPrev = prev ? deltaEOK(fitted.oklch, prev.oklch) : null;
    const notes: string[] = [];
    if (fitted.compressed) notes.push('Chroma compressed to fit sRGB gamut.');
    if (Math.abs(hue.adjustment) > .5) notes.push('Small hue compensation applied for perceptual consistency.');
    if (contrastRatio(fitted.rgb, white) >= 4.5 || contrastRatio(fitted.rgb, black) >= 4.5) notes.push('Has at least one WCAG AA normal-text foreground among black/white.');
    const item: ColorStop = {
      stop: stop as Stop,
      hex: hexOut,
      rgb: { r: Math.round(fitted.rgb.r), g: Math.round(fitted.rgb.g), b: Math.round(fitted.rgb.b) },
      oklch: fitted.oklch,
      metrics: {
        luminance: relativeLuminance(fitted.rgb),
        contrastOnWhite: contrastRatio(fitted.rgb, white),
        contrastOnBlack: contrastRatio(fitted.rgb, black),
        preferredText: preferredText(fitted.rgb),
        deltaEFromPrevious: dPrev,
        deltaEFromBase: deltaEOK(fitted.oklch, base.oklch),
        targetLightness: targetL,
        actualLightness: fitted.oklch.l,
        chromaScale: chroma.scale,
        hueAdjustment: hue.adjustment,
        gamutCompressed: fitted.compressed,
        gamutCompressionSteps: fitted.steps,
        objectiveScore: objectiveScore(fitted.oklch, base.oklch, profile, prev),
        notes
      }
    };
    ramp[stop as Stop] = item;
    prev = item;
  }
  return ramp;
}
