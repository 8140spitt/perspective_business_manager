<script lang="ts">
	import { resolve } from '$app/paths';

	type FormState = {
		message?: string;
		values?: Record<string, string>;
	};

	let {
		data,
		form
	}: {
		data: { activity: { activityId: number; activityName: string; activityReference: string } };
		form?: FormState;
	} = $props();
</script>

<svelte:head>
	<title>New Observation | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p><a href={resolve(`/app/activities/${data.activity.activityId}`)}>← Back to activity</a></p>

	<div>
		<p class="eyebrow">Observation</p>
		<h1>New observation</h1>
		<p>Add an observation to {data.activity.activityReference} · {data.activity.activityName}.</p>
	</div>

	{#if form?.message}
		<p class="error">{form.message}</p>
	{/if}

	<form method="POST">
		<div>
			<label for="observationReference">Reference</label>
			<input
				id="observationReference"
				name="observationReference"
				type="text"
				required
				value={form?.values?.observationReference ?? ''}
			/>
		</div>

		<div>
			<label for="title">Title</label>
			<input id="title" name="title" type="text" required value={form?.values?.title ?? ''} />
		</div>

		<div>
			<label for="observationTypeCode">Type</label>
			<select id="observationTypeCode" name="observationTypeCode" required>
				<option value="DEFECT">Defect</option>
				<option value="NON_CONFORMANCE">Non-conformance</option>
				<option value="RISK">Risk</option>
				<option value="CONDITION">Condition</option>
				<option value="MEASUREMENT">Measurement</option>
				<option value="NOTE">Note</option>
			</select>
		</div>

		<div>
			<label for="description">Description</label>
			<textarea id="description" name="description" rows="5"
				>{form?.values?.description ?? ''}</textarea
			>
		</div>

		<button type="submit">Create observation</button>
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
