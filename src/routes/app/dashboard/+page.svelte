<script lang="ts">
	import { capabilityMap, type CapabilityArea } from '$lib/business/capability-map';

	const statusLabel: Record<CapabilityArea['status'], string> = {
		foundation: 'Foundation',
		scaffolded: 'Scaffolded',
		future: 'Future'
	};

	const priorityWorkspaceIds = [
		'business-setup',
		'people-workforce',
		'crm-commercial',
		'projects-portfolio',
		'finance-capital',
		'supply-chain-procurement',
		'governance-risk-compliance',
		'operations-service-delivery',
		'property-technical-asset',
		'information-data-digital'
	];

	const orderedWorkspaces = priorityWorkspaceIds
		.map((id) => capabilityMap.find((area) => area.id === id))
		.filter((area): area is CapabilityArea => Boolean(area));

	const otherWorkspaces = capabilityMap.filter((area) => !priorityWorkspaceIds.includes(area.id));
	const workspaceCount = capabilityMap.length;
	const foundationCount = capabilityMap.filter((area) => area.status === 'foundation').length;
	const routeCount = capabilityMap.reduce((total, area) => total + area.currentRoutes.length, 0);
</script>

<svelte:head>
	<title>Functional Workspaces | Perspective Business Manager</title>
</svelte:head>

