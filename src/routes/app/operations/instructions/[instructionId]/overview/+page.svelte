<script lang="ts">
	let { data } = $props();
</script>

<svelte:head>
	<title>{data.instruction.title} | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p><a href="/app/operations/instructions">← Back to instructions</a></p>

	<div>
		<p class="eyebrow">Instruction overview</p>
		<h1>{data.instruction.title}</h1>
		<p>{data.instruction.instructionReference} · {data.instruction.instructionTypeCode}</p>
	</div>

	<section class="panel grid">
		<div>
			<span class="label">Client account</span>
			<strong>{data.instruction.clientAccountId}</strong>
		</div>
		<div>
			<span class="label">Service line</span>
			<strong>{data.instruction.serviceLineCode}</strong>
		</div>
		<div>
			<span class="label">Status</span>
			<strong>{data.instruction.statusCode}</strong>
		</div>
		<div>
			<span class="label">Priority</span>
			<strong>{data.instruction.priorityCode}</strong>
		</div>
		<div>
			<span class="label">Received</span>
			<strong>{data.instruction.receivedAt ?? '-'}</strong>
		</div>
		<div>
			<span class="label">Target issue date</span>
			<strong>{data.instruction.targetIssueDate ?? '-'}</strong>
		</div>
	</section>

	<section class="panel">
		<h2>Summary</h2>
		<p>{data.instruction.summary ?? 'No summary recorded yet.'}</p>
	</section>
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

	h2,
	p {
		margin-block: 0.25rem;
	}

	.panel {
		padding: 1.25rem;
		background: white;
		border-radius: 1rem;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
		gap: 1rem;
	}

	.label {
		display: block;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.65;
	}
</style>
