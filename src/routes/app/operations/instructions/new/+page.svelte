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
	<title>New Instruction | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p><a href="/app/operations/instructions">← Back to instructions</a></p>

	<div>
		<p class="eyebrow">Operations</p>
		<h1>New instruction</h1>
		<p>Create the accepted work record that links the client account to delivery.</p>
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
			<label for="instructionReference">Reference</label>
			<input
				id="instructionReference"
				name="instructionReference"
				type="text"
				value={form?.values?.instructionReference ?? ''}
			/>
		</div>

		<div>
			<label for="title">Title</label>
			<input id="title" name="title" type="text" required value={form?.values?.title ?? ''} />
		</div>

		<div>
			<label for="instructionTypeCode">Instruction type</label>
			<select id="instructionTypeCode" name="instructionTypeCode" required>
				<option value="BUILDING_SURVEY">Building survey</option>
				<option value="SCHEDULE_OF_CONDITION">Schedule of condition</option>
				<option value="DILAPIDATIONS">Dilapidations</option>
				<option value="REINSTATEMENT_COST_ASSESSMENT">Reinstatement cost assessment</option>
				<option value="INSURANCE_REINSTATEMENT">Insurance reinstatement</option>
				<option value="GENERAL_ADVISORY">General advisory</option>
			</select>
		</div>

		<div>
			<label for="serviceLineCode">Service line</label>
			<select id="serviceLineCode" name="serviceLineCode" required>
				<option value="BUILDING_SURVEYING">Building surveying</option>
				<option value="PROJECTS">Projects</option>
				<option value="COMPLIANCE">Compliance</option>
				<option value="INSURANCE">Insurance</option>
				<option value="ADVISORY">Advisory</option>
			</select>
		</div>

		<div>
			<label for="priorityCode">Priority</label>
			<select id="priorityCode" name="priorityCode">
				<option value="NORMAL">Normal</option>
				<option value="LOW">Low</option>
				<option value="HIGH">High</option>
				<option value="URGENT">Urgent</option>
			</select>
		</div>

		<div>
			<label for="receivedAt">Received at</label>
			<input
				id="receivedAt"
				name="receivedAt"
				type="datetime-local"
				value={form?.values?.receivedAt ?? ''}
			/>
		</div>

		<div>
			<label for="targetIssueDate">Target issue date</label>
			<input
				id="targetIssueDate"
				name="targetIssueDate"
				type="date"
				value={form?.values?.targetIssueDate ?? ''}
			/>
		</div>

		<div>
			<label for="summary">Summary</label>
			<textarea id="summary" name="summary" rows="5">{form?.values?.summary ?? ''}</textarea>
		</div>

		<button type="submit">Create instruction</button>
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
