<svelte:head>
	<title>Administration | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p class="eyebrow">Documents, Reporting & Administration workspace</p>
	<h1>Platform administration and operating controls</h1>
	<p>
		Manage users, roles, permissions, teams, reference data, workflows, templates, integrations and
		system settings that support the whole PBM operating model.
	</p>

	<section class="cards" aria-label="Administration activity areas">
		<article>
			<h2>Access control</h2>
			<p>Users, roles, permissions and team structures.</p>
		</article>
		<article>
			<h2>Operating rules</h2>
			<p>Reference data, numbering sequences, workflows and service lines.</p>
		</article>
		<article>
			<h2>Platform setup</h2>
			<p>Templates, integrations and system settings.</p>
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
