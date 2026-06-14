<script lang="ts">
	let { data } = $props();

	const tabs = [
		{ label: 'Overview', href: `/app/crm/clients/${data.client.partyId}/overview` },
		{ label: 'Contacts', href: `/app/crm/clients/${data.client.partyId}/contacts/all` },
		{ label: 'Organisations', href: `/app/crm/clients/${data.client.partyId}/organisations` },
		{ label: 'People', href: `/app/crm/clients/${data.client.partyId}/people` },
		{ label: 'Relationships', href: `/app/crm/clients/${data.client.partyId}/relationships` },
		{ label: 'Communications', href: `/app/crm/clients/${data.client.partyId}/communications` },
		{ label: 'Addresses', href: `/app/crm/clients/${data.client.partyId}/addresses` },
		{ label: 'Properties', href: `/app/crm/clients/${data.client.partyId}/properties` },
		{ label: 'Opportunities', href: `/app/crm/clients/${data.client.partyId}/opportunities` },
		{ label: 'Instructions', href: `/app/crm/clients/${data.client.partyId}/instructions` },
		{ label: 'Documents', href: `/app/crm/clients/${data.client.partyId}/documents` },
		{ label: 'Finance', href: `/app/crm/clients/${data.client.partyId}/finance` },
		{ label: 'Compliance', href: `/app/crm/clients/${data.client.partyId}/compliance` },
		{ label: 'Activity', href: `/app/crm/clients/${data.client.partyId}/activity` }
	];
</script>

<svelte:head>
	<title>{data.client.displayName} | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p><a href="/app/crm/clients/all">← Back to clients</a></p>

	<header>
		<div>
			<p class="eyebrow">CRM / Client</p>
			<h1>{data.client.displayName}</h1>
			<p>{data.client.partyTypeCode} client · {data.client.statusCode}</p>
		</div>
	</header>

	<nav class="tabs" aria-label="Client sections">
		{#each tabs as tab}
			<a href={tab.href}>{tab.label}</a>
		{/each}
	</nav>

	<div class="panel">
		<h2>Client overview</h2>

		<dl>
			<dt>Client ID</dt>
			<dd>{data.client.partyId}</dd>

			<dt>Type</dt>
			<dd>{data.client.partyTypeCode}</dd>

			<dt>Status</dt>
			<dd>{data.client.statusCode}</dd>

			<dt>Created</dt>
			<dd>{data.client.createdAt}</dd>
		</dl>
	</div>
</section>

<style>
	.page {
		display: grid;
		gap: 1.25rem;
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

	.tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tabs a {
		padding: 0.55rem 0.75rem;
		border-radius: 999px;
		background: white;
		color: inherit;
		text-decoration: none;
		font-weight: 700;
		border: 1px solid rgba(0, 0, 0, 0.08);
	}

	.panel {
		background: white;
		border-radius: 1rem;
		padding: 1.25rem;
	}

	dl {
		display: grid;
		grid-template-columns: 10rem 1fr;
		gap: 0.75rem;
	}

	dt {
		font-weight: 800;
	}

	dd {
		margin: 0;
	}
</style>
