<script lang="ts">
	import { capabilityMap, type CapabilityArea } from '$lib/business/capability-map';

	const statusLabel: Record<CapabilityArea['status'], string> = {
		foundation: 'Foundation',
		scaffolded: 'Next',
		future: 'Later'
	};

	const operatingLanes = capabilityMap;
	const foundationLanes = operatingLanes.filter((lane) => lane.status === 'foundation');
</script>

<svelte:head>
	<title>Operating Model | Perspective Business Manager</title>
</svelte:head>

<section class="page-shell">
	<section class="hero">
		<p class="eyebrow">Perspective Business Manager</p>
		<h1>One business. Seven clear lanes.</h1>
		<p class="lede">
			PBM is not a pile of modules. It is one integrated business system with clear workspaces
			for the jobs people actually do: set up the business, manage people, win work, deliver
			work, control money, stay compliant and report clearly.
		</p>

		<div class="hero-actions" aria-label="Primary actions">
			<a href="/app/business/dashboard">Start with Business Setup</a>
			<a href="/app/projects/dashboard">Open Project Delivery</a>
			<a href="/app/finance/dashboard">Open Money</a>
		</div>
	</section>

	<section class="spine" aria-label="Operating spine">
		<article>
			<span>01</span>
			<strong>Define the business</strong>
			<p>Profile, functions, organisation units and positions.</p>
		</article>
		<article>
			<span>02</span>
			<strong>Manage the people</strong>
			<p>People, employees, competence and authority.</p>
		</article>
		<article>
			<span>03</span>
			<strong>Run the work</strong>
			<p>Clients, commercial pipeline, projects and services.</p>
		</article>
		<article>
			<span>04</span>
			<strong>Control the money</strong>
			<p>POs, invoices, payments, WIP, cost and margin.</p>
		</article>
		<article>
			<span>05</span>
			<strong>Stay in control</strong>
			<p>Risk, compliance, quality, audit and evidence.</p>
		</article>
	</section>

	<section class="lane-grid" aria-label="Business workspaces">
		{#each operatingLanes as lane}
			<a class="lane-card" href={lane.primaryRoute} data-status={lane.status}>
				<div class="lane-topline">
					<span>{statusLabel[lane.status]}</span>
				</div>
				<h2>{lane.name}</h2>
				<p>{lane.description}</p>
				<small>{lane.primaryRoute}</small>
			</a>
		{/each}
	</section>

	<section class="panel">
		<div>
			<p class="eyebrow">Build order</p>
			<h2>Keep the build focused.</h2>
		</div>
		<ol>
			{#each foundationLanes as lane}
				<li>{lane.name}</li>
			{/each}
			<li>Then wire Money and Control properly.</li>
			<li>Reporting and Admin stay quiet until the operating spine is stable.</li>
		</ol>
	</section>
</section>

<style>
	.page-shell {
		display: grid;
		gap: 1.25rem;
		padding: clamp(1rem, 3vw, 2.5rem);
	}

	.hero,
	.panel,
	.spine article,
	.lane-card {
		border: 1px solid color-mix(in oklch, CanvasText 14%, transparent);
		background: color-mix(in oklch, Canvas 94%, CanvasText 6%);
		box-shadow: 0 1rem 3rem color-mix(in oklch, CanvasText 7%, transparent);
	}

	.hero {
		display: grid;
		gap: 1.25rem;
		padding: clamp(1.5rem, 5vw, 4rem);
		border-radius: 2rem;
	}

	.eyebrow {
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
		max-width: 12ch;
		font-size: clamp(2.75rem, 8vw, 6rem);
		line-height: 0.9;
		letter-spacing: -0.08em;
	}

	.lede {
		max-width: 74ch;
		font-size: 1.08rem;
		line-height: 1.65;
		opacity: 0.76;
	}

	.hero-actions {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
	}

	.hero-actions a,
	.lane-card {
		text-decoration: none;
	}

	.hero-actions a {
		border-radius: 999px;
		padding: 0.75rem 1rem;
		background: CanvasText;
		color: Canvas;
		font-weight: 800;
	}

	.hero-actions a:nth-child(n + 2) {
		background: color-mix(in oklch, CanvasText 10%, transparent);
		color: CanvasText;
	}

	.spine {
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 1rem;
	}

	.spine article,
	.lane-card,
	.panel {
		border-radius: 1.5rem;
		padding: 1.25rem;
	}

	.spine article {
		display: grid;
		gap: 0.45rem;
	}

	.spine span,
	.lane-topline span {
		font-size: 0.75rem;
		font-weight: 900;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.62;
	}

	.spine strong {
		font-size: 1.05rem;
	}

	.spine p,
	.lane-card p,
	.panel li {
		line-height: 1.55;
		opacity: 0.72;
	}

	.lane-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: 1rem;
	}

	.lane-card {
		display: grid;
		gap: 0.75rem;
		color: CanvasText;
	}

	.lane-card h2 {
		font-size: clamp(1.35rem, 3vw, 2rem);
		letter-spacing: -0.04em;
	}

	.lane-card small {
		font-weight: 800;
		opacity: 0.58;
	}

	.panel {
		display: grid;
		gap: 1rem;
	}

	ol {
		margin: 0;
		padding-left: 1.35rem;
	}

	li + li {
		margin-top: 0.4rem;
	}

	@media (max-width: 900px) {
		.spine {
			grid-template-columns: 1fr;
		}
	}
</style>
