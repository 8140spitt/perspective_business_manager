<script lang="ts">
	import { capabilityMap, ricsInstructionLifecycle } from '$lib/business/capability-map';

	const statusLabel = {
		foundation: 'Foundation model exists',
		scaffolded: 'Screen scaffolded',
		future: 'Future build'
	};

	const foundationCount = capabilityMap.filter((area) => area.status === 'foundation').length;
	const scaffoldedCount = capabilityMap.filter((area) => area.status === 'scaffolded').length;
	const routeCount = capabilityMap.reduce((total, area) => total + area.currentRoutes.length, 0);
</script>

<svelte:head>
	<title>Operating Model | Perspective Business Manager</title>
</svelte:head>

<section class="shell">
	<div class="hero">
		<p class="eyebrow">Perspective Business Manager</p>
		<h1>RICS practice ERP realigned around business capability.</h1>
		<p class="lede">
			The app keeps the existing module routes, but the design authority now comes from the
			business operating model: client, instruction, property, project, people, finance,
			compliance and records.
		</p>
	</div>

	<div class="metrics" aria-label="Realignment summary">
		<div class="metric">
			<strong>{capabilityMap.length}</strong>
			<span>capability areas</span>
		</div>
		<div class="metric">
			<strong>{foundationCount}</strong>
			<span>foundation areas</span>
		</div>
		<div class="metric">
			<strong>{scaffoldedCount}</strong>
			<span>scaffolded areas</span>
		</div>
		<div class="metric">
			<strong>{routeCount}</strong>
			<span>mapped routes</span>
		</div>
	</div>

	<section class="panel">
		<div>
			<p class="eyebrow">Primary business thread</p>
			<h2>Instruction lifecycle</h2>
		</div>

		<ol class="timeline">
			{#each ricsInstructionLifecycle as step, index}
				<li>
					<span>{String(index + 1).padStart(2, '0')}</span>
					<p>{step}</p>
				</li>
			{/each}
		</ol>
	</section>

	<section class="capabilities" aria-label="Capability map">
		{#each capabilityMap as area}
			<article class="card">
				<div class="card-header">
					<p class="status" data-status={area.status}>{statusLabel[area.status]}</p>
					<h2>{area.name}</h2>
				</div>

				<p>{area.description}</p>

				<div class="meta">
					<span>Primary route</span>
					<a href={area.primaryRoute}>{area.primaryRoute}</a>
				</div>

				<div class="chips" aria-label="Core objects">
					{#each area.coreObjects as object}
						<span>{object}</span>
					{/each}
				</div>
			</article>
		{/each}
	</section>
</section>

<style>
	.shell {
		display: grid;
		gap: 1.5rem;
		padding: clamp(1rem, 3vw, 2.5rem);
		background:
			radial-gradient(circle at top left, color-mix(in oklch, CanvasText 8%, transparent), transparent 28rem),
			Canvas;
		color: CanvasText;
	}

	.hero,
	.panel,
	.card,
	.metric {
		border: 1px solid color-mix(in oklch, CanvasText 14%, transparent);
		background: color-mix(in oklch, Canvas 92%, CanvasText 8%);
		box-shadow: 0 1rem 3rem color-mix(in oklch, CanvasText 8%, transparent);
	}

	.hero {
		display: grid;
		gap: 1rem;
		padding: clamp(1.5rem, 5vw, 4rem);
		border-radius: 2rem;
	}

	.eyebrow,
	.status {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		opacity: 0.68;
	}

	h1,
	h2,
	p {
		margin: 0;
	}

	h1 {
		max-width: 14ch;
		font-size: clamp(2.5rem, 8vw, 6rem);
		line-height: 0.9;
		letter-spacing: -0.07em;
	}

	h2 {
		font-size: clamp(1.15rem, 2vw, 1.65rem);
		letter-spacing: -0.035em;
	}

	.lede {
		max-width: 72ch;
		font-size: clamp(1rem, 2vw, 1.25rem);
		line-height: 1.65;
		opacity: 0.78;
	}

	.metrics {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 1rem;
	}

	.metric {
		display: grid;
		gap: 0.25rem;
		padding: 1.25rem;
		border-radius: 1.25rem;
	}

	.metric strong {
		font-size: 2rem;
		line-height: 1;
	}

	.metric span,
	.meta span {
		opacity: 0.65;
	}

	.panel {
		display: grid;
		gap: 1.25rem;
		padding: clamp(1rem, 3vw, 2rem);
		border-radius: 1.5rem;
	}

	.timeline {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 0.75rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.timeline li {
		display: grid;
		gap: 0.35rem;
		align-content: start;
		min-height: 6rem;
		padding: 1rem;
		border-radius: 1rem;
		background: color-mix(in oklch, Canvas 80%, CanvasText 20%);
	}

	.timeline span {
		font-size: 0.75rem;
		font-weight: 800;
		opacity: 0.5;
	}

	.capabilities {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
		gap: 1rem;
	}

	.card {
		display: grid;
		gap: 1rem;
		align-content: start;
		padding: 1.25rem;
		border-radius: 1.25rem;
	}

	.card-header {
		display: grid;
		gap: 0.35rem;
	}

	.card > p {
		line-height: 1.55;
		opacity: 0.76;
	}

	.status[data-status='foundation'] {
		opacity: 1;
	}

	.meta {
		display: grid;
		gap: 0.2rem;
		font-size: 0.9rem;
	}

	a {
		color: inherit;
		font-weight: 700;
		text-decoration-thickness: 0.08em;
		text-underline-offset: 0.18em;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.chips span {
		padding: 0.35rem 0.55rem;
		border-radius: 999px;
		background: color-mix(in oklch, CanvasText 10%, transparent);
		font-size: 0.78rem;
		font-weight: 700;
	}
</style>
