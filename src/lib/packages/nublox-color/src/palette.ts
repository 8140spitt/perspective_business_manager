import type { Hex, PaletteOptions, PaletteProfile, PaletteQuality, PaletteStep, PaletteStop, Rgb } from './types.js';
import { rgbToHwb } from './hwb.js';
import { bestTextColour, contrastRatio, hslToRgb, parseHex, rgbToHex, rgbToHsl, visualBrightness } from './rgb.js';
import { deltaOklab, rgbToOklab, rgbToOklch } from './oklab.js';
import { clamp, easeInOut, lerp, round, STEPS, wrapHue } from './utils.js';

/**
 * Screen-brightness targets, not OKLCH lightness.
 * These are intentionally closer at the light end and wider through the mid/dark range.
 */
const TARGET_BRIGHTNESS: Record<PaletteStep, number> = {
  50: 0.975,
  100: 0.94,
  200: 0.86,
  300: 0.76,
  400: 0.65,
  500: 0.55,
  600: 0.45,
  700: 0.35,
  800: 0.25,
  900: 0.16,
  950: 0.09
};

export const PROFILE: Record<PaletteProfile, Required<Pick<PaletteOptions, 'tintStrength' | 'shadeStrength' | 'toneStrength' | 'vibrancy'>>> = {
  balanced: { tintStrength: 1.0, shadeStrength: 1.0, toneStrength: 1.0, vibrancy: 1.0 },
  vivid: { tintStrength: 0.90, shadeStrength: 0.92, toneStrength: 0.55, vibrancy: 1.16 },
  soft: { tintStrength: 1.10, shadeStrength: 0.86, toneStrength: 1.15, vibrancy: 0.78 },
  ink: { tintStrength: 0.92, shadeStrength: 1.24, toneStrength: 0.85, vibrancy: 0.96 }
};

export function getPaletteProfile(profile: PaletteProfile = 'vivid') {
  return { ...PROFILE[profile] };
}

export function getBrightnessTargets(overrides?: Partial<Record<PaletteStep, number>>): Record<PaletteStep, number> {
  return { ...TARGET_BRIGHTNESS, ...(overrides ?? {}) };
}

export function calculateStopFromColor(seed: string, targets = TARGET_BRIGHTNESS): PaletteStep {
  const b = visualBrightness(seed);
  let best: PaletteStep = 500;
  let bestDiff = Infinity;
  for (const step of STEPS) {
    const diff = Math.abs(targets[step] - b);
    if (diff < bestDiff) {
      best = step;
      bestDiff = diff;
    }
  }
  return best;
}

function resolveOptions(options: PaletteOptions) {
  const profile = options.profile ?? 'vivid';
  const base = PROFILE[profile];
  return {
    profile,
    tintStrength: clamp(options.tintStrength ?? base.tintStrength, 0.35, 2.25),
    shadeStrength: clamp(options.shadeStrength ?? base.shadeStrength, 0.35, 2.25),
    toneStrength: clamp(options.toneStrength ?? base.toneStrength, 0, 2.5),
    vibrancy: clamp(options.vibrancy ?? base.vibrancy, 0.2, 2.4),
    stopSelection: options.stopSelection ?? 'auto' as const,
    brightnessTargets: getBrightnessTargets(options.brightnessTargets)
  };
}

function cubicBezier(a: number, b: number, c: number, d: number, t: number) {
  t = clamp(t);
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
}

function signedHueDistance(from: number, to: number) {
  let d = wrapHue(to) - wrapHue(from);
  if (d > 180) d -= 360;
  if (d < -180) d += 360;
  return d;
}

type SeedKind = 'neutral' | 'near-neutral' | 'chromatic';

function seedKind(rgb: Rgb): SeedKind {
  const hsl = rgbToHsl(rgb);
  const oklch = rgbToOklch(rgb);
  const hwb = rgbToHwb(rgb);
  const colourStrength = Math.max(0, 100 - hwb.w - hwb.b);

  // True greys and near-greys should stay neutral.
  // This catches #212121 and #71717a without treating pale chromatic tints as grey.
  if (hsl.s < 8 || oklch.C < 0.01) return 'neutral';

  // Pale chromatic colours such as #f6f0fc sit close to the neutral axis but
  // still carry a hue bias. They need a tinted-neutral ramp, not a flat grey ramp.
  if (oklch.C < 0.045 || colourStrength < 12) return 'near-neutral';

  return 'chromatic';
}

