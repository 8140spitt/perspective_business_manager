<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Addresses | {data.client.displayName}</title>
</svelte:head>

<section class="page">
	<p>
		<a href={`/app/crm/clients/${data.client.partyId}/overview`}>← Back to client</a>
	</p>

	<header>
		<div>
			<p class="eyebrow">CRM / Client / Addresses</p>
			<h1>{data.client.displayName}</h1>
			<p>Addresses linked to this client.</p>
		</div>

		<a class="button" href={`/app/crm/clients/${data.client.partyId}/addresses/new`}>
			New address
		</a>
	</header>

	{#if data.addresses.length === 0}
		<p>No addresses linked to this client.</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Type</th>
					<th>Address</th>
					<th>Town / City</th>
					<th>Postcode</th>
					<th>Primary</th>
				</tr>
			</thead>
			<tbody>
				{#each data.addresses as address}
					<tr>
						<td>{address.addressTypeCode}</td>
						<td>
							{address.addressLine1}
							{#if address.addressLine2}
								<br />{address.addressLine2}
							{/if}
						</td>
						<td>{address.townCity ?? '-'}</td>
						<td>{address.postcode ?? '-'}</td>
						<td>{address.isPrimary ? 'Yes' : 'No'}</td>
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
