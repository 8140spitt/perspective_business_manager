<script lang="ts">
	import { resolve } from '$app/paths';
	let { data } = $props();
</script>

<svelte:head>
	<title>Properties | Perspective OS</title>
</svelte:head>

<section>
	<h1>Properties</h1>

	<p>
		<a href={resolve('/app/properties/new')}>New property</a>
	</p>

	{#if data.properties.length === 0}
		<p>No properties found.</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Property</th>
					<th>Address</th>
					<th>Town / City</th>
					<th>Postcode</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{#each data.properties as property (property.propertyId)}
					<tr>
						<td>
							<a href={resolve(`/app/properties/${property.propertyId}`)}>
								{property.propertyName ?? 'Unnamed property'}
							</a>
						</td>
						<td>{property.addressLine1 ?? '-'}</td>
						<td>{property.townCity ?? '-'}</td>
						<td>{property.postcode ?? '-'}</td>
						<td>{property.statusCode}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</section>