function neutralAtBrightness(target: number): Rgb {
  const v = Math.round(clamp(target) * 255);
  return { r: v, g: v, b: v };
}

/**
 * Hue-family compensation for the light and dark sides.
 * This is the layer that stops violet/purple tints drifting into pink.
 */
function hueFamilyShift(seedHue: number, side: 'light' | 'dark') {
  const h = wrapHue(seedHue);

  // Violet/purple: lighter tints must lean blue, otherwise RGB/HSP mixing reads as pink/lilac.
  if (h >= 250 && h <= 285) return side === 'light' ? -16 : 5;

  // Purple/magenta boundary: still cool the light side, but less aggressively.
  if (h > 285 && h <= 315) return side === 'light' ? -8 : 2;

  // Hot pink: preserve the pink identity; just avoid overshooting into red on darks.
  if (h > 315 && h <= 345) return side === 'light' ? -3 : -3;

  // Blue: slightly cyan tints are usually cleaner than violet-grey tints.
  if (h >= 205 && h < 250) return side === 'light' ? 4 : -2;

  // Cyan: keep stable.
  if (h >= 170 && h < 205) return side === 'light' ? 0 : 0;

  // Green: tiny yellow lift on light side keeps it from looking grey.
  if (h >= 95 && h < 170) return side === 'light' ? -3 : 2;

  // Yellow/orange: avoid dirty green or brown shifts.
  if (h >= 35 && h < 95) return side === 'light' ? 0 : -4;

  // Red/orange: small warm correction in lights, slightly cooler darks to avoid mud.
  if (h < 35 || h >= 345) return side === 'light' ? 2 : -4;

  return 0;
}

function sideProgress(step: PaletteStep, anchor: PaletteStep) {
  const anchorIndex = STEPS.indexOf(anchor);
  const index = STEPS.indexOf(step);
  if (index < anchorIndex) return (anchorIndex - index) / Math.max(1, anchorIndex);
  if (index > anchorIndex) return (index - anchorIndex) / Math.max(1, STEPS.length - 1 - anchorIndex);
  return 0;
}

function targetBrightnessForStep(
  step: PaletteStep,
  anchor: PaletteStep,
  seedBrightness: number,
  targets: Record<PaletteStep, number>,
  opts: ReturnType<typeof resolveOptions>
) {
  if (step === anchor) return seedBrightness;

  if (step < anchor) {
    const span = STEPS.filter((s) => s <= anchor);
    const t = span.indexOf(step) / Math.max(1, span.length - 1);
    const base = lerp(targets[span[0]], seedBrightness, easeInOut(t));
    // Tint strength now has a visible effect: higher values push light stops
    // further towards the light-side target; lower values keep them closer to the seed.
    return clamp(seedBrightness + (base - seedBrightness) * opts.tintStrength, 0, 1);
  }

  const span = STEPS.filter((s) => s >= anchor);
  const t = span.indexOf(step) / Math.max(1, span.length - 1);
  const base = lerp(seedBrightness, targets[950], easeInOut(t));
  // Shade strength now has a visible effect: higher values push dark stops
  // further towards black; lower values keep them closer to the seed.
  return clamp(seedBrightness - (seedBrightness - base) * opts.shadeStrength, 0, 1);
}

function solveHslLightnessForBrightness(h: number, s: number, target: number): { rgb: Rgb; l: number } {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 32; i++) {
    const mid = (lo + hi) / 2;
    const rgb = hslToRgb({ h, s: s * 100, l: mid * 100 });
    if (visualBrightness(rgb) < target) lo = mid;
    else hi = mid;
  }
  const l = (lo + hi) / 2;
  return { rgb: hslToRgb({ h, s: s * 100, l: l * 100 }), l };
}

