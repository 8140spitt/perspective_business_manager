<svelte:head>
	<title>Clients & Commercial | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p class="eyebrow">Clients & Commercial workspace</p>
	<h1>Client relationships and commercial pipeline</h1>
	<p>
		Use this workspace to manage clients, relationships, enquiries, opportunities, quotes and
		commercial instructions before work moves into delivery.
	</p>

	<section class="cards" aria-label="Clients and commercial activity areas">
		<article>
			<h2>Client records</h2>
			<p>Business partners, contacts, roles and account context.</p>
		</article>
		<article>
			<h2>Pipeline</h2>
			<p>Enquiries, opportunities, tenders, fee proposals and quotations.</p>
		</article>
		<article>
			<h2>Instructions</h2>
			<p>Accepted work, billing triggers and handover into project delivery.</p>
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
