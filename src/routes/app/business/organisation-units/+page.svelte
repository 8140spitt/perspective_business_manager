<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Organisation Units | Perspective Business Manager</title>
</svelte:head>

<section>
	<h1>Organisation units</h1>
	<p>Configured units: {data.units.length}</p>

	<ul>
		{#each data.units as unit}
			<li>
				<strong>{unit.unitCode}</strong> — {unit.unitName}
				{#if unit.functionName}
					<span> ({unit.functionName})</span>
				{/if}
			</li>
		{/each}
	</ul>
</section>
