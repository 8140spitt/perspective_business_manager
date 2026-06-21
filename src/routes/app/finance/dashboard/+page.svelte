<svelte:head>
	<title>Finance & Control | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p class="eyebrow">Finance & Control workspace</p>
	<h1>Money, margin and financial control</h1>
	<p>
		Control invoices, payments, fees, expenses, work in progress, profitability and management
		reporting from one finance activity view.
	</p>

	<section class="cards" aria-label="Finance and control activity areas">
		<article>
			<h2>Invoices and payments</h2>
			<p>Sales invoices, supplier invoices, payment status and cash movement.</p>
		</article>
		<article>
			<h2>Cost and margin</h2>
			<p>Fees, expenses, WIP, profitability and project financial exposure.</p>
		</article>
		<article>
			<h2>Reporting control</h2>
			<p>Period reporting, management accounts and finance controls.</p>
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
