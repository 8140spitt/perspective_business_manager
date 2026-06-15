<script lang="ts">
	type FormState = {
		message?: string;
		values?: Record<string, string>;
	};

	let { form }: { form?: FormState } = $props();
</script>

<svelte:head>
	<title>New Activity | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p><a href="/app/activities">← Back to activities</a></p>

	<div>
		<p class="eyebrow">Operations</p>
		<h1>New activity</h1>
		<p>Create the first activity record in the enterprise activity chain.</p>
	</div>

	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}

	<form method="POST">
		<div>
			<label for="activityReference">Reference</label>
			<input id="activityReference" name="activityReference" type="text" required value={form?.values?.activityReference ?? ''} />
		</div>

		<div>
			<label for="activityName">Name</label>
			<input id="activityName" name="activityName" type="text" required value={form?.values?.activityName ?? ''} />
		</div>

		<div>
			<label for="activityTypeCode">Type</label>
			<select id="activityTypeCode" name="activityTypeCode" required>
				<option value="INSPECTION">Inspection</option>
				<option value="AUDIT">Audit</option>
				<option value="INVESTIGATION">Investigation</option>
				<option value="SURVEY">Survey</option>
				<option value="WORKSHOP">Workshop</option>
				<option value="MEETING">Meeting</option>
				<option value="RISK_REVIEW">Risk review</option>
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
			<label for="description">Description</label>
			<textarea id="description" name="description" rows="5">{form?.values?.description ?? ''}</textarea>
		</div>

		<button type="submit">Create activity</button>
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

	h1,
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
