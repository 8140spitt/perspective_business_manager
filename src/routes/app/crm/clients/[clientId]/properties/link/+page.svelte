<script lang="ts">
	let { data, form } = $props();
</script>

<svelte:head>
	<title>Link Property | {data.client.displayName}</title>
</svelte:head>

<section class="page">
	<p>
		<a href={`/app/crm/clients/${data.client.partyId}/properties`}>← Back to client properties</a>
	</p>

	<div>
		<p class="eyebrow">CRM / Client / Properties</p>
		<h1>Link property</h1>
		<p>Link an existing property to {data.client.displayName}.</p>
	</div>

	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}

	{#if data.properties.length === 0}
		<div class="panel">
			<p>No properties exist yet.</p>
			<p>Create a property first, then return here to link it to the client.</p>
			<a class="button" href="/app/properties/new">Create property</a>
		</div>
	{:else}
		<form method="POST">
			<div>
				<label for="propertyId">Property</label>
				<select id="propertyId" name="propertyId" required>
					<option value="">Select a property</option>
					{#each data.properties as property}
						<option value={property.propertyId}>
							{property.propertyName ?? property.addressLine1 ?? `Property ${property.propertyId}`}
							{#if property.postcode}
								— {property.postcode}
							{/if}
						</option>
					{/each}
				</select>
			</div>

			<div>
				<label for="roleCode">Client property role</label>
				<select id="roleCode" name="roleCode">
					<option value="CLIENT_INTEREST">Client interest</option>
					<option value="OWNER">Owner</option>
					<option value="OCCUPIER">Occupier</option>
					<option value="LANDLORD">Landlord</option>
					<option value="TENANT">Tenant</option>
					<option value="MANAGING_AGENT">Managing agent</option>
				</select>
			</div>

			<div>
				<label for="relationshipLabel">Relationship label</label>
				<input
					id="relationshipLabel"
					name="relationshipLabel"
					type="text"
					placeholder="Owner, occupier, tenant representative..."
					value={form?.values?.relationshipLabel ?? ''}
				/>
			</div>

			<label class="checkbox">
				<input name="isPrimary" type="checkbox" />
				<span>Primary property for this client</span>
			</label>

			<button type="submit">Link property</button>
		</form>
	{/if}
</section>

<style>
	.page {
		max-width: 56rem;
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

	form,
	.panel {
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

	button,
	.button {
		justify-self: start;
		border: 0;
		border-radius: 0.65rem;
		padding: 0.7rem 1rem;
		background: #171717;
		color: white;
		font-weight: 800;
		cursor: pointer;
		text-decoration: none;
	}

	.error {
		color: #9f1239;
		font-weight: 700;
	}
</style>
