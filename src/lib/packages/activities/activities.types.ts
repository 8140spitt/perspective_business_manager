export interface Activity {
	activityId: number;
	activityReference: string;
	activityTypeCode: string;
	activityName: string;
	description: string | null;
	instructionId: number | null;
	projectId: number | null;
	propertyId: number | null;
	leadPartyId: number | null;
	workflowInstanceId: number | null;
	plannedStartAt: string | null;
	plannedFinishAt: string | null;
	actualStartAt: string | null;
	actualFinishAt: string | null;
	statusCode: string;
	priorityCode: string;
	createdAt: string;
	updatedAt: string | null;
}

export interface Observation {
	observationId: number;
	observationReference: string;
	activityId: number;
	activityAreaId: number | null;
	observationTypeCode: string;
	statusCode: string;
	title: string;
	description: string | null;
	observedAt: string | null;
	observedByPartyId: number | null;
	workflowInstanceId: number | null;
	createdAt: string;
	updatedAt: string | null;
}

export interface Assessment {
	assessmentId: number;
	assessmentReference: string;
	observationId: number;
	assessmentTypeCode: string;
	severityCode: string | null;
	likelihoodCode: string | null;
	statusCode: string;
	title: string;
	description: string | null;
	conclusion: string | null;
	assessedAt: string | null;
	assessedByPartyId: number | null;
	workflowInstanceId: number | null;
	createdAt: string;
	updatedAt: string | null;
}

export interface ActivityAction {
	actionId: number;
	actionReference: string;
	assessmentId: number;
	actionTypeCode: string;
	priorityCode: string;
	statusCode: string;
	title: string;
	description: string | null;
	assignedPartyId: number | null;
	dueAt: string | null;
	completedAt: string | null;
	workflowInstanceId: number | null;
	createdAt: string;
	updatedAt: string | null;
}

export interface Outcome {
	outcomeId: number;
	outcomeReference: string;
	actionId: number | null;
	activityId: number | null;
	deliverableId: number | null;
	outcomeTypeCode: string;
	statusCode: string;
	title: string;
	summary: string | null;
	conclusion: string | null;
	producedAt: string | null;
	producedByPartyId: number | null;
	workflowInstanceId: number | null;
	createdAt: string;
	updatedAt: string | null;
}

export interface ActivityAssessmentGroup {
	assessment: Assessment;
	actions: ActivityAction[];
}

export interface ActivityObservationGroup {
	observation: Observation;
	assessments: ActivityAssessmentGroup[];
}

export interface ActivityWorkspace {
	activity: Activity;
	observations: ActivityObservationGroup[];
	outcomes: Outcome[];
}

export interface CreateActivityInput {
	activityReference: string;
	activityTypeCode: string;
	activityName: string;
	description?: string | null;
	instructionId?: number | null;
	projectId?: number | null;
	propertyId?: number | null;
	leadPartyId?: number | null;
	plannedStartAt?: string | null;
	plannedFinishAt?: string | null;
	priorityCode?: string;
}

export interface CreateObservationInput {
	observationReference: string;
	activityId: number;
	activityAreaId?: number | null;
	observationTypeCode: string;
	title: string;
	description?: string | null;
	observedAt?: string | null;
	observedByPartyId?: number | null;
}

export interface CreateAssessmentInput {
	assessmentReference: string;
	observationId: number;
	assessmentTypeCode: string;
	severityCode?: string | null;
	likelihoodCode?: string | null;
	title: string;
	description?: string | null;
	conclusion?: string | null;
	assessedAt?: string | null;
	assessedByPartyId?: number | null;
}

export interface CreateActionInput {
	actionReference: string;
	assessmentId: number;
	actionTypeCode: string;
	priorityCode?: string;
	title: string;
	description?: string | null;
	assignedPartyId?: number | null;
	dueAt?: string | null;
}

export interface CreateOutcomeInput {
	outcomeReference: string;
	actionId?: number | null;
	activityId?: number | null;
	deliverableId?: number | null;
	outcomeTypeCode: string;
	title: string;
	summary?: string | null;
	conclusion?: string | null;
	producedAt?: string | null;
	producedByPartyId?: number | null;
}
