export type CapabilityArea = {
	id: string;
	name: string;
	description: string;
	primaryRoute: string;
	currentRoutes: string[];
	coreObjects: string[];
	status: 'foundation' | 'scaffolded' | 'future';
};

export const capabilityMap: CapabilityArea[] = [
	{
		id: 'business-setup',
		name: 'Business Setup',
		description:
			'Define the owning business, its functions, organisation units and positions. This is the operating spine for the rest of PBM.',
		primaryRoute: '/app/business/dashboard',
		currentRoutes: [
			'/app/business/dashboard',
			'/app/business/profile',
			'/app/business/functions',
			'/app/business/organisation-units',
			'/app/business/positions'
		],
		coreObjects: ['business_profile', 'business_function', 'organisation_unit', 'position'],
		status: 'foundation'
	},
	{
		id: 'people-workforce',
		name: 'People & Workforce',
		description:
			'Manage people, employees, roles, competence and authority. Projects can consume this data without HR working inside project screens.',
		primaryRoute: '/app/hr/dashboard',
		currentRoutes: [
			'/app/hr/dashboard',
			'/app/hr/people',
			'/app/hr/employees',
			'/app/hr/employee-positions',
			'/app/hr/competence',
			'/app/hr/authority'
		],
		coreObjects: ['person', 'employee', 'employee_position', 'competence', 'authority_limit'],
		status: 'foundation'
	},
	{
		id: 'clients-commercial',
		name: 'Clients & Commercial',
		description:
			'Know who the business works for, manage relationships, enquiries, opportunities, quotes and fee proposals.',
		primaryRoute: '/app/crm/dashboard',
		currentRoutes: [
			'/app/crm/dashboard',
			'/app/crm/clients',
			'/app/sales/dashboard',
			'/app/sales/enquiries',
			'/app/sales/opportunities',
			'/app/sales/fee-proposals',
			'/app/sales/quotations'
		],
		coreObjects: ['business_partner', 'person', 'relationship', 'enquiry', 'opportunity', 'quote'],
		status: 'foundation'
	},
	{
		id: 'project-delivery',
		name: 'Project Delivery',
		description:
			'Deliver the work: project setup, services, instructions, team, programme, tasks, risks, issues, evidence and documents.',
		primaryRoute: '/app/projects/dashboard',
		currentRoutes: [
			'/app/projects/dashboard',
			'/app/projects/projects',
			'/app/projects/projects/new'
		],
		coreObjects: ['project', 'project_service', 'instruction', 'activity', 'risk', 'issue', 'document'],
		status: 'foundation'
	},
	{
		id: 'money',
		name: 'Money',
		description:
			'Control the commercial money flow: purchase orders, supplier invoices, sales invoices, payments, WIP, revenue, cost and margin.',
		primaryRoute: '/app/finance/dashboard',
		currentRoutes: [
			'/app/finance/dashboard',
			'/app/finance/sales-invoices',
			'/app/finance/purchase-invoices',
			'/app/finance/payments',
			'/app/finance/wip',
			'/app/procurement/dashboard',
			'/app/procurement/suppliers',
			'/app/procurement/purchase-orders'
		],
		coreObjects: ['purchase_order', 'supplier_invoice', 'sales_invoice', 'payment', 'wip_item', 'margin'],
		status: 'scaffolded'
	},
	{
		id: 'control',
		name: 'Control',
		description:
			'Keep the business safe and auditable: governance, risk, compliance, quality reviews, complaints, audit trail and controlled evidence.',
		primaryRoute: '/app/compliance/dashboard',
		currentRoutes: [
			'/app/compliance/dashboard',
			'/app/compliance/conflicts-of-interest',
			'/app/compliance/complaints',
			'/app/compliance/pi-risk',
			'/app/compliance/quality-reviews',
			'/app/compliance/audit-trail'
		],
		coreObjects: ['risk', 'control', 'compliance_check', 'quality_review', 'complaint', 'audit_event'],
		status: 'scaffolded'
	},
	{
		id: 'reporting-admin',
		name: 'Reporting & Admin',
		description:
			'Cross-functional reporting, reference data, workflows, permissions, numbering, integrations and system settings.',
		primaryRoute: '/app/reporting/dashboard',
		currentRoutes: ['/app/reporting/dashboard', '/app/admin/dashboard'],
		coreObjects: ['report', 'kpi', 'workflow', 'permission', 'reference_data', 'integration'],
		status: 'future'
	}
];

export const ricsInstructionLifecycle = [
	'Enquiry',
	'Opportunity',
	'Fee Proposal',
	'Instruction',
	'Project Setup',
	'Scope Definition',
	'Resource Allocation',
	'Inspection',
	'Evidence Capture',
	'Report / Deliverable',
	'Technical Review',
	'Issue to Client',
	'WIP / Invoice',
	'Closeout',
	'Retention / Audit'
] as const;
