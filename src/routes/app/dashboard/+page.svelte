<script lang="ts">
	import { capabilityMap, ricsInstructionLifecycle } from '$lib/business/capability-map';

	const statusLabel = {
		foundation: 'Foundation model exists',
		scaffolded: 'Screen scaffolded',
		future: 'Future build'
	};

	const erpAlignment = [
		{
			module: 'CRM',
			submodules: ['Customer master', 'Contacts', 'Relationships', 'Account view'],
			coverage: 'Sales & Client Management',
			routes: ['/app/crm/dashboard', '/app/crm/clients', '/app/parties'],
			position: 'Present'
		},
		{
			module: 'Sales',
			submodules: ['Enquiries', 'Opportunities', 'Proposals', 'Quotations', 'Tenders'],
			coverage: 'Sales & Client Management',
			routes: ['/app/sales/dashboard', '/app/sales/enquiries', '/app/sales/opportunities'],
			position: 'Present'
		},
		{
			module: 'Service Orders & Operations',
			submodules: ['Instructions', 'Activities', 'Findings', 'Actions', 'Deliverables'],
			coverage: 'Service Delivery & Projects',
			routes: ['/app/operations/instructions', '/app/activities', '/app/operations/dashboard'],
			position: 'Present'
		},
		{
			module: 'Project Management',
			submodules: ['Overview', 'Team', 'Milestones', 'Tasks', 'Risks', 'Issues'],
			coverage: 'Service Delivery & Projects',
			routes: ['/app/projects/dashboard', '/app/projects/projects'],
			position: 'Present'
		},
		{
			module: 'Asset / Property',
			submodules: ['Property register', 'Sites', 'Buildings', 'Units', 'Occupiers'],
			coverage: 'Property & Asset Management',
			routes: ['/app/property/dashboard', '/app/property/property-register', '/app/properties'],
			position: 'Present'
		},
		{
			module: 'Finance',
			submodules: ['Fees', 'WIP', 'Sales invoices', 'Payments', 'Expenses', 'Profitability'],
			coverage: 'Finance & Commercial Control',
			routes: ['/app/finance/dashboard', '/app/finance/fees', '/app/finance/wip'],
			position: 'Present'
		},
		{
			module: 'Procurement',
			submodules: ['Suppliers', 'Purchase orders', 'Bought-in services'],
			coverage: 'Procurement & Supply Chain',
			routes: ['/app/procurement/dashboard', '/app/procurement/suppliers'],
			position: 'Partial'
		},
		{
			module: 'HR & Resource Planning',
			submodules: ['Employees', 'Competencies', 'Allocations', 'Availability', 'Utilisation'],
			coverage: 'Workforce & Resource Planning',
			routes: ['/app/hr/dashboard', '/app/resource-planning/dashboard'],
			position: 'Present'
		},
		{
			module: 'Compliance & Audit',
			submodules: ['Conflicts', 'Complaints', 'PI risk', 'Audit trail', 'Quality reviews'],
			coverage: 'Quality, Risk & Compliance',
			routes: ['/app/compliance/dashboard', '/app/compliance/complaints'],
			position: 'Present'
		},
		{
			module: 'Documents, Reporting & Admin',
			submodules: ['Documents', 'Evidence', 'Reporting', 'Reference data', 'Workflows'],
			coverage: 'Documents, Analytics & Integration',
			routes: ['/app/documents/dashboard', '/app/reporting/dashboard', '/app/admin/dashboard'],
			position: 'Present'
		}
	] as const;

	const foundationCount = capabilityMap.filter((area) => area.status === 'foundation').length;
	const scaffoldedCount = capabilityMap.filter((area) => area.status === 'scaffolded').length;
	const routeCount = capabilityMap.reduce((total, area) => total + area.currentRoutes.length, 0);
</script>

<svelte:head>
	<title>Operating Model | Perspective Business Manager</title>
</svelte:head>