function generateChromaticStop(seed: Rgb, step: PaletteStep, anchor: PaletteStep, target: number, opts: ReturnType<typeof resolveOptions>): Rgb {
  const seedHsl = rgbToHsl(seed);
  const seedHue = seedHsl.h;
  const seedSat = clamp(seedHsl.s / 100, 0, 1);

  if (step === anchor) return seed;

  const side: 'light' | 'dark' = step < anchor ? 'light' : 'dark';
  const rawT = sideProgress(step, anchor);

  // Bezier-shaped progress. The control points are intentionally asymmetric:
  // lights need a slower hue/sat move near the seed; darks can move sooner.
  const t = side === 'light'
    ? cubicBezier(0, 0.18, 0.82, 1, rawT)
    : cubicBezier(0, 0.26, 0.74, 1, rawT);

  // Tone strength now matters. It controls how much hue-family compensation is applied.
  // 0 = no hue drift; 1 = profile default; >1 = stronger hue-family character.
  const hueShift = hueFamilyShift(seedHue, side) * opts.toneStrength;
  const h = wrapHue(seedHue + hueShift * t);

  let endSat: number;
  if (side === 'light') {
    // Vivid tints keep more colour. Soft profiles reduce colour away from the anchor.
    endSat = clamp(seedSat * (0.40 + 0.42 * opts.vibrancy), 0.08, 1);
  } else {
    // Darks retain colour, but not so much that all deep stops flatten into the same maxed colour.
    endSat = clamp(seedSat * (0.64 + 0.30 * opts.vibrancy), 0.08, 1);
  }

  // Saturation follows a cubic path through control points. Vibrancy has a visible effect
  // because it changes the end saturation reached by the far light/dark stops.
  const s = side === 'light'
    ? cubicBezier(seedSat, seedSat, (seedSat + endSat) / 2, endSat, t)
    : cubicBezier(seedSat, seedSat * 0.98, endSat, endSat, t);

  return solveHslLightnessForBrightness(h, clamp(s), target).rgb;
}


function generateNearNeutralStop(seed: Rgb, step: PaletteStep, anchor: PaletteStep, target: number, opts: ReturnType<typeof resolveOptions>): Rgb {
  const seedHsl = rgbToHsl(seed);
  const seedHwb = rgbToHwb(seed);
  const seedOklch = rgbToOklch(seed);

  if (step === anchor) return seed;

  const side: 'light' | 'dark' = step < anchor ? 'light' : 'dark';
  const rawT = sideProgress(step, anchor);
  const t = side === 'light'
    ? cubicBezier(0, 0.22, 0.78, 1, rawT)
    : cubicBezier(0, 0.30, 0.70, 1, rawT);

  const colourStrength = Math.max(0, 100 - seedHwb.w - seedHwb.b) / 100;

  // Near-neutral colours must retain a small hue bias.  HSL saturation on pale
  // colours is misleadingly high, so use colour-strength and OKLCH chroma to
  // derive a much smaller, more believable bias.
  const baseBias = clamp(Math.max(colourStrength * 1.8, seedOklch.C * 6), 0.035, 0.18);

  let endSat: number;
  if (side === 'light') {
    endSat = clamp(baseBias * (0.55 + 0.20 * opts.vibrancy), 0.025, 0.16);
  } else {
    endSat = clamp(baseBias * (1.35 + 0.75 * opts.vibrancy), 0.055, 0.30);
  }

  // Keep the original hue, but let the same family compensation apply gently.
  const h = wrapHue(seedHsl.h + hueFamilyShift(seedHsl.h, side) * opts.toneStrength * t * 0.35);

  // If the anchor was a very light tint, do not let the next stops immediately
  // snap to grey. Move saturation gradually from the seed's real colour bias to
  // the light/dark endpoint.
  const seedBias = clamp(baseBias, 0.03, 0.22);
  const s = side === 'light'
    ? cubicBezier(seedBias, seedBias * 0.9, endSat, endSat, t)
    : cubicBezier(seedBias, seedBias * 1.05, endSat, endSat, t);

  return solveHslLightnessForBrightness(h, clamp(s), target).rgb;
}

