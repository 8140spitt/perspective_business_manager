<script lang="ts">
	import { page } from '$app/state';
	import { capabilityMap, type CapabilityArea } from '$lib/business/capability-map';

	let { children } = $props();

	const statusLabel: Record<CapabilityArea['status'], string> = {
		foundation: 'Foundation',
		scaffolded: 'Scaffolded',
		future: 'Future'
	};

	const routeLabels: Record<string, string> = {
		'/app/business/dashboard': 'Overview',
		'/app/business/profile': 'Business profile',
		'/app/business/functions': 'Business functions',
		'/app/business/organisation-units': 'Organisation units',
		'/app/business/positions': 'Positions',

		'/app/finance': 'Finance workbench',
		'/app/finance/dashboard': 'Overview',
		'/app/finance/expenses': 'Expenses',
		'/app/finance/fees': 'Fees',
		'/app/finance/payments': 'Payments',
		'/app/finance/profitability': 'Profitability',
		'/app/finance/purchase-invoices': 'Supplier invoices',
		'/app/finance/sales-invoices': 'Sales invoices',
		'/app/finance/wip': 'Work in progress',

		'/app/hr/dashboard': 'Overview',
		'/app/hr/employees': 'Employees',
		'/app/hr/competencies': 'Competencies',
		'/app/hr/roles': 'Roles',
		'/app/hr/training': 'Training',

		'/app/crm/dashboard': 'Client overview',
		'/app/crm/clients': 'Clients',
		'/app/sales/dashboard': 'Commercial pipeline',
		'/app/sales/enquiries': 'Enquiries',
		'/app/sales/fee-proposals': 'Fee proposals',
		'/app/sales/opportunities': 'Opportunities',
		'/app/sales/pipeline': 'Pipeline',
		'/app/sales/quotations': 'Quotations',
		'/app/sales/tenders': 'Tenders',

		'/app/projects/dashboard': 'Overview',
		'/app/projects/projects': 'Projects',
		'/app/projects/projects/new': 'New project',
		'/app/activities': 'Activities',
		'/app/activities/new': 'New activity',

		'/app/procurement/dashboard': 'Overview',
		'/app/procurement/purchase-orders': 'Purchase orders',
		'/app/procurement/suppliers': 'Suppliers',

		'/app/operations/dashboard': 'Overview',
		'/app/operations/instructions': 'Instructions',
		'/app/operations/building-surveys': 'Building surveys',
		'/app/operations/dilapidations': 'Dilapidations',
		'/app/operations/insurance-reinstatements': 'Insurance reinstatements',
		'/app/operations/reinstatement-cost-assessments': 'Reinstatement cost assessments',
		'/app/operations/schedules-of-condition': 'Schedules of condition',
		'/app/resource-planning/dashboard': 'Resource planning',
		'/app/resource-planning/allocations': 'Allocations',
		'/app/resource-planning/availability': 'Availability',
		'/app/resource-planning/inspection-calendar': 'Inspection calendar',
		'/app/resource-planning/utilisation': 'Utilisation',
		'/app/resource-planning/workload': 'Workload',
		'/app/instructions': 'Instructions register',
		'/app/surveys': 'Surveys register',

		'/app/compliance': 'Compliance workbench',
		'/app/compliance/dashboard': 'Overview',
		'/app/compliance/audit-trail': 'Audit trail',
		'/app/compliance/complaints': 'Complaints',
		'/app/compliance/conflicts-of-interest': 'Conflicts of interest',
		'/app/compliance/pi-risk': 'Professional indemnity risk',
		'/app/compliance/quality-reviews': 'Quality reviews',

		'/app/property/dashboard': 'Overview',
		'/app/property/property-register': 'Property register',
		'/app/property/sites': 'Sites',
		'/app/property/buildings': 'Buildings',
		'/app/property/building-elements': 'Building elements',
		'/app/property/units': 'Units',
		'/app/properties': 'Properties register',
		'/app/properties/new': 'New property',

		'/app/documents': 'Document register',
		'/app/documents/dashboard': 'Documents overview',
		'/app/documents/document-library': 'Document library',
		'/app/documents/drawings': 'Drawings',
		'/app/documents/evidence-library': 'Evidence library',
		'/app/documents/photos': 'Photos',
		'/app/documents/templates': 'Document templates',
		'/app/evidence': 'Evidence register',
		'/app/reporting/dashboard': 'Reporting overview',
		'/app/reporting/compliance-reports': 'Compliance reports',
		'/app/reporting/exports': 'Exports',
		'/app/reporting/financial-reports': 'Financial reports',
		'/app/reporting/kpis': 'KPIs',
		'/app/reporting/operations-reports': 'Operations reports',
		'/app/reporting/project-reports': 'Project reports',
		'/app/reporting/sales-reports': 'Sales reports',
		'/app/reporting/utilisation-reports': 'Utilisation reports',
		'/app/reports': 'Reports register',
		'/app/admin/dashboard': 'Administration',
		'/app/admin/document-templates': 'Document templates',
		'/app/admin/integrations': 'Integrations',
		'/app/admin/numbering-sequences': 'Numbering sequences',
		'/app/admin/permissions': 'Permissions',
		'/app/admin/reference-data': 'Reference data',
		'/app/admin/report-templates': 'Report templates',
		'/app/admin/roles': 'Roles',
		'/app/admin/service-lines': 'Service lines',
		'/app/admin/system-settings': 'System settings',
		'/app/admin/teams': 'Teams',
		'/app/admin/users': 'Users',
		'/app/admin/workflows': 'Workflow administration',
		'/app/workflows': 'Workflow register'
	};

	function staticPrefix(route: string): string {
		const dynamicIndex = route.indexOf('/[');
		return dynamicIndex === -1 ? route : route.slice(0, dynamicIndex);
	}

	function matchesArea(pathname: string, area: CapabilityArea): boolean {
		const allRoutes = [area.primaryRoute, ...area.currentRoutes];

		return allRoutes.some((route) => {
			const prefix = staticPrefix(route);
			return pathname === route || pathname === prefix || pathname.startsWith(`${prefix}/`);
		});
	}

	function routeLabel(route: string): string {
		if (routeLabels[route]) return routeLabels[route];

		const cleaned = route
			.split('/')
			.filter(Boolean)
			.filter((segment) => segment !== 'app')
			.map((segment) => segment.replace(/\[.*?\]/g, 'detail').replace(/-/g, ' '));

		return cleaned
			.slice(-2)
			.map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
			.join(' / ');
	}

	const activeArea = $derived.by(() => {
		const pathname = page.url.pathname;
		return capabilityMap.find((area) => matchesArea(pathname, area)) ?? null;
	});

	const activeRoutes = $derived.by(() => {
		if (!activeArea) return [];
		return [activeArea.primaryRoute, ...activeArea.currentRoutes].filter(
			(route, index, routes) => routes.indexOf(route) === index
		);
	});
