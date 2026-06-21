<svelte:head>
	<title>Quality, Risk & Compliance | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p class="eyebrow">Quality, Risk & Compliance workspace</p>
	<h1>Quality checks, risk controls and compliance evidence</h1>
	<p>
		Keep assurance activity visible across quality reviews, complaints, conflicts, professional
		indemnity risk, audit evidence and control actions.
	</p>

	<section class="cards" aria-label="Quality risk and compliance activity areas">
		<article>
			<h2>Quality assurance</h2>
			<p>Reviews, gates, findings and corrective actions.</p>
		</article>
		<article>
			<h2>Risk and obligations</h2>
			<p>PI risk, conflicts of interest, complaints and control ownership.</p>
		</article>
		<article>
			<h2>Audit trail</h2>
			<p>Evidence, decisions and actions that prove the business is under control.</p>
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
