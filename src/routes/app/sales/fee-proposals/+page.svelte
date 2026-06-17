<script lang="ts">
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
	<title>Sales / Fee Proposals | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<header>
		<div>
			<p class="eyebrow">Sales</p>
			<h1>Fee proposals</h1>
			<p>
				Fee proposals are commercial offers that may become quotations, tenders, contracts and
				authorised work.
			</p>
		</div>

		<span class="button disabled" aria-disabled="true">New fee proposal</span>
	</header>

	{#if data.proposals.length === 0}
		<section class="empty-state">
			<h2>No fee proposals found</h2>
			<p>Create a proposal to continue the commercial lifecycle from real data.</p>
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
				{#each data.proposals as proposal}
					<tr>
						<td>{proposal.reference}</td>
						<td>{proposal.title}</td>
						<td>{proposal.stageCode}</td>
						<td>{formatCurrency(proposal.estimatedValue, proposal.estimatedCurrencyCode)}</td>
						<td>{proposal.expectedDecisionDate ?? '—'}</td>
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

	.button.disabled {
		opacity: 0.45;
		cursor: not-allowed;
	}

	.empty-state {
		display: grid;
		gap: 0.5rem;
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 1rem;
		padding: 1.25rem;
		background: white;
	}
</style>
