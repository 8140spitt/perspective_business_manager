<svelte:head>
	<title>Operations & Planning | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p class="eyebrow">Operations & Planning workspace</p>
	<h1>Instructions, service delivery and workload planning</h1>
	<p>
		Plan and control operational work across instructions, service lines, inspections, workload,
		capacity and actual delivery activity.
	</p>

	<section class="cards" aria-label="Operations and planning activity areas">
		<article>
			<h2>Instructions</h2>
			<p>Accepted work, service scope and operational handover.</p>
		</article>
		<article>
			<h2>Delivery services</h2>
			<p>Building surveys, schedules of condition, dilapidations and reinstatement work.</p>
		</article>
		<article>
			<h2>Planning control</h2>
			<p>Workload, capacity, inspection calendar and resource planning views.</p>
		</article>
	</section>
</section>

<style>
	.page {
		display: grid;
		gap: 1.5rem;
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
	h2,
	p {
		margin-block: 0.25rem;
	}

	.cards {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		gap: 1rem;
	}

	article {
		display: grid;
		gap: 0.35rem;
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 1rem;
		padding: 1.25rem;
		background: white;
	}
</style>
