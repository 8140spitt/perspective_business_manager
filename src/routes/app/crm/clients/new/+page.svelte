<script lang="ts">
	type FormState = {
		message?: string;
		values?: Record<string, string>;
	};

	let { form }: { form?: FormState } = $props();

	let clientType = $state('ORGANISATION');

	$effect(() => {
		if (form?.values?.clientType) {
			clientType = form.values.clientType;
		}
	});
</script>

<svelte:head>
	<title>New Client | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p><a href="/app/crm/clients/all">← Back to clients</a></p>

	<div>
		<p class="eyebrow">CRM</p>
		<h1>New client</h1>
		<p>Create either an organisation client or an individual client.</p>
	</div>

	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}

	<form method="POST">
		<div>
			<label for="clientType">Client type</label>
			<select id="clientType" name="clientType" bind:value={clientType}>
				<option value="ORGANISATION">Organisation client</option>
				<option value="PERSON">Individual client</option>
			</select>
		</div>

		{#if clientType === 'ORGANISATION'}
			<div>
				<label for="organisationName">Organisation name</label>
				<input id="organisationName" name="organisationName" type="text" required value={form?.values?.organisationName ?? ''} />
			</div>

			<div>
				<label for="organisationNumber">Organisation number</label>
				<input id="organisationNumber" name="organisationNumber" type="text" value={form?.values?.organisationNumber ?? ''} />
			</div>

			<div>
				<label for="vatNumber">VAT number</label>
				<input id="vatNumber" name="vatNumber" type="text" value={form?.values?.vatNumber ?? ''} />
			</div>
		{:else}
			<div>
				<label for="firstName">First name</label>
				<input id="firstName" name="firstName" type="text" required value={form?.values?.firstName ?? ''} />
			</div>

			<div>
				<label for="lastName">Last name</label>
				<input id="lastName" name="lastName" type="text" required value={form?.values?.lastName ?? ''} />
			</div>
		{/if}

		<button type="submit">Create client</button>
	</form>
</section>

<style>
/* existing styles unchanged */
</style>