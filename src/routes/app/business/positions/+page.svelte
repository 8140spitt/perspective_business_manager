<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Positions | Perspective Business Manager</title>
</svelte:head>

<section>
	<h1>Positions</h1>
	<p>Configured positions: {data.positions.length}</p>

	<ul>
		{#each data.positions as position}
			<li>
				<strong>{position.positionCode ?? 'NO-CODE'}</strong> — {position.positionTitle}
				{#if position.unitName}
					<span> ({position.unitName})</span>
				{/if}
			</li>
		{/each}
	</ul>
</section>
