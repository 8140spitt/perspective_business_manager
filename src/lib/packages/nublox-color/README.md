# @nublox/color

Dependency-free TypeScript palette generator.

This build uses a **Bezier paint-path engine**:

```text
seed colour
→ measure visual brightness using HSP brightness
→ auto-pick nearest stop, or use manual anchor
→ preserve seed exactly at anchor
→ generate light/dark paths with cubic Bezier curves
→ apply hue-family compensation so purple tints do not drift pink
→ hit visual brightness targets with HSL lightness solving
→ output hex/rgb/hwb/hsl/oklch metadata
```

OKLCH is metadata only. It is not the primary generator.

## Use

```ts
import { generatePalette, paletteToCssVars } from '$lib/packages/nublox-color/dist';

const palette = generatePalette('#9437ff');
console.log(paletteToCssVars('purple', palette));
```

Manual anchor:

```ts
generatePalette('#ff00f3', {
  stopSelection: 'manual',
  anchor: 950
});
```

Auto anchor:

```ts
generatePalette('#71717a', {
  stopSelection: 'auto'
});
```

## Build

```bash
cd src/lib/packages/nublox-color
pnpm build
pnpm test
```

## Svelte tester

Copy `ColorEngineTest.svelte` to `src/lib/components/ColorEngineTest.svelte` or use it directly as a reference.

## v1.2.2 near-neutral handling

This build adds a third seed classification:

- `neutral` — true greys stay grey (`#212121`, `#71717a`)
- `near-neutral` — pale tinted neutrals keep their hue bias (`#f6f0fc`)
- `chromatic` — full colour ramps use the Bezier paint path

The key fix is that colours such as `#f6f0fc` no longer collapse into a plain greyscale ramp. They generate a lavender-tinted neutral ramp while preserving the seed at the auto-selected anchor.
