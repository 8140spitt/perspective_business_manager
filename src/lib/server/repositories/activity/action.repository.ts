import { db } from '$lib/server/db/connection';

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

export interface UpdateActionInput {
	actionId: number;
	actionTypeCode?: string;
	priorityCode?: string;
	statusCode?: string;
	title?: string;
	description?: string | null;
	assignedPartyId?: number | null;
	dueAt?: string | null;
	completedAt?: string | null;
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

	const result = rows as ActivityAction[];
	return result[0] ?? null;
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

export async function updateAction(input: UpdateActionInput): Promise<void> {
	await db.query(
		`
		UPDATE ` + '`action`' + `
		SET
			action_type_code = COALESCE(:actionTypeCode, action_type_code),
			priority_code = COALESCE(:priorityCode, priority_code),
			status_code = COALESCE(:statusCode, status_code),
			title = COALESCE(:title, title),
			description = :description,
			assigned_party_id = :assignedPartyId,
			due_at = :dueAt,
			completed_at = :completedAt
		WHERE action_id = :actionId
		`,
		{
			actionId: input.actionId,
			actionTypeCode: input.actionTypeCode ?? null,
			priorityCode: input.priorityCode ?? null,
			statusCode: input.statusCode ?? null,
			title: input.title ?? null,
			description: input.description ?? null,
			assignedPartyId: input.assignedPartyId ?? null,
			dueAt: input.dueAt ?? null,
			completedAt: input.completedAt ?? null
		}
	);
}

export async function deleteAction(actionId: number): Promise<void> {
	await db.query(`UPDATE ` + '`action`' + ` SET status_code = 'DELETED' WHERE action_id = :actionId`, {
		actionId
	});
}
