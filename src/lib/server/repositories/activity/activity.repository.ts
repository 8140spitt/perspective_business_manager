import { db } from '$lib/server/db/connection';

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

export interface UpdateActivityInput {
	activityId: number;
	activityTypeCode?: string;
	activityName?: string;
	description?: string | null;
	leadPartyId?: number | null;
	plannedStartAt?: string | null;
	plannedFinishAt?: string | null;
	actualStartAt?: string | null;
	actualFinishAt?: string | null;
	statusCode?: string;
	priorityCode?: string;
}

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

	const result = rows as Activity[];
	return result[0] ?? null;
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

export async function updateActivity(input: UpdateActivityInput): Promise<void> {
	await db.query(
		`
		UPDATE activity
		SET
			activity_type_code = COALESCE(:activityTypeCode, activity_type_code),
			activity_name = COALESCE(:activityName, activity_name),
			description = :description,
			lead_party_id = :leadPartyId,
			planned_start_at = :plannedStartAt,
			planned_finish_at = :plannedFinishAt,
			actual_start_at = :actualStartAt,
			actual_finish_at = :actualFinishAt,
			status_code = COALESCE(:statusCode, status_code),
			priority_code = COALESCE(:priorityCode, priority_code)
		WHERE activity_id = :activityId
		`,
		{
			activityId: input.activityId,
			activityTypeCode: input.activityTypeCode ?? null,
			activityName: input.activityName ?? null,
			description: input.description ?? null,
			leadPartyId: input.leadPartyId ?? null,
			plannedStartAt: input.plannedStartAt ?? null,
			plannedFinishAt: input.plannedFinishAt ?? null,
			actualStartAt: input.actualStartAt ?? null,
			actualFinishAt: input.actualFinishAt ?? null,
			statusCode: input.statusCode ?? null,
			priorityCode: input.priorityCode ?? null
		}
	);
}

export async function deleteActivity(activityId: number): Promise<void> {
	await db.query(`UPDATE activity SET status_code = 'DELETED' WHERE activity_id = :activityId`, {
		activityId
	});
}
