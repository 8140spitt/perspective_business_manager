<svelte:head>
	<title>Commercial Pipeline | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p class="eyebrow">Clients & Commercial workspace</p>
	<h1>Sales and commercial pipeline</h1>
	<p>
		Track the path from enquiry to opportunity, fee proposal, quotation and instructed work.
		This is the commercial activity view over shared client and project records.
	</p>

	<section class="cards" aria-label="Commercial pipeline activity areas">
		<article>
			<h2>Enquiries</h2>
			<p>New requests, early qualification and source tracking.</p>
		</article>
		<article>
			<h2>Opportunities</h2>
			<p>Potential work, value, probability, owner and next action.</p>
		</article>
		<article>
			<h2>Quotes and proposals</h2>
			<p>Fee proposals, quotations and tender responses linked to delivery scope.</p>
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
