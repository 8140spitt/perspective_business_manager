import { db } from '$lib/server/db/connection';
import type { Party } from './parties.types';

export async function listParties(): Promise<Party[]> {
	const [rows] = await db.query(`
		SELECT
			party_id AS partyId,
			party_type_code AS partyTypeCode,
			display_name AS displayName,
			status_code AS statusCode,
			created_at AS createdAt,
			updated_at AS updatedAt
		FROM party
		ORDER BY display_name
	`);

	return rows as Party[];
}
export interface CreateOrganisationInput {
	displayName: string;
	organisationName: string;
	organisationNumber?: string | null;
	vatNumber?: string | null;
	organisationTypeCode?: string | null;
}

export async function createOrganisation(input: CreateOrganisationInput): Promise<number> {
	const connection = await db.getConnection();

	try {
		await connection.beginTransaction();

		const [partyResult] = await connection.query(
			`
			INSERT INTO party (
				party_type_code,
				display_name,
				status_code
			)
			VALUES (
				'ORGANISATION',
				:displayName,
				'ACTIVE'
			)
			`,
			{
				displayName: input.displayName
			}
		);

		const partyId = Number((partyResult as { insertId: number }).insertId);

		await connection.query(
			`
			INSERT INTO organisation (
				party_id,
				organisation_name,
				organisation_number,
				vat_number,
				organisation_type_code
			)
			VALUES (
				:partyId,
				:organisationName,
				:organisationNumber,
				:vatNumber,
				:organisationTypeCode
			)
			`,
			{
				partyId,
				organisationName: input.organisationName,
				organisationNumber: input.organisationNumber ?? null,
				vatNumber: input.vatNumber ?? null,
				organisationTypeCode: input.organisationTypeCode ?? null
			}
		);

		await connection.commit();

		return partyId;
	} catch (error) {
		await connection.rollback();
		throw error;
	} finally {
		connection.release();
	}
}

export async function getPartyById(partyId: number): Promise<Party | null> {
	const [rows] = await db.query(
		`
		SELECT
			party_id AS partyId,
			party_type_code AS partyTypeCode,
			display_name AS displayName,
			status_code AS statusCode,
			created_at AS createdAt,
			updated_at AS updatedAt
		FROM party
		WHERE party_id = :partyId
		LIMIT 1
		`,
		{ partyId }
	);

	const result = rows as Party[];
	return result[0] ?? null;
}
