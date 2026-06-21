export type CapabilityArea = {
	id: string;
	name: string;
	description: string;
	primaryRoute: string;
	currentRoutes: string[];
	referenceCoverage: string[];
	capabilities: string[];
	coreObjects: string[];
	status: 'foundation' | 'scaffolded' | 'future';
};

export const capabilityMap: CapabilityArea[] = [
	{
		id: 'business-setup',
		name: 'Business Setup',
		description: 'Define the owning business, operating model, functions, organisation units, positions, settings and reference data.',
		primaryRoute: '/app/business/dashboard',
		currentRoutes: ['/app/business/dashboard', '/app/business/profile', '/app/business/functions', '/app/business/organisation-units', '/app/business/positions'],
		referenceCoverage: ['Business identity', 'Operating structure', 'Reference data'],
		capabilities: ['Business profile', 'Legal entities', 'Business functions', 'Organisation units', 'Positions', 'Sites and locations', 'Numbering rules', 'Reference data', 'Operating model'],
		coreObjects: ['business_profile', 'business_function', 'organisation_unit', 'position'],
		status: 'foundation'
	},
	{
		id: 'finance-control',
		name: 'Finance & Control',
		description: 'Control money, accounts, cash, tax, credit, cost, margin, close and management reporting.',
		primaryRoute: '/app/finance/dashboard',
		currentRoutes: ['/app/finance/dashboard'],
		referenceCoverage: ['Ledger and accounts', 'Cash and credit control', 'Cost and margin'],
		capabilities: ['General ledger', 'Accounts receivable', 'Accounts payable', 'Bank and cash', 'Tax / VAT', 'Credit control', 'Collections', 'Payments', 'Dispute management', 'Cost centres', 'Profit centres', 'Project costing', 'Revenue, cost and margin', 'Budgeting', 'Period close', 'Management accounts'],
		coreObjects: ['ledger_account', 'sales_invoice', 'supplier_invoice', 'payment', 'cost_centre', 'profit_centre', 'margin'],
		status: 'scaffolded'
	},
	{
		id: 'people-workforce',
		name: 'People & Workforce',
		description: 'Manage people, employees, positions, assignments, time, competence, training, authority and workforce planning.',
		primaryRoute: '/app/hr/dashboard',
		currentRoutes: ['/app/hr/dashboard'],
		referenceCoverage: ['People records', 'Workforce structure', 'Competence and authority'],
		capabilities: ['People records', 'Employees', 'Employee positions', 'Recruitment', 'Onboarding', 'Time and attendance', 'Leave / absence', 'Competence', 'Training', 'Authority limits', 'Workforce planning', 'Payroll interface'],
		coreObjects: ['person', 'employee', 'employee_position', 'competence', 'authority_limit', 'time_record'],
		status: 'foundation'
	},
	{
		id: 'clients-commercial',
		name: 'Clients & Commercial',
		description: 'Manage relationships, enquiries, opportunities, quotes, proposals, instructions and billing triggers.',
		primaryRoute: '/app/crm/dashboard',
		currentRoutes: ['/app/crm/dashboard', '/app/sales/dashboard', '/app/sales/enquiries'],
		referenceCoverage: ['Relationships', 'Pipeline', 'Commercial instructions'],
		capabilities: ['Clients', 'Contacts', 'Relationships', 'Leads', 'Enquiries', 'Opportunities', 'Quotes', 'Fee proposals', 'Pricing', 'Instructions / sales orders', 'Contract terms', 'Billing triggers', 'Client account view'],
		coreObjects: ['business_partner', 'person', 'relationship', 'enquiry', 'opportunity', 'quote', 'instruction'],
		status: 'foundation'
	},
	{
		id: 'project-delivery',
		name: 'Project Delivery',
		description: 'Deliver the work: planning, work breakdown, scope, services, activities, team assignments, risk, change, evidence and reporting.',
		primaryRoute: '/app/projects/dashboard',
		currentRoutes: ['/app/projects/dashboard', '/app/projects/projects', '/app/projects/projects/new'],
		referenceCoverage: ['Project planning', 'Project delivery', 'Project cost and evidence'],
		capabilities: ['Projects', 'Project phases / work breakdown', 'Scope', 'Services', 'Activities', 'Milestones', 'Team assignments', 'Risks', 'Issues', 'Change control', 'Evidence', 'Project documents', 'Cost and margin view', 'Project reporting'],
		coreObjects: ['project', 'project_service', 'project_activity', 'project_assignment', 'risk', 'issue', 'change', 'document'],
		status: 'foundation'
	},
	{
		id: 'procurement-supplier-control',
		name: 'Procurement & Supplier Control',
		description: 'Manage suppliers, purchasing, supplier spend, receipts, invoice checks, stock movement and supplier performance.',
		primaryRoute: '/app/procurement/dashboard',
		currentRoutes: ['/app/procurement/dashboard'],
		referenceCoverage: ['Supplier control', 'Purchasing', 'Inventory and receipts'],
		capabilities: ['Suppliers', 'Supplier contacts', 'Purchase requests', 'Supplier quotes', 'Purchase orders', 'Goods / service receipt', 'Supplier invoice status', 'Materials / item master', 'Stock locations', 'Inventory', 'Stock movements', 'Warehouse bins later', 'Supplier performance', 'Subcontractors'],
		coreObjects: ['supplier', 'purchase_request', 'purchase_order', 'goods_receipt', 'material', 'stock_location', 'inventory_movement'],
		status: 'scaffolded'
	},
	{
		id: 'operations-planning',
		name: 'Operations & Planning',
		description: 'Plan and schedule work, demand, capacity, resources, service orders, operational instructions and actual effort capture.',
		primaryRoute: '/app/operations/dashboard',
		currentRoutes: ['/app/operations/dashboard', '/app/resource-planning/dashboard'],
		referenceCoverage: ['Work planning', 'Capacity', 'Operational execution'],
		capabilities: ['Work planning', 'Demand / workload view', 'Capacity planning', 'Resource planning', 'Scheduling', 'Work orders / service orders', 'Operational instructions', 'Field/service completion', 'Actual effort capture', 'Productivity reporting'],
		coreObjects: ['work_order', 'service_order', 'resource_plan', 'schedule', 'capacity', 'instruction', 'effort_record'],
		status: 'scaffolded'
	},
	{
		id: 'quality-risk-compliance',
		name: 'Quality, Risk & Compliance',
		description: 'Keep the business safe and auditable: quality checks, inspections, non-conformance, corrective actions, risk, controls and obligations.',
		primaryRoute: '/app/compliance/dashboard',
		currentRoutes: ['/app/compliance/dashboard'],
		referenceCoverage: ['Quality assurance', 'Risk and controls', 'Compliance evidence'],
		capabilities: ['Quality plans', 'Quality checks', 'Inspections', 'Review gates', 'Non-conformance', 'Corrective actions', 'Lessons learned', 'Supplier quality', 'Risk register', 'Controls', 'Compliance obligations', 'Audit evidence', 'Policies', 'Approvals', 'Incidents', 'Health and safety'],
		coreObjects: ['quality_plan', 'inspection', 'non_conformance', 'corrective_action', 'risk', 'control', 'audit_event', 'incident'],
		status: 'scaffolded'
	},
	{
		id: 'property-assets',
		name: 'Property & Assets',
		description: 'Manage property, assets, equipment, facilities, maintenance, defects, inspections and lifecycle costs.',
		primaryRoute: '/app/property/dashboard',
		currentRoutes: ['/app/property/dashboard'],
		referenceCoverage: ['Property records', 'Asset lifecycle', 'Maintenance control'],
		capabilities: ['Asset register', 'Equipment', 'Facilities', 'Properties', 'Sites', 'Buildings', 'Spaces', 'Planned maintenance', 'Preventive maintenance', 'Reactive maintenance', 'Inspections', 'Defects', 'Asset lifecycle', 'Maintenance costs', 'Leases / occupancy later'],
		coreObjects: ['asset', 'equipment', 'facility', 'property', 'maintenance_plan', 'maintenance_order', 'defect', 'inspection'],
		status: 'future'
	},
	{
		id: 'documents-reporting-admin',
		name: 'Documents, Reporting & Administration',
		description: 'Provide cross-business reporting, documents, evidence, templates, workflows, permissions, integrations and system administration.',
		primaryRoute: '/app/reporting/dashboard',
		currentRoutes: ['/app/reporting/dashboard', '/app/admin/dashboard'],
		referenceCoverage: ['Reporting', 'Document control', 'Platform administration'],
		capabilities: ['Executive dashboards', 'Finance reports', 'Project reports', 'HR/workforce reports', 'Procurement reports', 'Compliance reports', 'KPI definitions', 'Period reporting', 'Export packs', 'Document register', 'Templates', 'Controlled documents', 'Evidence files', 'Versioning', 'Retention', 'Users and permissions', 'Access roles', 'Workflow administration', 'Integrations', 'System settings'],
		coreObjects: ['report', 'kpi', 'document', 'template', 'workflow', 'permission', 'role', 'integration', 'setting'],
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
