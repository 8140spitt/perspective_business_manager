import { db } from '$lib/server/db/connection';
import type {
	Activity,
	ActivityAction,
	Assessment,
	CreateActionInput,
	CreateActivityInput,
	CreateAssessmentInput,
	CreateObservationInput,
	CreateOutcomeInput,
	Observation,
	Outcome
} from './activities.types';

const activitySelect = `
	SELECT
		activity_id AS activityId,
		activity_reference AS activityReference,
		activity_type_code AS activityTypeCode,
		activity_name AS activityName,
		description,
		instruction_id AS instructionId,
		project_id AS projectId,
		property_id AS propertyId,
		lead_party_id AS leadPartyId,
		workflow_instance_id AS workflowInstanceId,
		planned_start_at AS plannedStartAt,
		planned_finish_at AS plannedFinishAt,
		actual_start_at AS actualStartAt,
		actual_finish_at AS actualFinishAt,
		status_code AS statusCode,
		priority_code AS priorityCode,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM activity
`;

export async function listActivities(): Promise<Activity[]> {
	const [rows] = await db.query(`${activitySelect} ORDER BY created_at DESC`);
	return rows as Activity[];
}

export async function getActivityById(activityId: number): Promise<Activity | null> {
	const [rows] = await db.query(`${activitySelect} WHERE activity_id = :activityId LIMIT 1`, {
		activityId
	});
	return (rows as Activity[])[0] ?? null;
}

export async function createActivity(input: CreateActivityInput): Promise<number> {
	const [result] = await db.query(
		`
		INSERT INTO activity (
			activity_reference,
			activity_type_code,
			activity_name,
			description,
			instruction_id,
			project_id,
			property_id,
			lead_party_id,
			planned_start_at,
			planned_finish_at,
			priority_code
		)
		VALUES (
			:activityReference,
			:activityTypeCode,
			:activityName,
			:description,
			:instructionId,
			:projectId,
			:propertyId,
			:leadPartyId,
			:plannedStartAt,
			:plannedFinishAt,
			:priorityCode
		)
		`,
		{
			activityReference: input.activityReference,
			activityTypeCode: input.activityTypeCode,
			activityName: input.activityName,
			description: input.description ?? null,
			instructionId: input.instructionId ?? null,
			projectId: input.projectId ?? null,
			propertyId: input.propertyId ?? null,
			leadPartyId: input.leadPartyId ?? null,
			plannedStartAt: input.plannedStartAt ?? null,
			plannedFinishAt: input.plannedFinishAt ?? null,
			priorityCode: input.priorityCode ?? 'NORMAL'
		}
	);
	return Number((result as { insertId: number }).insertId);
}

const observationSelect = `
	SELECT
		observation_id AS observationId,
		observation_reference AS observationReference,
		activity_id AS activityId,
		activity_area_id AS activityAreaId,
		observation_type_code AS observationTypeCode,
		status_code AS statusCode,
		title,
		description,
		observed_at AS observedAt,
		observed_by_party_id AS observedByPartyId,
		workflow_instance_id AS workflowInstanceId,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM observation
`;

export async function listObservations(activityId?: number): Promise<Observation[]> {
	const [rows] = await db.query(
		activityId
			? `${observationSelect} WHERE activity_id = :activityId ORDER BY created_at DESC`
			: `${observationSelect} ORDER BY created_at DESC`,
		{ activityId }
	);
	return rows as Observation[];
}

export async function getObservationById(observationId: number): Promise<Observation | null> {
	const [rows] = await db.query(`${observationSelect} WHERE observation_id = :observationId LIMIT 1`, {
		observationId
	});
	return (rows as Observation[])[0] ?? null;
}

export async function createObservation(input: CreateObservationInput): Promise<number> {
	const [result] = await db.query(
		`
		INSERT INTO observation (
			observation_reference,
			activity_id,
			activity_area_id,
			observation_type_code,
			title,
			description,
			observed_at,
			observed_by_party_id
		)
		VALUES (
			:observationReference,
			:activityId,
			:activityAreaId,
			:observationTypeCode,
			:title,
			:description,
			:observedAt,
			:observedByPartyId
		)
		`,
		{
			observationReference: input.observationReference,
			activityId: input.activityId,
			activityAreaId: input.activityAreaId ?? null,
			observationTypeCode: input.observationTypeCode,
			title: input.title,
			description: input.description ?? null,
			observedAt: input.observedAt ?? null,
			observedByPartyId: input.observedByPartyId ?? null
		}
	);
	return Number((result as { insertId: number }).insertId);
}

const assessmentSelect = `
	SELECT
		assessment_id AS assessmentId,
		assessment_reference AS assessmentReference,
		observation_id AS observationId,
		assessment_type_code AS assessmentTypeCode,
		severity_code AS severityCode,
		likelihood_code AS likelihoodCode,
		status_code AS statusCode,
		title,
		description,
		conclusion,
		assessed_at AS assessedAt,
		assessed_by_party_id AS assessedByPartyId,
		workflow_instance_id AS workflowInstanceId,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM assessment
`;

export async function listAssessments(observationId?: number): Promise<Assessment[]> {
	const [rows] = await db.query(
		observationId
			? `${assessmentSelect} WHERE observation_id = :observationId ORDER BY created_at DESC`
			: `${assessmentSelect} ORDER BY created_at DESC`,
		{ observationId }
	);
	return rows as Assessment[];
}

export async function getAssessmentById(assessmentId: number): Promise<Assessment | null> {
	const [rows] = await db.query(`${assessmentSelect} WHERE assessment_id = :assessmentId LIMIT 1`, {
		assessmentId
	});
	return (rows as Assessment[])[0] ?? null;
}

