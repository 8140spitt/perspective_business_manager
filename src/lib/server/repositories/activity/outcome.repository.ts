import { db } from '$lib/server/db/connection';

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

export interface UpdateOutcomeInput {
	outcomeId: number;
	outcomeTypeCode?: string;
	statusCode?: string;
	title?: string;
	summary?: string | null;
	conclusion?: string | null;
	producedAt?: string | null;
	producedByPartyId?: number | null;
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

	const result = rows as Outcome[];
	return result[0] ?? null;
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

export async function updateOutcome(input: UpdateOutcomeInput): Promise<void> {
	await db.query(
		`
		UPDATE outcome
		SET
			outcome_type_code = COALESCE(:outcomeTypeCode, outcome_type_code),
			status_code = COALESCE(:statusCode, status_code),
			title = COALESCE(:title, title),
			summary = :summary,
			conclusion = :conclusion,
			produced_at = :producedAt,
			produced_by_party_id = :producedByPartyId
		WHERE outcome_id = :outcomeId
		`,
		{
			outcomeId: input.outcomeId,
			outcomeTypeCode: input.outcomeTypeCode ?? null,
			statusCode: input.statusCode ?? null,
			title: input.title ?? null,
			summary: input.summary ?? null,
			conclusion: input.conclusion ?? null,
			producedAt: input.producedAt ?? null,
			producedByPartyId: input.producedByPartyId ?? null
		}
	);
}

export async function deleteOutcome(outcomeId: number): Promise<void> {
	await db.query(`UPDATE outcome SET status_code = 'DELETED' WHERE outcome_id = :outcomeId`, {
		outcomeId
	});
}
