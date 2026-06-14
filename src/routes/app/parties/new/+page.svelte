<script lang="ts">
	import { resolve } from '$app/paths';

	let { form } = $props();
</script>

<svelte:head>
	<title>New Party | Perspective OS</title>
</svelte:head>

<section>
	<p><a href={resolve('/app/parties')}>← Back to parties</a></p>

	<h1>New organisation</h1>

	{#if form?.message}
		<p>{form.message}</p>
	{/if}

	<form method="POST">
		<div>
			<label for="organisationName">Organisation name</label>
			<input
				id="organisationName"
				name="organisationName"
				type="text"
				required
				value={form?.values?.organisationName ?? ''}
			/>
		</div>

		<div>
			<label for="organisationNumber">Organisation number</label>
			<input
				id="organisationNumber"
				name="organisationNumber"
				type="text"
				value={form?.values?.organisationNumber ?? ''}
			/>
		</div>

		<div>
			<label for="vatNumber">VAT number</label>
			<input id="vatNumber" name="vatNumber" type="text" value={form?.values?.vatNumber ?? ''} />
		</div>

		<button type="submit">Create organisation</button>
	</form>
</section>
