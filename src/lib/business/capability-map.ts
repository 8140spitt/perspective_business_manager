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
		id: 'strategy-direction',
		name: 'Strategy & Direction',
		description: 'Business planning, objectives, portfolio direction and leadership reporting.',
		primaryRoute: '/app/dashboard',
		currentRoutes: ['/app/dashboard', '/app/reporting/dashboard', '/app/reporting/kpis'],
		coreObjects: ['objective', 'measure', 'portfolio', 'decision'],
		status: 'future'
	},
	{
		id: 'governance-risk-compliance',
		name: 'Governance, Risk & Compliance',
		description: 'RICS compliance, conflicts, PI risk, complaints, audits and quality evidence.',
		primaryRoute: '/app/compliance/dashboard',
		currentRoutes: ['/app/compliance/dashboard', '/app/compliance/conflicts-of-interest', '/app/compliance/complaints', '/app/compliance/pi-risk', '/app/compliance/quality-reviews', '/app/compliance/audit-trail'],
		coreObjects: ['risk', 'control', 'compliance_check', 'complaint', 'audit_event'],
		status: 'scaffolded'
	},
	{
		id: 'finance-capital',
		name: 'Finance & Capital',
		description: 'Fees, WIP, invoices, expenses, payments, profitability and financial reporting.',
		primaryRoute: '/app/finance/dashboard',
		currentRoutes: ['/app/finance/dashboard', '/app/finance/fees', '/app/finance/wip', '/app/finance/sales-invoices', '/app/finance/purchase-invoices', '/app/finance/payments', '/app/finance/expenses', '/app/finance/profitability'],
		coreObjects: ['fee', 'wip_item', 'invoice', 'payment', 'expense'],
		status: 'scaffolded'
	},
	{
		id: 'people-workforce',
		name: 'People & Workforce',
		description: 'Employees, roles, competencies, training, availability, allocations and utilisation.',
		primaryRoute: '/app/hr/dashboard',
		currentRoutes: ['/app/hr/dashboard', '/app/hr/employees', '/app/hr/roles', '/app/hr/training', '/app/hr/competencies', '/app/resource-planning/dashboard', '/app/resource-planning/availability', '/app/resource-planning/allocations', '/app/resource-planning/workload', '/app/resource-planning/utilisation', '/app/resource-planning/inspection-calendar'],
		coreObjects: ['person', 'employee', 'role', 'competency', 'allocation'],
		status: 'scaffolded'
	},
	{
		id: 'sales-client-management',
		name: 'Sales & Client Management',
		description: 'Clients, contacts, enquiries, opportunities, tenders, quotations and fee proposals.',
		primaryRoute: '/app/crm/dashboard',
		currentRoutes: ['/app/crm/dashboard', '/app/crm/clients', '/app/sales/dashboard', '/app/sales/enquiries', '/app/sales/opportunities', '/app/sales/fee-proposals', '/app/sales/quotations', '/app/sales/tenders', '/app/sales/pipeline'],
		coreObjects: ['party', 'person', 'organisation', 'client', 'contact_method', 'opportunity'],
		status: 'foundation'
	},
	{
		id: 'projects-portfolio',
		name: 'Projects, Programmes & Portfolio',
		description: 'Project setup, teams, programme, milestones, tasks, risks, issues and financial control.',
		primaryRoute: '/app/projects/dashboard',
		currentRoutes: ['/app/projects/dashboard', '/app/projects/projects', '/app/projects/projects/new', '/app/projects/projects/[projectId]/overview', '/app/projects/projects/[projectId]/team', '/app/projects/projects/[projectId]/programme', '/app/projects/projects/[projectId]/milestones', '/app/projects/projects/[projectId]/tasks', '/app/projects/projects/[projectId]/risks', '/app/projects/projects/[projectId]/issues', '/app/projects/projects/[projectId]/documents', '/app/projects/projects/[projectId]/financials'],
		coreObjects: ['project', 'project_role', 'task', 'milestone', 'project_risk'],
		status: 'scaffolded'
	},
	{
		id: 'operations-service-delivery',
		name: 'Operations & Service Delivery',
		description: 'Instruction lifecycle for building surveys, schedules of condition, dilapidations and reinstatement work.',
		primaryRoute: '/app/operations/dashboard',
		currentRoutes: ['/app/operations/dashboard', '/app/operations/instructions', '/app/operations/building-surveys', '/app/operations/schedules-of-condition', '/app/operations/dilapidations', '/app/operations/reinstatement-cost-assessments', '/app/operations/insurance-reinstatements'],
		coreObjects: ['instruction', 'scope', 'inspection', 'evidence', 'defect', 'deliverable'],
		status: 'scaffolded'
	},
	{
		id: 'property-technical-asset',
		name: 'Property, Technical & Asset Management',
		description: 'Property register, sites, buildings, units, rooms, elements, ownership, occupiers and condition history.',
		primaryRoute: '/app/property/dashboard',
		currentRoutes: ['/app/property/dashboard', '/app/property/property-register', '/app/property/sites', '/app/property/buildings', '/app/property/units', '/app/property/building-elements'],
		coreObjects: ['property', 'property_unit', 'address', 'building_element', 'property_party_role'],
		status: 'foundation'
	},
	{
		id: 'supply-chain-procurement',
		name: 'Supply Chain & Procurement',
		description: 'Suppliers, purchase orders, supplier relationships and bought-in services.',
		primaryRoute: '/app/procurement/dashboard',
		currentRoutes: ['/app/procurement/dashboard', '/app/procurement/suppliers', '/app/procurement/purchase-orders'],
		coreObjects: ['supplier', 'purchase_order', 'supplier_party_role'],
		status: 'scaffolded'
	},
	{
		id: 'information-data-digital',
		name: 'Information, Data & Digital',
		description: 'Admin, reference data, workflows, permissions, integrations, numbering and system settings.',
		primaryRoute: '/app/admin/dashboard',
		currentRoutes: ['/app/admin/dashboard', '/app/admin/users', '/app/admin/teams', '/app/admin/roles', '/app/admin/permissions', '/app/admin/reference-data', '/app/admin/workflows', '/app/admin/numbering-sequences', '/app/admin/service-lines', '/app/admin/integrations', '/app/admin/system-settings'],
		coreObjects: ['user', 'permission', 'workflow', 'ref_code_set', 'ref_code_value'],
		status: 'foundation'
	},
	{
		id: 'knowledge-records',
		name: 'Knowledge & Records Management',
		description: 'Document library, evidence, photos, drawings, templates and controlled records.',
		primaryRoute: '/app/documents/dashboard',
		currentRoutes: ['/app/documents/dashboard', '/app/documents/document-library', '/app/documents/evidence-library', '/app/documents/photos', '/app/documents/drawings', '/app/documents/templates'],
		coreObjects: ['document', 'evidence_item', 'photo', 'drawing', 'template'],
		status: 'scaffolded'
	}
];

export const ricsInstructionLifecycle = [
	'Enquiry',
	'Opportunity',
	'Fee Proposal',
	'Instruction',
	'Property / Site Setup',
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
