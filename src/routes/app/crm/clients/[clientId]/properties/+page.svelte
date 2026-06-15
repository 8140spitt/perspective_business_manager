<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Properties | {data.client.displayName}</title>
</svelte:head>

<section class="page">
	<p>
		<a href={`/app/crm/clients/${data.client.partyId}/overview`}>← Back to client</a>
	</p>

	<header>
		<div>
			<p class="eyebrow">CRM / Client / Properties</p>
			<h1>{data.client.displayName}</h1>
			<p>Properties linked to this client.</p>
		</div>

		<div class="actions">
			<a class="button" href={`/app/crm/clients/${data.client.partyId}/properties/new`}>
				New property
			</a>

			<a class="secondary-button" href={`/app/crm/clients/${data.client.partyId}/properties/link`}>
				Link existing
			</a>
		</div>
	</header>

	{#if data.properties.length === 0}
		<p>No properties linked to this client.</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Property</th>
					<th>Address</th>
					<th>Role</th>
					<th>Primary</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{#each data.properties as property}
					<tr>
						<td>
							<a href={`/app/property/property-register/${property.propertyId}/overview`}>
								{property.propertyName ?? property.propertyReference ?? 'Unnamed property'}
							</a>
						</td>
						<td>
							{property.addressLine1 ?? '-'}
							{#if property.townCity || property.postcode}
								<br />{property.townCity ?? ''} {property.postcode ?? ''}
							{/if}
						</td>
						<td>{property.roleCode}</td>
						<td>{property.isPrimary ? 'Yes' : 'No'}</td>
						<td>{property.statusCode}</td>
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
