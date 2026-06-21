<script lang="ts">
	import { resolve } from '$app/paths';

	let { data } = $props();
</script>

<svelte:head>
	<title>Business Profile | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<header class="hero">
		<div>
			<p class="eyebrow">Business workspace</p>
			<h1>Business profile</h1>
			<p>The owning business record anchors the operating model, HR, projects, procurement and finance.</p>
		</div>
		<a href={resolve('/app/business/dashboard')}>Back to business dashboard</a>
	</header>

	{#if data.profile}
		<section class="panel">
			<div>
				<p class="eyebrow">Owning business</p>
				<h2>{data.profile.tradingName ?? data.profile.legalName ?? data.profile.partnerName}</h2>
				<p>{data.profile.legalName ?? data.profile.partnerName}</p>
			</div>
		</section>

		<section class="details">
			<div class="detail">
				<span>Partner reference</span>
				<strong>{data.profile.partnerReference ?? 'Not set'}</strong>
			</div>
			<div class="detail">
				<span>Status</span>
				<strong>{data.profile.partnerStatusCode}</strong>
			</div>
			<div class="detail">
				<span>Company number</span>
				<strong>{data.profile.companyNumber ?? 'Not set'}</strong>
			</div>
			<div class="detail">
				<span>VAT number</span>
				<strong>{data.profile.vatNumber ?? 'Not set'}</strong>
			</div>
			<div class="detail">
				<span>Tax reference</span>
				<strong>{data.profile.taxReference ?? 'Not set'}</strong>
			</div>
			<div class="detail">
				<span>Industry code</span>
				<strong>{data.profile.industryCode ?? 'Not set'}</strong>
			</div>
		</section>

		<section class="panel">
			<p class="eyebrow">Operating model role</p>
			<p>
				This business profile is the organisation using PBM. Business functions, organisation units,
				positions and employees sit underneath this business setup.
			</p>
		</section>
	{:else}
		<section class="panel warning">
			<h2>No business profile found</h2>
			<p>Run the database migrations so the seed profile can be created.</p>
		</section>
	{/if}
</section>

<style>
	.page {
		display: grid;
		gap: 1.5rem;
		padding: 2rem;
	}

	.hero,
	.panel,
	.detail {
		border: 1px solid rgba(0, 0, 0, 0.08);
		border-radius: 1rem;
		background: white;
	}

	.hero {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: start;
		padding: 1.5rem;
	}

	.panel {
		display: grid;
		gap: 0.5rem;
		padding: 1.5rem;
	}

	.details {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		gap: 1rem;
	}

	.detail {
		display: grid;
		gap: 0.35rem;
		padding: 1.25rem;
	}

	.eyebrow,
	.detail span {
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

	a {
		color: inherit;
		font-weight: 700;
	}

	.warning {
		border-style: dashed;
	}
</style>