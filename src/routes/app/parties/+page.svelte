<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Parties | Perspective OS</title>
</svelte:head>

<section>
	<h1>Parties</h1>

	{#if data.parties.length === 0}
		<p>No parties found.</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Name</th>
					<th>Type</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{#each data.parties as party (party.partyId)}
					<tr>
						<td>{party.displayName}</td>
						<td>{party.partyTypeCode}</td>
						<td>{party.statusCode}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</section>
