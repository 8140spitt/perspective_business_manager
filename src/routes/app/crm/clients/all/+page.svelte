<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Clients | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<header>
		<div>
			<p class="eyebrow">CRM</p>
			<h1>Clients</h1>
			<p>All organisation and individual clients.</p>
		</div>

		<a class="button" href="/app/crm/clients/new">New client</a>
	</header>

	{#if data.clients.length === 0}
		<p>No clients found.</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Client type</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{#each data.clients as client}
					<tr>
						<td>
							<a href={`/app/crm/clients/${client.partyId}/overview`}>
								{client.displayName}
							</a>
						</td>
						<td>{client.partyTypeCode}</td>
						<td>{client.statusCode}</td>
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
