<script lang="ts">
	import { resolve } from '$app/paths';
	let { form } = $props();
</script>

<svelte:head>
	<title>New Property | Perspective OS</title>
</svelte:head>

<section>
	<p><a href={resolve('/app/properties')}>← Back to properties</a></p>

	<h1>New property</h1>

	{#if form?.message}
		<p>{form.message}</p>
	{/if}

	<form method="POST">
		<div>
			<label for="propertyName">Property name</label>
			<input
				id="propertyName"
				name="propertyName"
				type="text"
				value={form?.values?.propertyName ?? ''}
			/>
		</div>

		<div>
			<label for="addressLine1">Address line 1</label>
			<input
				id="addressLine1"
				name="addressLine1"
				type="text"
				required
				value={form?.values?.addressLine1 ?? ''}
			/>
		</div>

		<div>
			<label for="addressLine2">Address line 2</label>
			<input
				id="addressLine2"
				name="addressLine2"
				type="text"
				value={form?.values?.addressLine2 ?? ''}
			/>
		</div>

		<div>
			<label for="townCity">Town / city</label>
			<input id="townCity" name="townCity" type="text" value={form?.values?.townCity ?? ''} />
		</div>

		<div>
			<label for="countyRegion">County / region</label>
			<input
				id="countyRegion"
				name="countyRegion"
				type="text"
				value={form?.values?.countyRegion ?? ''}
			/>
		</div>

		<div>
			<label for="postcode">Postcode</label>
			<input id="postcode" name="postcode" type="text" value={form?.values?.postcode ?? ''} />
		</div>

		<button type="submit">Create property</button>
	</form>
</section>
