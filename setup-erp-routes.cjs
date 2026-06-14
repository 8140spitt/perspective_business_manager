const fs = require('fs');
const path = require('path');

const routes = [
	'src/routes/app/dashboard',

	'src/routes/app/crm/dashboard',
	'src/routes/app/crm/clients',
	'src/routes/app/crm/clients/all',
	'src/routes/app/crm/clients/organisation-clients',
	'src/routes/app/crm/clients/individual-clients',
	'src/routes/app/crm/clients/new',
	'src/routes/app/crm/clients/[clientId]/overview',
	'src/routes/app/crm/clients/[clientId]/profile',
	'src/routes/app/crm/clients/[clientId]/contacts/all',
	'src/routes/app/crm/clients/[clientId]/contacts/new',
	'src/routes/app/crm/clients/[clientId]/contacts/[contactId]/overview',
	'src/routes/app/crm/clients/[clientId]/contacts/[contactId]/contact-methods',
	'src/routes/app/crm/clients/[clientId]/contacts/[contactId]/role',
	'src/routes/app/crm/clients/[clientId]/contacts/[contactId]/communications',
	'src/routes/app/crm/clients/[clientId]/contacts/[contactId]/notes',
	'src/routes/app/crm/clients/[clientId]/organisations',
	'src/routes/app/crm/clients/[clientId]/people',
	'src/routes/app/crm/clients/[clientId]/relationships',
	'src/routes/app/crm/clients/[clientId]/communications',
	'src/routes/app/crm/clients/[clientId]/addresses',
	'src/routes/app/crm/clients/[clientId]/properties',
	'src/routes/app/crm/clients/[clientId]/opportunities',
	'src/routes/app/crm/clients/[clientId]/instructions',
	'src/routes/app/crm/clients/[clientId]/projects',
	'src/routes/app/crm/clients/[clientId]/documents',
	'src/routes/app/crm/clients/[clientId]/finance',
	'src/routes/app/crm/clients/[clientId]/compliance',
	'src/routes/app/crm/clients/[clientId]/activity',

	'src/routes/app/sales/dashboard',
	'src/routes/app/sales/enquiries',
	'src/routes/app/sales/enquiries/new',
	'src/routes/app/sales/enquiries/[enquiryId]',
	'src/routes/app/sales/opportunities',
	'src/routes/app/sales/opportunities/new',
	'src/routes/app/sales/opportunities/[opportunityId]',
	'src/routes/app/sales/fee-proposals',
	'src/routes/app/sales/quotations',
	'src/routes/app/sales/tenders',
	'src/routes/app/sales/pipeline',

	'src/routes/app/projects/dashboard',
	'src/routes/app/projects/projects',
	'src/routes/app/projects/projects/new',
	'src/routes/app/projects/projects/[projectId]/overview',
	'src/routes/app/projects/projects/[projectId]/team',
	'src/routes/app/projects/projects/[projectId]/programme',
	'src/routes/app/projects/projects/[projectId]/milestones',
	'src/routes/app/projects/projects/[projectId]/tasks',
	'src/routes/app/projects/projects/[projectId]/risks',
	'src/routes/app/projects/projects/[projectId]/issues',
	'src/routes/app/projects/projects/[projectId]/documents',
	'src/routes/app/projects/projects/[projectId]/financials',

	'src/routes/app/operations/dashboard',
	'src/routes/app/operations/instructions',
	'src/routes/app/operations/instructions/new',
	'src/routes/app/operations/instructions/[instructionId]/overview',
	'src/routes/app/operations/instructions/[instructionId]/client',
	'src/routes/app/operations/instructions/[instructionId]/property',
	'src/routes/app/operations/instructions/[instructionId]/scope',
	'src/routes/app/operations/instructions/[instructionId]/team',
	'src/routes/app/operations/instructions/[instructionId]/inspection',
	'src/routes/app/operations/instructions/[instructionId]/evidence',
	'src/routes/app/operations/instructions/[instructionId]/defects',
	'src/routes/app/operations/instructions/[instructionId]/report',
	'src/routes/app/operations/instructions/[instructionId]/review',
	'src/routes/app/operations/instructions/[instructionId]/fee',
	'src/routes/app/operations/instructions/[instructionId]/compliance',
	'src/routes/app/operations/instructions/[instructionId]/audit',
	'src/routes/app/operations/building-surveys',
	'src/routes/app/operations/schedules-of-condition',
	'src/routes/app/operations/dilapidations',
	'src/routes/app/operations/reinstatement-cost-assessments',
	'src/routes/app/operations/insurance-reinstatements',

	'src/routes/app/property/dashboard',
	'src/routes/app/property/property-register',
	'src/routes/app/property/property-register/new',
	'src/routes/app/property/property-register/[propertyId]/overview',
	'src/routes/app/property/property-register/[propertyId]/address',
	'src/routes/app/property/property-register/[propertyId]/buildings',
	'src/routes/app/property/property-register/[propertyId]/units',
	'src/routes/app/property/property-register/[propertyId]/rooms-areas',
	'src/routes/app/property/property-register/[propertyId]/building-elements',
	'src/routes/app/property/property-register/[propertyId]/ownership',
	'src/routes/app/property/property-register/[propertyId]/occupiers',
	'src/routes/app/property/property-register/[propertyId]/leases',
	'src/routes/app/property/property-register/[propertyId]/condition-history',
	'src/routes/app/property/property-register/[propertyId]/inspections',
	'src/routes/app/property/property-register/[propertyId]/evidence',
	'src/routes/app/property/property-register/[propertyId]/documents',
	'src/routes/app/property/sites',
	'src/routes/app/property/buildings',
	'src/routes/app/property/units',
	'src/routes/app/property/building-elements',

	'src/routes/app/finance/dashboard',
	'src/routes/app/finance/fees',
	'src/routes/app/finance/wip',
	'src/routes/app/finance/sales-invoices',
	'src/routes/app/finance/purchase-invoices',
	'src/routes/app/finance/payments',
	'src/routes/app/finance/expenses',
	'src/routes/app/finance/profitability',

	'src/routes/app/procurement/dashboard',
	'src/routes/app/procurement/suppliers',
	'src/routes/app/procurement/suppliers/new',
	'src/routes/app/procurement/suppliers/[supplierId]',
	'src/routes/app/procurement/purchase-orders',

	'src/routes/app/hr/dashboard',
	'src/routes/app/hr/employees',
	'src/routes/app/hr/employees/new',
	'src/routes/app/hr/employees/[employeeId]',
	'src/routes/app/hr/roles',
	'src/routes/app/hr/training',
	'src/routes/app/hr/competencies',

	'src/routes/app/resource-planning/dashboard',
	'src/routes/app/resource-planning/availability',
	'src/routes/app/resource-planning/allocations',
	'src/routes/app/resource-planning/workload',
	'src/routes/app/resource-planning/utilisation',
	'src/routes/app/resource-planning/inspection-calendar',

	'src/routes/app/documents/dashboard',
	'src/routes/app/documents/document-library',
	'src/routes/app/documents/evidence-library',
	'src/routes/app/documents/photos',
	'src/routes/app/documents/drawings',
	'src/routes/app/documents/templates',

	'src/routes/app/compliance/dashboard',
	'src/routes/app/compliance/conflicts-of-interest',
	'src/routes/app/compliance/complaints',
	'src/routes/app/compliance/pi-risk',
	'src/routes/app/compliance/quality-reviews',
	'src/routes/app/compliance/audit-trail',

	'src/routes/app/reporting/dashboard',
	'src/routes/app/reporting/financial-reports',
	'src/routes/app/reporting/sales-reports',
	'src/routes/app/reporting/operations-reports',
	'src/routes/app/reporting/project-reports',
	'src/routes/app/reporting/utilisation-reports',
	'src/routes/app/reporting/compliance-reports',
	'src/routes/app/reporting/kpis',
	'src/routes/app/reporting/exports',

	'src/routes/app/admin/dashboard',
	'src/routes/app/admin/users',
	'src/routes/app/admin/teams',
	'src/routes/app/admin/roles',
	'src/routes/app/admin/permissions',
	'src/routes/app/admin/reference-data',
	'src/routes/app/admin/workflows',
	'src/routes/app/admin/numbering-sequences',
	'src/routes/app/admin/service-lines',
	'src/routes/app/admin/report-templates',
	'src/routes/app/admin/document-templates',
	'src/routes/app/admin/integrations',
	'src/routes/app/admin/system-settings'
];

function titleFromRoute(route) {
	return route
		.replace(/^src\/routes\/app\/?/, '/app/')
		.replace(/\[(.*?)\]/g, ':$1')
		.split('/')
		.filter(Boolean)
		.map((part) => part.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()))
		.join(' / ');
}

function pageContent(title) {
	return `<svelte:head>
	<title>${title} | Perspective Business Manager</title>
</svelte:head>

<section class="page">
	<p class="eyebrow">Perspective Business Manager</p>
	<h1>${title}</h1>
	<p>This screen is wired into the ERP structure and ready to build.</p>
</section>

<style>
	.page {
		display: grid;
		gap: 0.75rem;
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

	h1 {
		margin: 0;
	}
</style>
`;
}

for (const route of routes) {
	fs.mkdirSync(route, { recursive: true });

	const pagePath = path.join(route, '+page.svelte');

	if (!fs.existsSync(pagePath)) {
		const title = titleFromRoute(route);
		fs.writeFileSync(pagePath, pageContent(title), 'utf8');
	}
}

console.log(`Created or checked ${routes.length} ERP route folders.`);