<section class="page-shell">
	<section class="hero">
		<div>
			<p class="eyebrow">Perspective Business Manager</p>
			<h1>Functional workspaces over old module silos.</h1>
			<p class="lede">
				PBM keeps one integrated business model, but each user enters through the workspace that
				matches their job: business setup, HR, CRM, projects, finance, procurement, compliance,
				operations, property, reporting and admin.
			</p>
		</div>

		<div class="hero-actions" aria-label="Primary workspaces">
			<a href="/app/business/dashboard">Start with Business Setup</a>
			<a href="/app/hr/dashboard">Open HR & Workforce</a>
			<a href="/app/projects/dashboard">Open Projects</a>
		</div>
	</section>

	<section class="metrics" aria-label="Workspace summary">
		<article>
			<strong>{workspaceCount}</strong>
			<span>functional workspaces</span>
		</article>
		<article>
			<strong>{foundationCount}</strong>
			<span>foundation areas</span>
		</article>
		<article>
			<strong>{routeCount}</strong>
			<span>mapped routes</span>
		</article>
	</section>

	<section class="panel">
		<div class="section-heading">
			<p class="eyebrow">Route standard</p>
			<h2>Users work by function, not by database table.</h2>
			<p>
				Finance users work in Finance, HR users work in HR, and project managers work in Projects.
				The routes may consume shared project, person, partner and finance data in the background,
				but the entry point stays aligned to the business activity.
			</p>
		</div>

		<div class="principles">
			<article>
				<h3>Packages</h3>
				<p>Reusable domain/data capability.</p>
			</article>
			<article>
				<h3>Routes</h3>
				<p>Functional workspaces and user activities.</p>
			</article>
			<article>
				<h3>Database</h3>
				<p>Integrated enterprise truth.</p>
			</article>
		</div>
	</section>

	<section class="workspace-grid" aria-label="Functional workspace map">
		{#each orderedWorkspaces as area, index}
			<article class="workspace-card" data-status={area.status}>
				<div class="card-topline">
					<span>{String(index + 1).padStart(2, '0')}</span>
					<strong>{statusLabel[area.status]}</strong>
				</div>

				<h2>{area.name}</h2>
				<p>{area.description}</p>

				<a class="primary-link" href={area.primaryRoute}>{area.primaryRoute}</a>

				<div class="chips" aria-label="Core objects">
					{#each area.coreObjects as object}
						<span>{object.replace(/_/g, ' ')}</span>
					{/each}
				</div>
			</article>
		{/each}
	</section>

	{#if otherWorkspaces.length > 0}
		<section class="panel">
			<div class="section-heading">
				<p class="eyebrow">Additional workspaces</p>
				<h2>Mapped but lower priority for this refactor pass.</h2>
			</div>

			<div class="route-list">
				{#each otherWorkspaces as area}
					<a href={area.primaryRoute}>{area.name}</a>
				{/each}
			</div>
		</section>
	{/if}
</section>

<style>
	.page-shell {
		display: grid;
		gap: 1.5rem;
		padding: clamp(1rem, 3vw, 2.5rem);
	}

	.hero,
	.panel,
	.workspace-card,
	.metrics article {
		border: 1px solid color-mix(in oklch, CanvasText 14%, transparent);
		background: color-mix(in oklch, Canvas 92%, CanvasText 8%);
		box-shadow: 0 1rem 3rem color-mix(in oklch, CanvasText 8%, transparent);
	}

	.hero {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		gap: 1.5rem;
		align-items: end;
		padding: clamp(1.5rem, 5vw, 4rem);
		border-radius: 2rem;
	}

	.eyebrow {
		margin: 0 0 0.5rem;
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		opacity: 0.68;
	}

	h1,
	h2,
	h3,
	p {
		margin: 0;
	}

	h1 {
		max-width: 13ch;
		font-size: clamp(2.5rem, 7vw, 5.25rem);
		line-height: 0.92;
		letter-spacing: -0.07em;
	}

	.lede {
		max-width: 75ch;
		margin-top: 1rem;
		font-size: 1.1rem;
		line-height: 1.65;
		opacity: 0.74;
	}

	.hero-actions,
	.route-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.65rem;
	}

	.hero-actions {
		justify-content: end;
		max-width: 24rem;
	}

	.hero-actions a,
	.route-list a,
	.primary-link {
		border-radius: 999px;
		padding: 0.7rem 0.95rem;
		background: CanvasText;
		color: Canvas;
		font-weight: 800;
		text-decoration: none;
	}

	.hero-actions a:nth-child(n + 2),
	.route-list a {
		background: color-mix(in oklch, CanvasText 10%, transparent);
		color: CanvasText;
	}

	.metrics {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.metrics article {
		display: grid;
		gap: 0.25rem;
		padding: 1.25rem;
		border-radius: 1.5rem;
	}

	.metrics strong {
		font-size: clamp(2rem, 6vw, 4rem);
		letter-spacing: -0.06em;
	}

	.metrics span {
		font-weight: 800;
		opacity: 0.68;
	}

	.panel {
		display: grid;
		gap: 1.25rem;
		padding: 1.5rem;
		border-radius: 1.5rem;
	}

	.section-heading {
		display: grid;
		gap: 0.5rem;
		max-width: 80ch;
	}

	.section-heading p:not(.eyebrow) {
		line-height: 1.6;
		opacity: 0.72;
	}

	.principles {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: 1rem;
	}

	.principles article {
		padding: 1rem;
		border-radius: 1rem;
		background: color-mix(in oklch, Canvas 86%, CanvasText 14%);
	}

	.principles p {
		margin-top: 0.35rem;
		opacity: 0.7;
	}

	.workspace-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(18rem, 1fr));
		gap: 1rem;
	}

	.workspace-card {
		display: grid;
		align-content: start;
		gap: 1rem;
		padding: 1.25rem;
		border-radius: 1.5rem;
	}

	.card-topline {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		font-size: 0.75rem;
		font-weight: 900;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.62;
	}

	.workspace-card p {
		line-height: 1.55;
		opacity: 0.72;
	}

	.primary-link {
		justify-self: start;
		font-size: 0.85rem;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.chips span {
		border-radius: 999px;
		padding: 0.45rem 0.65rem;
		background: color-mix(in oklch, CanvasText 8%, transparent);
		font-size: 0.78rem;
		font-weight: 700;
	}

	@media (max-width: 52rem) {
		.hero,
		.metrics,
		.principles {
			grid-template-columns: 1fr;
		}

		.hero-actions {
			justify-content: start;
		}
	}
</style>
