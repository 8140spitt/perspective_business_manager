<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>Projects | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<header>
		<div>
			<p class="eyebrow">Projects</p>
			<h1>Project dashboard</h1>
			<p>Project-centric ERP control across client, scope, quote, procurement and finance.</p>
		</div>
	</header>

	{#if data.projects.length === 0}
		<section class="empty-state">
			<h2>No projects found</h2>
			<p>Create or migrate a project to begin using the project-centric ERP spine.</p>
		</section>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Reference</th>
					<th>Project</th>
					<th>Client</th>
					<th>State</th>
					<th>Services</th>
					<th>Quote</th>
					<th>Sales invoice</th>
					<th>Supplier invoice</th>
					<th>Margin</th>
				</tr>
			</thead>
			<tbody>
				{#each data.projects as project}
					<tr>
						<td>
							<a href={resolve(`/app/projects/projects/${project.projectId}/overview`)}>
								{project.projectReference}
							</a>
						</td>
						<td>{project.projectName}</td>
						<td>{project.clientName ?? '—'}</td>
						<td><span class="status-pill">{project.projectStateCode}</span></td>
						<td>{project.serviceCount}</td>
						<td>£{Number(project.quotedTotal ?? 0).toFixed(2)}</td>
						<td>£{Number(project.salesInvoiceTotal ?? 0).toFixed(2)}</td>
						<td>£{Number(project.supplierInvoiceTotal ?? 0).toFixed(2)}</td>
						<td>£{Number(project.grossMarginBeforeTax ?? 0).toFixed(2)}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</section>

<style>
	.page {
		display: grid;
		gap: 1.5rem;
		padding: 2rem;
	}

	header {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: start;
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

	.empty-state {
		display: grid;
		gap: 0.5rem;
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 1rem;
		padding: 1.25rem;
		background: white;
	}

	.status-pill {
		display: inline-flex;
		border-radius: 999px;
		padding: 0.35rem 0.6rem;
		background: rgba(0, 0, 0, 0.08);
		font-size: 0.8rem;
		font-weight: 700;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		background: white;
	}

	th,
	td {
		text-align: left;
		padding: 0.8rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
		vertical-align: top;
	}

	th {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.7;
	}

	a {
		color: inherit;
		font-weight: 700;
		text-decoration: none;
	}

	a:hover {
		text-decoration: underline;
	}
</style>
