<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>New Address | {data.client.displayName}</title>
</svelte:head>

<section class="page">
	<p>
		<a href={`/app/crm/clients/${data.client.partyId}/addresses`}>← Back to addresses</a>
	</p>

	<div>
		<p class="eyebrow">CRM / Client / Addresses</p>
		<h1>New address</h1>
		<p>Add an address to {data.client.displayName}.</p>
	</div>

	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}

	<form method="POST">
		<div>
			<label for="addressTypeCode">Address type</label>
			<select id="addressTypeCode" name="addressTypeCode">
				<option value="REGISTERED">Registered</option>
				<option value="CORRESPONDENCE" selected>Correspondence</option>
				<option value="BILLING">Billing</option>
				<option value="SITE">Site</option>
			</select>
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

		<label class="checkbox">
			<input name="isPrimary" type="checkbox" />
			<span>Primary address</span>
		</label>

		<button type="submit">Create address</button>
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
