export const PROJECTS_PACKAGE = 'projects' as const;

export const PROJECT_STATE_CODES = [
	'enquiry',
	'scoping',
	'costing',
	'quote_preparation',
	'quote_issued',
	'quote_accepted',
	'planning',
	'active',
	'completed',
	'invoicing',
	'closed',
	'cancelled'
] as const;

export const PROJECT_PARTY_ROLE_CODES = [
	'client',
	'supplier',
	'vendor',
	'subcontractor',
	'consultant',
	'landlord',
	'tenant',
	'insurer',
	'loss_adjuster'
] as const;

export const PROJECT_CONTACT_ROLE_CODES = [
	'client_project_contact',
	'client_approver',
	'supplier_contact',
	'invoice_contact',
	'site_contact',
	'technical_contact'
] as const;

export const PROJECT_ASSIGNMENT_ROLE_CODES = [
	'project_manager',
	'commercial_lead',
	'building_surveyor',
	'quantity_surveyor',
	'site_supervisor',
	'quality_reviewer',
	'approver'
] as const;
