export const instructionTypeCodes = [
	'BUILDING_SURVEY',
	'SCHEDULE_OF_CONDITION',
	'DILAPIDATIONS',
	'REINSTATEMENT_COST_ASSESSMENT',
	'INSURANCE_REINSTATEMENT',
	'GENERAL_ADVISORY'
] as const;

export const instructionStatusCodes = [
	'DRAFT',
	'ACTIVE',
	'ON_HOLD',
	'COMPLETE',
	'CANCELLED'
] as const;

export const instructionPriorityCodes = ['LOW', 'NORMAL', 'HIGH', 'URGENT'] as const;

export const instructionServiceLineCodes = [
	'BUILDING_SURVEYING',
	'PROJECTS',
	'COMPLIANCE',
	'INSURANCE',
	'ADVISORY'
] as const;
