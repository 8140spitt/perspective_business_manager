<script lang="ts">
	import { capabilityMap, type CapabilityArea } from '$lib/business/capability-map';

	const statusLabel: Record<CapabilityArea['status'], string> = {
		foundation: 'Foundation',
		scaffolded: 'Scaffolded',
		future: 'Future'
	};

	const workspaces = capabilityMap;
	const foundationWorkspaces = workspaces.filter((workspace) => workspace.status === 'foundation');
</script>

<svelte:head>
	<title>SAP-Grade Coverage | Perspective Business Manager</title>
</svelte:head>

<section class="page-shell">
	<section class="hero">
		<p class="eyebrow">Perspective Business Manager</p>
		<h1>SAP-grade coverage. PBM clarity.</h1>
		<p class="lede">
			PBM covers the breadth expected from a serious ERP, but presents it as modern business
			workspaces instead of old module codes. The rule is simple: every capability has a home,
			and every workspace exists for a job people actually do.
		</p>

		<div class="hero-actions" aria-label="Primary actions">
			<a href="/app/business/dashboard">Start with Business Setup</a>
			<a href="/app/hr/dashboard">Open People & Workforce</a>
			<a href="/app/projects/dashboard">Open Project Delivery</a>
		</div>
	</section>

	<section class="spine" aria-label="Operating spine">
		<article>
			<span>01</span>
			<strong>Define the business</strong>
			<p>Profile, functions, organisation units, positions and reference data.</p>
		</article>
		<article>
			<span>02</span>
			<strong>Resource the business</strong>
			<p>People, employees, competence, authority and workforce planning.</p>
		</article>
		<article>
			<span>03</span>
			<strong>Win and deliver work</strong>
			<p>Clients, commercial pipeline, projects, services and operations.</p>
		</article>
		<article>
			<span>04</span>
			<strong>Control money and supply</strong>
			<p>Finance, cost, margin, procurement, materials and supplier performance.</p>
		</article>
		<article>
			<span>05</span>
			<strong>Assure and improve</strong>
			<p>Quality, compliance, assets, documents, reporting and administration.</p>
		</article>
	</section>

	<section class="workspace-grid" aria-label="SAP coverage workspaces">
		{#each workspaces as workspace}
			<a class="workspace-card" href={workspace.primaryRoute} data-status={workspace.status}>
				<div class="workspace-topline">
					<span>{statusLabel[workspace.status]}</span>
					<small>{workspace.sapCoverage.join(' · ')}</small>
				</div>
				<h2>{workspace.name}</h2>
				<p>{workspace.description}</p>
				<ul aria-label={`${workspace.name} capabilities`}>
					{#each workspace.capabilities.slice(0, 6) as capability}
						<li>{capability}</li>
					{/each}
				</ul>
				<small class="route">{workspace.primaryRoute}</small>
			</a>
		{/each}
	</section>

	<section class="panel">
		<div>
			<p class="eyebrow">Build order</p>
			<h2>Build the spine first, then widen the coverage.</h2>
		</div>
		<ol>
			{#each foundationWorkspaces as workspace}
				<li>{workspace.name}</li>
			{/each}
			<li>Then wire Finance & Control and Procurement, Materials & Logistics.</li>
			<li>Quality, assets, reporting and administration follow once the operating spine is stable.</li>
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
	.workspace-card {
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
		max-width: 14ch;
		font-size: clamp(2.75rem, 8vw, 6rem);
		line-height: 0.9;
		letter-spacing: -0.08em;
	}

	.lede {
		max-width: 78ch;
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
	.workspace-card {
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
	.workspace-card,
	.panel {
		border-radius: 1.5rem;
		padding: 1.25rem;
	}

	.spine article,
	.workspace-card {
		display: grid;
		align-content: start;
		gap: 0.75rem;
	}

	.spine span,
	.workspace-topline span {
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
	.workspace-card p,
	.panel li,
	.workspace-card li {
		line-height: 1.55;
		opacity: 0.72;
	}

	.workspace-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
		gap: 1rem;
	}

	.workspace-card {
		color: CanvasText;
	}

	.workspace-card h2 {
		font-size: clamp(1.35rem, 3vw, 2rem);
		letter-spacing: -0.04em;
	}

	.workspace-topline {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: start;
	}

	.workspace-topline small,
	.route {
		opacity: 0.58;
	}

	.workspace-card ul,
	.panel ol {
		margin: 0;
		padding-left: 1.1rem;
	}

	.panel {
		display: grid;
		gap: 1rem;
	}

	@media (max-width: 900px) {
		.spine {
			grid-template-columns: 1fr;
		}
	}
</style>
