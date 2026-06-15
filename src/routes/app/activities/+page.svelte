<script lang="ts">
	let { data } = $props();
	import { resolve } from '$app/paths';
</script>

<svelte:head>
	<title>Activities | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<header>
		<div>
			<p class="eyebrow">Operations</p>
			<h1>Activities</h1>
			<p>
				Activities are units of work such as inspections, audits, reviews, meetings and surveys.
			</p>
		</div>

		<a class="button" href="/app/activities/new">New activity</a>
	</header>

	{#if data.activities.length === 0}
		<p>No activities found.</p>
	{:else}
		<table>
			<thead>
				<tr>
					<th>Reference</th>
					<th>Name</th>
					<th>Type</th>
					<th>Status</th>
					<th>Priority</th>
				</tr>
			</thead>
			<tbody>
				{#each data.activities as activity}
					<tr>
						<td
							><a href={resolve(`/app/activities/${activity.activityId}`)}
								>{activity.activityReference}</a
							></td
						>
						<td
							><a href={resolve(`/app/activities/${activity.activityId}`)}
								>{activity.activityName}</a
							></td
						>
						<td>{activity.activityTypeCode}</td>
						<td>{activity.statusCode}</td>
						<td>{activity.priorityCode}</td>
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

	h1,
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

	td a {
		color: inherit;
		font-weight: 700;
		text-decoration: none;
	}

	td a:hover {
		text-decoration: underline;
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
</style>
