# @nublox/color

A zero-dependency TypeScript colour definition engine for perceptual monochromatic ramps, semantic palettes, accessibility metrics and design tokens.

This is not just a hex palette generator. It is an explainable colour system: every generated stop includes the colour value, OKLCH coordinates, WCAG contrast metrics, ΔE spacing, gamut-compression data and notes explaining what the engine changed.

## Core term

**Perceptual Monochromatic Ramp**

An ordered sequence of colour stops derived from a single source colour, where lightness, chroma and, where necessary, hue are adjusted to produce visually balanced steps while preserving the character of the source colour.

## Install locally

```bash
npm install
npm run build
npm run dev
npm test
```

## Usage

```ts
import { generateRamp, createTheme, isWcagAA } from '@nublox/color';

const purple = generateRamp('#7C3AED', {
  profile: 'ui'
});

console.log(purple[500].hex);
console.log(purple[500].metrics.preferredText);
console.log(purple[500].metrics.contrastOnWhite);

const theme = createTheme({
  primary: '#7C3AED',
  success: '#16A34A',
  warning: '#F59E0B',
  danger: '#DC2626'
});

console.log(theme.css);
console.log(theme.tokens);
```

## Profiles

- `ui` — balanced interface ramp with contrast and smoothness.
- `paint` — more pigment-like hue movement and softer chroma.
- `accessibility` — prioritises readable foreground/background pairings.
- `display` — preserves stronger chroma for vivid display-oriented palettes.

## What it currently includes

- Hex/sRGB parsing and output.
- sRGB gamma encode/decode.
- sRGB ↔ OKLab ↔ OKLCH conversion.
- Perceptual 50–950 ramp generation.
- Hue-aware chroma compression.
- Small perceptual hue compensation.
- sRGB gamut fitting by chroma reduction.
- WCAG relative luminance and contrast ratio.
- Preferred black/white foreground selection.
- ΔEOK spacing metrics.
- Explainable stop metrics.
- CSS custom-property export.
- Design-token JSON export.
- Theme generation from semantic colours.

## Architecture

```text
src/
├── accessibility/
├── exporters/
├── math/
├── models/
├── optimisation/
├── profiles/
├── ramp.ts
├── theme.ts
└── index.ts
```

## The long-term target

NuBlox Color should become a colour decision engine, not a colour calculator.

Instead of asking:

> What is the colour for stop 600?

You ask:

> Given this base colour, target medium, accessibility standard and design profile, what is the best defensible colour system?

Future phases should add:

- Real iterative optimiser.
- APCA contrast.
- CIEDE2000 comparison.
- Display P3 and Rec.2020 support.
- CMYK/print profile support.
- Colour-blindness simulation.
- Figma Tokens export.
- Style Dictionary export.
- Tailwind export.
- Dark-mode generation.
- High-contrast theme generation.
- Palette repair and improvement.
