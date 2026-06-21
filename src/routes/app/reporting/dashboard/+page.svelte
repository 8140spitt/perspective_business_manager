<svelte:head>
	<title>Reporting & Controls | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p class="eyebrow">Documents, Reporting & Administration workspace</p>
	<h1>Reporting views, KPIs and export packs</h1>
	<p>
		Bring finance, project, sales, operations, utilisation and compliance reporting together from
		the shared PBM data spine.
	</p>

	<section class="cards" aria-label="Reporting activity areas">
		<article>
			<h2>KPI views</h2>
			<p>Current measures for performance, workload, delivery and control.</p>
		</article>
		<article>
			<h2>Business reports</h2>
			<p>Finance, project, sales, operations, utilisation and compliance reports.</p>
		</article>
		<article>
			<h2>Export packs</h2>
			<p>Controlled outputs for review, governance and external reporting.</p>
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
