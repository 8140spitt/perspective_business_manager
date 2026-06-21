<svelte:head>
	<title>Procurement & Supplier Control | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p class="eyebrow">Procurement & Supplier Control workspace</p>
	<h1>Suppliers, purchase orders and commitments</h1>
	<p>
		Manage supplier relationships, purchase orders, supplier commitments and cost exposure before
		they flow into finance and project reporting.
	</p>

	<section class="cards" aria-label="Procurement and supplier control activity areas">
		<article>
			<h2>Suppliers</h2>
			<p>Supplier records, contacts, roles, status and performance context.</p>
		</article>
		<article>
			<h2>Purchasing</h2>
			<p>Purchase orders, lines, approvals, commitments and receipt status.</p>
		</article>
		<article>
			<h2>Cost exposure</h2>
			<p>Supplier spend, unmatched invoices and project procurement cost visibility.</p>
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
