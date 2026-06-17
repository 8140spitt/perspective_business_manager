<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>Sales / Enquiries | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<header>
		<div>
			<p class="eyebrow">Sales</p>
			<h1>Enquiries</h1>
			<p>
				Enquiries are early commercial requests that may become qualified opportunities, proposals,
				quotations, tenders, contracts and authorised work.
			</p>
		</div>

		<a class="button" href={resolve('/app/sales/enquiries/new')}>New enquiry</a>
	</header>

	{#if data.enquiries.length === 0}
		<section class="empty-state">
			<h2>No enquiries found</h2>
			<p>Create an enquiry to start the commercial lifecycle from real data.</p>
		</section>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Reference</th>
					<th>Title</th>
					<th>Stage</th>
					<th>Expected decision</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				{#each data.enquiries as enquiry}
					<tr>
						<td>
							<a href={resolve(`/app/sales/enquiries/${enquiry.id}`)}>
								{enquiry.reference}
							</a>
						</td>
						<td>{enquiry.title}</td>
						<td>{enquiry.stageCode}</td>
						<td>{enquiry.expectedDecisionDate ?? '—'}</td>
						<td>
							{#if enquiry.stageCode === 'converted'}
								<span class="status-pill">Converted</span>
							{:else}
								<form method="POST" action="?/convertToOpportunity">
									<input type="hidden" name="enquiryId" value={enquiry.id} />
									<button type="submit">Convert to opportunity</button>
								</form>
							{/if}
						</td>
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

	.button,
	button {
		display: inline-flex;
		align-items: center;
		border: 0;
		border-radius: 0.65rem;
		padding: 0.65rem 0.9rem;
		background: #171717;
		color: white;
		text-decoration: none;
		font: inherit;
		font-weight: 700;
		cursor: pointer;
	}

	button {
		padding: 0.45rem 0.7rem;
		font-size: 0.85rem;
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
