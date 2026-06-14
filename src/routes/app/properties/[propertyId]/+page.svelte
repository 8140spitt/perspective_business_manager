<script lang="ts">
	let { data } = $props();
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>{data.property.propertyName ?? 'Property'} | Perspective OS</title>
</svelte:head>

<section>
	<p><a href={resolve('/app/properties')}>← Back to properties</a></p>

	<h1>{data.property.propertyName ?? 'Unnamed property'}</h1>

	<dl>
		<dt>Status</dt>
		<dd>{data.property.statusCode}</dd>

		<dt>Property type</dt>
		<dd>{data.property.propertyTypeCode ?? '-'}</dd>

		<dt>Tenure</dt>
		<dd>{data.property.tenureCode ?? '-'}</dd>

		<dt>Created</dt>
		<dd>{data.property.createdAt}</dd>
	</dl>
</section>