export async function createAssessment(input: CreateAssessmentInput): Promise<number> {
	const [result] = await db.query(
		`
		INSERT INTO assessment (
			assessment_reference,
			observation_id,
			assessment_type_code,
			severity_code,
			likelihood_code,
			title,
			description,
			conclusion,
			assessed_at,
			assessed_by_party_id
		)
		VALUES (
			:assessmentReference,
			:observationId,
			:assessmentTypeCode,
			:severityCode,
			:likelihoodCode,
			:title,
			:description,
			:conclusion,
			:assessedAt,
			:assessedByPartyId
		)
		`,
		{
			assessmentReference: input.assessmentReference,
			observationId: input.observationId,
			assessmentTypeCode: input.assessmentTypeCode,
			severityCode: input.severityCode ?? null,
			likelihoodCode: input.likelihoodCode ?? null,
			title: input.title,
			description: input.description ?? null,
			conclusion: input.conclusion ?? null,
			assessedAt: input.assessedAt ?? null,
			assessedByPartyId: input.assessedByPartyId ?? null
		}
	);
	return Number((result as { insertId: number }).insertId);
}

const actionSelect = `
	SELECT
		action_id AS actionId,
		action_reference AS actionReference,
		assessment_id AS assessmentId,
		action_type_code AS actionTypeCode,
		priority_code AS priorityCode,
		status_code AS statusCode,
		title,
		description,
		assigned_party_id AS assignedPartyId,
		due_at AS dueAt,
		completed_at AS completedAt,
		workflow_instance_id AS workflowInstanceId,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM ` + '`action`' + `
`;

export async function listActions(assessmentId?: number): Promise<ActivityAction[]> {
	const [rows] = await db.query(
		assessmentId
			? `${actionSelect} WHERE assessment_id = :assessmentId ORDER BY created_at DESC`
			: `${actionSelect} ORDER BY created_at DESC`,
		{ assessmentId }
	);
	return rows as ActivityAction[];
}

export async function getActionById(actionId: number): Promise<ActivityAction | null> {
	const [rows] = await db.query(`${actionSelect} WHERE action_id = :actionId LIMIT 1`, {
		actionId
	});
	return (rows as ActivityAction[])[0] ?? null;
}

export async function createAction(input: CreateActionInput): Promise<number> {
	const [result] = await db.query(
		`
		INSERT INTO ` + '`action`' + ` (
			action_reference,
			assessment_id,
			action_type_code,
			priority_code,
			title,
			description,
			assigned_party_id,
			due_at
		)
		VALUES (
			:actionReference,
			:assessmentId,
			:actionTypeCode,
			:priorityCode,
			:title,
			:description,
			:assignedPartyId,
			:dueAt
		)
		`,
		{
			actionReference: input.actionReference,
			assessmentId: input.assessmentId,
			actionTypeCode: input.actionTypeCode,
			priorityCode: input.priorityCode ?? 'NORMAL',
			title: input.title,
			description: input.description ?? null,
			assignedPartyId: input.assignedPartyId ?? null,
			dueAt: input.dueAt ?? null
		}
	);
	return Number((result as { insertId: number }).insertId);
}

const outcomeSelect = `
	SELECT
		outcome_id AS outcomeId,
		outcome_reference AS outcomeReference,
		action_id AS actionId,
		activity_id AS activityId,
		deliverable_id AS deliverableId,
		outcome_type_code AS outcomeTypeCode,
		status_code AS statusCode,
		title,
		summary,
		conclusion,
		produced_at AS producedAt,
		produced_by_party_id AS producedByPartyId,
		workflow_instance_id AS workflowInstanceId,
		created_at AS createdAt,
		updated_at AS updatedAt
	FROM outcome
`;

export async function listOutcomes(filters: { activityId?: number; actionId?: number } = {}): Promise<Outcome[]> {
	const where: string[] = [];
	const params: Record<string, number> = {};

	if (filters.activityId) {
		where.push('activity_id = :activityId');
		params.activityId = filters.activityId;
	}

	if (filters.actionId) {
		where.push('action_id = :actionId');
		params.actionId = filters.actionId;
	}

	const [rows] = await db.query(
		`${outcomeSelect} ${where.length ? `WHERE ${where.join(' AND ')}` : ''} ORDER BY created_at DESC`,
		params
	);
	return rows as Outcome[];
}

export async function getOutcomeById(outcomeId: number): Promise<Outcome | null> {
	const [rows] = await db.query(`${outcomeSelect} WHERE outcome_id = :outcomeId LIMIT 1`, {
		outcomeId
	});
	return (rows as Outcome[])[0] ?? null;
}

export async function createOutcome(input: CreateOutcomeInput): Promise<number> {
	const [result] = await db.query(
		`
		INSERT INTO outcome (
			outcome_reference,
			action_id,
			activity_id,
			deliverable_id,
			outcome_type_code,
			title,
			summary,
			conclusion,
			produced_at,
			produced_by_party_id
		)
		VALUES (
			:outcomeReference,
			:actionId,
			:activityId,
			:deliverableId,
			:outcomeTypeCode,
			:title,
			:summary,
			:conclusion,
			:producedAt,
			:producedByPartyId
		)
		`,
		{
			outcomeReference: input.outcomeReference,
			actionId: input.actionId ?? null,
			activityId: input.activityId ?? null,
			deliverableId: input.deliverableId ?? null,
			outcomeTypeCode: input.outcomeTypeCode,
			title: input.title,
			summary: input.summary ?? null,
			conclusion: input.conclusion ?? null,
			producedAt: input.producedAt ?? null,
			producedByPartyId: input.producedByPartyId ?? null
		}
	);
	return Number((result as { insertId: number }).insertId);
}
