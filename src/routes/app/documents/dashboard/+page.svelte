<svelte:head>
	<title>Documents & Evidence | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p class="eyebrow">Documents, Reporting & Administration workspace</p>
	<h1>Documents, evidence and controlled information</h1>
	<p>
		Use this activity view to manage document libraries, evidence, drawings, photos and templates
		that support delivery, control and reporting.
	</p>

	<section class="cards" aria-label="Document and evidence activity areas">
		<article>
			<h2>Document library</h2>
			<p>Controlled documents, drawings, photos and reusable templates.</p>
		</article>
		<article>
			<h2>Evidence library</h2>
			<p>Supporting evidence linked to projects, properties, compliance and reports.</p>
		</article>
		<article>
			<h2>Information control</h2>
			<p>Version, retention, traceability and audit context.</p>
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
