<script lang="ts">
	type FormState = {
		message?: string;
		values?: Record<string, string>;
	};

	let {
		data,
		form
	}: {
		data: {
			clientAccounts: Array<{ clientAccountId: number; clientReference: string }>;
		};
		form?: FormState;
	} = $props();
</script>

<svelte:head>
	<title>New Enquiry | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p><a href="/app/sales/enquiries">← Back to enquiries</a></p>

	<div>
		<p class="eyebrow">Sales</p>
		<h1>New enquiry</h1>
		<p>Create the first controlled commercial request in the sales lifecycle.</p>
	</div>

	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}

	<form method="POST">
		<div>
			<label for="clientAccountId">Client account</label>
			<select id="clientAccountId" name="clientAccountId" required>
				<option value="">Select a client account</option>
				{#each data.clientAccounts as clientAccount}
					<option
						value={clientAccount.clientAccountId}
						selected={form?.values?.clientAccountId === String(clientAccount.clientAccountId)}
					>
						{clientAccount.clientReference}
					</option>
				{/each}
			</select>
		</div>

		<div>
			<label for="reference">Reference</label>
			<input
				id="reference"
				name="reference"
				type="text"
				placeholder="Leave blank to auto-generate"
				value={form?.values?.reference ?? ''}
			/>
		</div>

		<div>
			<label for="title">Title</label>
			<input id="title" name="title" type="text" required value={form?.values?.title ?? ''} />
		</div>

		<div>
			<label for="summary">Summary</label>
			<textarea id="summary" name="summary" rows="5">{form?.values?.summary ?? ''}</textarea>
		</div>

		<button type="submit">Create enquiry</button>
	</form>
</section>

<style>
	.page {
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

	h1 {
		margin: 0;
	}

	p {
		margin-block: 0.25rem;
	}

	form {
		display: grid;
		gap: 1rem;
		max-width: 42rem;
		padding: 1.25rem;
		background: white;
		border-radius: 1rem;
	}

	label {
		display: block;
		font-weight: 800;
		margin-bottom: 0.35rem;
	}

	input,
	select,
	textarea {
		width: 100%;
		box-sizing: border-box;
		border: 1px solid rgba(0, 0, 0, 0.16);
		border-radius: 0.65rem;
		padding: 0.7rem;
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
		color: #a40000;
		font-weight: 800;
	}
</style>