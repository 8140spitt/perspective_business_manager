<svelte:head>
	<title>People & Workforce | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p class="eyebrow">People & Workforce workspace</p>
	<h1>People, employees and workforce structure</h1>
	<p>
		Maintain people records, employees, positions, competence, training, authority and workforce
		planning data used by the rest of the business.
	</p>

	<section class="cards" aria-label="People and workforce activity areas">
		<article>
			<h2>People</h2>
			<p>Human beings known to the owning business.</p>
		</article>
		<article>
			<h2>Employees</h2>
			<p>Employment records, status, start dates and primary business placement.</p>
		</article>
		<article>
			<h2>Employee positions</h2>
			<p>Who holds which position, when and whether it is their primary appointment.</p>
		</article>
		<article>
			<h2>Competence and authority</h2>
			<p>Skills, approvals and delegated limits for controlled workflows.</p>
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
