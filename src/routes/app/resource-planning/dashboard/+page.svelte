<svelte:head>
	<title>Resource Planning | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p class="eyebrow">Operations & Planning workspace</p>
	<h1>Workload, availability and utilisation</h1>
	<p>
		Use this activity view to balance people, availability, allocations, inspections and utilisation
		against the work the business has committed to deliver.
	</p>

	<section class="cards" aria-label="Resource planning activity areas">
		<article>
			<h2>Availability</h2>
			<p>Who is available, when, and what capacity can be used.</p>
		</article>
		<article>
			<h2>Allocations</h2>
			<p>Planned assignments against projects, instructions and inspections.</p>
		</article>
		<article>
			<h2>Utilisation</h2>
			<p>Workload, productive time and delivery capacity reporting.</p>
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
