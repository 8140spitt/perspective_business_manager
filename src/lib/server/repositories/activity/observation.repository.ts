import { db } from '$lib/server/db/connection';

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

export interface UpdateObservationInput {
	observationId: number;
	activityAreaId?: number | null;
	observationTypeCode?: string;
	statusCode?: string;
	title?: string;
	description?: string | null;
	observedAt?: string | null;
	observedByPartyId?: number | null;
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
	const [rows] = await db.query(
		`${observationSelect} WHERE observation_id = :observationId LIMIT 1`,
		{ observationId }
	);

	const result = rows as Observation[];
	return result[0] ?? null;
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

export async function updateObservation(input: UpdateObservationInput): Promise<void> {
	await db.query(
		`
		UPDATE observation
		SET
			activity_area_id = :activityAreaId,
			observation_type_code = COALESCE(:observationTypeCode, observation_type_code),
			status_code = COALESCE(:statusCode, status_code),
			title = COALESCE(:title, title),
			description = :description,
			observed_at = :observedAt,
			observed_by_party_id = :observedByPartyId
		WHERE observation_id = :observationId
		`,
		{
			observationId: input.observationId,
			activityAreaId: input.activityAreaId ?? null,
			observationTypeCode: input.observationTypeCode ?? null,
			statusCode: input.statusCode ?? null,
			title: input.title ?? null,
			description: input.description ?? null,
			observedAt: input.observedAt ?? null,
			observedByPartyId: input.observedByPartyId ?? null
		}
	);
}

export async function deleteObservation(observationId: number): Promise<void> {
	await db.query(`UPDATE observation SET status_code = 'DELETED' WHERE observation_id = :observationId`, {
		observationId
	});
}
