<script lang="ts">
	let { data } = $props();
	const summary = data.dashboard.summary;
</script>

<svelte:head>
	<title>{summary.projectReference} | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<header>
		<div>
			<p class="eyebrow">Project overview</p>
			<h1>{summary.projectReference} — {summary.projectName}</h1>
			<p>{summary.clientName ?? 'No client linked'} · {summary.projectStateCode}</p>
		</div>
		<div class="metric primary">
			<span>Gross margin</span>
			<strong>£{Number(summary.grossMarginBeforeTax ?? 0).toFixed(2)}</strong>
		</div>
	</header>

	<section class="metrics">
		<div class="metric">
			<span>Quoted</span>
			<strong>£{Number(summary.quotedTotal ?? 0).toFixed(2)}</strong>
		</div>
		<div class="metric">
			<span>Sales invoices</span>
			<strong>£{Number(summary.salesInvoiceTotal ?? 0).toFixed(2)}</strong>
		</div>
		<div class="metric">
			<span>Supplier invoices</span>
			<strong>£{Number(summary.supplierInvoiceTotal ?? 0).toFixed(2)}</strong>
		</div>
		<div class="metric">
			<span>Services</span>
			<strong>{summary.serviceCount}</strong>
		</div>
	</section>

	<section class="grid">
		<article class="card">
			<h2>Internal responsibility</h2>
			{#if data.dashboard.responsibilities.length === 0}
				<p>No internal assignments found.</p>
			{:else}
				<ul>
					{#each data.dashboard.responsibilities as responsibility}
						<li>
							<strong>{responsibility.projectRoleCode}</strong>
							<span>
								{responsibility.firstName ?? '—'} {responsibility.lastName ?? ''}
								· {responsibility.positionTitle ?? 'No position'}
							</span>
						</li>
					{/each}
				</ul>
			{/if}
		</article>

		<article class="card">
			<h2>External contacts</h2>
			{#if data.dashboard.externalContacts.length === 0}
				<p>No external contacts found.</p>
			{:else}
				<ul>
					{#each data.dashboard.externalContacts as contact}
						<li>
							<strong>{contact.projectContactRoleCode}</strong>
							<span>{contact.firstName} {contact.lastName} · {contact.partnerName} · {contact.jobTitle ?? 'No job title'}</span>
						</li>
					{/each}
				</ul>
			{/if}
		</article>
	</section>

	<section class="card">
		<h2>Scope</h2>
		{#if data.dashboard.scope.length === 0}
			<p>No locations or services found.</p>
		{:else}
			<table>
				<thead>
					<tr>
						<th>Location</th>
						<th>Address</th>
						<th>Service</th>
						<th>Status</th>
					</tr>
				</thead>
				<tbody>
					{#each data.dashboard.scope as item}
						<tr>
							<td>{item.locationName ?? '—'}</td>
							<td>{item.addressLine1 ?? '—'} {item.postcode ?? ''}</td>
							<td>{item.serviceName ?? item.serviceDescription ?? '—'}</td>
							<td>{item.projectServiceStatus ?? '—'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{/if}
	</section>
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

	.metrics,
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		gap: 1rem;
	}

	.metric,
	.card {
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 1rem;
		padding: 1.25rem;
		background: white;
	}

	.metric {
		display: grid;
		gap: 0.35rem;
	}

	.metric span {
		font-size: 0.8rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.65;
	}

	.metric strong {
		font-size: 1.6rem;
	}

	.metric.primary {
		min-width: 14rem;
	}

	ul {
		display: grid;
		gap: 0.75rem;
		padding: 0;
		margin: 1rem 0 0;
		list-style: none;
	}

	li {
		display: grid;
		gap: 0.2rem;
	}

	li span {
		opacity: 0.72;
	}

	table {
		width: 100%;
		border-collapse: collapse;
		margin-top: 1rem;
	}

	th,
	td {
		text-align: left;
		padding: 0.8rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	}

	th {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.7;
	}
</style>
