<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
	let workspace = $derived(data.workspace);

	const businessSetupAreas = [
		{
			title: 'Business profile',
			description: 'The tenant business record, legal identity, trading names and operating context.',
			route: '/app/business/profile',
			status: 'Next'
		},
		{
			title: 'Business functions',
			description: 'The functional map of what the business does: executive, commercial, delivery, finance, HR and control functions.',
			route: '/app/business/functions',
			status: `${workspace.businessFunctions.length} configured`
		},
		{
			title: 'Organisation units',
			description: 'Departments, teams and reporting units that deliver the business functions.',
			route: '/app/business/organisation-units',
			status: `${workspace.organisationUnits.length} configured`
		},
		{
			title: 'Positions',
			description: 'Roles/posts in the operating model before people are assigned into them.',
			route: '/app/business/positions',
			status: `${workspace.positions.length} configured`
		}
	] as const;
</script>

<svelte:head>
	<title>Business Setup | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<header class="hero">
		<div>
			<p class="eyebrow">Business workspace</p>
			<h1>Tenant business operating model</h1>
			<p>
				Set up the business itself before HR, projects, commercial, procurement or finance workflows
				depend on it.
			</p>
		</div>
	</header>

	<section class="metrics" aria-label="Business setup summary">
		<div class="metric">
			<span>Business functions</span>
			<strong>{workspace.businessFunctions.length}</strong>
		</div>
		<div class="metric">
			<span>Organisation units</span>
			<strong>{workspace.organisationUnits.length}</strong>
		</div>
		<div class="metric">
			<span>Positions</span>
			<strong>{workspace.positions.length}</strong>
		</div>
		<div class="metric">
			<span>Employees linked</span>
			<strong>{workspace.employees.length}</strong>
		</div>
	</section>

	<section class="panel">
		<div>
			<p class="eyebrow">Foundation sequence</p>
			<h2>Build the business before building the work</h2>
		</div>

		<ol class="sequence">
			<li>Tenant business profile</li>
			<li>Business functions</li>
			<li>Organisation units</li>
			<li>Positions</li>
			<li>Employees assigned by HR</li>
			<li>Projects, commercial and finance consume this structure</li>
		</ol>
	</section>

	<section class="cards" aria-label="Business setup activities">
		{#each businessSetupAreas as area}
			<a class="card" href={resolve(area.route)}>
				<div>
					<p class="eyebrow">{area.status}</p>
					<h2>{area.title}</h2>
				</div>
				<p>{area.description}</p>
				<span>{area.route}</span>
			</a>
		{/each}
	</section>
</section>

<style>
	.page {
		display: grid;
		gap: 1.5rem;
		padding: 2rem;
	}

	.hero,
	.panel,
	.metric,
	.card {
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 1rem;
		background: white;
	}

	.hero,
	.panel {
		display: grid;
		gap: 1rem;
		padding: 1.5rem;
	}

	.eyebrow {
		margin: 0;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.65;
	}

	h1,
	h2,
	p {
		margin-block: 0.25rem;
	}

	.metrics,
	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		gap: 1rem;
	}

	.metric,
	.card {
		display: grid;
		gap: 0.5rem;
		padding: 1.25rem;
	}

	.metric span,
	.card span {
		font-size: 0.8rem;
		opacity: 0.7;
	}

	.metric strong {
		font-size: 1.7rem;
	}

	.card {
		color: inherit;
		text-decoration: none;
	}

	.sequence {
		display: grid;
		gap: 0.5rem;
		margin: 0;
		padding-left: 1.25rem;
	}
</style>
