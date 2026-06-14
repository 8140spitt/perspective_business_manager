<script lang="ts">
	import { resolve } from '$app/paths';
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.party.displayName} | Perspective OS</title>
</svelte:head>

<section>
	<p><a href={resolve('/app/parties')}>← Back to parties</a></p>

	<h1>{data.party.displayName}</h1>

	<dl>
		<dt>Type</dt>
		<dd>{data.party.partyTypeCode}</dd>

		<dt>Status</dt>
		<dd>{data.party.statusCode}</dd>

		<dt>Created</dt>
		<dd>{data.party.createdAt}</dd>
	</dl>
</section>
