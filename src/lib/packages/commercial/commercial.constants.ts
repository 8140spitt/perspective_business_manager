export const COMMERCIAL_PACKAGE = 'commercial' as const;

export const SALES_OBJECT_TYPES = [
	'lead',
	'enquiry',
	'opportunity',
	'proposal',
	'quotation',
	'tender'
] as const;

export const SALES_STAGE_CODES = [
	'draft',
	'new',
	'received',
	'triaged',
	'qualified',
	'developing',
	'under_review',
	'issued',
	'submitted',
	'negotiation',
	'accepted',
	'converted',
	'won',
	'lost',
	'rejected',
	'expired',
	'withdrawn',
	'closed'
] as const;
