export const WORK_PACKAGE = 'work' as const;

export const WORK_CONTAINER_TYPE_CODES = [
	'project',
	'programme',
	'contract',
	'service_agreement',
	'framework_call_off',
	'workstream',
	'job',
	'case',
	'work_order',
	'maintenance_plan',
	'inspection_programme',
	'survey',
	'assessment'
] as const;

export const WORK_CONTAINER_STATUS_CODES = [
	'draft',
	'planned',
	'active',
	'on_hold',
	'completed',
	'cancelled'
] as const;

export const WORK_INSTRUCTION_STATUS_CODES = [
	'draft',
	'issued',
	'accepted',
	'in_progress',
	'completed',
	'cancelled'
] as const;

export const WORK_SUPPLY_MODE_CODES = ['internal', 'external', 'mixed'] as const;
