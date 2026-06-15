<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.workspace.activity.activityName} | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<header>
		<div>
			<p><a href={resolve('/app/activities')}>← Back to activities</a></p>
			<p class="eyebrow">Activity workspace</p>
			<h1>{data.workspace.activity.activityName}</h1>
			<p>
				{data.workspace.activity.activityReference} · {data.workspace.activity.activityTypeCode}
			</p>
		</div>

		<a
			class="button"
			href={resolve(`/app/activities/${data.workspace.activity.activityId}/observations/new`)}
			>Add observation</a
		>
	</header>

	<section class="panel overview">
		<div>
			<span class="label">Status</span>
			<strong>{data.workspace.activity.statusCode}</strong>
		</div>
		<div>
			<span class="label">Priority</span>
			<strong>{data.workspace.activity.priorityCode}</strong>
		</div>
		<div>
			<span class="label">Instruction</span>
			<strong>{data.workspace.activity.instructionId ?? '-'}</strong>
		</div>
		<div>
			<span class="label">Project</span>
			<strong>{data.workspace.activity.projectId ?? '-'}</strong>
		</div>
	</section>

	<section class="panel">
		<h2>Observations</h2>

		{#if data.workspace.observations.length === 0}
			<p>No observations recorded yet.</p>
		{:else}
			<div class="stack">
				{#each data.workspace.observations as item}
					<article class="card">
						<div class="card-header">
							<div>
								<p class="eyebrow">{item.observation.observationReference}</p>
								<h3>{item.observation.title}</h3>
								<p>{item.observation.observationTypeCode} · {item.observation.statusCode}</p>
							</div>
						</div>

						{#if item.observation.description}
							<p>{item.observation.description}</p>
						{/if}

						{#if item.assessments.length === 0}
							<p class="muted">No assessments linked yet.</p>
						{:else}
							<div class="stack nested">
								{#each item.assessments as assessmentGroup}
									<section class="nested-card">
										<h4>{assessmentGroup.assessment.title}</h4>
										<p>
											{assessmentGroup.assessment.assessmentReference} · {assessmentGroup.assessment
												.assessmentTypeCode}
										</p>

										{#if assessmentGroup.assessment.conclusion}
											<p>{assessmentGroup.assessment.conclusion}</p>
										{/if}

										{#if assessmentGroup.actions.length === 0}
											<p class="muted">No actions linked yet.</p>
										{:else}
											<ul class="action-list">
												{#each assessmentGroup.actions as action}
													<li>
														<strong>{action.title}</strong>
														<span
															>{action.actionReference} · {action.statusCode} · {action.priorityCode}</span
														>
													</li>
												{/each}
											</ul>
										{/if}
									</section>
								{/each}
							</div>
						{/if}
					</article>
				{/each}
			</div>
		{/if}
	</section>

	<section class="panel">
		<h2>Outcomes</h2>

		{#if data.workspace.outcomes.length === 0}
			<p>No outcomes recorded yet.</p>
		{:else}
			<ul class="outcome-list">
				{#each data.workspace.outcomes as outcome}
					<li>
						<strong>{outcome.title}</strong>
						<span
							>{outcome.outcomeReference} · {outcome.outcomeTypeCode} · {outcome.statusCode}</span
						>
					</li>
				{/each}
			</ul>
		{/if}
	</section>
</section>

<style>
	.page {
		display: grid;
		gap: 1.5rem;
		padding: 2rem;
	}

	header {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: start;
	}

	.panel {
		padding: 1.25rem;
		background: white;
		border-radius: 1rem;
	}

	.overview {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 1rem;
	}

	.label,
	.eyebrow,
	.muted,
	.card-header p,
	.nested-card p,
	.outcome-list span,
	.action-list span {
		opacity: 0.7;
	}

	.label,
	.eyebrow {
		display: block;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.stack {
		display: grid;
		gap: 1rem;
	}

	.card,
	.nested-card {
		padding: 1rem;
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 0.85rem;
	}

	.nested {
		margin-top: 1rem;
	}

	.card-header,
	.action-list li,
	.outcome-list li {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}

	.action-list,
	.outcome-list {
		display: grid;
		gap: 0.75rem;
		padding: 0;
		margin: 1rem 0 0;
		list-style: none;
	}

	h1,
	h2,
	h3,
	h4,
	p {
		margin-block: 0.25rem;
	}

	.button {
		display: inline-flex;
		align-items: center;
		border-radius: 0.65rem;
		padding: 0.65rem 0.9rem;
		background: #171717;
		color: white;
		text-decoration: none;
		font-weight: 700;
	}

	@media (max-width: 720px) {
		header,
		.card-header,
		.action-list li,
		.outcome-list li {
			flex-direction: column;
		}
	}
</style>
