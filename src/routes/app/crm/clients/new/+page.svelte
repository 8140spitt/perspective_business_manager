<script lang="ts">
	let { form } = $props();

	let clientType = $state(form?.values?.clientType ?? 'ORGANISATION');
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
		{:else}
			<div>
				<label for="firstName">First name</label>
				<input
					id="firstName"
					name="firstName"
					type="text"
					required
					value={form?.values?.firstName ?? ''}
				/>
			</div>

			<div>
				<label for="lastName">Last name</label>
				<input
					id="lastName"
					name="lastName"
					type="text"
					required
					value={form?.values?.lastName ?? ''}
				/>
			</div>
		{/if}

		<button type="submit">Create client</button>
	</form>
</section>

<style>
	.page {
		max-width: 48rem;
		display: grid;
		gap: 1.25rem;
		padding: 2rem;
	}

	.eyebrow {
		margin: 0;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.65;
	}

	form {
		display: grid;
		gap: 1rem;
		padding: 1.25rem;
		background: white;
		border-radius: 1rem;
	}

	label {
		display: block;
		font-weight: 700;
		margin-bottom: 0.35rem;
	}

	input,
	select {
		width: 100%;
		box-sizing: border-box;
		padding: 0.7rem 0.8rem;
		border: 1px solid rgba(0, 0, 0, 0.18);
		border-radius: 0.65rem;
		font: inherit;
	}

	button {
		justify-self: start;
		border: 0;
		border-radius: 0.65rem;
		padding: 0.7rem 1rem;
		background: #171717;
		color: white;
		font-weight: 800;
		cursor: pointer;
	}

	.error {
		color: #9f1239;
		font-weight: 700;
	}
</style>
