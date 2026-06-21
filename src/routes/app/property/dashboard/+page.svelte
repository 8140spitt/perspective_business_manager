<svelte:head>
	<title>Property & Assets | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p class="eyebrow">Property & Assets workspace</p>
	<h1>Property register, buildings and asset lifecycle</h1>
	<p>
		Manage property records, sites, buildings, units, building elements, inspections, defects and
		maintenance context from one property activity view.
	</p>

	<section class="cards" aria-label="Property and assets activity areas">
		<article>
			<h2>Property register</h2>
			<p>Sites, properties, buildings, units and spaces.</p>
		</article>
		<article>
			<h2>Building elements</h2>
			<p>Elements, condition, defects and inspection context.</p>
		</article>
		<article>
			<h2>Lifecycle control</h2>
			<p>Maintenance, cost, asset status and long-term evidence.</p>
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