export function generatePalette(seedHex: string, options: PaletteOptions = {}): PaletteStop[] {
  const opts = resolveOptions(options);
  const seed = parseHex(seedHex);
  const seedBrightness = visualBrightness(seed);
  const anchor = opts.stopSelection === 'manual' && options.anchor
    ? options.anchor
    : calculateStopFromColor(seedHex, opts.brightnessTargets);
  const kind = seedKind(seed);

  const stops: PaletteStop[] = [];
  let previous: Rgb | null = null;

  for (const step of STEPS) {
    const target = targetBrightnessForStep(step, anchor, seedBrightness, opts.brightnessTargets, opts);
    let rgb: Rgb;

    if (step === anchor) {
      rgb = seed;
    } else if (kind === 'neutral') {
      rgb = neutralAtBrightness(target);
    } else if (kind === 'near-neutral') {
      rgb = generateNearNeutralStop(seed, step, anchor, target, opts);
    } else {
      rgb = generateChromaticStop(seed, step, anchor, target, opts);
    }

    const hex = rgbToHex(rgb);
    const hwb = rgbToHwb(rgb);
    const hsl = rgbToHsl(rgb);
    const oklab = rgbToOklab(rgb);
    const oklch = rgbToOklch(rgb);
    const brightness = visualBrightness(rgb);
    const deltaE = previous ? deltaOklab(previous, rgb) : null;
    previous = rgb;
    const contrastWhite = contrastRatio(rgb, '#ffffff');
    const contrastBlack = contrastRatio(rgb, '#000000');
    const colourStrength = Math.max(0, 100 - hwb.w - hwb.b);

    stops.push({
      step,
      hex,
      rgb: { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) },
      hsl,
      hwb,
      oklab,
      oklch,
      brightness: round(brightness, 4),
      targetBrightness: round(target, 4),
      mix: {
        white: round(hwb.w / 100, 4),
        black: round(hwb.b / 100, 4),
        colour: round(colourStrength / 100, 4)
      },
      colourStrength: round(colourStrength, 2),
      text: bestTextColour(rgb),
      contrast: {
        white: round(contrastWhite, 2),
        black: round(contrastBlack, 2)
      },
      deltaE: deltaE == null ? null : round(deltaE, 4),
      anchor: step === anchor,
      seedKind: kind
    } as PaletteStop);
  }

  return stops;
}

export function paletteToCssVars(name: string, palette: PaletteStop[]): string {
  const safe = name.trim().toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '') || 'color';
  return `:root {\n${palette.map((s) => `  --${safe}-${s.step}: ${s.hex};`).join('\n')}\n}`;
}

export function assessPaletteQuality(palette: PaletteStop[], options: { seed?: string; anchor?: PaletteStep } = {}): PaletteQuality {
  const issues: string[] = [];
  const warnings: string[] = [];
  const checks = [] as PaletteQuality['checks'];
  const anchor = options.anchor ?? palette.find((s) => s.anchor)?.step ?? 500;

  const badHex = palette.filter((s) => !/^#[0-9a-f]{6}$/i.test(s.hex));
  if (badHex.length) issues.push(`${badHex.length} invalid hex output(s).`);
  checks.push({ label: 'Valid hex output', status: badHex.length ? 'fail' : 'pass', message: badHex.length ? 'Invalid hex values found.' : 'All palette stops are valid hex colours.' });

  if (options.seed) {
    const stop = palette.find((s) => s.step === anchor);
    const seed = rgbToHex(parseHex(options.seed));
    const preserved = stop?.hex.toLowerCase() === seed.toLowerCase();
    if (!preserved) issues.push(`Seed was not preserved at ${anchor}.`);
    checks.push({ label: 'Seed preserved', status: preserved ? 'pass' : 'fail', message: preserved ? `${anchor} equals the seed.` : `${anchor} does not equal ${seed}.` });
  }

  const duplicateCount = palette.length - new Set(palette.map((s) => s.hex.toLowerCase())).size;
  if (duplicateCount) warnings.push(`${duplicateCount} duplicate stop colour(s).`);
  checks.push({ label: 'Distinct stops', status: duplicateCount ? 'warn' : 'pass', message: duplicateCount ? `${duplicateCount} duplicate(s) found.` : 'All stops are distinct.' });

  let ordered = true;
  for (let i = 1; i < palette.length; i++) {
    if (palette[i].brightness > palette[i - 1].brightness + 0.035) ordered = false;
  }
  if (!ordered) warnings.push('Brightness order has visible reversals.');
  checks.push({ label: 'Brightness order', status: ordered ? 'pass' : 'warn', message: ordered ? 'Brightness descends from light to dark.' : 'Brightness has one or more reversals.' });

  const hugeJump = palette.some((s) => (s.deltaE ?? 0) > 0.36);
  if (hugeJump) warnings.push('One or more adjacent stops have a large perceptual jump.');
  checks.push({ label: 'Adjacent smoothness', status: hugeJump ? 'warn' : 'pass', message: hugeJump ? 'Large adjacent jump detected.' : 'Adjacent stops are within expected range.' });

  const score = Math.max(0, 100 - issues.length * 35 - warnings.length * 8);
  return { pass: issues.length === 0, score, anchor, checks, issues, warnings };
}

export const validatePalette = assessPaletteQuality;
