<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>New Contact | {data.client.displayName}</title>
</svelte:head>

<section class="page">
	<p>
		<a href={`/app/crm/clients/${data.client.partyId}/contacts/all`}>← Back to contacts</a>
	</p>

	<div>
		<p class="eyebrow">CRM / Client / Contacts</p>
		<h1>New contact</h1>
		<p>Add a person contact to {data.client.displayName}.</p>
	</div>

	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}

	<form method="POST">
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

		<div>
			<label for="relationshipLabel">Role / relationship</label>
			<input
				id="relationshipLabel"
				name="relationshipLabel"
				type="text"
				placeholder="Property Manager, Finance Contact, Solicitor, Representative..."
				value={form?.values?.relationshipLabel ?? ''}
			/>
		</div>

		<label class="checkbox">
			<input name="isPrimary" type="checkbox" />
			<span>Primary contact</span>
		</label>

		<button type="submit">Create contact</button>
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

	input {
		width: 100%;
		box-sizing: border-box;
		padding: 0.7rem 0.8rem;
		border: 1px solid rgba(0, 0, 0, 0.18);
		border-radius: 0.65rem;
		font: inherit;
	}

	.checkbox {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.checkbox input {
		width: auto;
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
