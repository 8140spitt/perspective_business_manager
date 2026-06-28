<script lang="ts">
	import {
		assessPaletteQuality,
		calculateStopFromColor,
		generatePalette,
		getPaletteProfile,
		paletteToCssVars,
		type PaletteStep
	} from '$lib/packages/nublox-color/dist';

	type StopSelection = 'auto' | 'manual';
	type Profile = 'balanced' | 'vivid' | 'soft' | 'ink';

	let seed = $state('#9437ff');
	let name = $state('brand');
	let stopSelection = $state<StopSelection>('auto');
	let anchor = $state<PaletteStep>(500);
	let profile = $state<Profile>('vivid');
	let tintStrength = $state(0.9);
	let shadeStrength = $state(0.92);
	let toneStrength = $state(0.55);
	let vibrancy = $state(1.16);

	$effect(() => {
		const preset = getPaletteProfile(profile);
		tintStrength = preset.tintStrength;
		shadeStrength = preset.shadeStrength;
		toneStrength = preset.toneStrength;
		vibrancy = preset.vibrancy;
	});

	let autoAnchor = $derived(calculateStopFromColor(seed));
	let activeAnchor = $derived(stopSelection === 'auto' ? autoAnchor : anchor);

	let palette = $derived(
		generatePalette(seed, {
			stopSelection,
			anchor,
			profile,
			tintStrength,
			shadeStrength,
			toneStrength,
			vibrancy
		})
	);

	let quality = $derived(assessPaletteQuality(palette, { seed, anchor: activeAnchor }));
	let cssVars = $derived(paletteToCssVars(name || 'brand', palette));

	function n(value: unknown, digits = 2) {
		return typeof value === 'number' && Number.isFinite(value) ? value.toFixed(digits) : '—';
	}
</script>

<section class="tester">
	<div class="controls">
		<label>
			Seed
			<input type="color" bind:value={seed} />
			<input type="text" bind:value={seed} />
		</label>

		<code>{seed}</code>

		<label>
			Token name
			<input type="text" bind:value={name} />
		</label>

		<label>
			Stop selection
			<select bind:value={stopSelection}>
				<option value="auto">Auto from brightness</option>
				<option value="manual">Manual anchor</option>
			</select>
		</label>

		<label>
			Anchor
			<select bind:value={anchor} disabled={stopSelection === 'auto'}>
				<option value={50}>50</option>
				<option value={100}>100</option>
				<option value={200}>200</option>
				<option value={300}>300</option>
				<option value={400}>400</option>
				<option value={500}>500</option>
				<option value={600}>600</option>
				<option value={700}>700</option>
				<option value={800}>800</option>
				<option value={900}>900</option>
				<option value={950}>950</option>
			</select>
		</label>

		<label>
			Profile
			<select bind:value={profile}>
				<option value="vivid">Vivid</option>
				<option value="balanced">Balanced</option>
				<option value="soft">Soft</option>
				<option value="ink">Ink</option>
			</select>
		</label>
	</div>

	<div class="sliders">
		<label
			>Tint <input type="range" min="0.5" max="1.5" step="0.01" bind:value={tintStrength} />
			{n(tintStrength, 2)}</label
		>
		<label
			>Shade <input type="range" min="0.5" max="1.5" step="0.01" bind:value={shadeStrength} />
			{n(shadeStrength, 2)}</label
		>
		<label
			>Tone <input type="range" min="0" max="2" step="0.01" bind:value={toneStrength} />
			{n(toneStrength, 2)}</label
		>
		<label
			>Vibrancy <input type="range" min="0.5" max="1.5" step="0.01" bind:value={vibrancy} />
			{n(vibrancy, 2)}</label
		>
	</div>

	<div class="summary">
		<div><strong>Engine</strong> Bezier visual-brightness paint path</div>
		<div><strong>Anchor</strong> {activeAnchor}</div>
		<div class:pass={quality.pass} class:fail={!quality.pass}>
			<strong>Quality</strong>
			{quality.score}/100
		</div>
	</div>

	{#if quality.issues.length > 0 || quality.warnings.length > 0}
		<ul class="issues">
			{#each quality.issues as issue}<li>{issue}</li>{/each}
			{#each quality.warnings as warning}<li>{warning}</li>{/each}
		</ul>
	{/if}

	<div class="ramp">
		{#each palette as stop}
			<div class:anchor={stop.anchor} class="swatch">
				<div class="chip" style={`background:${stop.hex}; color:${stop.text}`}>
					<span>{stop.step}</span>
				</div>
				<div class="meta">
					<strong>{stop.hex}</strong>
					<span>brightness {n(stop.brightness, 3)} / target {n(stop.targetBrightness, 3)}</span>
					<span
						>mix W {n(stop.mix.white * 100, 1)} B {n(stop.mix.black * 100, 1)} C {n(
							stop.mix.colour * 100,
							1
						)}</span
					>
					<span>HWB {n(stop.hwb.h, 1)} {n(stop.hwb.w, 1)}% {n(stop.hwb.b, 1)}%</span>
					<span>OKLCH {n(stop.oklch.L, 3)} {n(stop.oklch.C, 3)} {n(stop.oklch.h, 1)}</span>
					<span>contrast W {n(stop.contrast.white, 2)} B {n(stop.contrast.black, 2)}</span>
					<span>ΔE {n(stop.deltaE, 3)}</span>
				</div>
			</div>
		{/each}
	</div>

	<h3>CSS variables</h3>
	<pre>{cssVars}</pre>

	<h3>Raw first stop</h3>
	<pre>{JSON.stringify(palette[0], null, 2)}</pre>
</section>

<style>
	.tester {
		display: grid;
		gap: 1.5rem;
		padding: 1.5rem;
		font-family: system-ui, sans-serif;
	}
	.controls {
		display: flex;
		flex-wrap: wrap;
		align-items: end;
		gap: 1rem;
	}
	label {
		display: grid;
		gap: 0.35rem;
		font-weight: 700;
	}
	input[type='text'],
	input[type='number'],
	select {
		padding: 0.5rem 0.65rem;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
	}
	input[type='color'] {
		width: 4rem;
		height: 2.5rem;
	}
	code {
		padding: 0.55rem 0.7rem;
		border-radius: 0.5rem;
		background: #f3f4f6;
		font-weight: 700;
	}
	.sliders {
		display: grid;
		gap: 0.65rem;
		max-width: 48rem;
	}
	.sliders label {
		grid-template-columns: 6rem 1fr 3rem;
		align-items: center;
	}
	.summary {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}
	.summary > div {
		width: fit-content;
		padding: 0.6rem 0.8rem;
		border-radius: 0.6rem;
		background: #f3f4f6;
	}
	.pass {
		background: #dcfce7 !important;
		color: #14532d;
	}
	.fail {
		background: #fee2e2 !important;
		color: #7f1d1d;
	}
	.issues {
		margin: 0;
		padding-left: 1.25rem;
		color: #7f1d1d;
	}
	.ramp {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 1rem;
	}
	.swatch {
		overflow: hidden;
		border: 1px solid #ddd;
		border-radius: 0.75rem;
		background: white;
	}
	.swatch.anchor {
		outline: 3px solid #111;
	}
	.chip {
		display: grid;
		min-height: 5rem;
		place-items: center;
		font-size: 1.25rem;
		font-weight: 900;
	}
	.meta {
		display: grid;
		gap: 0.2rem;
		padding: 0.75rem;
		font-size: 0.72rem;
	}
	pre {
		overflow: auto;
		padding: 1rem;
		border-radius: 0.75rem;
		background: #111;
		color: #eee;
	}
</style>