</script>

<div class="shell">
	<aside class="sidebar">
		<a class="brand" href="/app/dashboard">
			<span class="brand-mark">PBM</span>
			<span>
				<strong>Perspective</strong>
				<small>Enterprise operating system</small>
			</span>
		</a>

		<nav class="primary-nav" aria-label="Workspace navigation">
			{#each capabilityMap as area}
				<a class:active={activeArea?.id === area.id} href={area.primaryRoute}>
					<span>{area.name}</span>
					<small>{statusLabel[area.status]}</small>
				</a>
			{/each}
		</nav>
	</aside>

	<div class="content">
		<header class="topbar">
			<div>
				<p class="eyebrow">Workspace</p>
				<h1>{activeArea?.name ?? 'Perspective Business Manager'}</h1>
				<p class="lede">
					{activeArea?.description ??
						'Shared enterprise workspace for the built environment sector.'}
				</p>
			</div>

			{#if activeArea}
				<span class="status" data-status={activeArea.status}>{statusLabel[activeArea.status]}</span>
			{/if}
		</header>

		{#if activeArea}
			<nav class="workspace-nav" aria-label="Workspace activities">
				{#each activeRoutes as route}
					<a
						class:active={page.url.pathname === route ||
							page.url.pathname.startsWith(`${staticPrefix(route)}/`)}
						href={route}
					>
						{routeLabel(route)}
					</a>
				{/each}
			</nav>
		{/if}

		<main class="viewport">
			{@render children()}
		</main>
	</div>
</div>

<style>
	:global(body) {
		margin: 0;
		background: linear-gradient(180deg, #f5f2ea 0%, #f1eee6 100%);
		color: #171717;
		font-family: 'IBM Plex Sans', 'Avenir Next', 'Segoe UI', sans-serif;
	}

	.shell {
		display: grid;
		grid-template-columns: 18rem minmax(0, 1fr);
		min-height: 100vh;
		position: fixed;
		inset: 0;
		& > * {
			overflow: auto;
		}
	}

	.sidebar {
		position: sticky;
		top: 0;
		height: 100vh;
		display: grid;
		align-content: start;
		gap: 1.25rem;
		padding: 1.25rem;
		background: #111111;
		color: #f5f2ea;
		border-right: 1px solid rgba(255, 255, 255, 0.08);
	}

	.brand {
		display: flex;
		gap: 0.85rem;
		align-items: center;
		padding: 0.85rem 0.9rem;
		border-radius: 1rem;
		background: rgba(255, 255, 255, 0.06);
		color: inherit;
		text-decoration: none;
	}

	.brand-mark {
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: 0.8rem;
		background: linear-gradient(135deg, #d6b57c, #f5e3bf);
		color: #171717;
		font-weight: 900;
		letter-spacing: 0.04em;
	}

	.brand strong,
	.brand small {
		display: block;
	}

	.brand small {
		margin-top: 0.1rem;
		opacity: 0.72;
	}

	.primary-nav {
		display: grid;
		gap: 0.35rem;
	}

	.primary-nav a {
		display: grid;
		gap: 0.1rem;
		padding: 0.75rem 0.85rem;
		border-radius: 0.9rem;
		color: inherit;
		text-decoration: none;
		background: transparent;
	}

	.primary-nav a:hover,
	.primary-nav a.active {
		background: rgba(255, 255, 255, 0.08);
	}

	.primary-nav small {
		opacity: 0.62;
	}

	.content {
		display: grid;
		grid-template-rows: auto auto 1fr;
		min-width: 0;
	}

	.topbar {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		align-items: start;
		padding: 1.5rem 1.5rem 0.75rem;
	}

	.eyebrow {
		margin: 0;
		font-size: 0.75rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		opacity: 0.6;
	}

	h1,
	.lede {
		margin: 0.2rem 0 0;
	}

	h1 {
		font-size: clamp(1.75rem, 3vw, 2.5rem);
		letter-spacing: -0.04em;
	}

	.lede {
		max-width: 70ch;
		line-height: 1.55;
		opacity: 0.72;
	}

	.status {
		padding: 0.45rem 0.7rem;
		border-radius: 999px;
		background: #e6dcc7;
		font-size: 0.78rem;
		font-weight: 800;
		text-transform: uppercase;
		letter-spacing: 0.06em;
	}

	.status[data-status='foundation'] {
		background: #d7ead7;
	}

	.status[data-status='future'] {
		background: #efe4d2;
	}

	.workspace-nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
		padding: 0 1.5rem 1rem;
	}

	.workspace-nav a {
		padding: 0.6rem 0.8rem;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.05);
		color: inherit;
		text-decoration: none;
		font-size: 0.92rem;
		font-weight: 700;
	}

	.workspace-nav a.active,
	.workspace-nav a:hover {
		background: #171717;
		color: white;
	}

	.viewport {
		min-width: 0;
	}

	@media (max-width: 980px) {
		.shell {
			grid-template-columns: 1fr;
		}

		.sidebar {
			position: static;
			height: auto;
		}

		.primary-nav {
			grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
		}
	}
</style>
