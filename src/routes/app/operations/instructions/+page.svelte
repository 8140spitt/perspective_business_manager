<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>Instructions | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<header>
		<div>
			<p class="eyebrow">Operations</p>
			<h1>Instructions</h1>
			<p>Manage accepted work, delivery status and linked commercial context.</p>
		</div>

		<a class="button" href={resolve('/app/operations/instructions/new')}>New instruction</a>
	</header>

	{#if data.instructions.length === 0}
		<p>No instructions found.</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Reference</th>
					<th>Title</th>
					<th>Type</th>
					<th>Service line</th>
					<th>Status</th>
				</tr>
			</thead>
			<tbody>
				{#each data.instructions as instruction}
					<tr>
						<td>
							<a
								href={resolve(`/app/operations/instructions/${instruction.instructionId}/overview`)}
								>{instruction.instructionReference}</a
							>
						</td>
						<td>{instruction.title}</td>
						<td>{instruction.instructionTypeCode}</td>
						<td>{instruction.serviceLineCode}</td>
						<td>{instruction.statusCode}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
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

	table {
		width: 100%;
		border-collapse: collapse;
		background: white;
	}

	th,
	td {
		text-align: left;
		padding: 0.8rem;
		border-bottom: 1px solid rgba(0, 0, 0, 0.08);
	}

	th {
		font-size: 0.8rem;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		opacity: 0.65;
	}

	td a {
		color: inherit;
		font-weight: 700;
		text-decoration: none;
	}

	td a:hover {
		text-decoration: underline;
	}
</style>
