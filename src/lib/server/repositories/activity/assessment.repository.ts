import { db } from '$lib/server/db/connection';

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

export interface UpdateAssessmentInput {
	assessmentId: number;
	assessmentTypeCode?: string;
	severityCode?: string | null;
	likelihoodCode?: string | null;
	statusCode?: string;
	title?: string;
	description?: string | null;
	conclusion?: string | null;
	assessedAt?: string | null;
	assessedByPartyId?: number | null;
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

	const result = rows as Assessment[];
	return result[0] ?? null;
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

export async function updateAssessment(input: UpdateAssessmentInput): Promise<void> {
	await db.query(
		`
		UPDATE assessment
		SET
			assessment_type_code = COALESCE(:assessmentTypeCode, assessment_type_code),
			severity_code = :severityCode,
			likelihood_code = :likelihoodCode,
			status_code = COALESCE(:statusCode, status_code),
			title = COALESCE(:title, title),
			description = :description,
			conclusion = :conclusion,
			assessed_at = :assessedAt,
			assessed_by_party_id = :assessedByPartyId
		WHERE assessment_id = :assessmentId
		`,
		{
			assessmentId: input.assessmentId,
			assessmentTypeCode: input.assessmentTypeCode ?? null,
			severityCode: input.severityCode ?? null,
			likelihoodCode: input.likelihoodCode ?? null,
			statusCode: input.statusCode ?? null,
			title: input.title ?? null,
			description: input.description ?? null,
			conclusion: input.conclusion ?? null,
			assessedAt: input.assessedAt ?? null,
			assessedByPartyId: input.assessedByPartyId ?? null
		}
	);
}

export async function deleteAssessment(assessmentId: number): Promise<void> {
	await db.query(`UPDATE assessment SET status_code = 'DELETED' WHERE assessment_id = :assessmentId`, {
		assessmentId
	});
}
