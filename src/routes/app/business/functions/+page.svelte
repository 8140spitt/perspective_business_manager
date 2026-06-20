<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>Business Functions | Perspective Business Manager</title>
</svelte:head>

<section>
	<h1>Business functions</h1>
	<p>Configured functions: {data.functions.length}</p>

	<ul>
		{#each data.functions as item}
			<li>{item.functionCode} — {item.functionName}</li>
		{/each}
	</ul>
</section>
