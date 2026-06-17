<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();

	const formatCurrency = (value: number | string | null, currencyCode: string | null) => {
		if (value === null) return '—';

		const numericValue = Number(value);

		if (Number.isNaN(numericValue)) return '—';

		return new Intl.NumberFormat('en-GB', {
			style: 'currency',
			currency: currencyCode ?? 'GBP',
			maximumFractionDigits: 0
		}).format(numericValue);
	};
</script>

<svelte:head>
	<title>Sales / Opportunities | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<header>
		<div>
			<p class="eyebrow">Sales</p>
			<h1>Opportunities</h1>
			<p>
				Opportunities are qualified commercial pursuits that may become proposals, quotations,
				tenders, contracts and ultimately authorised work.
			</p>
		</div>

		<a class="button" href={resolve('/app/sales/opportunities/new')}>New opportunity</a>
	</header>

	{#if data.opportunities.length === 0}
		<section class="empty-state">
			<h2>No opportunities found</h2>
			<p>Create an opportunity to start building the commercial lifecycle from real data.</p>
		</section>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Reference</th>
					<th>Title</th>
					<th>Status</th>
					<th>Estimated value</th>
					<th>Expected decision</th>
				</tr>
			</thead>
			<tbody>
				{#each data.opportunities as opportunity}
					<tr>
						<td>
							<a href={resolve(`/app/sales/opportunities/${opportunity.id}`)}>
								{opportunity.reference}
							</a>
						</td>
						<td>{opportunity.title}</td>
						<td>{opportunity.stageCode}</td>
						<td>{formatCurrency(opportunity.estimatedValue, opportunity.estimatedCurrencyCode)}</td>
						<td>{opportunity.expectedDecisionDate ?? '—'}</td>
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

	.button {
		display: inline-flex;
		align-items: center;
		border-radius: 0.65rem;
		padding: 0.65rem 0.9rem;
		background: #171717;
		color: white;
		text-decoration: none;
		font-weight: 700;
	}

	.empty-state {
		display: grid;
		gap: 0.5rem;
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 1rem;
		padding: 1.25rem;
		background: white;
	}

	td a {
		color: inherit;
		font-weight: 700;
		text-decoration: none;
	}

	td a:hover {
		text-decoration: underline;
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
	}

	th {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.65;
	}
</style>
