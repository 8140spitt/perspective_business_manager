export const activityTypeCodes = [
	'INSPECTION',
	'AUDIT',
	'INVESTIGATION',
	'SURVEY',
	'WORKSHOP',
	'MEETING',
	'RISK_REVIEW'
] as const;

export const activityStatusCodes = ['PLANNED', 'IN_PROGRESS', 'COMPLETE', 'CANCELLED', 'DELETED'] as const;

export const activityPriorityCodes = ['LOW', 'NORMAL', 'HIGH', 'URGENT'] as const;
