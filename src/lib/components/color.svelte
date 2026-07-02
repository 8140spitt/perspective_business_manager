<script lang="ts">
	import {
		generateRamp,
		rampToCssVars,
		resolveProfile,
		STOPS,
		type ColorStop,
		type Hex,
		type Ramp,
		type RampProfileName,
		type Stop
	} from '$lib/packages/nublox-color/dist';

	type StopSelection = 'auto' | 'manual';

	let seed = $state<Hex>('#9437ff');
	let name = $state('brand');
	let stopSelection = $state<StopSelection>('auto');
	let anchor = $state<Stop>(500);
	let profile = $state<RampProfileName>('ui');

	function calculateStopFromColor(hex: Hex): Stop {
		const ramp = generateRamp(hex, { profile: 'ui', referenceStop: 500 });
		const baseL = ramp[500].oklch.l;

		let closest: Stop = 500;
		let best = Infinity;

		for (const stop of STOPS) {
			const distance = Math.abs(ramp[stop].oklch.l - baseL);
			if (distance < best) {
				best = distance;
				closest = stop;
			}
		}

		return closest;
	}

	let autoAnchor = $derived(calculateStopFromColor(seed));
	let activeAnchor = $derived(stopSelection === 'auto' ? autoAnchor : anchor);

	let ramp: Ramp = $derived(
		generateRamp(seed, {
			profile,
			referenceStop: activeAnchor,
			explain: true
		})
	);

	let palette: ColorStop[] = $derived(STOPS.map((stop) => ramp[stop]));

	let activeProfile = $derived(resolveProfile(profile));
	let cssVars = $derived(rampToCssVars(name || 'brand', ramp));

	let quality = $derived.by(() => {
		const stops = palette;
		const compressed = stops.filter((s) => s.metrics.gamutCompressed).length;
		const poorContrast = stops.filter(
			(s) => Math.max(s.metrics.contrastOnWhite, s.metrics.contrastOnBlack) < 4.5
		).length;

		const deltaValues = stops
			.map((s) => s.metrics.deltaEFromPrevious)
			.filter((v): v is number => typeof v === 'number');

		const averageDelta =
			deltaValues.length > 0 ? deltaValues.reduce((a, b) => a + b, 0) / deltaValues.length : 0;

		const deltaVariance =
			deltaValues.length > 0
				? deltaValues.reduce((sum, value) => sum + Math.abs(value - averageDelta), 0) /
					deltaValues.length
				: 0;

		const score = Math.max(
			0,
			Math.round(100 - compressed * 4 - poorContrast * 8 - deltaVariance * 2)
		);

		return {
			score,
			pass: score >= 75,
			issues: [
				...(poorContrast > 0
					? [`${poorContrast} stops have weak black/white foreground contrast.`]
					: [])
			],
			warnings: [
				...(compressed > 0 ? [`${compressed} stops required sRGB gamut compression.`] : []),
				...(deltaVariance > 6 ? ['Perceptual spacing is uneven across the ramp.'] : [])
			]
		};
	});

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
				<option value="auto">Auto from lightness</option>
				<option value="manual">Manual reference stop</option>
			</select>
		</label>

		<label>
			Reference stop
			<select bind:value={anchor} disabled={stopSelection === 'auto'}>
				{#each STOPS as stop}
					<option value={stop}>{stop}</option>
				{/each}
			</select>
		</label>

		<label>
			Profile
			<select bind:value={profile}>
				<option value="ui">UI</option>
				<option value="paint">Paint</option>
				<option value="accessibility">Accessibility</option>
				<option value="display">Display</option>
			</select>
		</label>
	</div>

	<div class="summary">
		<div><strong>Engine</strong> NuBlox perceptual monochromatic ramp</div>
		<div><strong>Profile</strong> {activeProfile.name}</div>
		<div><strong>Reference stop</strong> {activeAnchor}</div>
		<div class:pass={quality.pass} class:fail={!quality.pass}>
			<strong>Quality</strong>
			{quality.score}/100
		</div>
	</div>

	<p class="description">{activeProfile.description}</p>

	{#if quality.issues.length > 0 || quality.warnings.length > 0}
		<ul class="issues">
			{#each quality.issues as issue}<li>{issue}</li>{/each}
			{#each quality.warnings as warning}<li>{warning}</li>{/each}
		</ul>
	{/if}

	<div class="ramp">
		{#each palette as stop}
			<div class:anchor={stop.stop === activeAnchor} class="swatch">
				<div class="chip" style={`background:${stop.hex}; color:${stop.metrics.preferredText}`}>
					<span>{stop.stop}</span>
				</div>

				<div class="meta">
					<strong>{stop.hex}</strong>
					<span>OKLCH {n(stop.oklch.l, 3)} {n(stop.oklch.c, 3)} {n(stop.oklch.h, 1)}</span>
					<span>Luminance {n(stop.metrics.luminance, 3)}</span>
					<span>Target L {n(stop.metrics.targetLightness, 3)}</span>
					<span>Actual L {n(stop.metrics.actualLightness, 3)}</span>
					<span>Chroma scale {n(stop.metrics.chromaScale, 3)}</span>
					<span>Hue adjust {n(stop.metrics.hueAdjustment, 2)}°</span>
					<span
						>Contrast W {n(stop.metrics.contrastOnWhite, 2)} B {n(
							stop.metrics.contrastOnBlack,
							2
						)}</span
					>
					<span>ΔE prev {n(stop.metrics.deltaEFromPrevious, 3)}</span>
					<span>ΔE base {n(stop.metrics.deltaEFromBase, 3)}</span>
					<span>Objective {n(stop.metrics.objectiveScore, 2)}</span>

					{#if stop.metrics.gamutCompressed}
						<span class="warn">Gamut compressed: {stop.metrics.gamutCompressionSteps} steps</span>
					{/if}
				</div>
			</div>
		{/each}
	</div>

	<h3>CSS variables</h3>
	<pre>{cssVars}</pre>

	<h3>Raw first stop</h3>
	<pre>{JSON.stringify(palette[0], null, 2)}</pre>
</section>