<section class="shell">
	<div class="hero">
		<p class="eyebrow">Perspective Business Manager</p>
		<h1>RICS practice ERP realigned around business capability.</h1>
		<p class="lede">
			The app keeps the existing module routes, but the design authority now comes from the business
			operating model: client, instruction, property, project, people, finance, compliance and
			records.
		</p>
	</div>

	<div class="metrics" aria-label="Realignment summary">
		<div class="metric">
			<strong>{capabilityMap.length}</strong>
			<span>capability areas</span>
		</div>
		<div class="metric">
			<strong>{foundationCount}</strong>
			<span>foundation areas</span>
		</div>
		<div class="metric">
			<strong>{scaffoldedCount}</strong>
			<span>scaffolded areas</span>
		</div>
		<div class="metric">
			<strong>{routeCount}</strong>
			<span>mapped routes</span>
		</div>
	</div>

	<section class="panel">
		<div>
			<p class="eyebrow">Primary business thread</p>
			<h2>Instruction lifecycle</h2>
		</div>

		<ol class="timeline">
			{#each ricsInstructionLifecycle as step, index}
				<li>
					<span>{String(index + 1).padStart(2, '0')}</span>
					<p>{step}</p>
				</li>
			{/each}
		</ol>
	</section>

	<section class="panel">
		<div>
			<p class="eyebrow">ERP Alignment</p>
			<h2>Normal ERP modules, mapped here</h2>
			<p class="lede small">
				This product is object-first, but the workspaces below show where familiar ERP modules and
				submodules sit in the app.
			</p>
		</div>

		<div class="alignment-grid" aria-label="ERP module alignment">
			{#each erpAlignment as item}
				<article class="alignment-card">
					<div class="alignment-head">
						<div>
							<p class="eyebrow">{item.coverage}</p>
							<h3>{item.module}</h3>
						</div>
						<span class="badge" data-position={item.position.toLowerCase()}>{item.position}</span>
					</div>

					<div class="stack">
						<div>
							<span class="meta-label">Submodules</span>
							<div class="chips">
								{#each item.submodules as submodule}
									<span>{submodule}</span>
								{/each}
							</div>
						</div>

						<div>
							<span class="meta-label">Workspace routes</span>
							<div class="route-list">
								{#each item.routes as route}
									<a href={route}>{route}</a>
								{/each}
							</div>
						</div>
					</div>
				</article>
			{/each}
		</div>
	</section>

	<section class="capabilities" aria-label="Capability map">
		{#each capabilityMap as area}
			<article class="card">
				<div class="card-header">
					<p class="status" data-status={area.status}>{statusLabel[area.status]}</p>
					<h2>{area.name}</h2>
				</div>

				<p>{area.description}</p>

				<div class="meta">
					<span>Primary route</span>
					<a href={area.primaryRoute}>{area.primaryRoute}</a>
				</div>

				<div class="chips" aria-label="Core objects">
					{#each area.coreObjects as object}
						<span>{object}</span>
					{/each}
				</div>
			</article>
		{/each}
	</section>
</section>

<style>
	.shell {
		display: grid;
		gap: 1.5rem;
		padding: clamp(1rem, 3vw, 2.5rem);
		background:
			radial-gradient(
				circle at top left,
				color-mix(in oklch, CanvasText 8%, transparent),
				transparent 28rem
			),
			Canvas;
		color: CanvasText;
	}

	.hero,
	.panel,
	.card,
	.metric {
		border: 1px solid color-mix(in oklch, CanvasText 14%, transparent);
		background: color-mix(in oklch, Canvas 92%, CanvasText 8%);
		box-shadow: 0 1rem 3rem color-mix(in oklch, CanvasText 8%, transparent);
	}

	.hero {
		display: grid;
		gap: 1rem;
		padding: clamp(1.5rem, 5vw, 4rem);
		border-radius: 2rem;
	}

	.eyebrow,
	.status {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.09em;
		text-transform: uppercase;
		opacity: 0.68;
	}

	h1,
	h2,
	p {
		margin: 0;
	}

	h1 {
		max-width: 14ch;
		font-size: clamp(2.5rem, 8vw, 6rem);
		line-height: 0.9;
		letter-spacing: -0.07em;
	}

	h2 {
		font-size: clamp(1.15rem, 2vw, 1.65rem);
		letter-spacing: -0.035em;
	}

	h3 {
		margin: 0;
		font-size: 1.05rem;
		letter-spacing: -0.02em;
	}

	.lede {
		max-width: 72ch;
		font-size: clamp(1rem, 2vw, 1.25rem);
		line-height: 1.65;
		opacity: 0.78;
	}

	.lede.small {
		font-size: 1rem;
	}

	.metrics {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 1rem;
	}

	.metric {
		display: grid;
		gap: 0.25rem;
		padding: 1.25rem;
		border-radius: 1.25rem;
	}

	.metric strong {
		font-size: 2rem;
		line-height: 1;
	}

	.metric span,
	.meta span {
		opacity: 0.65;
	}

	.panel {
		display: grid;
		gap: 1.25rem;
		padding: clamp(1rem, 3vw, 2rem);
		border-radius: 1.5rem;
	}

	.timeline {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		gap: 0.75rem;
		padding: 0;
		margin: 0;
		list-style: none;
	}

	.timeline li {
		display: grid;
		gap: 0.35rem;
		align-content: start;
		min-height: 6rem;
		padding: 1rem;
		border-radius: 1rem;
		background: color-mix(in oklch, Canvas 80%, CanvasText 20%);
	}

	.timeline span {
		font-size: 0.75rem;
		font-weight: 800;
		opacity: 0.5;
	}

	.alignment-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
		gap: 1rem;
	}

	.alignment-card {
		display: grid;
		gap: 1rem;
		padding: 1.1rem;
		border-radius: 1rem;
		background: color-mix(in oklch, Canvas 84%, CanvasText 16%);
	}

	.alignment-head {
		display: flex;
		justify-content: space-between;
		gap: 0.75rem;
		align-items: start;
	}

	.stack {
		display: grid;
		gap: 0.9rem;
	}

	.meta-label {
		display: block;
		margin-bottom: 0.45rem;
		font-size: 0.76rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.62;
	}

	.route-list {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
	}

	.route-list a {
		padding: 0.3rem 0.5rem;
		border-radius: 999px;
		background: color-mix(in oklch, CanvasText 8%, transparent);
		font-size: 0.8rem;
		text-decoration: none;
	}

	.badge {
		padding: 0.35rem 0.55rem;
		border-radius: 999px;
		font-size: 0.72rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.07em;
		background: #d7ead7;
	}

	.badge[data-position='partial'] {
		background: #efe4d2;
	}

	.capabilities {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
		gap: 1rem;
	}

	.card {
		display: grid;
		gap: 1rem;
		align-content: start;
		padding: 1.25rem;
		border-radius: 1.25rem;
	}

	.card-header {
		display: grid;
		gap: 0.35rem;
	}

	.card > p {
		line-height: 1.55;
		opacity: 0.76;
	}

	.status[data-status='foundation'] {
		opacity: 1;
	}

	.meta {
		display: grid;
		gap: 0.2rem;
		font-size: 0.9rem;
	}

	a {
		color: inherit;
		font-weight: 700;
		text-decoration-thickness: 0.08em;
		text-underline-offset: 0.18em;
	}

	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.chips span {
		padding: 0.35rem 0.55rem;
		border-radius: 999px;
		background: color-mix(in oklch, CanvasText 10%, transparent);
		font-size: 0.78rem;
		font-weight: 700;
	}
</style>
